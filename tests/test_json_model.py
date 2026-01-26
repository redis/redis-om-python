# type: ignore

import abc
import dataclasses
import datetime
import decimal
import uuid
from collections import namedtuple
from enum import Enum
from typing import Dict, List, Optional, Set, Union
from unittest import mock

import pytest
import pytest_asyncio

from aredis_om import (
    Coordinates,
    EmbeddedJsonModel,
    Field,
    GeoFilter,
    JsonModel,
    Migrator,
    NotFoundError,
    QueryNotSupportedError,
    RedisModel,
    RedisModelError,
    VectorFieldOptions,
)
from aredis_om.model.model import ExpressionProxy

# We need to run this check as sync code (during tests) even in async mode
# because we call it in the top-level module scope.
from redis_om import has_redis_json
from tests._compat import EmailStr, PositiveInt, ValidationError

from .conftest import py_test_mark_asyncio

if not has_redis_json():
    pytestmark = pytest.mark.skip

today = datetime.date.today()


@pytest_asyncio.fixture
async def m(key_prefix, redis):
    class BaseJsonModel(JsonModel, abc.ABC):
        class Meta:
            global_key_prefix = key_prefix
            database = redis

    class Note(EmbeddedJsonModel, index=True):
        # TODO: This was going to be a full-text search example, but
        #  we can't index embedded documents for full-text search in
        #  the preview release.
        description: str = Field(index=True)
        created_on: datetime.datetime

    class Address(EmbeddedJsonModel, index=True):
        address_line_1: str
        address_line_2: Optional[str] = None
        city: str = Field(index=True)
        state: str
        country: str
        postal_code: str = Field(index=True)
        note: Optional[Note] = None

    class Item(EmbeddedJsonModel, index=True):
        price: decimal.Decimal
        name: str = Field(index=True)

    class Order(EmbeddedJsonModel, index=True):
        items: List[Item]
        created_on: datetime.datetime

    class Member(BaseJsonModel, index=True):
        first_name: str = Field(index=True, case_sensitive=True)
        last_name: str = Field(index=True)
        email: Optional[EmailStr] = Field(index=True, default=None)
        join_date: datetime.date
        age: Optional[PositiveInt] = Field(index=True, default=None)
        bio: Optional[str] = Field(full_text_search=True, default="")

        # Creates an embedded model.
        address: Address

        # Creates an embedded list of models.
        orders: Optional[List[Order]] = None

    await Migrator(conn=redis).run()

    return namedtuple(
        "Models", ["BaseJsonModel", "Note", "Address", "Item", "Order", "Member"]
    )(BaseJsonModel, Note, Address, Item, Order, Member)


@pytest.fixture()
def address(m):
    try:
        yield m.Address(
            address_line_1="1 Main St.",
            city="Portland",
            state="OR",
            country="USA",
            postal_code="11111",
        )
    except Exception as e:
        raise e


@pytest_asyncio.fixture()
async def members(address, m):
    member1 = m.Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        age=38,
        join_date=today,
        address=address,
    )

    member2 = m.Member(
        first_name="Kim",
        last_name="Brookins",
        email="k@example.com",
        age=34,
        join_date=today,
        address=address,
    )

    member3 = m.Member(
        first_name="Andrew",
        last_name="Smith",
        email="as@example.com",
        age=100,
        join_date=today,
        address=address,
    )

    await member1.save()
    await member2.save()
    await member3.save()

    yield member1, member2, member3


@py_test_mark_asyncio
async def test_validate_bad_email(address, m):
    # Raises ValidationError as email is malformed
    with pytest.raises(ValidationError):
        m.Member(
            first_name="Andrew",
            last_name="Brookins",
            zipcode="97086",
            join_date=today,
            email="foobarbaz",
        )


@py_test_mark_asyncio
async def test_validate_bad_age(address, m):
    # Raises ValidationError as email is malformed
    with pytest.raises(ValidationError):
        m.Member(
            first_name="Andrew",
            last_name="Brookins",
            zipcode="97086",
            join_date=today,
            email="foo@bar.com",
            address=address,
            age=-5,
        )


@py_test_mark_asyncio
async def test_validates_required_fields(address, m):
    # Raises ValidationError address is required
    with pytest.raises(ValidationError):
        m.Member(
            first_name="Andrew",
            last_name="Brookins",
            zipcode="97086",
            join_date=today,
        )


@py_test_mark_asyncio
async def test_validates_field(address, m):
    # Raises ValidationError: join_date is not a date
    with pytest.raises(ValidationError):
        m.Member(
            first_name="Andrew",
            last_name="Brookins",
            join_date="yesterday",
            address=address,
        )


@py_test_mark_asyncio
async def test_validation_passes(address, m):
    member = m.Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today,
        age=38,
        address=address,
    )
    assert member.first_name == "Andrew"


@py_test_mark_asyncio
async def test_saves_model_and_creates_pk(address, m, redis):
    # Migrator already run in m fixture
    member = m.Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today,
        age=38,
        address=address,
    )
    # Save a model instance to Redis
    await member.save()

    member2 = await m.Member.get(member.pk)
    assert member2 == member
    assert member2.address == address


@py_test_mark_asyncio
async def test_all_pks(address, m, redis):
    member = m.Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today,
        age=38,
        address=address,
    )

    await member.save()

    member1 = m.Member(
        first_name="Simon",
        last_name="Prickett",
        email="s@example.com",
        join_date=today,
        age=99,
        address=address,
    )

    await member1.save()

    pk_list = []
    async for pk in await m.Member.all_pks():
        pk_list.append(pk)

    assert sorted(pk_list) == sorted([member.pk, member1.pk])


@py_test_mark_asyncio
async def test_all_pks_with_complex_pks(key_prefix):
    class City(JsonModel, index=True):
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
async def test_delete(address, m, redis):
    member = m.Member(
        first_name="Simon",
        last_name="Prickett",
        email="s@example.com",
        join_date=today,
        age=38,
        address=address,
    )

    await member.save()
    response = await m.Member.delete(member.pk)
    assert response == 1


@py_test_mark_asyncio
async def test_saves_many_implicit_pipeline(address, m):
    member1 = m.Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today,
        address=address,
        age=38,
    )
    member2 = m.Member(
        first_name="Kim",
        last_name="Brookins",
        email="k@example.com",
        join_date=today,
        address=address,
        age=34,
    )
    members = [member1, member2]
    result = await m.Member.add(members)
    assert result == [member1, member2]

    assert await m.Member.get(pk=member1.pk) == member1
    assert await m.Member.get(pk=member2.pk) == member2


