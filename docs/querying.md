# Querying
Querying uses a rich expression syntax inspired by the Django ORM, SQLAlchemy,  and Peewee.

The example code defines `Address` and `Customer` models for use with a Redis database with the [RedisJSON](redis-json-url) module installed.

With these two classes defined, you can now:

* Validate data based on the model's type annotations using Pydantic 
* Persist model instances to Redis as JSON
* Instantiate model instances from Redis by primary key (a client-generated [ULID](ulid-url))
* Query on any indexed fields in the models


```python
import datetime
from typing import Optional

from redis_om.model import (
    EmbeddedJsonModel,
    JsonModel,
    Field,
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
```

Here are a few example queries that use the models we defined earlier:

```python
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