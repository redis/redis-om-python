# Validation

Redis OM uses [Pydantic][pydantic-url] behind the scenes to validate data at runtime, based on the model's type annotations.

## Basic Type Validation

Validation works for basic type annotations like `str`. Thus, given the following model:

```python
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
# We'll get a validation error if we try to use an invalid email address!
Customer(
    first_name="Andrew",
    last_name="Brookins",
    email="Not an email address!",
    join_date=datetime.date.today(),
    age=38,
    bio="Python developer, works at Redis, Inc."
)
```

This code generates the following error:

```
 Traceback:
 pydantic.error_wrappers.ValidationError: 1 validation error for Customer
 email
   value is not a valid email address (type=value_error.email)
```

We'll also get a validation error if we change a field on a model instance to an invalid value and then try to save it:

```python
andrew = Customer(
    first_name="Andrew",
    last_name="Brookins",
    email="andrew.brookins@example.com",
    join_date=datetime.date.today(),
    age=38,
    bio="Python developer, works at Redis, Inc."
)

andrew.email = "Not valid"
andrew.save()
```

Once again, we get the valiation error:

```
 Traceback:
 pydantic.error_wrappers.ValidationError: 1 validation error for Customer
 email
   value is not a valid email address (type=value_error.email)
```

[pydantic-url]: https://github.com/samuelcolvin/pydantic