@py_test_mark_asyncio
async def test_saves_many_explicit_transaction(address, m):
    member1 = m.Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today,
        address=address,
        age=38,
    )
    member2 = m.Member(
        first_name="Kim",
        last_name="Brookins",
        email="k@example.com",
        join_date=today,
        address=address,
        age=34,
    )
    members = [member1, member2]
    result = await m.Member.add(members)
    assert result == [member1, member2]

    assert await m.Member.get(pk=member1.pk) == member1
    assert await m.Member.get(pk=member2.pk) == member2

    # Test the explicit pipeline path -- here, we add multiple Members
    # using a single Redis transaction, with MULTI/EXEC.
    async with m.Member.db().pipeline(transaction=True) as pipeline:
        await m.Member.add(members, pipeline=pipeline)
        assert result == [member1, member2]
        assert await pipeline.execute() == [True, True]

        assert await m.Member.get(pk=member1.pk) == member1
        assert await m.Member.get(pk=member2.pk) == member2


@py_test_mark_asyncio
async def test_delete_many_implicit_pipeline(address, m):
    member1 = m.Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today,
        address=address,
        age=38,
    )
    member2 = m.Member(
        first_name="Kim",
        last_name="Brookins",
        email="k@example.com",
        join_date=today,
        address=address,
        age=34,
    )
    members = [member1, member2]
    result = await m.Member.add(members)
    assert result == [member1, member2]
    result = await m.Member.delete_many(members)
    assert result == 2
    with pytest.raises(NotFoundError):
        await m.Member.get(pk=member2.pk)


async def save(members):
    for m in members:
        await m.save()
    return members


@py_test_mark_asyncio
async def test_updates_a_model(members, m):
    member1, member2, member3 = await save(members)

    # Update a field directly on the model
    await member1.update(last_name="Apples to oranges")
    member = await m.Member.get(member1.pk)
    assert member.last_name == "Apples to oranges"

    # Update a field in an embedded model
    await member2.update(address__city="Happy Valley")
    member = await m.Member.get(member2.pk)
    assert member.address.city == "Happy Valley"


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


@py_test_mark_asyncio
async def test_in_query(members, m):
    member1, member2, member3 = members
    actual = await (
        m.Member.find(m.Member.pk << [member1.pk, member2.pk, member3.pk])
        .sort_by("age")
        .all()
    )
    assert actual == [member2, member1, member3]


@py_test_mark_asyncio
async def test_not_in_query(members, m):
    member1, member2, member3 = members
    actual = await (
        m.Member.find(m.Member.pk >> [member2.pk, member3.pk]).sort_by("age").all()
    )
    assert actual == [member1]


@py_test_mark_asyncio
async def test_update_query(members, m):
    member1, member2, member3 = members
    await m.Member.find(m.Member.pk << [member1.pk, member2.pk, member3.pk]).update(
        first_name="Bobby"
    )
    actual = await (
        m.Member.find(m.Member.pk << [member1.pk, member2.pk, member3.pk])
        .sort_by("age")
        .all()
    )
    assert len(actual) == 3
    assert all([m.first_name == "Bobby" for m in actual])


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

    actual = (
        await m.Member.find(m.Member.address.city == "Portland").sort_by("age").all()
    )
    assert actual == [member2, member1, member3]


@py_test_mark_asyncio
async def test_recursive_query_expression_resolution(members, m):
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
async def test_recursive_query_field_resolution(members, m):
    member1, _, _ = members
    member1.address.note = m.Note(
        description="Weird house", created_on=datetime.datetime.now()
    )
    await member1.save()
    actual = await m.Member.find(
        m.Member.address.note.description == "Weird house"
    ).all()
    assert actual == [member1]

    member1.orders = [
        m.Order(
            items=[m.Item(price=10.99, name="Ball")],
            total=10.99,
            created_on=datetime.datetime.now(),
        )
    ]
    await member1.save()
    actual = await m.Member.find(m.Member.orders.items.name == "Ball").all()
    assert actual == [member1]
    assert actual[0].orders[0].items[0].name == "Ball"


@py_test_mark_asyncio
async def test_full_text_search(members, m):
    member1, member2, _ = members
    await member1.update(bio="Hates sunsets, likes beaches")
    await member2.update(bio="Hates beaches, likes forests")

    actual = await m.Member.find(m.Member.bio % "beaches").sort_by("age").all()
    assert actual == [member2, member1]

    actual = await m.Member.find(m.Member.bio % "forests").all()
    assert actual == [member2]


@py_test_mark_asyncio
async def test_tag_queries_boolean_logic(members, m):
    member1, member2, member3 = members

    actual = (
        await m.Member.find(
            (m.Member.first_name == "Andrew") & (m.Member.last_name == "Brookins")
            | (m.Member.last_name == "Smith")
        )
        .sort_by("age")
        .all()
    )
    assert actual == [member1, member3]


@py_test_mark_asyncio
async def test_tag_queries_punctuation(address, m):
    member1 = m.Member(
        first_name="Andrew, the Michael",
        last_name="St. Brookins-on-Pier",
        email="a|b@example.com",  # NOTE: This string uses the TAG field separator.
        age=38,
        join_date=today,
        address=address,
    )
    await member1.save()

    member2 = m.Member(
        first_name="Bob",
        last_name="the Villain",
        email="a|villain@example.com",  # NOTE: This string uses the TAG field separator.
        age=38,
        join_date=today,
        address=address,
    )
    await member2.save()

    assert (
        await m.Member.find(m.Member.first_name == "Andrew, the Michael").first()
        == member1
    )
    assert (
        await m.Member.find(m.Member.last_name == "St. Brookins-on-Pier").first()
        == member1
    )

    # Notice that when we index and query multiple values that use the internal
    # TAG separator for single-value exact-match fields, like an indexed string,
    # the queries will succeed. We apply a workaround that queries for the union
    # of the two values separated by the tag separator.
    assert await m.Member.find(m.Member.email == "a|b@example.com").all() == [member1]
    assert await m.Member.find(m.Member.email == "a|villain@example.com").all() == [
        member2
    ]


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

    actual = await m.Member.find(~(m.Member.age == 100)).sort_by("age").all()
    assert actual == [member2, member1]

    actual = (
        await m.Member.find(m.Member.age > 30, m.Member.age < 40).sort_by("age").all()
    )
    assert actual == [member2, member1]

    actual = await m.Member.find(m.Member.age != 34).sort_by("age").all()
    assert actual == [member1, member3]


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


