import abc
import datetime
import decimal
from collections import namedtuple
from typing import Optional
from unittest import mock

import pytest
from pydantic import ValidationError

from redis_om.checks import has_redisearch
from redis_om.model import Field, HashModel
from redis_om.model.migrations.migrator import Migrator
from redis_om.model.model import NotFoundError, QueryNotSupportedError, RedisModelError


if not has_redisearch():
    pytestmark = pytest.mark.skip

today = datetime.date.today()


@pytest.fixture
def m(key_prefix):
    class BaseHashModel(HashModel, abc.ABC):
        class Meta:
            global_key_prefix = key_prefix

    class Order(BaseHashModel):
        total: decimal.Decimal
        currency: str
        created_on: datetime.datetime

    class Member(BaseHashModel):
        first_name: str = Field(index=True)
        last_name: str = Field(index=True)
        email: str = Field(index=True)
        join_date: datetime.date
        age: int = Field(index=True)

        class Meta:
            model_key_prefix = "member"
            primary_key_pattern = ""

    Migrator().run()

    return namedtuple("Models", ["BaseHashModel", "Order", "Member"])(
        BaseHashModel, Order, Member
    )


@pytest.fixture
def members(m):
    member1 = m.Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        age=38,
        join_date=today,
    )

    member2 = m.Member(
        first_name="Kim",
        last_name="Brookins",
        email="k@example.com",
        age=34,
        join_date=today,
    )

    member3 = m.Member(
        first_name="Andrew",
        last_name="Smith",
        email="as@example.com",
        age=100,
        join_date=today,
    )
    member1.save()
    member2.save()
    member3.save()

    yield member1, member2, member3


def test_validates_required_fields(m):
    # Raises ValidationError: last_name is required
    with pytest.raises(ValidationError):
        m.Member(first_name="Andrew", zipcode="97086", join_date=today)


def test_validates_field(m):
    # Raises ValidationError: join_date is not a date
    with pytest.raises(ValidationError):
        m.Member(first_name="Andrew", last_name="Brookins", join_date="yesterday")


# Passes validation
def test_validation_passes(m):
    member = m.Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today,
        age=38,
    )
    assert member.first_name == "Andrew"


def test_saves_model_and_creates_pk(m):
    member = m.Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today,
        age=38,
    )
    # Save a model instance to Redis
    member.save()

    member2 = m.Member.get(member.pk)
    assert member2 == member


def test_raises_error_with_embedded_models(m):
    class Address(m.BaseHashModel):
        address_line_1: str
        address_line_2: Optional[str]
        city: str
        country: str
        postal_code: str

    with pytest.raises(RedisModelError):

        class InvalidMember(m.BaseHashModel):
            address: Address


@pytest.mark.skip("Not implemented yet")
def test_saves_many(m):
    members = [
        m.Member(
            first_name="Andrew",
            last_name="Brookins",
            email="a@example.com",
            join_date=today,
        ),
        m.Member(
            first_name="Kim",
            last_name="Brookins",
            email="k@example.com",
            join_date=today,
        ),
    ]
    m.Member.add(members)


@pytest.mark.skip("Not ready yet")
def test_updates_a_model(members, m):
    member1, member2, member3 = members

    # Or, with an implicit save:
    member1.update(last_name="Smith")
    assert m.Member.find(m.Member.pk == member1.pk).first() == member1

    # Or, affecting multiple model instances with an implicit save:
    m.Member.find(m.Member.last_name == "Brookins").update(last_name="Smith")
    results = m.Member.find(m.Member.last_name == "Smith")
    assert results == members


def test_paginate_query(members, m):
    member1, member2, member3 = members
    actual = m.Member.find().sort_by("age").all(batch_size=1)
    assert actual == [member2, member1, member3]


def test_access_result_by_index_cached(members, m):
    member1, member2, member3 = members
    query = m.Member.find().sort_by("age")
    # Load the cache, throw away the result.
    assert query._model_cache == []
    query.execute()
    assert query._model_cache == [member2, member1, member3]

    # Access an item that should be in the cache.
    with mock.patch.object(query.model, "db") as mock_db:
        assert query[0] == member2
        assert not mock_db.called


def test_access_result_by_index_not_cached(members, m):
    member1, member2, member3 = members
    query = m.Member.find().sort_by("age")

    # Assert that we don't have any models in the cache yet -- we
    # haven't made any requests of Redis.
    assert query._model_cache == []
    assert query[0] == member2
    assert query[1] == member1
    assert query[2] == member3


def test_exact_match_queries(members, m):
    member1, member2, member3 = members

    actual = m.Member.find(m.Member.last_name == "Brookins").sort_by("age").all()
    assert actual == [member2, member1]

    actual = m.Member.find(
        (m.Member.last_name == "Brookins") & ~(m.Member.first_name == "Andrew")
    ).all()
    assert actual == [member2]

    actual = m.Member.find(~(m.Member.last_name == "Brookins")).all()
    assert actual == [member3]

    actual = m.Member.find(m.Member.last_name != "Brookins").all()
    assert actual == [member3]

    actual = (
        m.Member.find(
            (m.Member.last_name == "Brookins") & (m.Member.first_name == "Andrew")
            | (m.Member.first_name == "Kim")
        )
        .sort_by("age")
        .all()
    )
    assert actual == [member2, member1]

    actual = m.Member.find(
        m.Member.first_name == "Kim", m.Member.last_name == "Brookins"
    ).all()
    assert actual == [member2]


def test_recursive_query_resolution(members, m):
    member1, member2, member3 = members

    actual = (
        m.Member.find(
            (m.Member.last_name == "Brookins")
            | (m.Member.age == 100) & (m.Member.last_name == "Smith")
        )
        .sort_by("age")
        .all()
    )
    assert actual == [member2, member1, member3]


