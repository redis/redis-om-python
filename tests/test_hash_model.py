import abc
import decimal
import datetime
from typing import Optional

import pytest
import redis
from pydantic import ValidationError

from redis_developer.orm import (
    HashModel,
    Field,
)
from redis_developer.orm.model import RedisModelError

r = redis.Redis()
today = datetime.date.today()


class BaseHashModel(HashModel, abc.ABC):
    class Meta:
        global_key_prefix = "redis-developer"


class Order(BaseHashModel):
    total: decimal.Decimal
    currency: str
    created_on: datetime.datetime


class Member(BaseHashModel):
    first_name: str
    last_name: str
    email: str = Field(unique=True, index=True)
    join_date: datetime.date

    class Meta:
        model_key_prefix = "member"
        primary_key_pattern = ""


def test_validates_required_fields():
    # Raises ValidationError: last_name, address are required
    with pytest.raises(ValidationError):
        Member(
            first_name="Andrew",
            zipcode="97086",
            join_date=today
        )


def test_validates_field():
    # Raises ValidationError: join_date is not a date
    with pytest.raises(ValidationError):
        Member(
            first_name="Andrew",
            last_name="Brookins",
            join_date="yesterday"
        )


# Passes validation
def test_validation_passes():
    member = Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today
    )
    assert member.first_name == "Andrew"


def test_saves_model_and_creates_pk():
    member = Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today
    )
    # Save a model instance to Redis
    member.save()

    member2 = Member.get(member.pk)
    assert member2 == member


def test_raises_error_with_embedded_models():
    class Address(BaseHashModel):
        address_line_1: str
        address_line_2: Optional[str]
        city: str
        country: str
        postal_code: str

    with pytest.raises(RedisModelError):
        class InvalidMember(BaseHashModel):
            address: Address


@pytest.mark.skip("Not implemented yet")
def test_saves_many():
    members = [
        Member(
            first_name="Andrew",
            last_name="Brookins",
            email="a@example.com",
            join_date=today
        ),
        Member(
            first_name="Kim",
            last_name="Brookins",
            email="k@example.com",
            join_date=today
        )
    ]
    Member.add(members)


@pytest.mark.skip("No implemented yet")
def test_updates_a_model():
    member = Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today
    )

    # Update a model instance in Redis
    member.first_name = "Brian"
    member.last_name = "Sam-Bodden"
    member.save()

    # Or, with an implicit save:
    member.update(first_name="Brian", last_name="Sam-Bodden")

    # Or, affecting multiple model instances with an implicit save:
    Member.filter(Member.last_name == "Brookins").update(last_name="Sam-Bodden")


def test_exact_match_queries():
    member1 = Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date=today
    )

    member2 = Member(
        first_name="Kim",
        last_name="Brookins",
        email="k@example.com",
        join_date=today
    )
    member1.save()
    member2.save()

    actual = Member.find(Member.last_name == "Brookins")
    assert actual == [member2, member1]
    

    # actual = Member.find(
    #     (Member.last_name == "Brookins") & (~Member.first_name == "Andrew"))
    # assert actual == [member2]

    # actual = Member.find(~Member.last_name == "Brookins")
    # assert actual == []

    # actual = Member.find(
    #     (Member.last_name == "Brookins") & (Member.first_name == "Andrew")
    #     | (Member.first_name == "Kim")
    # )
    # assert actual == [member1, member2]

    # actual = Member.find_one(Member.last_name == "Brookins")
    # assert actual == member1


def test_schema():
    class Address(BaseHashModel):
        a_string: str
        an_integer: int
        a_float: float

    assert Address.schema() == "SCHEMA pk TAG SORTABLE a_string TEXT an_integer NUMERIC " \
                               "a_float NUMERIC"
