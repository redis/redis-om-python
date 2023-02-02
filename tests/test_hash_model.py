# type: ignore

import abc
import dataclasses
import datetime
import decimal
from collections import namedtuple
from typing import Dict, List, Optional, Set
from unittest import mock

import pytest
import pytest_asyncio
from pydantic import ValidationError

from aredis_om import (
    Field,
    HashModel,
    Migrator,
    NotFoundError,
    QueryNotSupportedError,
    RedisModelError,
)

# We need to run this check as sync code (during tests) even in async mode
# because we call it in the top-level module scope.
from redis_om import has_redisearch

from .conftest import py_test_mark_asyncio


if not has_redisearch():
    pytestmark = pytest.mark.skip

today = datetime.date.today()


@pytest_asyncio.fixture
async def m(key_prefix, redis):
    class BaseHashModel(HashModel, abc.ABC):
        class Meta:
            global_key_prefix = key_prefix

    class Order(BaseHashModel):
        total: decimal.Decimal
        currency: str
        created_on: datetime.datetime

    class Member(BaseHashModel):
        id: int = Field(index=True, primary_key=True)
        first_name: str = Field(index=True)
        last_name: str = Field(index=True)
        email: str = Field(index=True)
        join_date: datetime.date
        age: int = Field(index=True, sortable=True)
        bio: str = Field(index=True, full_text_search=True)

        class Meta:
            model_key_prefix = "member"
            primary_key_pattern = ""

    await Migrator().run()

    return namedtuple("Models", ["BaseHashModel", "Order", "Member"])(
        BaseHashModel, Order, Member
    )


@pytest_asyncio.fixture
async def members(m):
    member1 = m.Member(
        id=0,
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        age=38,
        join_date=today,
        bio="This is member 1 whose greatness makes him the life and soul of any party he goes to.",
    )

    member2 = m.Member(
        id=1,
        first_name="Kim",
        last_name="Brookins",
        email="k@example.com",
        age=34,
        join_date=today,
        bio="This is member 2 who can be quite anxious until you get to know them.",
    )

    member3 = m.Member(
        id=2,
        first_name="Andrew",
        last_name="Smith",
        email="as@example.com",
        age=100,
        join_date=today,
        bio="This is member 3 who is a funny and lively sort of person.",
    )
    await member1.save()
    await member2.save()
    await member3.save()

    yield member1, member2, member3


@py_test_mark_asyncio
async def test_exact_match_queries(members, m):
    member1, member2, member3 = members

    actual = await m.Member.find(m.Member.last_name == "Brookins").sort_by("age").all()
    assert actual == [member2, member1]

    actual = await m.Member.find(
        (m.Member.last_name == "Brookins") & ~(m.Member.first_name == "Andrew")
    ).all()
    assert actual == [member2]

    actual = await m.Member.find(~(m.Member.last_name == "Brookins")).all()
    assert actual == [member3]

    actual = await m.Member.find(m.Member.last_name != "Brookins").all()
    assert actual == [member3]

    actual = await (
        m.Member.find(
            (m.Member.last_name == "Brookins") & (m.Member.first_name == "Andrew")
            | (m.Member.first_name == "Kim")
        )
        .sort_by("age")
        .all()
    )
    assert actual == [member2, member1]

    actual = await m.Member.find(
        m.Member.first_name == "Kim", m.Member.last_name == "Brookins"
    ).all()
    assert actual == [member2]

    actual = await m.Member.find(m.Member.id == 0).all()
    assert actual == [member1]


@py_test_mark_asyncio
async def test_delete_non_exist(members, m):
    member1, member2, member3 = members
    actual = await m.Member.find(
        (m.Member.last_name == "Brookins") & ~(m.Member.first_name == "Andrew")
    ).all()
    assert actual == [member2]
    assert (
        1
        == await m.Member.find(
            (m.Member.last_name == "Brookins") & ~(m.Member.first_name == "Andrew")
        ).delete()
    )
    assert (
        0
        == await m.Member.find(
            (m.Member.last_name == "Brookins") & ~(m.Member.first_name == "Andrew")
        ).delete()
    )


@py_test_mark_asyncio
async def test_full_text_search_queries(members, m):
    member1, member2, member3 = members

    actual = await (m.Member.find(m.Member.bio % "great").all())

    assert actual == [member1]

    actual = await (m.Member.find(~(m.Member.bio % "anxious")).sort_by("age").all())

    assert actual == [member1, member3]


@py_test_mark_asyncio
async def test_pagination_queries(members, m):
    member1, member2, member3 = members

    actual = await m.Member.find(m.Member.last_name == "Brookins").page()

    assert actual == [member1, member2]

    actual = await m.Member.find().page(1, 1)

    assert actual == [member2]

    actual = await m.Member.find().page(0, 1)

    assert actual == [member1]


