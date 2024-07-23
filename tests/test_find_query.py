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
    JsonModel,
    Migrator,
    NotFoundError,
    QueryNotSupportedError,
    RedisModelError,
    FindQuery,
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
        bio="Kim does not work in tech",
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

# test model class and instantiate FindQuery
# 20 queries / expressions
""" 
@py_test_mark_asyncio
async def test_find_query1(members, m):
    member1, member2, member3 = members
    x = m.Member.find()
    # print(x.query)
    # result is "*"

@py_test_mark_asyncio
async def test_find_query2(members, m):
    member1, member2, member3 = members
    x = m.Member.find()
    # print(x._query)
    # result is "None"


@py_test_mark_asyncio
async def test_find_query3(members, m):
    member1, member2, member3 = members
    fq = FindQuery(expressions=[m.Member.pk >> [member2.pk, member3.pk]], model=m.Member)
    # print(fq)
    # result is "<aredis_om.model.model.FindQuery object at 0x103b44c40>"

@py_test_mark_asyncio
async def test_find_query4(members, m):
    member1, member2, member3 = members
    fq = FindQuery(expressions=[m.Member.pk << [member1.pk, member2.pk, member3.pk]], model=m.Member)
    # print(fq.query)
    # result is "(@pk:{01J33M1FMX4DHRMX16E4YAYCM3|01J33M1FN087RZVRZP6GN3BZZT|01J33M1FN1JNP0MXBRNANV5C88})"

@py_test_mark_asyncio
async def test_find_query5(members, m):
    member1, member2, member3 = members
    fq = FindQuery(expressions=[m.Member.pk << [member1.pk, member2.pk, member3.pk]], model=m.Member)
    # print(fq._query)
    # result is "None"

@py_test_mark_asyncio
async def test_find_query6(members, m):
    member1, member2, member3 = members
    fq = FindQuery(expressions=[m.Member.pk << [member1.pk, member2.pk, member3.pk]], model=m.Member)
    # print(fq.command_str_list)
    # result is []

@py_test_mark_asyncio
async def test_find_query7(members, m):
    member1, member2, member3 = members
    fq = await FindQuery(expressions=[m.Member.pk << [member1.pk, member2.pk, member3.pk]], model=m.Member).all()
    # print(fq.query)
    # result is AttributeError: 'list' object has no attribute 'query' """

# added get_query method and optional return_query_args to execute()
# now that we can actually get to the query, let's test what the query is when we add a filter

@py_test_mark_asyncio
async def test_find_query_in(members, m):
    member1, member2, member3 = members
    model_name, fq = await FindQuery(expressions=[m.Member.pk << [member1.pk, member2.pk, member3.pk]], model=m.Member).get_query()
    # print(fq)
    # result is ['FT.SEARCH', 'redis-om:testing:0.6121599113607783:tests.test_find_query.Member:index', '(@pk:{01J361ZHQQWHN9JTZD2FNX7E2P|01J361ZHQQG62Q2P19KW3CFHET|01J361ZHQQ03HH0WSH4NTM6T95})', 'LIMIT', 0, 1000]  
    in_str = "(@pk:{" + str(member1.pk) + "|" + str(member2.pk) + "|" + str(member3.pk) + "})"
    assert fq == ['FT.SEARCH', model_name, in_str, 'LIMIT', 0, 1000]

@py_test_mark_asyncio
async def test_find_query_not_in(members, m):
    member1, member2, member3 = members
    model_name, fq = await FindQuery(expressions=[m.Member.pk >> [member2.pk, member3.pk]], model=m.Member).get_query()
    # print(fq)
    # result is ['FT.SEARCH', 'redis-om:testing:0.6121599113607783:tests.test_find_query.Member:index', '-(@pk:{01J361ZHQQG62Q2P19KW3CFHET|01J361ZHQQ03HH0WSH4NTM6T95})', 'LIMIT', 0, 1000]
    not_in_str = "-(@pk:{" + str(member2.pk) + "|" + str(member3.pk) + "})"
    assert fq == ['FT.SEARCH', model_name, not_in_str, 'LIMIT', 0, 1000]

@py_test_mark_asyncio
async def test_find_query_eq(m):
    model_name, fq = await FindQuery(expressions=[m.Member.first_name == "Andrew"], model=m.Member).get_query()
    # print(fq) 
    # result is ['FT.SEARCH', 'redis-om:testing:0.6121599113607783:tests.test_find_query.Member:index', '@first_name:{Andrew}', 'LIMIT', 0, 1000]
    assert fq == ['FT.SEARCH', model_name, '@first_name:{Andrew}', 'LIMIT', 0, 1000]

@py_test_mark_asyncio
async def test_find_query_ne(m):
    model_name, fq = await FindQuery(expressions=[m.Member.first_name != "Andrew"], model=m.Member).get_query()
    # print(fq)
    # result is ['FT.SEARCH', 'redis-om:testing:0.491862029445422:tests.test_find_query.Member:index', '-(@first_name:{Andrew})', 'LIMIT', 0, 1000]
    assert fq == ['FT.SEARCH', model_name, '-(@first_name:{Andrew})', 'LIMIT', 0, 1000]