@py_test_mark_asyncio
async def test_case_sensitive(members, m):
    member1, member2, member3 = members

    actual = await m.Member.find(m.Member.first_name == "Andrew").sort_by("pk").all()
    assert sorted(actual, key=lambda m: m.pk) == sorted(
        [member1, member3], key=lambda m: m.pk
    )

    actual = await m.Member.find(m.Member.first_name == "andrew").all()
    assert actual == []


@py_test_mark_asyncio
async def test_not_found(m):
    with pytest.raises(NotFoundError):
        # This ID does not exist.
        await m.Member.get(1000)


@py_test_mark_asyncio
async def test_list_field_limitations(m, redis):
    # TAG fields (including lists) can now be sortable
    class SortableTarotWitch(m.BaseJsonModel):
        # We support indexing lists of strings for equality and membership
        # queries. Sorting is now supported for TAG fields.
        tarot_cards: List[str] = Field(index=True, sortable=True)

    # Verify the schema includes SORTABLE
    schema = SortableTarotWitch.redisearch_schema()
    assert "SORTABLE" in schema

    with pytest.raises(RedisModelError):

        class SortableFullTextSearchAlchemicalWitch(m.BaseJsonModel):
            # We don't support indexing a list of strings for full-text search
            # queries. Support for this feature is not planned.
            potions: List[str] = Field(index=True, full_text_search=True)

    with pytest.raises(RedisModelError):

        class NumerologyWitch(m.BaseJsonModel):
            # We don't support indexing a list of numbers. Support for this
            # feature is To Be Determined.
            lucky_numbers: List[int] = Field(index=True)

    with pytest.raises(RedisModelError):

        class ReadingWithPrice(EmbeddedJsonModel, index=True):
            gold_coins_charged: int = Field(index=True)

        class TarotWitchWhoCharges(m.BaseJsonModel):
            tarot_cards: List[str] = Field(index=True)

            # The preview release does not support indexing numeric fields on models
            # found within a list or tuple. This is the same limitation that stops
            # us from indexing plain lists (or tuples) containing numeric values.
            # The fate of this feature is To Be Determined.
            readings: List[ReadingWithPrice]

    class TarotWitch(m.BaseJsonModel, index=True):
        # We support indexing lists of strings for quality and membership
        # queries. Sorting is not supported, but is planned.
        tarot_cards: List[str] = Field(index=True)

    # We need to import and run this manually because we defined
    # our model classes within a function that runs after the test
    # suite's migrator has already looked for migrations to run.
    await Migrator().run()

    witch = TarotWitch(tarot_cards=["death"])
    await witch.save()
    actual = await TarotWitch.find(TarotWitch.tarot_cards << "death").all()
    assert actual == [witch]


@py_test_mark_asyncio
async def test_allows_dataclasses(m):
    @dataclasses.dataclass
    class Address:
        address_line_1: str

    class ValidMember(m.BaseJsonModel, index=True):
        address: Address

    address = Address(address_line_1="hey")
    member = ValidMember(address=address)
    await member.save()

    member2 = await ValidMember.get(member.pk)
    assert member2 == member
    assert member2.address.address_line_1 == "hey"


@py_test_mark_asyncio
async def test_allows_and_serializes_dicts(m):
    class ValidMember(m.BaseJsonModel, index=True):
        address: Dict[str, str]

    member = ValidMember(address={"address_line_1": "hey"})
    await member.save()

    member2 = await ValidMember.get(member.pk)
    assert member2 == member
    assert member2.address["address_line_1"] == "hey"


@py_test_mark_asyncio
async def test_allows_and_serializes_sets(m):
    class ValidMember(m.BaseJsonModel, index=True):
        friend_ids: Set[int]

    member = ValidMember(friend_ids={1, 2})
    await member.save()

    member2 = await ValidMember.get(member.pk)
    assert member2 == member
    assert member2.friend_ids == {1, 2}


@py_test_mark_asyncio
async def test_allows_and_serializes_lists(m):
    class ValidMember(m.BaseJsonModel, index=True):
        friend_ids: List[int]

    member = ValidMember(friend_ids=[1, 2])
    await member.save()

    member2 = await ValidMember.get(member.pk)
    assert member2 == member
    assert member2.friend_ids == [1, 2]


@py_test_mark_asyncio
async def test_schema(m, key_prefix):
    # We need to build the key prefix because it will differ based on whether
    # these tests were copied into the tests_sync folder and unasynce'd.
    key_prefix = m.Member.make_key(m.Member._meta.primary_key_pattern.format(pk=""))
    # Note: EmbeddedJsonModel pk fields are not included in the schema since
    # embedded models don't need primary keys (they're stored as part of their
    # parent document, not as separate Redis keys). See GitHub issue #496.
    assert m.Member.redisearch_schema() == (
        f"ON JSON PREFIX 1 {key_prefix} SCHEMA "
        "$.pk AS pk TAG SEPARATOR | "
        "$.first_name AS first_name TAG SEPARATOR | CASESENSITIVE "
        "$.last_name AS last_name TAG SEPARATOR | "
        "$.email AS email TAG SEPARATOR |  "
        "$.age AS age NUMERIC "
        "$.bio AS bio TAG SEPARATOR | "
        "$.bio AS bio_fts TEXT "
        "$.address.city AS address_city TAG SEPARATOR | "
        "$.address.postal_code AS address_postal_code TAG SEPARATOR | "
        "$.address.note.description AS address_note_description TAG SEPARATOR | "
        "$.orders[*].items[*].name AS orders_items_name TAG SEPARATOR |"
    )


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


@py_test_mark_asyncio
async def test_type_with_union(members, m):
    class TypeWithUnion(m.BaseJsonModel, index=True):
        field: Union[str, int]

    twu_str = TypeWithUnion(field="hello world")
    res = await twu_str.save()
    assert res.pk == twu_str.pk
    twu_str_rematerialized = await TypeWithUnion.get(twu_str.pk)
    assert (
        isinstance(twu_str_rematerialized.field, str)
        and twu_str_rematerialized.pk == twu_str.pk
    )

    twu_int = TypeWithUnion(field=42)
    await twu_int.save()
    twu_int_rematerialized = await TypeWithUnion.get(twu_int.pk)
    assert (
        isinstance(twu_int_rematerialized.field, int)
        and twu_int_rematerialized.pk == twu_int.pk
    )


