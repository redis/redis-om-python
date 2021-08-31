# Redis Developer Python

redis-developer-python is a high-level library containing useful Redis
abstractions and tools, like an ORM and leaderboard.


## ORM/ODM

redis-developer-python includes an ORM/ODM.


### Declarative model classes

```pyhon
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


# Save a model instance to Redis

address.save()

address2 = Address.get(address.pk)
assert address2 == address


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

```


### Serialization and validation based on model classes
### Save a model instance to Redis
### Get a single model instance from Redis
### Update a model instance in Redis
### Batch/bulk insert and updates
### Declarative index creation and automatic index management
### Declarative “primary key”
### Declarative relationships (via Sorted Sets) or Embedded documents (JSON)
### Exact-value queries on indexed fields
### Ad-hoc numeric range and full-text queries (RediSearch)
### Aggregations (RediSearch)

### Unanswered Questions

What's the difference between these two forms?

```python
from redis_developer.orm import (
   RedisModel,
   indexed,
   unique
)


class Member(RedisModel):
   email: unique(str)
   email: indexed(str)

   # email: Indexed[str]  <- Probably not possible?
   # email: IndexedStr  <- This is how constrained types work in Pydantic

   class Meta:
      primary_key = "id"
      indexes = ["email"]  # <- How about this?
```

It appears that Pydantic uses functions when declaring the type requires some
kind of parameter. E.g., the max and min values for a constrained numeric
field.

Indexing probably requires, in some cases, parameters... so it should be a
function, probably. And in general, function vs. class appears to be only a case
of whether parameters are required.

1. unique() and indexed() require lots of work.
2. IndexedStr - what does that even mean exactly?
3. indexes = [] - Here, we could hook into class-level validation and add logic
   to make sure that any indexed values were unique. Right?
   
### Unique checking

When is the right time to check if e.g. an email field is unique in Redis?

If we check on instantiation of the model, we'll still need to check again when
we save the model.


### Field() vs constrained int, etc.

Pydantic includes field helpers like constr, etc. that apply a schema to values.
On top of that, we'll have a Field() helper that includes options common to all
data types possible for a field.

This is where we'll track if we should index a field, verify uniqueness, etc.
But for facts like numeric constraints, we'll rely on Pydantic.


### Automatic fields

Redis doesn't have server-side automatic values, dates, etc. So we don't need to
worry about refreshing from the server to get the automatically-created values.

As soon as someone saves a model, we, the ORM, will have created the automatic
values, so we can just set them in the model instance.
