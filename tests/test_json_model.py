import abc
import decimal
import datetime
from typing import Optional, List
from unittest import mock

import pytest
import redis
from pydantic import ValidationError

from redis_developer.orm import (
    JsonModel,
    Field,
)
from redis_developer.orm.model import RedisModelError, QueryNotSupportedError, NotFoundError

r = redis.Redis()
today = datetime.date.today()


class BaseJsonModel(JsonModel, abc.ABC):
    class Meta:
        global_key_prefix = "redis-developer"


class Address(BaseJsonModel):
    address_line_1: str
    address_line_2: Optional[str]
    city: str
    state: str
    country: str
    postal_code: str = Field(index=True)


class Item(BaseJsonModel):
    price: decimal.Decimal
    name: str = Field(index=True, full_text_search=True)


class Order(BaseJsonModel):
    items: List[Item]
    total: decimal.Decimal
    created_on: datetime.datetime


class Member(BaseJsonModel):
    first_name: str
    last_name: str
    email: str = Field(index=True)
    join_date: datetime.date
    age: int

    # Creates an embedded model.
    address: Address

    # Creates an embedded list of models.
    orders: Optional[List[Order]]


@pytest.fixture()
def address():
    yield Address(
        address_line_1="1 Main St.",
        city="Portland",
        state="OR",
        country="USA",
        postal_code=11111
    )


@pytest.fixture()
def members(address):
    member1 = Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        age=38,
        join_date=today,
        address=address
    )

    member2 = Member(
        first_name="Kim",
        last_name="Brookins",
        email="k@example.com",
        age=34,
        join_date=today,
        address=address
    )

    member3 = Member(
        first_name="Andrew",
        last_name="Smith",
        email="as@example.com",
        age=100,
        join_date=today,
        address=address
    )

    member1.save()
    member2.save()
    member3.save()

    yield member1, member2, member3


def test_validates_required_fields(address):
    # Raises ValidationError address is required
    with pytest.raises(ValidationError):
        Member(
            first_name="Andrew",
            last_name="Brookins",
            zipcode="97086",
            join_date=today,
        )


def test_validates_field(address):
    # Raises ValidationError: join_date is not a date
    with pytest.raises(ValidationError):
        Member(
            first_name="Andrew",
            last_name="Brookins",
            join_date="yesterday",
            address=address
        )


# Passes validation
def test_validation_passes(address):
    member = Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today,
        age=38,
        address=address
    )
    assert member.first_name == "Andrew"


def test_saves_model_and_creates_pk(address):
    member = Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today,
        age=38,
        address=address
    )
    # Save a model instance to Redis
    member.save()

    member2 = Member.get(member.pk)
    assert member2 == member
    assert member2.address == address


@pytest.mark.skip("Not implemented yet")
def test_saves_many(address):
    members = [
        Member(
            first_name="Andrew",
            last_name="Brookins",
            email="a@example.com",
            join_date=today,
            address=address,
            age=38
        ),
        Member(
            first_name="Kim",
            last_name="Brookins",
            email="k@example.com",
            join_date=today,
            address=address,
            age=34
        )
    ]
    Member.add(members)


@pytest.mark.skip("Not ready yet")
def test_updates_a_model(members):
    member1, member2, member3 = members

    # Or, with an implicit save:
    member1.update(last_name="Smith")
    assert Member.find(Member.pk == member1.pk).first() == member1

    # Or, affecting multiple model instances with an implicit save:
    Member.find(Member.last_name == "Brookins").update(last_name="Smith")
    results = Member.find(Member.last_name == "Smith")
    assert sorted(results) == members

    # Or, updating a field in an embedded model:
    member2.update(address__city="Happy Valley")
    assert Member.find(Member.pk == member2.pk).first().address.city == "Happy Valley"


def test_paginate_query(members):
    member1, member2, member3 = members
    actual = Member.find().all(batch_size=1)
    assert sorted(actual) == [member1, member2, member3]


def test_access_result_by_index_cached(members):
    member1, member2, member3 = members
    query = Member.find().sort_by('age')
    # Load the cache, throw away the result.
    assert query._model_cache == []
    query.execute()
    assert query._model_cache == [member2, member1, member3]

    # Access an item that should be in the cache.
    with mock.patch.object(query.model, 'db') as mock_db:
        assert query[0] == member2
        assert not mock_db.called