@py_test_mark_asyncio
async def test_type_with_uuid():
    class TypeWithUuid(JsonModel, index=True):
        uuid: uuid.UUID

    item = TypeWithUuid(uuid=uuid.uuid4())

    await item.save()


@py_test_mark_asyncio
async def test_values_method_with_specific_fields(members, m):
    member1, member2, member3 = members
    actual = await (
        m.Member.find(
            (m.Member.first_name == "Andrew") & (m.Member.last_name == "Brookins")
            | (m.Member.last_name == "Smith")
        )
        .sort_by("last_name")
        .values("first_name", "last_name")
        .all()
    )
    assert actual == [
        {"first_name": "Andrew", "last_name": "Brookins"},
        {"first_name": "Andrew", "last_name": "Smith"},
    ]


@py_test_mark_asyncio
async def test_values_method_all_fields(members, m):
    member1, member2, member3 = members
    actual = await m.Member.find(m.Member.first_name == "Andrew").values().all()

    # Check that it returns all fields as dicts
    assert len(actual) == 2  # Should find Andrew Brookins and Andrew Smith
    # Verify it contains all fields as dictionaries
    for result in actual:
        assert "first_name" in result
        assert "last_name" in result
        assert "email" in result
        assert "age" in result
        assert "pk" in result  # Should include primary key
        assert result["first_name"] == "Andrew"


@py_test_mark_asyncio
async def test_type_with_enum():
    class TestEnum(Enum):
        FOO = "foo"
        BAR = "bar"

    class TypeWithEnum(JsonModel, index=True):
        enum: TestEnum

    await Migrator().run()

    item = TypeWithEnum(enum=TestEnum.FOO)

    await item.save()

    assert await TypeWithEnum.get(item.pk) == item


@py_test_mark_asyncio
async def test_type_with_list_of_enums(key_prefix, redis):
    class TestEnum(Enum):
        FOO = "foo"
        BAR = "bar"

    class BaseWithEnums(JsonModel):
        enums: list[TestEnum]

    class TypeWithEnums(BaseWithEnums, index=True):
        pass

    await Migrator().run()

    item = TypeWithEnums(enums=[TestEnum.FOO])

    await item.save()

    assert await TypeWithEnums.get(item.pk) == item


@py_test_mark_asyncio
async def test_xfix_queries(m):
    await m.Member(
        first_name="Steve",
        last_name="Lorello",
        email="s@example.com",
        join_date=today,
        bio="Steve is a two-bit hacker who loves Redis.",
        address=m.Address(
            address_line_1="42 foo bar lane",
            city="Satellite Beach",
            state="FL",
            country="USA",
            postal_code="32999",
        ),
        age=34,
    ).save()

    result = await m.Member.find(
        m.Member.first_name.startswith("Ste") and m.Member.first_name == "Steve"
    ).first()
    assert result.first_name == "Steve"

    result = await m.Member.find(
        m.Member.last_name.endswith("llo") and m.Member.first_name == "Steve"
    ).first()
    assert result.first_name == "Steve"

    result = await m.Member.find(
        m.Member.address.city.contains("llite") and m.Member.first_name == "Steve"
    ).first()
    assert result.first_name == "Steve"

    result = await m.Member.find(
        m.Member.bio % "tw*" and m.Member.first_name == "Steve"
    ).first()
    assert result.first_name == "Steve"

    result = await m.Member.find(
        m.Member.bio % "*cker" and m.Member.first_name == "Steve"
    ).first()
    assert result.first_name == "Steve"

    result = await m.Member.find(
        m.Member.bio % "*ack*" and m.Member.first_name == "Steve"
    ).first()
    assert result.first_name == "Steve"


@py_test_mark_asyncio
async def test_none():
    class ModelWithNoneDefault(JsonModel, index=True):
        test: Optional[str] = Field(index=True, default=None)

    class ModelWithStringDefault(JsonModel, index=True):
        test: Optional[str] = Field(index=True, default="None")

    await Migrator().run()

    a = ModelWithNoneDefault()
    await a.save()
    res = await ModelWithNoneDefault.find(ModelWithNoneDefault.pk == a.pk).first()
    assert res.test is None

    b = ModelWithStringDefault()
    await b.save()
    res = await ModelWithStringDefault.find(ModelWithStringDefault.pk == b.pk).first()
    assert res.test == "None"


@py_test_mark_asyncio
async def test_update_validation():
    class Embedded(EmbeddedJsonModel, index=True):
        price: float
        name: str = Field(index=True)

    class TestUpdatesClass(JsonModel, index=True):
        name: str
        age: int
        embedded: Embedded

    await Migrator().run()
    embedded = Embedded(price=3.14, name="foo")
    t = TestUpdatesClass(name="str", age=42, embedded=embedded)
    await t.save()

    update_dict = dict()
    update_dict["age"] = "foo"
    with pytest.raises(ValidationError):
        await t.update(**update_dict)

    t.age = 42
    update_dict.clear()
    update_dict["embedded"] = "hello"
    with pytest.raises(ValidationError):
        await t.update(**update_dict)

    rematerialized = await TestUpdatesClass.find(TestUpdatesClass.pk == t.pk).first()
    assert rematerialized.age == 42


@py_test_mark_asyncio
async def test_model_with_dict():
    class EmbeddedJsonModelWithDict(EmbeddedJsonModel, index=True):
        data: Dict

    class ModelWithDict(JsonModel, index=True):
        embedded_model: EmbeddedJsonModelWithDict
        info: Dict

    await Migrator().run()
    d = dict()
    inner_dict = dict()
    d["foo"] = "bar"
    inner_dict["bar"] = "foo"
    embedded_model = EmbeddedJsonModelWithDict(data=inner_dict)
    item = ModelWithDict(info=d, embedded_model=embedded_model)
    await item.save()

    rematerialized = await ModelWithDict.find(ModelWithDict.pk == item.pk).first()
    assert rematerialized.pk == item.pk
    assert rematerialized.info["foo"] == "bar"
    assert rematerialized.embedded_model.data["bar"] == "foo"


