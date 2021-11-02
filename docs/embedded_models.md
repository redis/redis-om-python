# Embedded Models

**NOTE:** This documentation is a stub, using the same embedded JSON model example as the README.

Redis OM can store and query **nested models** like any document database, with the speed and power you get from Redis. Let's see how this works.

In the next example, we'll define a new `Address` model and embed it within the `Customer` model.

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

# With these two models and a Redis deployment with the RedisJSON 
# module installed, we can run queries like the following.

# Before running queries, we need to run migrations to set up the
# indexes that Redis OM will use. You can also use the `migrate`
# CLI tool for this!
Migrator().run()

# Find all customers who live in San Antonio, TX
Customer.find(Customer.address.city == "San Antonio",
              Customer.address.state == "TX")
```