def test_access_result_by_index_not_cached(members):
    member1, member2, member3 = members
    query = Member.find().sort_by('age')

    # Assert that we don't have any models in the cache yet -- we
    # haven't made any requests of Redis.
    assert query._model_cache == []
    assert query[0] == member2
    assert query[1] == member1
    assert query[2] == member3


def test_exact_match_queries(members):
    member1, member2, member3 = members

    actual = Member.find(Member.last_name == "Brookins").all()
    assert sorted(actual) == [member1, member2]

    actual = Member.find(
        (Member.last_name == "Brookins") & ~(Member.first_name == "Andrew")).all()
    assert actual == [member2]

    actual = Member.find(~(Member.last_name == "Brookins")).all()
    assert actual == [member3]

    actual = Member.find(Member.last_name != "Brookins").all()
    assert actual == [member3]

    actual = Member.find(
        (Member.last_name == "Brookins") & (Member.first_name == "Andrew")
        | (Member.first_name == "Kim")
    ).all()
    assert actual == [member2, member1]

    actual = Member.find(Member.first_name == "Kim", Member.last_name == "Brookins").all()
    assert actual == [member2]

    actual = Member.find(Member.address.city == "Portland").all()
    assert actual == [member1, member2, member3]


def test_recursive_query_resolution(members):
    member1, member2, member3 = members

    actual = Member.find((Member.last_name == "Brookins") | (
        Member.age == 100
    ) & (Member.last_name == "Smith")).all()
    assert sorted(actual) == [member1, member2, member3]


def test_tag_queries_boolean_logic(members):
    member1, member2, member3 = members

    actual = Member.find(
        (Member.first_name == "Andrew") &
        (Member.last_name == "Brookins") | (Member.last_name == "Smith")).all()
    assert sorted(actual) == [member1, member3]


def test_tag_queries_punctuation():
    member = Member(
        first_name="Andrew, the Michael",   # This string uses the TAG field separator.
        last_name="St. Brookins-on-Pier",
        email="a@example.com",
        age=38,
        join_date=today
    )
    member.save()

    assert Member.find(Member.first_name == "Andrew the Michael").first() == member
    assert Member.find(Member.last_name == "St. Brookins-on-Pier").first() == member
    assert Member.find(Member.email == "a@example.com").first() == member


def test_tag_queries_negation(members):
    member1, member2, member3 = members

    actual = Member.find(
        ~(Member.first_name == "Andrew") &
        (Member.last_name == "Brookins") | (Member.last_name == "Smith")).all()
    assert sorted(actual) == [member2, member3]

    actual = Member.find(
        (Member.first_name == "Andrew") & ~(Member.last_name == "Brookins")).all()
    assert sorted(actual) == [member3]


def test_numeric_queries(members):
    member1, member2, member3 = members

    actual = Member.find(Member.age == 34).all()
    assert actual == [member2]

    actual = Member.find(Member.age > 34).all()
    assert sorted(actual) == [member1, member3]

    actual = Member.find(Member.age < 35).all()
    assert actual == [member2]

    actual = Member.find(Member.age <= 34).all()
    assert actual == [member2]

    actual = Member.find(Member.age >= 100).all()
    assert actual == [member3]

    actual = Member.find(~(Member.age == 100)).all()
    assert sorted(actual) == [member1, member2]


def test_sorting(members):
    member1, member2, member3 = members

    actual = Member.find(Member.age > 34).sort_by('age').all()
    assert sorted(actual) == [member3, member1]

    actual = Member.find(Member.age > 34).sort_by('-age').all()
    assert sorted(actual) == [member1, member3]

    with pytest.raises(QueryNotSupportedError):
        # This field does not exist.
        Member.find().sort_by('not-a-real-field').all()

    with pytest.raises(QueryNotSupportedError):
        # This field is not sortable.
        Member.find().sort_by('join_date').all()


def test_not_found():
    with pytest.raises(NotFoundError):
        # This ID does not exist.
        Member.get(1000)


def test_schema():
    assert Member.redisearch_schema() == "ON JSON PREFIX 1 " \
                                         "redis-developer:tests.test_json_model.Member: " \
                                         "SCHEMA $.pk AS pk TAG " \
                                         "$.email AS email TAG " \
                                         "$.address.pk AS address_pk TAG " \
                                         "$.address.postal_code AS address_postal_code TAG " \
                                         "$.orders[].pk AS orders_pk TAG " \
                                         "$.orders[].items[].pk AS orders_items_pk TAG " \
                                         "$.orders[].items[].name AS orders_items_name TAG " \
                                         "$.orders[].items[].name AS orders_items_name_fts TEXT"