@py_test_mark_asyncio
async def test_find_query_lt(m):
    model_name, fq = await FindQuery(expressions=[m.Member.age < 40], model=m.Member).get_query()
    # print(fq)
    # result is ['FT.SEARCH', 'redis-om:testing:0.491862029445422:tests.test_find_query.Member:index', '@age:[0 40}', 'LIMIT', 0, 1000]
    assert fq == ['FT.SEARCH', model_name, '@age:[-inf (40]', 'LIMIT', 0, 1000]

@py_test_mark_asyncio
async def test_find_query_le(m):
    model_name, fq = await FindQuery(expressions=[m.Member.age <= 38], model=m.Member).get_query()
    # print(fq)
    # result is ['FT.SEARCH', 'redis-om:testing:0.491862029445422:tests.test_find_query.Member:index', '@age:[0 38]', 'LIMIT', 0, 1000]
    assert fq == ['FT.SEARCH', model_name, '@age:[-inf 38]', 'LIMIT', 0, 1000]

@py_test_mark_asyncio
async def test_find_query_gt(m):
    model_name, fq = await FindQuery(expressions=[m.Member.age > 38], model=m.Member).get_query()
    # print(fq)
    # result is ['FT.SEARCH', 'redis-om:testing:0.491862029445422:tests.test_find_query.Member:index', '@age:[(38 +inf}', 'LIMIT', 0, 1000]
    assert fq == ['FT.SEARCH', model_name, '@age:[(38 +inf]', 'LIMIT', 0, 1000]

@py_test_mark_asyncio
async def test_find_query_ge(m):
    model_name, fq = await FindQuery(expressions=[m.Member.age >= 38], model=m.Member).get_query()
    # print(fq)
    # result is ['FT.SEARCH', 'redis-om:testing:0.491862029445422:tests.test_find_query.Member:index', '@age:[38 +inf]', 'LIMIT', 0, 1000]
    assert fq == ['FT.SEARCH', model_name, '@age:[38 +inf]', 'LIMIT', 0, 1000]

@py_test_mark_asyncio
async def test_find_query_sort(m):
    model_name, fq = await FindQuery(expressions=[m.Member.age > 0], model=m.Member, sort_fields=["age"]).get_query()
    # print(fq)
    # result is ['FT.SEARCH', 'redis-om:testing:0.491862029445422:tests.test_find_query.Member:index', '@age:[(0 +inf]', 'LIMIT', 0, 1000, 'SORTBY', 'age', 'asc']
    assert fq == ['FT.SEARCH', model_name, '@age:[(0 +inf]', 'LIMIT', 0, 1000, 'SORTBY', 'age', 'asc']

@py_test_mark_asyncio
async def test_find_query_sort_desc(m):
    model_name, fq = await FindQuery(expressions=[m.Member.age > 0], model=m.Member, sort_fields=["-age"]).get_query()
    # print(fq)
    # result is ['FT.SEARCH', 'redis-om:testing:0.491862029445422:tests.test_find_query.Member:index', '@age:[(0 +inf]', 'LIMIT', 0, 1000, 'SORTBY', 'age', 'desc']
    assert fq == ['FT.SEARCH', model_name, '@age:[(0 +inf]', 'LIMIT', 0, 1000, 'SORTBY', 'age', 'desc']

@py_test_mark_asyncio
async def test_find_query_text_search(m):
    model_name, fq = await FindQuery(expressions=[m.Member.bio == "test"], model=m.Member).get_query()
    # print(fq)
    # result is ['FT.SEARCH', 'redis-om:testing:0.491862029445422:tests.test_find_query.Member:index', '@bio:{test}', 'LIMIT', 0, 1000]
    assert fq == ['FT.SEARCH', model_name, '@bio:{test}', 'LIMIT', 0, 1000]

@py_test_mark_asyncio
async def test_find_query_text_search_and(m, members):
    model_name, fq = await FindQuery(expressions=[m.Member.age < 40, m.Member.first_name == "Andrew"], model=m.Member).get_query()
    # member1, member2, member3 = members
    # query = m.Member.find(
    #     (m.Member.first_name == "Andrew")
    #     & (m.Member.age < 40)
    # )
    # assert await query.all() == [member1]
    
    # res = await m.Member.find((m.Member.age < 40) & (m.Member.first_name == "Andrew")).all()
    # print(fq)
    # result is ['FT.SEARCH', 'redis-om:testing:0.491862029445422:tests.test_find_query.Member:index', '(@age:[-inf (40]) @first_name:{Andrew}', 'LIMIT', 0, 1000]
    # print(res)
    assert fq == ['FT.SEARCH', model_name, '(@age:[-inf (40]) (@first_name:{Andrew})', 'LIMIT', 0, 1000]

