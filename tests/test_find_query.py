# type: ignore

import abc
import dataclasses
import datetime
import decimal
import uuid
from collections import namedtuple
from typing import Dict, List, Optional, Set, Union
from unittest import mock

import pytest
import pytest_asyncio

from aredis_om import (
    EmbeddedJsonModel,
    Field,
    FindQuery,
    HashModel,
    JsonModel,
    Migrator,
    NotFoundError,
    QueryNotSupportedError,
    RedisModelError,
)

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

    class Note(EmbeddedJsonModel):
        # TODO: This was going to be a full-text search example, but
        #  we can't index embedded documents for full-text search in
        #  the preview release.
        description: str = Field(index=True)
        created_on: datetime.datetime

    class Address(EmbeddedJsonModel):
        address_line_1: str
        address_line_2: Optional[str] = None
        city: str = Field(index=True)
        state: str
        country: str
        postal_code: str = Field(index=True)
        note: Optional[Note] = None

    class Item(EmbeddedJsonModel):
        price: decimal.Decimal
        name: str = Field(index=True)

    class Order(EmbeddedJsonModel):
        items: List[Item]
        created_on: datetime.datetime

    class Member(BaseJsonModel):
        first_name: str = Field(index=True, case_sensitive=True)
        last_name: str = Field(index=True)
        email: Optional[EmailStr] = Field(index=True, default=None)
        join_date: datetime.date
        age: Optional[PositiveInt] = Field(index=True, default=None)
        bio: Optional[str] = Field(index=True, full_text_search=True, default="")

        # Creates an embedded model.
        address: Address

        # Creates an embedded list of models.
        orders: Optional[List[Order]] = None

    await Migrator().run()

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
        bio="Andrew is a software engineer",
    )

    member2 = m.Member(
        first_name="Kim",
        last_name="Brookins",
        email="k@example.com",
        age=34,
        join_date=today,
        address=address,
        bio="Kim is a newer hire",
    )

    member3 = m.Member(
        first_name="Andrew",
        last_name="Smith",
        email="as@example.com",
        age=100,
        join_date=today,
        address=address,
        bio="Andrew is old",
    )

    await member1.save()
    await member2.save()
    await member3.save()

    yield member1, member2, member3


@py_test_mark_asyncio
async def test_find_query_in(members, m):
    # << means "in"
    member1, member2, member3 = members
    model_name, fq = await FindQuery(
        expressions=[m.Member.pk << [member1.pk, member2.pk, member3.pk]],
        model=m.Member,
    ).get_query()
    in_str = (
        "(@pk:{"
        + str(member1.pk)
        + "|"
        + str(member2.pk)
        + "|"
        + str(member3.pk)
        + "})"
    )
    assert fq == ["FT.SEARCH", model_name, in_str, "LIMIT", 0, 1000]


@py_test_mark_asyncio
async def test_find_query_not_in(members, m):
    # >> means "not in"
    member1, member2, member3 = members
    model_name, fq = await FindQuery(
        expressions=[m.Member.pk >> [member2.pk, member3.pk]], model=m.Member
    ).get_query()
    not_in_str = "-(@pk:{" + str(member2.pk) + "|" + str(member3.pk) + "})"
    assert fq == ["FT.SEARCH", model_name, not_in_str, "LIMIT", 0, 1000]


# experssion testing; (==, !=, <, <=, >, >=, |, &, ~)
@py_test_mark_asyncio
async def test_find_query_eq(m):
    model_name, fq = await FindQuery(
        expressions=[m.Member.first_name == "Andrew"], model=m.Member
    ).get_query()
    assert fq == ["FT.SEARCH", model_name, "@first_name:{Andrew}", "LIMIT", 0, 1000]


@py_test_mark_asyncio
async def test_find_query_ne(m):
    model_name, fq = await FindQuery(
        expressions=[m.Member.first_name != "Andrew"], model=m.Member
    ).get_query()
    assert fq == ["FT.SEARCH", model_name, "-(@first_name:{Andrew})", "LIMIT", 0, 1000]


@py_test_mark_asyncio
async def test_find_query_lt(m):
    model_name, fq = await FindQuery(
        expressions=[m.Member.age < 40], model=m.Member
    ).get_query()
    assert fq == ["FT.SEARCH", model_name, "@age:[-inf (40]", "LIMIT", 0, 1000]


