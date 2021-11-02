# Querying

**NOTE:** This documentation is a stub that uses examples from other documentation in this project (the README, the Getting Started guide, etc.). Detailed documentation on querying in a work in progress.

Querying in Redis OM uses a rich expression syntax inspired by the Django ORM, SQLAlchemy,  and Peewee.

In the following example, we define `Address` and `Customer` models for use with a Redis database that has the [RedisJSON](redis-json-url) module installed.

With these two classes defined, we can query on any indexed fields in the models -- including indexed fields within embedded models.

```python
import datetime
from typing import Optional

from redis_om.model import (
    EmbeddedJsonModel,
    JsonModel,
    Field,
    Migrator
)

class Address(EmbeddedJsonModel):
    address_line_1: str
    address_line_2: Optional[str]
    city: str = Field(index=True)
    state: str = Field(index=True)
    country: str
    postal_code: str = Field(index=True)


class Customer(JsonModel):
    first_name: str = Field(index=True)
    last_name: str = Field(index=True)
    email: str = Field(index=True)
    join_date: datetime.date
    age: int = Field(index=True)
    bio: Optional[str] = Field(index=True, full_text_search=True,
                               default="")

    # Creates an embedded model.
    address: Address


# Before running queries, we need to run migrations to set up the
# indexes that Redis OM will use. You can also use the `migrate`
# CLI tool for this!
Migrator().run() 
    
# Here are a few example queries that use these two models...

# Find all customers with the last name "Brookins"
Customer.find(Customer.last_name == "Brookins").all()

# Find all customers that do NOT have the last name "Brookins"
Customer.find(Customer.last_name != "Brookins").all()
 
# Find all customers whose last name is "Brookins" OR whose age is 
# 100 AND whose last name is "Smith"
Customer.find((Customer.last_name == "Brookins") | (
    Customer.age == 100
) & (Customer.last_name == "Smith")).all()

# Find all customers who live in San Antonio, TX
Customer.find(Customer.address.city == "San Antonio",
              Customer.address.state == "TX")
```