@py_test_mark_asyncio
async def test_find_query_text_search_or(m, members):
    model_name, fq = await FindQuery(expressions=[(m.Member.age < 40) | (m.Member.first_name == "Andrew")], model=m.Member).get_query()
    # print(fq)
    # member1, member2, member3 = members
    # query = m.Member.find(
    #     (m.Member.first_name == "Andrew")
    #     | (m.Member.age < 40)
    # )
    # assert await query.all() == [member1, member2, member3]
    # result is ['FT.SEARCH', 'redis-om:testing:0.6510151538425774:tests.test_find_query.Member:index', '@bio:{test}', 'LIMIT', 0, 1000]
    assert fq == ['FT.SEARCH', model_name, '(@age:[-inf (40])| (@first_name:{Andrew})', 'LIMIT', 0, 1000]

@py_test_mark_asyncio
async def test_find_query_text_search_not(m):
    model_name, fq = await FindQuery(expressions=[~(m.Member.first_name == "Andrew")], model=m.Member).get_query()
    # print(fq)
    # result is ['FT.SEARCH', 'redis-om:testing:0.6510151538425774:tests.test_find_query.Member:index', '-(@first_name:{Andrew})', 'LIMIT', 0, 1000]
    assert fq == ['FT.SEARCH', model_name, '-(@first_name:{Andrew})', 'LIMIT', 0, 1000]

@py_test_mark_asyncio
async def test_find_query_text_search_not_and(m, members):
    model_name, fq = await FindQuery(expressions=[~((m.Member.first_name == "Andrew") & (m.Member.age < 40))], model=m.Member).get_query()
    # print(fq)
    # result is ['FT.SEARCH', 'redis-om:testing:0.6510151538425774:tests.test_find_query.Member:index', '-(@age:[-inf (40]) @first_name:{Andrew}', 'LIMIT', 0, 1000]
    assert fq == ['FT.SEARCH', model_name, '-((@first_name:{Andrew}) (@age:[-inf (40]))', 'LIMIT', 0, 1000]

@py_test_mark_asyncio
async def test_find_query_text_search_not_or(m, members):
    model_name, fq = await FindQuery(expressions=[~((m.Member.first_name == "Andrew") | (m.Member.age < 40))], model=m.Member).get_query()
    # print(fq)
    # result is ['FT.SEARCH', 'redis-om:testing:0.6510151538425774:tests.test_find_query.Member:index', '-(@age:[-inf (40])| (@first_name:{Andrew})', 'LIMIT', 0, 1000]
    assert fq == ['FT.SEARCH', model_name, '-((@first_name:{Andrew})| (@age:[-inf (40]))', 'LIMIT', 0, 1000]

@py_test_mark_asyncio
async def test_find_query_text_search_not_or_and(m, members):
    model_name, fq = await FindQuery(expressions=[~(((m.Member.first_name == "Andrew") | (m.Member.age < 40)) & (m.Member.last_name == "Brookins"))], model=m.Member).get_query()
    # print(fq)
    # result is ['FT.SEARCH', 'redis-om:testing:0.6510151538425774:tests.test_find_query.Member:index', '-((@first_name:{Andrew})| (@age:[-inf (40]) (@last_name:{Brookins}))', 'LIMIT', 0, 1000]
    assert fq == ['FT.SEARCH', model_name, '-(((@first_name:{Andrew})| (@age:[-inf (40])) (@last_name:{Brookins}))', 'LIMIT', 0, 1000]

@py_test_mark_asyncio
async def test_find_query_text_contains(m):
    model_name, fq = await FindQuery(expressions=[m.Member.first_name.contains("drew")], model=m.Member).get_query()
    # print(fq)
    # result is ['FT.SEARCH', 'redis-om:testing:0.6510151538425774:tests.test_find_query.Member:index', '@first_name:{*Andrew*}', 'LIMIT', 0, 1000]
    assert fq == ['FT.SEARCH', model_name, '(@first_name:{*drew*})', 'LIMIT', 0, 1000]

@py_test_mark_asyncio
async def test_find_query_text_startswith(m):
    model_name, fq = await FindQuery(expressions=[m.Member.first_name.startswith("An")], model=m.Member).get_query()
    # print(fq)
    # result is ['FT.SEARCH', 'redis-om:testing:0.6510151538425774:tests.test_find_query.Member:index', '@first_name:{An*}', 'LIMIT', 0, 1000]
    assert fq == ['FT.SEARCH', model_name, '(@first_name:{An*})', 'LIMIT', 0, 1000]

# test that return_fields limits the fields returned
@py_test_mark_asyncio
async def test_find_query_return_fields(m):
    model_name, fq = await FindQuery(expressions=[m.Member.first_name == "Andrew"], model=m.Member, return_fields=["first_name"]).get_query()
    # print(fq)
    # result is ['FT.SEARCH', 'redis-om:testing:0.6510151538425774:tests.test_find_query.Member:index', '@first_name:{Andrew}', 'LIMIT', 0, 1000, 'RETURN', 1, 'first_name']
    # assert fq == ['FT.SEARCH', model_name, '@first_name:{Andrew}', 'LIMIT', 0, 1000, 'RETURN', 1, 'first_name']