@py_test_mark_asyncio
async def test_find_query_le(m):
    model_name, fq = await FindQuery(
        expressions=[m.Member.age <= 38], model=m.Member
    ).get_query()
    assert fq == ["FT.SEARCH", model_name, "@age:[-inf 38]", "LIMIT", 0, 1000]


@py_test_mark_asyncio
async def test_find_query_gt(m):
    model_name, fq = await FindQuery(
        expressions=[m.Member.age > 38], model=m.Member
    ).get_query()
    assert fq == ["FT.SEARCH", model_name, "@age:[(38 +inf]", "LIMIT", 0, 1000]


@py_test_mark_asyncio
async def test_find_query_ge(m):
    model_name, fq = await FindQuery(
        expressions=[m.Member.age >= 38], model=m.Member
    ).get_query()
    assert fq == ["FT.SEARCH", model_name, "@age:[38 +inf]", "LIMIT", 0, 1000]


# tests for sorting and text search with and, or, not
@py_test_mark_asyncio
async def test_find_query_sort(m):
    model_name, fq = await FindQuery(
        expressions=[m.Member.age > 0], model=m.Member, sort_fields=["age"]
    ).get_query()
    assert fq == [
        "FT.SEARCH",
        model_name,
        "@age:[(0 +inf]",
        "LIMIT",
        0,
        1000,
        "SORTBY",
        "age",
        "asc",
    ]


@py_test_mark_asyncio
async def test_find_query_sort_desc(m):
    model_name, fq = await FindQuery(
        expressions=[m.Member.age > 0], model=m.Member, sort_fields=["-age"]
    ).get_query()
    assert fq == [
        "FT.SEARCH",
        model_name,
        "@age:[(0 +inf]",
        "LIMIT",
        0,
        1000,
        "SORTBY",
        "age",
        "desc",
    ]


@py_test_mark_asyncio
async def test_find_query_text_search(m):
    model_name, fq = await FindQuery(
        expressions=[m.Member.bio == "test"], model=m.Member
    ).get_query()
    assert fq == ["FT.SEARCH", model_name, "@bio:{test}", "LIMIT", 0, 1000]


@py_test_mark_asyncio
async def test_find_query_text_search_and(m, members):
    model_name, fq = await FindQuery(
        expressions=[m.Member.age < 40, m.Member.first_name == "Andrew"], model=m.Member
    ).get_query()
    assert fq == [
        "FT.SEARCH",
        model_name,
        "(@age:[-inf (40]) (@first_name:{Andrew})",
        "LIMIT",
        0,
        1000,
    ]


@py_test_mark_asyncio
async def test_find_query_text_search_or(m, members):
    model_name, fq = await FindQuery(
        expressions=[(m.Member.age < 40) | (m.Member.first_name == "Andrew")],
        model=m.Member,
    ).get_query()
    assert fq == [
        "FT.SEARCH",
        model_name,
        "(@age:[-inf (40])| (@first_name:{Andrew})",
        "LIMIT",
        0,
        1000,
    ]


@py_test_mark_asyncio
async def test_find_query_text_search_not(m):
    model_name, fq = await FindQuery(
        expressions=[~(m.Member.first_name == "Andrew")], model=m.Member
    ).get_query()
    assert fq == ["FT.SEARCH", model_name, "-(@first_name:{Andrew})", "LIMIT", 0, 1000]


@py_test_mark_asyncio
async def test_find_query_text_search_not_and(m, members):
    model_name, fq = await FindQuery(
        expressions=[~((m.Member.first_name == "Andrew") & (m.Member.age < 40))],
        model=m.Member,
    ).get_query()
    assert fq == [
        "FT.SEARCH",
        model_name,
        "-((@first_name:{Andrew}) (@age:[-inf (40]))",
        "LIMIT",
        0,
        1000,
    ]


@py_test_mark_asyncio
async def test_find_query_text_search_not_or(m, members):
    model_name, fq = await FindQuery(
        expressions=[~((m.Member.first_name == "Andrew") | (m.Member.age < 40))],
        model=m.Member,
    ).get_query()
    assert fq == [
        "FT.SEARCH",
        model_name,
        "-((@first_name:{Andrew})| (@age:[-inf (40]))",
        "LIMIT",
        0,
        1000,
    ]