@py_test_mark_asyncio
async def test_recursive_query_resolution(members, m):
    member1, member2, member3 = members

    actual = await (
        m.Member.find(
            (m.Member.last_name == "Brookins")
            | (m.Member.age == 100) & (m.Member.last_name == "Smith")
        )
        .sort_by("age")
        .all()
    )
    assert actual == [member2, member1, member3]


@py_test_mark_asyncio
async def test_tag_queries_boolean_logic(members, m):
    member1, member2, member3 = members

    actual = await (
        m.Member.find(
            (m.Member.first_name == "Andrew") & (m.Member.last_name == "Brookins")
            | (m.Member.last_name == "Smith")
        )
        .sort_by("age")
        .all()
    )
    assert actual == [member1, member3]


@py_test_mark_asyncio
async def test_tag_queries_punctuation(m):
    member1 = m.Member(
        id=0,
        first_name="Andrew, the Michael",
        last_name="St. Brookins-on-Pier",
        email="a|b@example.com",  # NOTE: This string uses the TAG field separator.
        age=38,
        join_date=today,
        bio="This is a test user on our system.",
    )
    await member1.save()

    member2 = m.Member(
        id=1,
        first_name="Bob",
        last_name="the Villain",
        email="a|villain@example.com",  # NOTE: This string uses the TAG field separator.
        age=38,
        join_date=today,
        bio="This is a villain, they are a really bad person!",
    )
    await member2.save()

    result = await (m.Member.find(m.Member.first_name == "Andrew, the Michael").first())
    assert result == member1

    result = await (m.Member.find(m.Member.last_name == "St. Brookins-on-Pier").first())
    assert result == member1

    # Notice that when we index and query multiple values that use the internal
    # TAG separator for single-value exact-match fields, like an indexed string,
    # the queries will succeed. We apply a workaround that queries for the union
    # of the two values separated by the tag separator.
    results = await m.Member.find(m.Member.email == "a|b@example.com").all()
    assert results == [member1]
    results = await m.Member.find(m.Member.email == "a|villain@example.com").all()
    assert results == [member2]


@py_test_mark_asyncio
async def test_tag_queries_negation(members, m):
    member1, member2, member3 = members

    """
           ┌first_name
     NOT EQ┤
           └Andrew

    """
    query = m.Member.find(~(m.Member.first_name == "Andrew"))
    assert await query.all() == [member2]

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
    assert await query.all() == [member2]

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
    assert await query.all() == [member2]

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
    assert await query.sort_by("age").all() == [member2, member3]

    actual = await m.Member.find(
        (m.Member.first_name == "Andrew") & ~(m.Member.last_name == "Brookins")
    ).all()
    assert actual == [member3]


@py_test_mark_asyncio
async def test_numeric_queries(members, m):
    member1, member2, member3 = members

    actual = await m.Member.find(m.Member.age == 34).all()
    assert actual == [member2]

    actual = await m.Member.find(m.Member.age > 34).sort_by("age").all()
    assert actual == [member1, member3]

    actual = await m.Member.find(m.Member.age < 35).all()
    assert actual == [member2]

    actual = await m.Member.find(m.Member.age <= 34).all()
    assert actual == [member2]

    actual = await m.Member.find(m.Member.age >= 100).all()
    assert actual == [member3]

    actual = await m.Member.find(m.Member.age != 34).sort_by("age").all()
    assert actual == [member1, member3]

    actual = await m.Member.find(~(m.Member.age == 100)).sort_by("age").all()
    assert actual == [member2, member1]

    actual = (
        await m.Member.find(m.Member.age > 30, m.Member.age < 40).sort_by("age").all()
    )
    assert actual == [member2, member1]


@py_test_mark_asyncio
async def test_sorting(members, m):
    member1, member2, member3 = members

    actual = await m.Member.find(m.Member.age > 34).sort_by("age").all()
    assert actual == [member1, member3]

    actual = await m.Member.find(m.Member.age > 34).sort_by("-age").all()
    assert actual == [member3, member1]

    with pytest.raises(QueryNotSupportedError):
        # This field does not exist.
        await m.Member.find().sort_by("not-a-real-field").all()

    with pytest.raises(QueryNotSupportedError):
        # This field is not sortable.
        await m.Member.find().sort_by("join_date").all()


def test_validates_required_fields(m):
    # Raises ValidationError: last_name is required
    # TODO: Test the error value
    with pytest.raises(ValidationError):
        m.Member(id=0, first_name="Andrew", zipcode="97086", join_date=today)


