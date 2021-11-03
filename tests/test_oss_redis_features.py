import abc
import datetime
import decimal
from collections import namedtuple
from typing import Optional
from unittest import mock

import pytest
from pydantic import ValidationError

from redis_om.model import Field, HashModel
from redis_om.model.migrations.migrator import Migrator
from redis_om.model.model import NotFoundError, QueryNotSupportedError, RedisModelError


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
        first_name: str
        last_name: str
        email: str
        join_date: datetime.date
        age: int

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


def test_not_found(m):
    with pytest.raises(NotFoundError):
        # This ID does not exist.
        m.Member.get(1000)
