import decimal
import datetime
from typing import Optional, List

import pytest
import redis
from pydantic import ValidationError

from redis_developer.orm import (
    JsonModel,
    Field,
)

r = redis.Redis()
today = datetime.datetime.today()


class BaseJsonModel(JsonModel):
    class Meta(JsonModel.Meta):
        global_key_prefix = "redis-developer"


class Address(BaseJsonModel):
    address_line_1: str
    address_line_2: Optional[str]
    city: str
    country: str
    postal_code: str


class Item(BaseJsonModel):
    price: decimal.Decimal
    name: str


class Order(BaseJsonModel):
    items: List[Item]
    total: decimal.Decimal
    created_on: datetime.datetime


class Member(BaseJsonModel):
    first_name: str
    last_name: str
    email: str = Field(unique=True, index=True)
    join_date: datetime.date

    # Creates an embedded model: stored as hash fields or JSON document.
    address: Address

    # Creates an embedded list of models.
    orders: Optional[List[Order]]

    class Meta(BaseJsonModel.Meta):
        model_key_prefix = "member"  # This is the default


address = Address(
    address_line_1="1 Main St.",
    city="Happy Town",
    state="WY",
    postal_code=11111,
    country="USA"
)


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
        address=address,
        join_date=today
    )
    assert member.first_name == "Andrew"


def test_gets_pk():
    new_address = Address(
        address_line_1="1 Main St.",
        city="Happy Town",
        state="WY",
        postal_code=11111,
        country="USA"
    )
    assert new_address.pk is not None


def test_saves_model():
    # Save a model instance to Redis
    address.save()
    address2 = Address.get(address.pk)
    assert address2 == address


def test_saves_with_embedded_models():
    member = Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        address=address,
        join_date=datetime.date.today()
    )
    member.save()

    member2 = Member.get(member.pk)
    assert member2.address == address


def test_saves_with_deeply_embedded_models():
    hat = Item(
        name="Cool hat",
        price=2.99
    )
    shoe = Item(
        name="Expensive shoe",
        price=299.99
    )
    order = Order(
        total=302.98,
        items=[hat, shoe],
        created_on=today,
    )
    member = Member(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        address=address,
        orders=[order],
        join_date=today
    )
    member.save()

    member2 = Member.get(member.pk)
    assert member2.orders[0] == order
    assert member2.orders[0].items[0] == hat


# Save many model instances to Redis
@pytest.mark.skip("Not implemented yet")
def test_saves_many():
    members = [
        Member(
            first_name="Andrew",
            last_name="Brookins",
            email="a@example.com",
            address=address,
            join_date=today
        ),
        Member(
            first_name="Kim",
            last_name="Brookins",
            email="k@example.com",
            address=address,
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
        address=address,
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


@pytest.mark.skip("Not implemented yet")
def test_exact_match_queries():
    # What if the field wasn't unique and there were two "a@example.com"
    # entries? This would raise a MultipleObjectsReturned error:
    member = Member.get(Member.email == "a.m.brookins@gmail.com")

    # What if you know there might be multiple results? Use filter():
    members = Member.filter(Member.last_name == "Brookins")

    # What if you want to only return values that don't match a query?
    members = Member.exclude(Member.last_name == "Brookins")

    # You can combine filer() and exclude():
    members = Member.filter(Member.last_name == "Brookins").exclude(
        Member.first_name == "Andrew")