def test_validates_field(m):
    # Raises ValidationError: join_date is not a date
    # TODO: Test the error value
    with pytest.raises(ValidationError):
        m.Member(id=0, first_name="Andrew", last_name="Brookins", join_date="yesterday")


def test_validation_passes(m):
    member = m.Member(
        id=0,
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today,
        age=38,
        bio="This is the bio field.",
    )
    assert member.first_name == "Andrew"


@py_test_mark_asyncio
async def test_retrieve_first(m):
    member = m.Member(
        id=0,
        first_name="Simon",
        last_name="Prickett",
        email="s@example.com",
        join_date=today,
        age=99,
        bio="This is the bio field for this user.",
    )

    await member.save()

    member2 = m.Member(
        id=1,
        first_name="Another",
        last_name="Member",
        email="m@example.com",
        join_date=today,
        age=98,
        bio="This is the bio field for this user.",
    )

    await member2.save()

    member3 = m.Member(
        id=2,
        first_name="Third",
        last_name="Member",
        email="t@example.com",
        join_date=today,
        age=97,
        bio="This is the bio field for this user.",
    )

    await member3.save()

    first_one = await m.Member.find().sort_by("age").first()
    assert first_one == member3


@py_test_mark_asyncio
async def test_saves_model_and_creates_pk(m):
    member = m.Member(
        id=0,
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today,
        age=38,
        bio="This is the bio field for this user.",
    )
    # Save a model instance to Redis
    await member.save()

    member2 = await m.Member.get(pk=member.id)
    assert member2 == member


@py_test_mark_asyncio
async def test_all_pks(m):
    member = m.Member(
        id=0,
        first_name="Simon",
        last_name="Prickett",
        email="s@example.com",
        join_date=today,
        age=97,
        bio="This is a test user to be deleted.",
    )

    await member.save()

    member1 = m.Member(
        id=1,
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today,
        age=38,
        bio="This is a test user to be deleted.",
    )

    await member1.save()

    pk_list = []
    async for pk in await m.Member.all_pks():
        pk_list.append(pk)

    assert sorted(pk_list) == ["0", "1"]


@py_test_mark_asyncio
async def test_all_pks_with_complex_pks(key_prefix):
    class City(HashModel):
        name: str

        class Meta:
            global_key_prefix = key_prefix
            model_key_prefix = "city"

    city1 = City(
        pk="ca:on:toronto",
        name="Toronto",
    )

    await city1.save()

    city2 = City(
        pk="ca:qc:montreal",
        name="Montreal",
    )

    await city2.save()

    pk_list = []
    async for pk in await City.all_pks():
        pk_list.append(pk)

    assert sorted(pk_list) == ["ca:on:toronto", "ca:qc:montreal"]


@py_test_mark_asyncio
async def test_delete(m):
    member = m.Member(
        id=0,
        first_name="Simon",
        last_name="Prickett",
        email="s@example.com",
        join_date=today,
        age=97,
        bio="This is a test user to be deleted.",
    )

    await member.save()
    response = await m.Member.delete(pk=member.id)
    assert response == 1


@py_test_mark_asyncio
async def test_expire(m):
    member = m.Member(
        id=0,
        first_name="Expire",
        last_name="Test",
        email="e@example.com",
        join_date=today,
        age=93,
        bio="This is a test user for expiry",
    )

    await member.save()
    await member.expire(60)

    ttl = await m.Member.db().ttl(member.key())
    assert ttl > 0


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


def test_raises_error_with_dataclasses(m):
    @dataclasses.dataclass
    class Address:
        address_line_1: str

    with pytest.raises(RedisModelError):

        class InvalidMember(m.BaseHashModel):
            address: Address


def test_raises_error_with_dicts(m):
    with pytest.raises(RedisModelError):

        class InvalidMember(m.BaseHashModel):
            address: Dict[str, str]


def test_raises_error_with_sets(m):
    with pytest.raises(RedisModelError):

        class InvalidMember(m.BaseHashModel):
            friend_ids: Set[str]


def test_raises_error_with_lists(m):
    with pytest.raises(RedisModelError):

        class InvalidMember(m.BaseHashModel):
            friend_ids: List[str]


@py_test_mark_asyncio
async def test_saves_many(m):
    member1 = m.Member(
        id=0,
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today,
        age=38,
        bio="This is the user bio.",
    )
    member2 = m.Member(
        id=1,
        first_name="Kim",
        last_name="Brookins",
        email="k@example.com",
        join_date=today,
        age=34,
        bio="This is the bio for Kim.",
    )
    members = [member1, member2]
    result = await m.Member.add(members)
    assert result == [member1, member2]

    assert await m.Member.get(pk=member1.id) == member1
    assert await m.Member.get(pk=member2.id) == member2


