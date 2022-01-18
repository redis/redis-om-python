<div align="center">
  <br/>
  <br/>
  <img width="360" src="https://raw.githubusercontent.com/redis-developer/redis-om-python/main/images/logo.svg?token=AAAXXHUYL6RHPESRRAMBJOLBSVQXE" alt="Redis OM" />
  <br/>
  <br/>
</div>

<p align="center">
    <p align="center">
        Object mapping, and more, for Redis and Python
    </p>
</p>

---

[![Version][version-svg]][package-url]
[![License][license-image]][license-url]
[![Build Status][ci-svg]][ci-url]

**Redis OM Python** makes it easy to model Redis data in your Python applications.

[Redis OM .NET](https://github.com/redis/redis-om-dotnet) | [Redis OM Node.js](https://github.com/redis/redis-om-node) | [Redis OM Spring](https://github.com/redis/redis-om-spring) | **Redis OM Python**

<details>
  <summary><strong>Table of contents</strong></summary>

span

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [💡 Why Redis OM?](#-why-redis-om)
- [📇 Modeling Your Data](#-modeling-your-data)
- [✓ Validating Data With Your Model](#-validating-data-with-your-model)
- [🔎 Rich Queries and Embedded Models](#-rich-queries-and-embedded-models)
  - [Querying](#querying)
  - [Embedded Models](#embedded-models)
- [💻 Installation](#-installation)
- [📚 Documentation](#-documentation)
- [⛏️ Troubleshooting](#️-troubleshooting)
- [✨ So How Do You Get RediSearch and RedisJSON?](#-so-how-do-you-get-redisearch-and-redisjson)
- [❤️ Contributing](#️-contributing)
- [📝 License](#-license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

</details>

## 💡 Why Redis OM?

Redis OM provides high-level abstractions that make it easy to model and query data in Redis with modern Python applications.

This **preview** release contains the following features:

* Declarative object mapping for Redis objects
* Declarative secondary-index generation
* Fluent APIs for querying Redis

## 📇 Modeling Your Data

Redis OM contains powerful declarative models that give you data validation, serialization, and persistence to Redis.

Check out this example of modeling customer data with Redis OM. First, we create a `Customer` model:

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

Now that we have a `Customer` model, let's use it to save customer data to Redis.

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


# First, we create a new `Customer` object:
andrew = Customer(
    first_name="Andrew",
    last_name="Brookins",
    email="andrew.brookins@example.com",
    join_date=datetime.date.today(),
    age=38,
    bio="Python developer, works at Redis, Inc."
)

# The model generates a globally unique primary key automatically
# without needing to talk to Redis.
print(andrew.pk)
# > "01FJM6PH661HCNNRC884H6K30C"

# We can save the model to Redis by calling `save()`:
andrew.save()

# To retrieve this customer with its primary key, we use `Customer.get()`:
assert Customer.get(andrew.pk) == andrew
```

**Ready to learn more?** Check out the [getting started](docs/getting_started.md) guide.

Or, continue reading to see how Redis OM makes data validation a snap.

## ✓ Validating Data With Your Model

Redis OM uses [Pydantic][pydantic-url] to validate data based on the type annotations you assign to fields in a model class.

This validation ensures that fields like `first_name`, which the `Customer` model marked as a `str`, are always strings. **But every Redis OM model is also a Pydantic model**, so you can use Pydantic validators like `EmailStr`, `Pattern`, and many more for complex validations!

For example, because we used the `EmailStr` type for the `email` field, we'll get a validation error if we try to create a `Customer` with an invalid email address:

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
    pydantic.error_wrappers.ValidationError: 1 validation error for Customer
     email
       value is not a valid email address (type=value_error.email)
    """
```

**Any existing Pydantic validator should work** as a drop-in type annotation with a Redis OM model. You can also write arbitrarily complex custom validations!

To learn more, see the [documentation on data validation](docs/validation.md).

## 🔎 Rich Queries and Embedded Models

Data modeling, validation, and saving models to Redis all work regardless of how you run Redis.

Next, we'll show you the **rich query expressions** and **embedded models** Redis OM provides when the [RediSearch][redisearch-url] and [RedisJSON][redis-json-url] modules are installed in your Redis deployment, or you're using [Redis Enterprise][redis-enterprise-url].

**TIP**: *Wait, what's a Redis module?* If you aren't familiar with Redis modules, review the [So, How Do You Get RediSearch and RedisJSON?](#-so-how-do-you-get-redisearch-and-redisjson) section of this README.

### Querying

Redis OM comes with a rich query language that allows you to query Redis with Python expressions.

To show how this works, we'll make a small change to the `Customer` model we defined earlier. We'll add `Field(index=True)` to tell Redis OM that we want to index the `last_name` and `age` fields:

```python
import datetime
from typing import Optional

from pydantic import EmailStr

from redis_om import (
    Field,
    HashModel,
    Migrator
)

                 
class Customer(HashModel):
    first_name: str
    last_name: str = Field(index=True)
    email: EmailStr
    join_date: datetime.date
    age: int = Field(index=True)
    bio: Optional[str]


# Now, if we use this model with a Redis deployment that has the
# RediSearch module installed, we can run queries like the following.

# Before running queries, we need to run migrations to set up the
# indexes that Redis OM will use. You can also use the `migrate`
# CLI tool for this!
Migrator().run()

# Find all customers with the last name "Brookins"
Customer.find(Customer.last_name == "Brookins").all()

# Find all customers that do NOT have the last name "Brookins"
Customer.find(Customer.last_name != "Brookins").all()

# Find all customers whose last name is "Brookins" OR whose age is 
# 100 AND whose last name is "Smith"
Customer.find((Customer.last_name == "Brookins") | (
        Customer.age == 100
) & (Customer.last_name == "Smith")).all()
```

These queries -- and more! -- are possible because **Redis OM manages indexes for you automatically**.

Querying with this index features a rich expression syntax inspired by the Django ORM, SQLAlchemy,  and Peewee. We think you'll enjoy it!

### Embedded Models

Redis OM can store and query **nested models** like any document database, with the speed and power you get from Redis. Let's see how this works.

In the next example, we'll define a new `Address` model and embed it within the `Customer` model.

```python
import datetime
from typing import Optional

from redis_om import (
    EmbeddedJsonModel,
    JsonModel,
    Field,
    Migrator,
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

## 💻 Installation

Installation is simple with `pip`, Poetry, or Pipenv.

```sh
# With pip
$ pip install redis-om

# Or, using Poetry
$ poetry add redis-om
```

## 📚 Documentation

The Redis OM documentation is available [here](docs/index.md).

## ⛏️ Troubleshooting

If you run into trouble or have any questions, we're here to help!

Hit us up on the [Redis Discord Server](http://discord.gg/redis) or [open an issue on GitHub](https://github.com/redis-developer/redis-om-python/issues/new).

## ✨ So How Do You Get RediSearch and RedisJSON?

Some advanced features of Redis OM rely on core features from two source available Redis modules: [RediSearch][redisearch-url] and [RedisJSON][redis-json-url].

You can run these modules in your self-hosted Redis deployment, or you can use [Redis Enterprise][redis-enterprise-url], which includes both modules.

To learn more, read [our documentation](docs/redis_modules.md).

## ❤️ Contributing

We'd love your contributions!

**Bug reports** are especially helpful at this stage of the project. [You can open a bug report on GitHub](https://github.com/redis/redis-om-python/issues/new).

You can also **contribute documentation** -- or just let us know if something needs more detail. [Open an issue on GitHub](https://github.com/redis/redis-om-python/issues/new) to get started.

## 📝 License

Redis OM uses the [BSD 3-Clause license][license-url].

<!-- Badges -->

[version-svg]: https://img.shields.io/pypi/v/redis-om?style=flat-square
[package-url]: https://pypi.org/project/redis-om/
[ci-svg]: https://img.shields.io/github/workflow/status/redis/redis-om-python/CI?style=flat-square
[ci-url]: https://github.com/redis/redis-om-python/actions/workflows/CI.yml
[license-image]: http://img.shields.io/badge/license-3_Clause_BSD-green.svg?style=flat-square
[license-url]: LICENSE
<!-- Links -->

[redis-om-website]: https://developer.redis.com
[redis-om-js]: https://github.com/redis-om/redis-om-js
[redis-om-dotnet]: https://github.com/redis-om/redis-om-dotnet
[redis-om-spring]: https://github.com/redis-om/redis-om-spring
[redisearch-url]: https://oss.redis.com/redisearch/
[redis-json-url]: https://oss.redis.com/redisjson/
[pydantic-url]: https://github.com/samuelcolvin/pydantic
[ulid-url]: https://github.com/ulid/spec
[redis-enterprise-url]: https://redis.com/try-free/