@py_test_mark_asyncio
async def test_boolean():
    class Example(JsonModel, index=True):
        b: bool = Field(index=True)
        d: datetime.date = Field(index=True)
        name: str = Field(index=True)

    await Migrator().run()

    ex = Example(b=True, name="steve", d=datetime.date.today())
    exFalse = Example(b=False, name="foo", d=datetime.date.today())
    await ex.save()
    await exFalse.save()
    res = await Example.find(Example.b == True).first()
    assert res.name == "steve"

    res = await Example.find(Example.b == False).first()
    assert res.name == "foo"

    res = await Example.find(Example.d == ex.d and Example.b == True).first()
    assert res.name == ex.name


@py_test_mark_asyncio
async def test_int_pk():
    class ModelWithIntPk(JsonModel, index=True):
        my_id: int = Field(index=True, primary_key=True)

    await Migrator().run()
    await ModelWithIntPk(my_id=42).save()

    m = await ModelWithIntPk.find(ModelWithIntPk.my_id == 42).first()
    assert m.my_id == 42


@py_test_mark_asyncio
async def test_pagination():
    class Test(JsonModel, index=True):
        id: str = Field(primary_key=True, index=True)
        num: int = Field(sortable=True, index=True)

        @classmethod
        async def get_page(cls, offset, limit):
            return await cls.find().sort_by("num").page(limit=limit, offset=offset)

    await Migrator().run()

    pipe = Test.Meta.database.pipeline()
    for i in range(0, 1000):
        await Test(num=i, id=str(i)).save(pipeline=pipe)

    await pipe.execute()
    res = await Test.get_page(100, 100)
    assert len(res) == 100
    assert res[0].num == 100
    res = await Test.get_page(10, 30)
    assert len(res) == 30
    assert res[0].num == 10


@py_test_mark_asyncio
async def test_literals(key_prefix, redis):
    from typing import Literal

    class TestLiterals(JsonModel, index=True):
        flavor: Literal["apple", "pumpkin"] = Field(index=True, default="apple")

        class Meta:
            global_key_prefix = key_prefix
            database = redis

    schema = TestLiterals.redisearch_schema()

    expected_key_prefix = TestLiterals.make_key(
        TestLiterals._meta.primary_key_pattern.format(pk="")
    )
    assert schema == (
        f"ON JSON PREFIX 1 {expected_key_prefix} SCHEMA $.pk AS pk TAG SEPARATOR | "
        "$.flavor AS flavor TAG SEPARATOR |"
    )
    await Migrator().run()
    item = TestLiterals(flavor="pumpkin")
    await item.save()
    rematerialized = await TestLiterals.find(TestLiterals.flavor == "pumpkin").first()
    assert rematerialized.pk == item.pk


@py_test_mark_asyncio
async def test_two_false_pks():
    from pydantic_core import PydanticUndefined as Undefined

    class SomeModel(JsonModel):
        field1: str = Field(index=True, primary_key=Undefined)
        field2: str = Field(index=True, primary_key=Undefined)

    SomeModel(field1="foo", field2="bar")


@py_test_mark_asyncio
async def test_child_class_expression_proxy():
    # https://github.com/redis/redis-om-python/issues/669 seeing weird issue with child classes initializing all their undefined members as ExpressionProxies
    class Model(JsonModel):
        first_name: str
        last_name: str
        age: int = Field(default=18)
        bio: Optional[str] = Field(default=None)

    class Child(Model, index=True):
        is_new: bool = Field(default=True)

    await Migrator().run()
    m = Child(first_name="Steve", last_name="Lorello")
    await m.save()
    print(m.age)
    assert m.age == 18

    rematerialized = await Child.find(Child.pk == m.pk).first()

    assert rematerialized.age == 18
    assert rematerialized.age != 19
    assert rematerialized.bio is None


@py_test_mark_asyncio
async def test_child_class_expression_proxy_with_mixin():
    class Model(RedisModel, abc.ABC):
        first_name: str
        last_name: str
        age: int = Field(default=18)
        bio: Optional[str] = Field(default=None)

    class Child(Model, JsonModel, index=True):
        is_new: bool = Field(default=True)

    await Migrator().run()
    m = Child(first_name="Steve", last_name="Lorello")
    await m.save()

    assert m.age == 18

    rematerialized = await Child.find(Child.pk == m.pk).first()

    assert rematerialized.age == 18
    assert rematerialized.age != 19
    assert rematerialized.bio is None


@py_test_mark_asyncio
async def test_merged_model_error():
    class Player(EmbeddedJsonModel, index=True):
        username: str = Field(index=True)

    class Game(JsonModel, index=True):
        player1: Optional[Player]
        player2: Optional[Player]

    q = Game.find(
        (Game.player1.username == "username") | (Game.player2.username == "username")
    )
    print(q.query)
    assert q.query == "(@player1_username:{username})| (@player2_username:{username})"


@py_test_mark_asyncio
async def test_model_validate_uses_default_values():

    class ChildCls:
        def __init__(self, first_name: str, other_name: str):
            self.first_name = first_name
            self.other_name = other_name

    class Model(JsonModel):
        first_name: str
        age: int = Field(default=18)
        bio: Optional[str] = Field(default=None)

    class Child(Model):
        other_name: str

    child_dict = {"first_name": "Anna", "other_name": "Maria"}
    child_cls = ChildCls(**child_dict)

    child_ctor = Child(**child_dict)

    assert child_ctor.first_name == "Anna"
    assert child_ctor.age == 18
    assert child_ctor.bio is None
    assert child_ctor.other_name == "Maria"

    child_validate = Child.model_validate(child_cls, from_attributes=True)

    assert child_validate.first_name == "Anna"
    assert child_validate.age == 18
    assert child_validate.bio is None
    assert child_validate.other_name == "Maria"


@py_test_mark_asyncio
async def test_model_raises_error_if_inherited_from_indexed_model():
    class Model(JsonModel, index=True):
        pass

    with pytest.raises(RedisModelError):

        class Child(Model, index=True):
            pass


@py_test_mark_asyncio
async def test_model_inherited_from_indexed_model():
    class Model(JsonModel, index=True):
        name: str = "Steve"

    class Child(Model):
        pass

    assert issubclass(Child, Model)

    child = Child(name="John")

    assert child.name == "John"


@py_test_mark_asyncio
async def test_non_indexed_model_raises_error_on_save():
    class Model(JsonModel):
        pass

    with pytest.raises(RedisModelError):
        model = Model()
        await model.save()


