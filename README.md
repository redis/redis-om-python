<h1 align="center">Redis OM</h1>
<p align="center">
    <p align="center">
        Objecting mapping and more, for Redis.
    </p>
</p>

---

[![Version][version-svg]][package-url]
[![License][license-image]][license-url]
[![Build Status][ci-svg]][ci-url]

Redis OM is a library that helps you build modern Python applications with Redis.

**Redis OM Python** | [Redis OM Node.js][redis-om-js] | [Redis OM Spring][redis-om-spring] | [Redis OM .NET][redis-om-dotnet]

<details>
  <summary><strong>Table of contents</strong></summary>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Why Redis OM?](#why)
- [Getting started](#getting-started)
- [Installation](#installation)
- [Documentation](#documentation)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

</details>

## ➡ Why Redis OM?

Redis OM is a library of high-level tools that help you build modern Python applications with Redis.

This *preview release* includes our first major component: a **declarative model class** backed by Redis.

## 🏁 Getting started

### Object Mapping

With Redis OM, you get powerful data modeling, extensible data validation with [Pydantic](pydantic-url), and rich query expressions with a small amount of code.

Check out this example of data modeling and validation. First, we're going to create a `Customer` model that we can use to save data to Redis.

```python
import datetime
from typing import Optional

from pydantic import EmailStr

from redis_om.model import (
    HashModel,
)


class Customer(HashModel):
    first_name: str
    last_name: str
    email: EmailStr
    join_date: datetime.date
    age: int
    bio: Optional[str]
```

Here, we've defined a `Customer` model with the `HashModel` class from redis-om. This model will save data in Redis as a [Redis Hash](https://redis.io/topics/data-types).

Next, let's see how Redis OM makes it easy to save and retrieve `Customer` data in Redis.

```python
# We can create a new Customer object:
andrew = Customer(
    first_name="Andrew",
    last_name="Brookins",
    email="andrew.brookins@example.com",
    join_date=datetime.date.today(),
    age=38,
    bio="Python developer, works at Redis, Inc."
)

# The model generates a globally unique primary key automatically without
# needing to talk to Redis.
print(andrew.pk)
# '01FJM6PH661HCNNRC884H6K30C'

# We can save the model to Redis.
andrew.save()

# Now, we can retrieve this customer with its primary key:
other_andrew = Customer.get('01FJM6PH661HCNNRC884H6K30C')

# The original model and this one pass an equality check.
assert other_andrew == andrew
```

Now, let's talk about **validation**. Did you notice the type annotation for the `email` field was `EmailStr`?

`EmailStr` is a [Pydantic field validator](https://pydantic-docs.helpmanual.io/usage/types/). Because every Redis OM model is also a Pydantic model, you can use Pydantic validators like `EmailStr`, `Pattern`, and many more!

Let's see what happens if we try to instantiate our `Customer` class with an invalid email address.

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
# Traceback:
# pydantic.error_wrappers.ValidationError: 1 validation error for Customer
# email
#   value is not a valid email address (type=value_error.email)

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
```

Data modeling, validation, and persistent to Redis all work regardless of where you run Redis. But can we do more?

Yes, we can! Next, we'll talk about the **rich query expressions** and **embedded models** that Redis OM gives you when you're using the RediSearch and RedisJSON Redis modules.

### Querying
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

Ready to learn more? Read the [getting started](docs/getting_started.md) guide or check out how to [add Redis OM to your FastAPI project](docs/integrating.md).

## 💻 Installation

Installation is simple with `pip`, Poetry, or Pipenv.

```sh
# With pip
$ pip install redis-om

# Or, using Poetry
$ poetry add redis-om
```

## 📚 Documentation

Documentation is available [here](docs/index.md).

## ⛏️ Troubleshooting

If you run into trouble or have any questions, we're here to help! 

First, check the [FAQ](docs/faq.md). If you don't find the answer there,
hit us up on the [Redis Discord Server](http://discord.gg/redis).

## ✨ RediSearch and RedisJSON

Some advanced features of Redis OM rely on core features from two source available Redis modules: **RediSearch** and **RedisJSON**.

To learn more, read [our documentation](docs/redis_modules.md).

## ❤️ Contributing

We'd love your contributions!

**Bug reports** are especially helpful at this stage of the project. [You can open a bug report on GitHub](https://github.com/redis-om/redis-om-python/issues/new).

You can also **contribute documentation** -- or just let us know if something needs more detail. [Open an issue on GitHub](https://github.com/redis-om/redis-om-python/issues/new) to get started.

## License

Redis OM uses the [BSD 3-Clause license][license-url].

<!-- Badges -->

[version-svg]: https://img.shields.io/pypi/v/redis-om?style=flat-square
[package-url]: https://pypi.org/project/redis-om/
[ci-svg]: https://img.shields.io/github/workflow/status/redis-om/redis-om-python/python?style=flat-square
[ci-url]: https://github.com/redis-om/redis-om-python/actions/workflows/build.yml
[license-image]: http://img.shields.io/badge/license-MIT-green.svg?style=flat-square
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