@py_test_mark_asyncio
async def test_delete_many(m):
    member1 = m.Member(
        id=0,
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today,
        age=38,
        bio="This is the user bio.",
    )
    member2 = m.Member(
        id=1,
        first_name="Kim",
        last_name="Brookins",
        email="k@example.com",
        join_date=today,
        age=34,
        bio="This is the bio for Kim.",
    )
    members = [member1, member2]
    result = await m.Member.add(members)
    assert result == [member1, member2]
    result = await m.Member.delete_many(members)
    assert result == 2
    with pytest.raises(NotFoundError):
        await m.Member.get(pk=member1.key())


@py_test_mark_asyncio
async def test_updates_a_model(members, m):
    member1, member2, member3 = members
    await member1.update(last_name="Smith")
    member = await m.Member.get(member1.id)
    assert member.last_name == "Smith"


@py_test_mark_asyncio
async def test_paginate_query(members, m):
    member1, member2, member3 = members
    actual = await m.Member.find().sort_by("age").all(batch_size=1)
    assert actual == [member2, member1, member3]


@py_test_mark_asyncio
async def test_access_result_by_index_cached(members, m):
    member1, member2, member3 = members
    query = m.Member.find().sort_by("age")
    # Load the cache, throw away the result.
    assert query._model_cache == []
    await query.execute()
    assert query._model_cache == [member2, member1, member3]

    # Access an item that should be in the cache.
    with mock.patch.object(query.model, "db") as mock_db:
        assert await query.get_item(0) == member2
        assert not mock_db.called


@py_test_mark_asyncio
async def test_access_result_by_index_not_cached(members, m):
    member1, member2, member3 = members
    query = m.Member.find().sort_by("age")

    # Assert that we don't have any models in the cache yet -- we
    # haven't made any requests of Redis.
    assert query._model_cache == []
    assert await query.get_item(0) == member2
    assert await query.get_item(1) == member1
    assert await query.get_item(2) == member3


def test_schema(m):
    class Address(m.BaseHashModel):
        a_string: str = Field(index=True)
        a_full_text_string: str = Field(index=True, full_text_search=True)
        an_integer: int = Field(index=True, sortable=True)
        a_float: float = Field(index=True)
        another_integer: int
        another_float: float

    # We need to build the key prefix because it will differ based on whether
    # these tests were copied into the tests_sync folder and unasynce'd.
    key_prefix = Address.make_key(Address._meta.primary_key_pattern.format(pk=""))

    assert (
        Address.redisearch_schema()
        == f"ON HASH PREFIX 1 {key_prefix} SCHEMA pk TAG SEPARATOR | a_string TAG SEPARATOR | a_full_text_string TAG SEPARATOR | a_full_text_string AS a_full_text_string_fts TEXT an_integer NUMERIC SORTABLE a_float NUMERIC"
    )


@py_test_mark_asyncio
async def test_primary_key_model_error(m):
    class Customer(m.BaseHashModel):
        id: int = Field(primary_key=True, index=True)
        first_name: str = Field(primary_key=True, index=True)
        last_name: str
        bio: Optional[str]

    await Migrator().run()

    with pytest.raises(
        RedisModelError, match="You must define only one primary key for a model"
    ):
        _ = Customer(
            id=0,
            first_name="Mahmoud",
            last_name="Harmouch",
            bio="Python developer, wanna work at Redis, Inc.",
        )


@py_test_mark_asyncio
async def test_primary_pk_exists(m):
    class Customer1(m.BaseHashModel):
        id: int
        first_name: str
        last_name: str
        bio: Optional[str]

    class Customer2(m.BaseHashModel):
        id: int = Field(primary_key=True, index=True)
        first_name: str
        last_name: str
        bio: Optional[str]

    await Migrator().run()

    customer = Customer1(
        id=0,
        first_name="Mahmoud",
        last_name="Harmouch",
        bio="Python developer, wanna work at Redis, Inc.",
    )

    assert "pk" in customer.__fields__

    customer = Customer2(
        id=1,
        first_name="Kim",
        last_name="Brookins",
        bio="This is member 2 who can be quite anxious until you get to know them.",
    )

    assert "pk" not in customer.__fields__


@py_test_mark_asyncio
async def test_count(members, m):
    # member1, member2, member3 = members
    actual_count = await m.Member.find(
        (m.Member.first_name == "Andrew") & (m.Member.last_name == "Brookins")
        | (m.Member.last_name == "Smith")
    ).count()
    assert actual_count == 2

    actual_count = await m.Member.find(
        m.Member.first_name == "Kim", m.Member.last_name == "Brookins"
    ).count()
    assert actual_count == 1
