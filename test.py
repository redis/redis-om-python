import decimal
import datetime
from typing import Optional, List

import redis
from pydantic import ValidationError

from redis_developer.orm import (
    RedisModel,
    Field,
    Relationship,
)


# Declarative model classes

class BaseRedisModel(RedisModel):
    class Meta:
        database = redis.Redis(password="my-password", decode_responses=True)
        model_key_prefix = "redis-developer:"


class Address(BaseRedisModel):
    address_line_1: str
    address_line_2: Optional[str]
    city: str
    country: str
    postal_code: str


class Order(BaseRedisModel):
    total: decimal.Decimal
    currency: str
    created_on: datetime.datetime


class Member(BaseRedisModel):
    first_name: str
    last_name: str
    email: str = Field(unique=True, index=True)
    join_date: datetime.date

    # Creates an embedded document: stored as hash fields or JSON document.
    address: Address

    # Creates a relationship to data in separate Hash or JSON documents.
    orders: Optional[List[Order]] = Relationship(back_populates='member')

    # Creates a self-relationship.
    recommended_by: Optional['Member'] = Relationship(back_populates='recommended')

    class Meta(BaseRedisModel.Meta):
        model_key_prefix = "member"
        primary_key_pattern = ""


# Validation

address = Address(
    address_line_1="1 Main St.",
    city="Happy Town",
    state="WY",
    postal_code=11111,
    country="USA"
)

# Raises ValidationError: last_name, address are required
try:
    Member(
        first_name="Andrew",
        zipcode="97086",
        join_date=datetime.date.today()
    )
except ValidationError as e:
    pass


# Raises ValidationError: join_date is not a date
try:
    Member(
        first_name="Andrew",
        last_name="Brookins",
        join_date="yesterday"
    )
except ValidationError as e:
    pass


# Passes validation
member = Member(
    first_name="Andrew",
    last_name="Brookins",
    email="a@example.com",
    address=address,
    join_date=datetime.date.today()
)

exit()

# Save a model instance to Redis

address.save()

address2 = Address.get(address.pk)
assert address2 == address


exit()

# Save a model with relationships (TODO!)

member.save()


# Save many model instances to Redis
today = datetime.date.today()
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

# Get a model instance from Redis using the primary key.
member = Member.get(1)


# Update a model instance in Redis
member.first_name = "Brian"
member.last_name = "Sam-Bodden"
member.save()

# Or, with an implicit save:
member.update(first_name="Brian", last_name="Sam-Bodden")

# Or, affecting multiple model instances with an implicit save:
Member.filter(Member.last_name == "Brookins").update(last_name="Sam-Bodden")


# Exact-value queries on indexed fields

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
