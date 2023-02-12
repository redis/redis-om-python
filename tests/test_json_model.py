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
    EmbeddedJsonModel,
    Field,
    JsonModel,
    Migrator,
    NotFoundError,
    QueryNotSupportedError,
    RedisModelError,
)

# We need to run this check as sync code (during tests) even in async mode
# because we call it in the top-level module scope.
from redis_om import has_redis_json

from .conftest import py_test_mark_asyncio


if not has_redis_json():
    pytestmark = pytest.mark.skip

today = datetime.date.today()


@pytest_asyncio.fixture
async def m(key_prefix, redis):
    class BaseJsonModel(JsonModel, abc.ABC):
        class Meta:
            global_key_prefix = key_prefix

    class Note(EmbeddedJsonModel):
        # TODO: This was going to be a full-text search example, but
        #  we can't index embedded documents for full-text search in
        #  the preview release.
        description: str = Field(index=True)
        created_on: datetime.datetime

    class Address(EmbeddedJsonModel):
        address_line_1: str
        address_line_2: Optional[str]
        city: str = Field(index=True)
        state: str
        country: str
        postal_code: str = Field(index=True)
        note: Optional[Note]

    class Item(EmbeddedJsonModel):
        price: decimal.Decimal
        name: str = Field(index=True)

    class Order(EmbeddedJsonModel):
        items: List[Item]
        created_on: datetime.datetime

    class Member(BaseJsonModel):
        first_name: str = Field(index=True)
        last_name: str = Field(index=True)
        email: str = Field(index=True)
        join_date: datetime.date
        age: int = Field(index=True)
        bio: Optional[str] = Field(index=True, full_text_search=True, default="")

        # Creates an embedded model.
        address: Address

        # Creates an embedded list of models.
        orders: Optional[List[Order]]

    await Migrator().run()

    return namedtuple(
        "Models", ["BaseJsonModel", "Note", "Address", "Item", "Order", "Member"]
    )(BaseJsonModel, Note, Address, Item, Order, Member)


@pytest.fixture()
def address(m):
    yield m.Address(
        address_line_1="1 Main St.",
        city="Portland",
        state="OR",
        country="USA",
        postal_code=11111,
    )


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
    await Migrator().run()

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
    class City(JsonModel):
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
async def test_not_found(m):
    with pytest.raises(NotFoundError):
        # This ID does not exist.
        await m.Member.get(1000)


@py_test_mark_asyncio
async def test_list_field_limitations(m, redis):
    with pytest.raises(RedisModelError):

        class SortableTarotWitch(m.BaseJsonModel):
            # We support indexing lists of strings for quality and membership
            # queries. Sorting is not supported, but is planned.
            tarot_cards: List[str] = Field(index=True, sortable=True)

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

        class ReadingWithPrice(EmbeddedJsonModel):
            gold_coins_charged: int = Field(index=True)

        class TarotWitchWhoCharges(m.BaseJsonModel):
            tarot_cards: List[str] = Field(index=True)

            # The preview release does not support indexing numeric fields on models
            # found within a list or tuple. This is the same limitation that stops
            # us from indexing plain lists (or tuples) containing numeric values.
            # The fate of this feature is To Be Determined.
            readings: List[ReadingWithPrice]

    class TarotWitch(m.BaseJsonModel):
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

    class ValidMember(m.BaseJsonModel):
        address: Address

    address = Address(address_line_1="hey")
    member = ValidMember(address=address)
    await member.save()

    member2 = await ValidMember.get(member.pk)
    assert member2 == member
    assert member2.address.address_line_1 == "hey"


@py_test_mark_asyncio
async def test_allows_and_serializes_dicts(m):
    class ValidMember(m.BaseJsonModel):
        address: Dict[str, str]

    member = ValidMember(address={"address_line_1": "hey"})
    await member.save()

    member2 = await ValidMember.get(member.pk)
    assert member2 == member
    assert member2.address["address_line_1"] == "hey"


@py_test_mark_asyncio
async def test_allows_and_serializes_sets(m):
    class ValidMember(m.BaseJsonModel):
        friend_ids: Set[int]

    member = ValidMember(friend_ids={1, 2})
    await member.save()

    member2 = await ValidMember.get(member.pk)
    assert member2 == member
    assert member2.friend_ids == {1, 2}


@py_test_mark_asyncio
async def test_allows_and_serializes_lists(m):
    class ValidMember(m.BaseJsonModel):
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
    assert (
        m.Member.redisearch_schema()
        == f"ON JSON PREFIX 1 {key_prefix} SCHEMA $.pk AS pk TAG SEPARATOR | $.first_name AS first_name TAG SEPARATOR | $.last_name AS last_name TAG SEPARATOR | $.email AS email TAG SEPARATOR |  $.age AS age NUMERIC $.bio AS bio TAG SEPARATOR | $.bio AS bio_fts TEXT $.address.pk AS address_pk TAG SEPARATOR | $.address.city AS address_city TAG SEPARATOR | $.address.postal_code AS address_postal_code TAG SEPARATOR | $.address.note.pk AS address_note_pk TAG SEPARATOR | $.address.note.description AS address_note_description TAG SEPARATOR | $.orders[*].pk AS orders_pk TAG SEPARATOR | $.orders[*].items[*].pk AS orders_items_pk TAG SEPARATOR | $.orders[*].items[*].name AS orders_items_name TAG SEPARATOR |"
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
