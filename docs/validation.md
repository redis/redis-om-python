# Validation

Redis OM uses [Pydantic][pydantic-url] behind the scenes to validate data at runtime, based on the model's type annotations.

## Basic Type Validation

Validation works for basic type annotations like `str`. Thus, given the following model:

```python
import datetime
from typing import Optional

from pydantic import EmailStr

from redis_om import HashModel


class Customer(HashModel):
    first_name: str
    last_name: str
    email: EmailStr
    join_date: datetime.date
    age: int
    bio: Optional[str]
```

... Redis OM will ensure that `first_name` is always a string.

But every Redis OM model is also a Pydantic model, so you can use existing Pydantic validators like `EmailStr`, `Pattern`, and many more for complex validation!

## Complex Validation

Let's see what happens if we try to create a `Customer` object with an invalid email address.

```python
import datetime
from typing import Optional

from pydantic import EmailStr, ValidationError

from redis_om import HashModel


class Customer(HashModel):
    first_name: str
    last_name: str
    email: EmailStr
    join_date: datetime.date
    age: int
    bio: Optional[str]


# We'll get a validation error if we try to use an invalid email address!
try:
    Customer(
        first_name="Andrew",
        last_name="Brookins",
        email="Not an email address!",
        join_date=datetime.date.today(),
        age=38,
        bio="Python developer, works at Redis, Inc."
    )
except ValidationError as e:
    print(e)
    """
    1 validation error for Customer
    email
      value is not a valid email address: An email address must have an @-sign. [type=value_error, ...]
    """
```

As you can see, creating the `Customer` object generated a validation error indicating that the email address is invalid.

We'll also get a validation error if we change a field on a model instance to an invalid value and then try to save the model:

```python
import datetime
from typing import Optional

from pydantic import EmailStr, ValidationError

from redis_om import HashModel


class Customer(HashModel):
    first_name: str
    last_name: str
    email: EmailStr
    join_date: datetime.date
    age: int
    bio: Optional[str]


andrew = Customer(
    first_name="Andrew",
    last_name="Brookins",
    email="andrew.brookins@example.com",
    join_date=datetime.date.today(),
    age=38,
    bio="Python developer, works at Redis, Inc."
)

andrew.email = "Not valid"

try:
    andrew.save()
except ValidationError as e:
    print(e)
    """
    1 validation error for Customer
    email
      value is not a valid email address: An email address must have an @-sign. [type=value_error, ...]
    """
```

Once again, we get a validation error indicating the email address is invalid.

## Constrained Values

If you want to use any of the constraints.

Pydantic includes many type annotations to introduce constraints to your model field values.

The concept of "constraints" includes quite a few possibilities:

* Strings that are always lowercase
* Strings that must match a regular expression
* Integers within a range
* Integers that are a specific multiple
* And many more...

All of these constraint types work with Redis OM models. Read the [Pydantic documentation on constrained types](https://pydantic-docs.helpmanual.io/usage/types/#constrained-types) to learn more.


[pydantic-url]: https://github.com/samuelcolvin/pydantic