@py_test_mark_asyncio
async def test_model_with_alias_can_be_searched(key_prefix, redis):
    class Model(JsonModel, index=True):
        first_name: str = Field(alias="firstName", index=True)
        last_name: str = Field(alias="lastName")

        class Meta:
            global_key_prefix = key_prefix
            database = redis

    await Migrator().run()

    model = Model(first_name="Steve", last_name="Lorello")
    await model.save()

    rematerialized = await Model.find(Model.first_name == "Steve").first()
    assert rematerialized.pk == model.pk


@py_test_mark_asyncio
async def test_can_search_on_coordinates(key_prefix, redis):
    class Location(JsonModel, index=True):
        coordinates: Coordinates = Field(index=True)

        class Meta:
            global_key_prefix = key_prefix
            database = redis

    await Migrator().run()

    latitude = 45.5231
    longitude = -122.6765

    loc = Location(coordinates=(latitude, longitude))

    await loc.save()

    rematerialized: Location = await Location.find(
        Location.coordinates
        == GeoFilter(longitude=longitude, latitude=latitude, radius=10, unit="mi")
    ).first()

    assert rematerialized.pk == loc.pk
    assert rematerialized.coordinates.latitude == latitude
    assert rematerialized.coordinates.longitude == longitude


@py_test_mark_asyncio
async def test_does_not_return_coordinates_if_outside_radius(key_prefix, redis):
    class Location(JsonModel, index=True):
        coordinates: Coordinates = Field(index=True)

        class Meta:
            global_key_prefix = key_prefix
            database = redis

    await Migrator().run()

    latitude = 45.5231
    longitude = -122.6765

    loc = Location(coordinates=(latitude, longitude))

    await loc.save()

    with pytest.raises(NotFoundError):
        await Location.find(
            Location.coordinates
            == GeoFilter(longitude=0, latitude=0, radius=0.1, unit="mi")
        ).first()


@py_test_mark_asyncio
async def test_does_not_return_coordinates_if_location_is_none(key_prefix, redis):
    class Location(JsonModel, index=True):
        coordinates: Optional[Coordinates] = Field(index=True)

        class Meta:
            global_key_prefix = key_prefix
            database = redis

    await Migrator().run()

    loc = Location(coordinates=None)

    await loc.save()

    with pytest.raises(NotFoundError):
        await Location.find(
            Location.coordinates
            == GeoFilter(longitude=0, latitude=0, radius=0.1, unit="mi")
        ).first()


@py_test_mark_asyncio
async def test_can_search_on_multiple_fields_with_geo_filter(key_prefix, redis):
    class Location(JsonModel, index=True):
        coordinates: Coordinates = Field(index=True)
        name: str = Field(index=True)

        class Meta:
            global_key_prefix = key_prefix
            database = redis

    await Migrator().run()

    latitude = 45.5231
    longitude = -122.6765

    loc1 = Location(coordinates=(latitude, longitude), name="Portland")
    # Offset by 0.01 degrees (~1.1 km at this latitude) to create a nearby location
    # This ensures "Nearby" is within the 10 mile search radius but not at the exact same location
    loc2 = Location(coordinates=(latitude + 0.01, longitude + 0.01), name="Nearby")

    await loc1.save()
    await loc2.save()

    rematerialized: List[Location] = await Location.find(
        (
            Location.coordinates
            == GeoFilter(longitude=longitude, latitude=latitude, radius=10, unit="mi")
        )
        & (Location.name == "Portland")
    ).all()

    assert len(rematerialized) == 1
    assert rematerialized[0].pk == loc1.pk


@py_test_mark_asyncio
async def test_tag_field_sortability(key_prefix, redis):
    """Regression test: TAG fields can now be sortable."""

    class Product(JsonModel, index=True):
        name: str = Field(index=True, sortable=True)  # TAG field with sortable
        category: str = Field(index=True, sortable=True)  # TAG field with sortable
        price: int = Field(index=True, sortable=True)  # NUMERIC field with sortable
        tags: List[str] = Field(
            index=True, sortable=True
        )  # TAG field (list) with sortable

        class Meta:
            global_key_prefix = key_prefix
            database = redis

    # Verify schema includes SORTABLE for TAG fields
    schema = Product.redisearch_schema()
    assert "name TAG SEPARATOR | SORTABLE" in schema
    assert "category TAG SEPARATOR | SORTABLE" in schema
    assert "tags TAG SEPARATOR | SORTABLE" in schema

    await Migrator().run()

    # Create test data
    product1 = Product(
        name="Zebra", category="Animals", price=100, tags=["wild", "africa"]
    )
    product2 = Product(name="Apple", category="Fruits", price=50, tags=["red", "sweet"])
    product3 = Product(
        name="Banana", category="Fruits", price=30, tags=["yellow", "sweet"]
    )

    await product1.save()
    await product2.save()
    await product3.save()

    # Test sorting by TAG field (name)
    results = await Product.find().sort_by("name").all()
    assert results == [product2, product3, product1]  # Apple, Banana, Zebra

    # Test reverse sorting by TAG field (name)
    results = await Product.find().sort_by("-name").all()
    assert results == [product1, product3, product2]  # Zebra, Banana, Apple

    # Test sorting by TAG field (category) with filter
    results = await Product.find(Product.category == "Fruits").sort_by("name").all()
    assert results == [product2, product3]  # Apple, Banana

    # Test sorting by NUMERIC field still works
    results = await Product.find().sort_by("price").all()
    assert results == [product3, product2, product1]  # 30, 50, 100


@py_test_mark_asyncio
async def test_save_nx_only_saves_if_not_exists(m, address):
    """Test that save(nx=True) only saves if the key doesn't exist."""
    await Migrator().run()

    member = m.Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today,
        age=38,
        address=address,
    )

    # First save should succeed with nx=True
    result = await member.save(nx=True)
    assert result is not None
    assert result.pk == member.pk

    # Second save with same pk should return None (key exists)
    member2 = m.Member(
        pk=member.pk,
        first_name="Different",
        last_name="Name",
        email="b@example.com",
        join_date=today,
        age=25,
        address=address,
    )
    result = await member2.save(nx=True)
    assert result is None

    # Verify original data is unchanged
    fetched = await m.Member.get(member.pk)
    assert fetched.first_name == "Andrew"


