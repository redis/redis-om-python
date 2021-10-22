import datetime
from typing import Optional

from pydantic import EmailStr

from redis_om.model import (
    HashModel
)


class Customer(HashModel):
    first_name: str
    last_name: str
    email: EmailStr
    join_date: datetime.date
    age: int
    bio: Optional[str]


# Now we can create new Customer objects:
andrew = Customer(
    first_name="Andrew",
    last_name="Brookins",
    email="andrew.brookins@example.com",
    join_date=datetime.date.today(),
    age=38,
    bio="Python developer, works at Redis, Inc."
)

# The model generates a globally unique primary key automatically.
print(andrew.pk)
# '01FJM6PH661HCNNRC884H6K30C'

# You can save the model to Redis.
andrew.save()

# Later, you can retrieve this customer with its primary key:
other_andrew = Customer.get('01FJM6PH661HCNNRC884H6K30C')

# The original model and this one pass an equality check.
assert other_andrew == andrew


# We'll get a validation error if we try to use an invalid email address!
Customer(
    first_name="Andrew",
    last_name="Brookins",
    email="Not an email address!",
    join_date=datetime.date.today(),
    age=38,
    bio="Python developer, works at Redis, Inc."
)

# We'll also get a validation error if we try to save a model
# instance with an invalid email.
andrew = Customer(
    first_name="Andrew",
    last_name="Brookins",
    email="andrew.brookins@example.com",
    join_date=datetime.date.today(),
    age=38,
    bio="Python developer, works at Redis, Inc."
)

# Sometime later...
andrew.email = "Not valid"
andrew.save()

# Traceback:
# pydantic.error_wrappers.ValidationError: 1 validation error for Customer
# email
#   value is not a valid email address (type=value_error.email)
