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

With Redis OM, you get powerful data modeling, validation, and query expressions with a small amount of code.

Check out this example:

```python
import datetime
from typing import Optional

from redis_developer.model import (
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

The example code defines `Address` and `Customer` models for use with a Redis database with the [RedisJSON](redis-json-url) module installed.

With these two classes defined, you can now:

* Validate data based on the model's type annotations using [Pydantic](pydantic-url)
* Persist model instances to Redis as JSON
* Instantiate model instances from Redis by primary key (a client-generated [ULID](ulid-url))
* Query on any indexed fields in the models

### Querying
Querying uses a rich expression syntax inspired by the Django ORM, SQLAlchemy,  and Peewee.

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

Redis OM relies on core features from two source available Redis modules: **RediSearch** and **RedisJSON**.

These modules are the "magic" behind the scenes:

* RediSearch adds querying, indexing, and full-text search to Redis
* RedisJSON adds the JSON data type to Redis

### Why this is important

Without RediSearch or RedisJSON installed, you can still use Redis OM to create declarative models backed by Redis.

We'll store your model data in Redis as Hashes, and you can retrieve models using their primary keys. You'll also get all the validation features from Pydantic.

So, what won't work without these modules?

1. Without RedisJSON, you won't be able to nest models inside each other, like we did with the example model of a `Customer` model that has an `Address` embedded inside it.
2. Without RediSearch, you won't be able to use our expressive queries to find models -- just primary keys.

### So how do you get RediSearch and RedisJSON?

You can use RediSearch and RedisJSON with your self-hosted Redis deployment. Just follow the instructions on installing the binary versions of the modules in their Quick Start Guides:

- [RedisJSON](https://oss.redis.com/redisjson/#download-and-running-binaries)
- [RediSearch](https://oss.redis.com/redisearch/Quick_Start/#download_and_running_binaries)

RediSearch and RedisJSON are also available on all Redis Cloud managed services. [Get started here.](https://redis.com/try-free/)

## ❤️ Contributing

We'd love your contributions!

**Bug reports** are especially helpful at this stage of the project. [You can open a big report on GitHub](https://github.com/redis-developer/redis-developer-python/issues/new).

You can also **contribute documentation** -- or just let us know if something needs more detail. [Open an issue on GitHub](https://github.com/redis-developer/redis-developer-python/issues/new) to get started.

## License

Redis OM is [MIT licensed][license-url].

<!-- Badges -->

[version-svg]: https://img.shields.io/pypi/v/redis-om?style=flat-square
[package-url]: https://pypi.org/project/redis-om/
[ci-svg]: https://img.shields.io/github/workflow/status/redis-developer/redis-developer-python/python?style=flat-square
[ci-url]: https://github.com/redis-developer/redis-developer-python/actions/workflows/build.yml
[license-image]: http://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE

<!-- Links -->

[redis-developer-website]: https://developer.redis.com
[redis-om-js]: https://github.com/redis-developer/redis-om-js
[redis-om-dotnet]: https://github.com/redis-developer/redis-om-dotnet
[redis-om-spring]: https://github.com/redis-developer/redis-om-spring
[redisearch-url]: https://oss.redis.com/redisearch/
[redis-json-url]: https://oss.redis.com/redisjson/
[pydantic-url]: https://github.com/samuelcolvin/pydantic
[ulid-url]: https://github.com/ulid/spec