@py_test_mark_asyncio
async def test_save_xx_only_saves_if_exists(m, address):
    """Test that save(xx=True) only saves if the key already exists."""
    await Migrator().run()

    member = m.Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today,
        age=38,
        address=address,
    )

    # First save with xx=True should return None (key doesn't exist)
    result = await member.save(xx=True)
    assert result is None

    # Save without flags to create the key
    await member.save()

    # Now update with xx=True should succeed
    member.first_name = "Updated"
    result = await member.save(xx=True)
    assert result is not None

    # Verify data was updated
    fetched = await m.Member.get(member.pk)
    assert fetched.first_name == "Updated"


@py_test_mark_asyncio
async def test_save_nx_xx_mutually_exclusive(m, address):
    """Test that save() raises ValueError if both nx and xx are True."""
    await Migrator().run()

    member = m.Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today,
        age=38,
        address=address,
    )

    with pytest.raises(ValueError, match="Cannot specify both nx and xx"):
        await member.save(nx=True, xx=True)


@py_test_mark_asyncio
async def test_save_nx_with_pipeline(m, address):
    """Test that save(nx=True) works with pipeline."""
    await Migrator().run()

    member1 = m.Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today,
        age=38,
        address=address,
    )
    member2 = m.Member(
        first_name="Kim",
        last_name="Brookins",
        email="k@example.com",
        join_date=today,
        age=34,
        address=address,
    )

    # Save both with nx=True via pipeline
    async with m.Member.db().pipeline(transaction=True) as pipe:
        await member1.save(pipeline=pipe, nx=True)
        await member2.save(pipeline=pipe, nx=True)
        await pipe.execute()

    # Verify both were saved
    fetched1 = await m.Member.get(member1.pk)
    fetched2 = await m.Member.get(member2.pk)
    assert fetched1.first_name == "Andrew"
    assert fetched2.first_name == "Kim"


@py_test_mark_asyncio
async def test_schema_for_fields_does_not_modify_dict_during_iteration(m):
    """
    Regression test for GitHub issue #763.

    In Python 3.14, iterating over cls.__dict__.items() directly can raise
    RuntimeError: dictionary changed size during iteration. This test verifies
    that JsonModel.schema_for_fields() works without raising this error by
    iterating over annotation keys and looking up in __dict__ individually.
    """
    # This should not raise RuntimeError on Python 3.14+
    schema = m.Member.schema_for_fields()

    # Verify the schema is generated correctly
    assert isinstance(schema, list)
    assert len(schema) > 0

    # Verify schema contains expected fields
    schema_str = " ".join(schema)
    assert "first_name" in schema_str
    assert "last_name" in schema_str


@py_test_mark_asyncio
async def test_schema_for_fields_with_indexed_fields(key_prefix, redis):
    """Test schema_for_fields includes all indexed field types correctly."""

    class TestIndexedFields(JsonModel, index=True):
        text_field: str = Field(index=True)
        numeric_field: int = Field(index=True)
        tag_field: str = Field(index=True)
        sortable_field: str = Field(index=True, sortable=True)
        fulltext_field: str = Field(full_text_search=True)

        class Meta:
            global_key_prefix = key_prefix
            database = redis

    schema = TestIndexedFields.schema_for_fields()
    schema_str = " ".join(schema)

    # All indexed fields should appear in schema
    assert "text_field" in schema_str
    assert "numeric_field" in schema_str
    assert "tag_field" in schema_str
    assert "sortable_field" in schema_str
    assert "fulltext_field" in schema_str
    assert "SORTABLE" in schema_str


@py_test_mark_asyncio
async def test_schema_for_fields_with_optional_fields(key_prefix, redis):
    """Test schema_for_fields handles Optional fields correctly."""

    class TestOptionalFields(JsonModel, index=True):
        required_field: str = Field(index=True)
        optional_field: Optional[str] = Field(index=True, default=None)
        optional_with_default: Optional[int] = Field(index=True, default=42)

        class Meta:
            global_key_prefix = key_prefix
            database = redis

    schema = TestOptionalFields.schema_for_fields()
    schema_str = " ".join(schema)

    assert "required_field" in schema_str
    assert "optional_field" in schema_str
    assert "optional_with_default" in schema_str


@py_test_mark_asyncio
async def test_schema_for_fields_with_inherited_fields(key_prefix, redis):
    """Test schema_for_fields correctly includes inherited fields."""

    class BaseModel(JsonModel):
        base_field: str = Field(index=True)

        class Meta:
            global_key_prefix = key_prefix
            database = redis

    class ChildModel(BaseModel, index=True):
        child_field: str = Field(index=True)

    schema = ChildModel.schema_for_fields()
    schema_str = " ".join(schema)

    # Both base and child fields should be in schema
    assert "base_field" in schema_str
    assert "child_field" in schema_str


@py_test_mark_asyncio
async def test_schema_for_fields_with_embedded_model(key_prefix, redis):
    """Test schema_for_fields handles embedded models."""

    class EmbeddedAddress(EmbeddedJsonModel, index=True):
        city: str = Field(index=True)
        zip_code: str = Field(index=True)

    class PersonWithAddress(JsonModel, index=True):
        name: str = Field(index=True)
        address: EmbeddedAddress

        class Meta:
            global_key_prefix = key_prefix
            database = redis

    schema = PersonWithAddress.schema_for_fields()
    schema_str = " ".join(schema)

    # Main field and embedded fields should be in schema
    assert "name" in schema_str
    assert "city" in schema_str or "address" in schema_str


@py_test_mark_asyncio
async def test_schema_for_fields_with_list_fields(key_prefix, redis):
    """Test schema_for_fields handles List[str] fields."""

    class ModelWithList(JsonModel, index=True):
        tags: List[str] = Field(index=True)
        name: str = Field(index=True)

        class Meta:
            global_key_prefix = key_prefix
            database = redis

    schema = ModelWithList.schema_for_fields()
    schema_str = " ".join(schema)

    assert "tags" in schema_str
    assert "name" in schema_str


@py_test_mark_asyncio
async def test_schema_for_fields_field_info_has_annotation(key_prefix, redis):
    """Test that FieldInfo objects have their annotations set correctly."""
    from pydantic.fields import FieldInfo

    class TestModel(JsonModel, index=True):
        indexed_str: str = Field(index=True)
        indexed_int: int = Field(index=True)

        class Meta:
            global_key_prefix = key_prefix
            database = redis

    # Call schema_for_fields to trigger field processing
    TestModel.schema_for_fields()

    # Check that model_fields have annotations
    for name, field in TestModel.model_fields.items():
        if name == "pk":
            continue
        assert field.annotation is not None, f"Field {name} should have annotation"


