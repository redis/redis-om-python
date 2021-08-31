# Redis Developer Python

redis-developer-python is a high-level library containing useful Redis
abstractions and tools, like an ORM and leaderboard.


## ORM/ODM

redis-developer-python includes an ORM/ODM.


### Declarative model classes

```pyhon
import decimal
import datetime
from typing import Optional

from redis import Redis

from redis_developer.orm import (
   RedisModel,
   Field,
   Relationship
)

db = Redis()


# Declarative model classes
class BaseModel(RedisModel):
   config:
   database = db


class Address(BaseModel):
   address_line_1: str
   address_line_2: str
   city: str
   country: str
   postal_code: str


class Order(BaseModel):
   total: decimal.Decimal
   currency: str
   created_on: datetime.datetime


class Member(BaseModel):
   # An auto-incrementing primary key is added by default if no primary key
   # is specified.
   id: Optional[int] = Field(default=None, primary_key=True)
   first_name: str
   last_name: str
   email: str = Field(unique=True, index=True)
   zipcode: Optional[int]
   join_date: datetime.date

   # Creates an embedded document: stored as hash fields or JSON document.
   address: Address

   # Creates a relationship to data in separate Hash or JSON documents.
   orders: Relationship(Order, backref='recommended',
                        field_name='recommended_by')

   # Creates a self-relationship.
   recommended_by: Relationship('Member', backref='recommended',
                                field_name='recommended_by')

   class Meta:
      key_pattern = "member:{id}"


# Validation

# Raises ValidationError: last_name is required
Member(
   first_name="Andrew",
   zipcode="97086",
   join_date=datetime.date.today()
)

# Passes validation
Member(
   first_name="Andrew",
   last_name="Brookins",
   zipcode="97086",
   join_date=datetime.date.today()
)

# Raises ValidationError: zipcode is not a number
Member(
   first_name="Andrew",
   last_name="Brookins",
   zipcode="not a number",
   join_date=datetime.date.today()
)

# Persist a model instance to Redis
member = Member(
   first_name="Andrew",
   last_name="Brookins",
   zipcode="97086",
   join_date=datetime.date.today()
)
# Assign the return value to get any auto-fields filled in,
# like the primary key (if an auto-incrementing integer).
member = member.save()

# Hydrate a model instance from Redis using the primary key.
member = Member.get(d=1)

# Hydrate a model instance from Redis using a secondary index on a unique field.
member = Member.get(email="a.m.brookins@gmail.com")

# What if the field wasn't unique and there were two "a.m.brookins@gmail.com"
# entries?
# This would raise a MultipleObjectsReturned error:
member = Member.get(Member.email == "a.m.brookins@gmail.com")

# What if you know there might be multiple results? Use filter():
members = Member.filter(Member.last_name == "Brookins")

# What if you want to only return values that don't match a query?
members = Member.exclude(last_name="Brookins")

# You can combine filer() and exclude():
members = Member.filter(last_name="Brookins").exclude(first_name="Andrew")
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