def test_tag_queries_boolean_logic(members, m):
    member1, member2, member3 = members

    actual = (
        m.Member.find(
            (m.Member.first_name == "Andrew") & (m.Member.last_name == "Brookins")
            | (m.Member.last_name == "Smith")
        )
        .sort_by("age")
        .all()
    )
    assert actual == [member1, member3]


def test_tag_queries_punctuation(m):
    member1 = m.Member(
        first_name="Andrew, the Michael",
        last_name="St. Brookins-on-Pier",
        email="a|b@example.com",  # NOTE: This string uses the TAG field separator.
        age=38,
        join_date=today,
    )
    member1.save()

    member2 = m.Member(
        first_name="Bob",
        last_name="the Villain",
        email="a|villain@example.com",  # NOTE: This string uses the TAG field separator.
        age=38,
        join_date=today,
    )
    member2.save()

    assert (
        m.Member.find(m.Member.first_name == "Andrew, the Michael").first() == member1
    )
    assert (
        m.Member.find(m.Member.last_name == "St. Brookins-on-Pier").first() == member1
    )

    # Notice that when we index and query multiple values that use the internal
    # TAG separator for single-value exact-match fields, like an indexed string,
    # the queries will succeed. We apply a workaround that queries for the union
    # of the two values separated by the tag separator.
    assert m.Member.find(m.Member.email == "a|b@example.com").all() == [member1]
    assert m.Member.find(m.Member.email == "a|villain@example.com").all() == [member2]


def test_tag_queries_negation(members, m):
    member1, member2, member3 = members

    """
           ┌first_name
     NOT EQ┤
           └Andrew

    """
    query = m.Member.find(~(m.Member.first_name == "Andrew"))
    assert query.all() == [member2]

    """
               ┌first_name
        ┌NOT EQ┤
        |      └Andrew
     AND┤
        |  ┌last_name
        └EQ┤
           └Brookins

    """
    query = m.Member.find(
        ~(m.Member.first_name == "Andrew") & (m.Member.last_name == "Brookins")
    )
    assert query.all() == [member2]

    """
               ┌first_name
        ┌NOT EQ┤
        |      └Andrew
     AND┤
        |     ┌last_name
        |  ┌EQ┤
        |  |  └Brookins
        └OR┤
           |  ┌last_name
           └EQ┤
              └Smith
    """
    query = m.Member.find(
        ~(m.Member.first_name == "Andrew")
        & ((m.Member.last_name == "Brookins") | (m.Member.last_name == "Smith"))
    )
    assert query.all() == [member2]

    """
                  ┌first_name
           ┌NOT EQ┤
           |      └Andrew
       ┌AND┤
       |   |  ┌last_name
       |   └EQ┤
       |      └Brookins
     OR┤
       |  ┌last_name
       └EQ┤
          └Smith
    """
    query = m.Member.find(
        ~(m.Member.first_name == "Andrew") & (m.Member.last_name == "Brookins")
        | (m.Member.last_name == "Smith")
    )
    assert query.sort_by("age").all() == [member2, member3]

    actual = m.Member.find(
        (m.Member.first_name == "Andrew") & ~(m.Member.last_name == "Brookins")
    ).all()
    assert actual == [member3]


def test_numeric_queries(members, m):
    member1, member2, member3 = members

    actual = m.Member.find(m.Member.age == 34).all()
    assert actual == [member2]

    actual = m.Member.find(m.Member.age > 34).sort_by("age").all()
    assert actual == [member1, member3]

    actual = m.Member.find(m.Member.age < 35).all()
    assert actual == [member2]

    actual = m.Member.find(m.Member.age <= 34).all()
    assert actual == [member2]

    actual = m.Member.find(m.Member.age >= 100).all()
    assert actual == [member3]

    actual = m.Member.find(m.Member.age != 34).sort_by("age").all()
    assert actual == [member1, member3]

    actual = m.Member.find(~(m.Member.age == 100)).sort_by("age").all()
    assert actual == [member2, member1]

    actual = m.Member.find(m.Member.age > 30, m.Member.age < 40).sort_by("age").all()
    assert actual == [member2, member1]


def test_sorting(members, m):
    member1, member2, member3 = members

    actual = m.Member.find(m.Member.age > 34).sort_by("age").all()
    assert actual == [member1, member3]

    actual = m.Member.find(m.Member.age > 34).sort_by("-age").all()
    assert actual == [member3, member1]

    with pytest.raises(QueryNotSupportedError):
        # This field does not exist.
        m.Member.find().sort_by("not-a-real-field").all()

    with pytest.raises(QueryNotSupportedError):
        # This field is not sortable.
        m.Member.find().sort_by("join_date").all()


def test_all_keys(members, m):
    pks = sorted(list(m.Member.all_pks()))
    assert len(pks) == 3
    assert pks == sorted([m.pk for m in members])


def test_not_found(m):
    with pytest.raises(NotFoundError):
        # This ID does not exist.
        m.Member.get(1000)


def test_schema(m, key_prefix):
    class Address(m.BaseHashModel):
        a_string: str = Field(index=True)
        a_full_text_string: str = Field(index=True, full_text_search=True)
        an_integer: int = Field(index=True, sortable=True)
        a_float: float = Field(index=True)
        another_integer: int
        another_float: float

    assert (
        Address.redisearch_schema()
        == f"ON HASH PREFIX 1 {key_prefix}:tests.test_hash_model.Address: SCHEMA pk TAG SEPARATOR | a_string TAG SEPARATOR | a_full_text_string TAG SEPARATOR | a_full_text_string_fts TEXT an_integer NUMERIC SORTABLE a_float NUMERIC"
    )