@py_test_mark_asyncio
async def test_schema_for_fields_with_primary_key(key_prefix, redis):
    """Test schema_for_fields handles custom primary keys."""

    class ModelWithCustomPK(JsonModel, index=True):
        custom_id: str = Field(primary_key=True, index=True)
        name: str = Field(index=True)

        class Meta:
            global_key_prefix = key_prefix
            database = redis

    schema = ModelWithCustomPK.schema_for_fields()
    schema_str = " ".join(schema)

    assert "custom_id" in schema_str
    assert "name" in schema_str


@py_test_mark_asyncio
async def test_schema_for_fields_with_case_sensitive(key_prefix, redis):
    """Test schema_for_fields respects case_sensitive option."""

    class ModelWithCaseSensitive(JsonModel, index=True):
        case_sensitive_field: str = Field(index=True, case_sensitive=True)
        normal_field: str = Field(index=True)

        class Meta:
            global_key_prefix = key_prefix
            database = redis

    schema = ModelWithCaseSensitive.schema_for_fields()
    schema_str = " ".join(schema)

    assert "case_sensitive_field" in schema_str
    assert "normal_field" in schema_str
    # Case sensitive fields use CASESENSITIVE in schema
    assert "CASESENSITIVE" in schema_str


@py_test_mark_asyncio
async def test_bytes_field_with_binary_data(key_prefix, redis):
    """Test that bytes fields can store arbitrary binary data including non-UTF8 bytes.

    Regression test for GitHub issue #779: bytes fields failed with UnicodeDecodeError
    when storing actual binary data (non-UTF8 bytes).
    """

    class FileJson(JsonModel, index=True):
        filename: str = Field(index=True)
        content: bytes

        class Meta:
            global_key_prefix = key_prefix
            database = redis

    await Migrator().run()

    # Test with binary data that is NOT valid UTF-8 (PNG header)
    binary_content = b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR"

    f = FileJson(filename="image.png", content=binary_content)
    await f.save()

    # Retrieve and verify
    retrieved = await FileJson.get(f.pk)
    assert retrieved.content == binary_content
    assert retrieved.filename == "image.png"

    # Test with null bytes and other non-printable characters
    null_content = b"\x00\x01\x02\x03\xff\xfe\xfd"
    f2 = FileJson(filename="binary.bin", content=null_content)
    await f2.save()

    retrieved2 = await FileJson.get(f2.pk)
    assert retrieved2.content == null_content


@py_test_mark_asyncio
async def test_optional_bytes_field(key_prefix, redis):
    """Test that Optional[bytes] fields work correctly."""
    from typing import Optional

    class Attachment(JsonModel, index=True):
        name: str = Field(index=True)
        data: Optional[bytes] = None

        class Meta:
            global_key_prefix = key_prefix
            database = redis

    await Migrator().run()

    # Without data
    a1 = Attachment(name="empty")
    await a1.save()
    r1 = await Attachment.get(a1.pk)
    assert r1.data is None

    # With binary data
    a2 = Attachment(name="with_data", data=b"\x89PNG\x00\xff")
    await a2.save()
    r2 = await Attachment.get(a2.pk)
    assert r2.data == b"\x89PNG\x00\xff"


@py_test_mark_asyncio
async def test_bytes_field_in_embedded_model(key_prefix, redis):
    """Test that bytes fields work in embedded models."""

    class FileData(EmbeddedJsonModel):
        content: bytes
        mime_type: str

    class Document(JsonModel, index=True):
        name: str = Field(index=True)
        file: FileData

        class Meta:
            global_key_prefix = key_prefix
            database = redis

    await Migrator().run()

    binary_content = b"\x89PNG\r\n\x1a\n\x00\x00"
    doc = Document(
        name="test.png",
        file=FileData(content=binary_content, mime_type="image/png"),
    )
    await doc.save()

    retrieved = await Document.get(doc.pk)
    assert retrieved.file.content == binary_content
    assert retrieved.file.mime_type == "image/png"


@py_test_mark_asyncio
async def test_custom_primary_key_pk_property(key_prefix, redis):
    """Test that .pk returns the actual value when using a custom primary key.

    Regression test for GitHub issue #570: accessing .pk on a model with
    custom primary_key=True returned an ExpressionProxy instead of the value.
    """

    class ModelWithCustomPK(JsonModel, index=True):
        x: int = Field(primary_key=True)
        name: str

        class Meta:
            global_key_prefix = key_prefix
            database = redis

    await Migrator().run()

    instance = ModelWithCustomPK(x=42, name="test")

    # pk should return the actual value, not an ExpressionProxy
    assert instance.pk == 42
    assert not isinstance(instance.pk, ExpressionProxy)

    # The custom field should also work for queries
    await instance.save()
    retrieved = await ModelWithCustomPK.get(42)
    assert retrieved.pk == 42
    assert retrieved.x == 42
    assert retrieved.name == "test"


@py_test_mark_asyncio
async def test_jsonmodel_vector_field_with_list(key_prefix, redis):
    """Test that JsonModel allows list[float] fields with vector_options.

    Regression test for GitHub issue #656: JsonModel with list[float] vector
    field threw AttributeError: type object 'float' has no attribute '__origin__'.
    """
    vector_options = VectorFieldOptions.flat(
        type=VectorFieldOptions.TYPE.FLOAT32,
        dimension=4,
        distance_metric=VectorFieldOptions.DISTANCE_METRIC.COSINE,
    )

    class Article(EmbeddedJsonModel):
        title: str

    class Group(JsonModel, index=True):
        articles: List[Article]
        tender_text: str = Field(index=False)
        tender_embedding: list[float] = Field(index=True, vector_options=vector_options)

        class Meta:
            global_key_prefix = key_prefix
            database = redis

    await Migrator().run()

    # Create and save a document with a vector
    doc = Group(
        articles=[Article(title="Test Article")],
        tender_text="Sample text",
        tender_embedding=[0.1, 0.2, 0.3, 0.4],
    )
    await doc.save()

    # Retrieve and verify
    retrieved = await Group.get(doc.pk)
    assert retrieved.tender_text == "Sample text"
    assert len(retrieved.articles) == 1
    assert retrieved.articles[0].title == "Test Article"