@py_test_mark_asyncio
async def test_find_query_text_search_not_or_and(m, members):
    model_name, fq = await FindQuery(
        expressions=[
            ~(
                ((m.Member.first_name == "Andrew") | (m.Member.age < 40))
                & (m.Member.last_name == "Brookins")
            )
        ],
        model=m.Member,
    ).get_query()
    assert fq == [
        "FT.SEARCH",
        model_name,
        "-(((@first_name:{Andrew})| (@age:[-inf (40])) (@last_name:{Brookins}))",
        "LIMIT",
        0,
        1000,
    ]


# text search operators; contains, startswith, endswith, fuzzy
@py_test_mark_asyncio
async def test_find_query_text_contains(m):
    model_name, fq = await FindQuery(
        expressions=[m.Member.first_name.contains("drew")], model=m.Member
    ).get_query()
    assert fq == ["FT.SEARCH", model_name, "(@first_name:{*drew*})", "LIMIT", 0, 1000]


@py_test_mark_asyncio
async def test_find_query_text_startswith(m):
    model_name, fq = await FindQuery(
        expressions=[m.Member.first_name.startswith("An")], model=m.Member
    ).get_query()
    assert fq == ["FT.SEARCH", model_name, "(@first_name:{An*})", "LIMIT", 0, 1000]


@py_test_mark_asyncio
async def test_find_query_text_endswith(m):
    model_name, fq = await FindQuery(
        expressions=[m.Member.first_name.endswith("ew")], model=m.Member
    ).get_query()
    assert fq == ["FT.SEARCH", model_name, "(@first_name:{*ew})", "LIMIT", 0, 1000]


@py_test_mark_asyncio
async def test_find_query_test_fuzzy(m):
    model_name, fq = await FindQuery(
        expressions=[m.Member.bio % "%newb%"], model=m.Member
    ).get_query()
    assert fq == ["FT.SEARCH", model_name, "@bio_fts:%newb%", "LIMIT", 0, 1000]


# limit, offset, page_size
@py_test_mark_asyncio
async def test_find_query_limit_one(m):
    model_name, fq = await FindQuery(
        expressions=[m.Member.first_name == "Andrew"], model=m.Member, limit=1
    ).get_query()
    assert fq == ["FT.SEARCH", model_name, "@first_name:{Andrew}", "LIMIT", 0, 1]


@py_test_mark_asyncio
async def test_find_query_limit_offset(m):
    model_name, fq = await FindQuery(
        expressions=[m.Member.first_name == "Andrew"], model=m.Member, limit=1, offset=1
    ).get_query()
    assert fq == ["FT.SEARCH", model_name, "@first_name:{Andrew}", "LIMIT", 1, 1]


@py_test_mark_asyncio
async def test_find_query_page_size(m):
    # note that this test in unintuitive.
    # page_size gets resolved in a while True loop that makes copies of the intial query and adds the limit and offset each time
    model_name, fq = await FindQuery(
        expressions=[m.Member.first_name == "Andrew"], model=m.Member, page_size=1
    ).get_query()
    assert fq == ["FT.SEARCH", model_name, "@first_name:{Andrew}", "LIMIT", 0, 1000]


@py_test_mark_asyncio
async def test_find_query_monster(m):
    # test monster query with everything everywhere all at once
    # including ors, nots, ands, less thans, greater thans, text search
    model_name, fq = await FindQuery(
        expressions=[
            ~(
                ((m.Member.first_name == "Andrew") | (m.Member.age < 40))
                & (
                    (
                        m.Member.last_name.contains("oo")
                        | ~(m.Member.email.startswith("z"))
                    )
                )
            )
        ],
        model=m.Member,
        limit=1,
        offset=1,
    ).get_query()
    assert fq == [
        "FT.SEARCH",
        model_name,
        "-(((@first_name:{Andrew})| (@age:[-inf (40])) (((@last_name:{*oo*}))| -((@email:{z*}))))",
        "LIMIT",
        1,
        1,
    ]
