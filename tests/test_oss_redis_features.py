import abc
import datetime
import decimal
from collections import namedtuple
from typing import Optional

import pytest
import pytest_asyncio
from pydantic import ValidationError

from aredis_om import HashModel, Migrator, NotFoundError, RedisModelError

from .conftest import py_test_mark_asyncio


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
        first_name: str
        last_name: str
        email: str
        join_date: datetime.date
        age: int

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
    await member1.save()
    await member2.save()
    await member3.save()

    yield member1, member2, member3


@py_test_mark_asyncio
async def test_all_keys(members, m):
    pks = sorted([pk async for pk in await m.Member.all_pks()])
    assert len(pks) == 3
    assert pks == sorted([m.pk for m in members])


@py_test_mark_asyncio
async def test_not_found(m):
    with pytest.raises(NotFoundError):
        # This ID does not exist.
        await m.Member.get(1000)


def test_validates_required_fields(m):
    # Raises ValidationError: last_name is required
    # TODO: Test the error value
    with pytest.raises(ValidationError):
        m.Member(first_name="Andrew", zipcode="97086", join_date=today)


def test_validates_field(m):
    # Raises ValidationError: join_date is not a date
    # TODO: Test the error value
    with pytest.raises(ValidationError):
        m.Member(first_name="Andrew", last_name="Brookins", join_date="yesterday")


def test_validation_passes(m):
    member = m.Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today,
        age=38,
    )
    assert member.first_name == "Andrew"


@py_test_mark_asyncio
async def test_saves_model_and_creates_pk(m):
    member = m.Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today,
        age=38,
    )
    # Save a model instance to Redis
    await member.save()

    member2 = await m.Member.get(member.pk)
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


@py_test_mark_asyncio
async def test_saves_many(m):
    member1 = m.Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today,
        age=38,
    )
    member2 = m.Member(
        first_name="Kim",
        last_name="Brookins",
        email="k@example.com",
        join_date=today,
        age=34,
    )
    members = [member1, member2]
    result = await m.Member.add(members)
    assert result == [member1, member2]

    assert await m.Member.get(pk=member1.pk) == member1
    assert await m.Member.get(pk=member2.pk) == member2


@py_test_mark_asyncio
async def test_updates_a_model(members, m):
    member1, member2, member3 = members
    await member1.update(last_name="Smith")
    member = await m.Member.get(member1.pk)
    assert member.last_name == "Smith"
