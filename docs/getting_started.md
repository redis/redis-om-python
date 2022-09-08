# Getting Started With Redis OM

## Introduction

This tutorial will walk you through installing Redis OM, creating your first model, and using it to save and validate data.

## Prerequisites

Redis OM requires Python version 3.7 or above and a Redis instance to connect to.

## Python

Make sure you are running **Python version 3.7 or higher**:

```
python --version
Python 3.7.0
```

If you don't have Python installed, you can download it from [Python.org](https://www.python.org/downloads/), use [pyenv](https://github.com/pyenv/pyenv), or install Python with your operating system's package manager.

## Redis

Redis OM saves data in Redis, so you will need Redis installed and running to complete this tutorial.

### Downloading Redis

The latest version of Redis is available from [Redis.io](https://redis.io/). You can also install Redis with your operating system's package manager.

**NOTE:** This tutorial will guide you through starting Redis locally, but the instructions will also work if Redis is running on a remote server.

### Installing Redis On Windows

Redis doesn't run directly on Windows, but you can use Windows Subsystem for Linux (WSL) to run Redis. See [our video on YouTube](https://youtu.be/_nFwPTHOMIY) for a walk-through.

Windows users can also use Docker. See the next section on running Redis with Docker for more information.

### Using Redis With Docker

Instead of installing Redis manually or with a package manager, you can run Redis with Docker.

We recommend the [redis-stack](https://hub.docker.com/r/redis/redis-stack) image because it includes Redis modules that Redis OM can use to give you extra features. Later sections of this guide will provide more detail about these features.

You can also use the official Redis Docker image, which is hosted on [Docker Hub](https://hub.docker.com/_/redis).  However this does not include the Search and JSON modules required to store JSON models and use the `find` query interface.

**NOTE**: We'll talk about how to actually start Redis with Docker when we discuss _running_ Redis later in this guide.

## Recommended: RediSearch and RedisJSON

Redis OM relies on the [RediSearch][redisearch-url] and [RedisJSON][redis-json-url] Redis modules to support rich queries and embedded models.

You don't need these Redis modules to use Redis OM's data modeling, validation, and persistence features, but we recommend them to get the most out of Redis OM.

The easiest way to run these Redis modules during local development is to use the [redis-stack](https://hub.docker.com/r/redis/redis-stack) Docker image.

For other installation methods, follow the "Quick Start" guides on both modules' home pages.

## Starting Redis

Before you get started with Redis OM, make sure you start Redis.

The command to start Redis will depend on how you installed it.

### Ubuntu Linux (Including WSL)

If you installed Redis using `apt`, start it with the `systemctl` command:

    $ sudo systemctl restart redis.service

Otherwise, you can start the server manually:

    $ redis-server start

### MacOS with Homebrew

    $ brew services start redis

### Docker

The command to start Redis with Docker depends on the image you've chosen to use.

**TIP:** The `-d` option in these examples runs Redis in the background, while `-p 6379:6379` makes Redis reachable at port 6379 on your localhost.

#### Docker with the `redismod` image (recommended)

    $ docker run -d -p 6379:6379 redislabs/redismod

### Docker with the `redis` image

    $ docker run -d -p 6379:6379 redis

## Installing Redis OM

The recommended way to install Redis OM is with [Poetry](https://python-poetry.org/docs/). You can install Redis OM using Poetry with the following command:

    $ poetry install redis-om

If you're using Pipenv, the command is:

    $ pipenv install redis-om

Finally, you can install Redis OM with `pip` by running the following command:

    $ pip install redis-om

**TIP:** If you aren't using Poetry or Pipenv and are instead installing directly with `pip`, we recommend that you install Redis OM in a virtual environment (AKA, a virtualenv). If you aren't familiar with this concept, see [Dan Bader's video and transcript](https://realpython.com/lessons/creating-virtual-environment/).


## Setting the Redis URL Environment Variable

We're almost ready to create a Redis OM model! But first, we need to make sure that Redis OM knows how to connect to Redis.

By default, Redis OM tries to connect to Redis on your localhost at port 6379. Most local install methods will result in Redis running at this location, in which case you don't need to do anything special.

However, if you configured Redis to run on a different port, or if you're using a remote Redis server, you'll need to set the `REDIS_OM_URL` environment variable.

The `REDIS_OM_URL` environment variable follows the redis-py URL format:

    redis://[[username]:[password]]@localhost:6379/[database number]

The default connection is equivalent to the following `REDIS_OM_URL` environment variable:

    redis://@localhost:6379

**TIP:** Redis databases are numbered, and the default is 0. You can leave off the database number to use the default database.

**Note:** Indexing only works for data stored in Redis logical database 0.  If you are using a different database number when connecting to Redis, you can expect the code to raise a `MigrationError` when you run the migrator.

Other supported prefixes include "rediss" for SSL connections and "unix" for Unix domain sockets:

    rediss://[[username]:[password]]@localhost:6379/0
    unix://[[username]:[password]]@/path/to/socket.sock?db=0

## Defining a Model

In this tutorial, we'll create a `Customer` model that validates and saves data. Let's start with a basic definition of the model. We'll add features as we go along.

```python
import datetime

from redis_om import HashModel


class Customer(HashModel):
    first_name: str
    last_name: str
    email: str
    join_date: datetime.date
    age: int
    bio: str
```

There are a few details to note:

1. Our `Customer` model extends the `HashModel` class. This means that it will be saved to Redis as a hash. The other model class that Redis OM provides is `JsonModel`, which we'll discuss later.
2. We've specified the model's fields using Python type annotations.

Let's dig into the `HashModel` class and type annotations a bit more.

### The HashModel Class

When you subclass `HashModel`, your subclass is both a Redis OM model, with methods for saving data to Redis, *and* a Pydantic model.

This means that you can use Pydantic field validations with your Redis OM models, which we'll cover later, when we talk about validation. But this also means you can use Redis OM models anywhere you would use a Pydantic model, like in your FastAPI applications. 🤯

### Type Annotations

The type annotations you add to your model fields are used for a few purposes:

* Validating data with Pydantic validators
* Serializing data Redis
* Deserializing data from Redis

We'll see examples of these throughout the course of this tutorial.

An important detail about the `HashModel` class is that it does not support `list`, `set`, or mapping (like `dict`) types. This is because Redis hashes cannot contain lists, sets, or other hashes.

If you want to model fields with a list, set, or mapping type, or another model, you'll need to use the `JsonModel` class, which can support these types, as well as embedded models.

## Creating Models

Let's see what creating a model object looks like:

```python
import datetime

from redis_om import HashModel


class Customer(HashModel):
    first_name: str
    last_name: str
    email: str
    join_date: datetime.date
    age: int
    bio: str


andrew = Customer(
    first_name="Andrew",
    last_name="Brookins",
    email="andrew.brookins@example.com",
    join_date=datetime.date.today(),
    age=38,
    bio="Python developer, works at Redis, Inc."
)
```

### Optional Fields

What would happen if we left out one of these fields, like `bio`?

```python
import datetime

from redis_om import HashModel
from pydantic import ValidationError


class Customer(HashModel):
    first_name: str
    last_name: str
    email: str
    join_date: datetime.date
    age: int
    bio: str


# All fields are required because none of the fields
# are marked `Optional`, so we get a validation error:
try:
    Customer(
        first_name="Andrew",
        last_name="Brookins",
        email="andrew.brookins@example.com",
        join_date=datetime.date.today(),
        age=38  # <- We didn't pass in a bio!
    )
except ValidationError as e:
    print(e)
    """
    ValidationError: 1 validation error for Customer
    bio
      field required (type=value_error.missing)
    """
```

If we want the `bio` field to be optional, we need to change the type annotation to use `Optional`.

```python
import datetime
from typing import Optional

from redis_om import HashModel


class Customer(HashModel):
    first_name: str
    last_name: str
    email: str
    join_date: datetime.date
    age: int
    bio: Optional[str]  # <- Now, bio is an Optional[str]
```

Now we can create `Customer` objects with or without the `bio` field.

### Default Values

Fields can have default values. You set them by assigning a value to a field.

```python
import datetime
from typing import Optional

from redis_om import HashModel


class Customer(HashModel):
    first_name: str
    last_name: str
    email: str
    join_date: datetime.date
    age: int
    bio: Optional[str] = "Super dope"  # <- We added a default here
```

Now, if we create a `Customer` object without a `bio` field, it will use the default value.

```python
import datetime
from typing import Optional

from redis_om import HashModel


class Customer(HashModel):
    first_name: str
    last_name: str
    email: str
    join_date: datetime.date
    age: int
    bio: Optional[str] = "Super dope"


andrew = Customer(
    first_name="Andrew",
    last_name="Brookins",
    email="andrew.brookins@example.com",
    join_date=datetime.date.today(),
    age=38)  # <- Notice, we didn't give a bio!

print(andrew.bio)  # <- So we got the default value.
# > 'Super Dope'
```

The model will then save this default value to Redis the next time you call `save()`.

### Automatic Primary Keys

Models generate a globally unique primary key automatically without needing to talk to Redis.

```python
import datetime
from typing import Optional

from redis_om import HashModel


class Customer(HashModel):
    first_name: str
    last_name: str
    email: str
    join_date: datetime.date
    age: int
    bio: Optional[str] = "Super dope"


andrew = Customer(
    first_name="Andrew",
    last_name="Brookins",
    email="andrew.brookins@example.com",
    join_date=datetime.date.today(),
    age=38)

print(andrew.pk)
# > '01FJM6PH661HCNNRC884H6K30C'
```

The ID is available *before* you save the model.

The default ID generation function creates [ULIDs](https://github.com/ulid/spec), though you can change the function that generates the primary key for models if you'd like to use a different kind of primary key.

## Validating Data

Redis OM uses [Pydantic][pydantic-url] to validate data based on the type annotations you assign to fields in a model class.

This validation ensures that fields like `first_name`, which the `Customer` model marked as a `str`, are always strings. **But every Redis OM model is also a Pydantic model**, so you can use Pydantic validators like `EmailStr`, `Pattern`, and many more for complex validations!

For example, we defined the `join_date` for our `Customer` model earlier as a `datetime.date`. So, if we try to create a model with a `join_date` that isn't a date, we'll get a validation error.

Let's try it now:

```python
import datetime
from typing import Optional

from redis_om import HashModel
from pydantic import ValidationError


class Customer(HashModel):
    first_name: str
    last_name: str
    email: str
    join_date: datetime.date
    age: int
    bio: Optional[str] = "Super dope"


try:
    Customer(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date="not a date!",  # <- The problem line!
        age=38
    )
except ValidationError as e:
    print(e)
    """
    pydantic.error_wrappers.ValidationError: 1 validation error for Customer
    join_date
      invalid date format (type=value_error.date)
    """
```

### Models Coerce Values By Default

You might wonder what qualifies as a "date" in our last validation example. By default, Redis OM will try to coerce input values to the correct type. That means we can pass a date string for `join_date` instead of a `date` object:

```python
import datetime

from redis_om import HashModel


class Customer(HashModel):
    first_name: str
    last_name: str
    email: str
    join_date: datetime.date
    age: int


andrew = Customer(
    first_name="Andrew",
    last_name="Brookins",
    email="a@example.com",
    join_date="2020-01-02",  # <- We're passing a YYYY-MM-DD date string now
    age=38
)

print(andrew.join_date)
# > 2021-11-02
type(andrew.join_date)
# > datetime.date  # The model parsed the string automatically!
```

This ability to combine parsing (in this case, a date string) with validation can save you a lot of work.

However, you can turn off coercion -- check the next section on using strict validation.

### Strict Validation

You can turn on strict validation to reject values for a field unless they match the exact type of the model's type annotations.

You do this by changing a field's type annotation to use one of the ["strict" types provided by Pydantic](https://pydantic-docs.helpmanual.io/usage/types/#strict-types).

Redis OM supports all of Pydantic's strict types: `StrictStr`, `StrictBytes`, `StrictInt`, `StrictFloat`, and `StrictBool`.

If we wanted to make sure that the `age` field only accepts integers and doesn't try to parse a string containing an integer, like "1", we'd use the `StrictInt` class.

```python
import datetime
from typing import Optional

from pydantic import StrictInt, ValidationError
from redis_om import HashModel


class Customer(HashModel):
    first_name: str
    last_name: str
    email: str
    join_date: datetime.date
    age: StrictInt  # <- Instead of int, we use StrictInt
    bio: Optional[str]


# Now if we use a string instead of an integer for `age`,
# we get a validation error:
try:
    Customer(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date="2020-01-02",
        age="38"  # <- Age as a string shouldn't work now!
    )
except ValidationError as e:
    print(e)
    """
    pydantic.error_wrappers.ValidationError: 1 validation error for Customer
    age
      Value is not a valid integer (type=type_error.integer)
    """
```

Pydantic doesn't include a `StrictDate` class, but we can create our own. In this example, we create a `StrictDate` type that we'll use to validate that `join_date` is a `datetime.date` object.

```python
import datetime
from typing import Optional

from pydantic import ValidationError
from redis_om import HashModel


class StrictDate(datetime.date):
    @classmethod
    def __get_validators__(cls) -> 'CallableGenerator':
        yield cls.validate

    @classmethod
    def validate(cls, value: datetime.date, **kwargs) -> datetime.date:
        if not isinstance(value, datetime.date):
            raise ValueError("Value must be a datetime.date object")
        return value


class Customer(HashModel):
    first_name: str
    last_name: str
    email: str
    join_date: StrictDate
    age: int
    bio: Optional[str]


# Now if we use a string instead of a date object for `join_date`,
# we get a validation error:
try:
    Customer(
        first_name="Andrew",
        last_name="Brookins",
        email="a@example.com",
        join_date="2020-01-02",  # <- A string shouldn't work now!
        age="38"
    )
except ValidationError as e:
    print(e)
    """
    pydantic.error_wrappers.ValidationError: 1 validation error for Customer
    join_date
      Value must be a datetime.date object (type=value_error)
    """
```

## Saving Models

We can save the model to Redis by calling `save()`:

```python
import datetime

from redis_om import HashModel


class Customer(HashModel):
    first_name: str
    last_name: str
    email: str
    join_date: datetime.date
    age: int


andrew = Customer(
    first_name="Andrew",
    last_name="Brookins",
    email="andrew.brookins@example.com",
    join_date=datetime.date.today(),
    age=38)

andrew.save()
```

## Expiring Models

We can expire an instance of a model using `expire`, and passing it the number of seconds after which we want the instance to expire in Redis:

```python
# Expire Andrew in 2 minutes (120 seconds)
andrew.expire(120)
```

## Examining Your Data In Redis

You can view the data stored in Redis for any Redis OM model.

First, get the key of a model instance you want to inspect. The `key()` method will give you the exact Redis key used to store the model.

**NOTE:** The naming of this method may be confusing. This is not the primary key, but is instead the Redis key for this model. For this reason, the method name may change.

In this example, we're looking at the key created for the `Customer` model we've been building:

```python
import datetime
from typing import Optional

from redis_om import HashModel


class Customer(HashModel):
    first_name: str
    last_name: str
    email: str
    join_date: datetime.date
    age: int
    bio: Optional[str] = "Super dope"


andrew = Customer(
    first_name="Andrew",
    last_name="Brookins",
    email="andrew.brookins@example.com",
    join_date=datetime.date.today(),
    age=38)

andrew.save()
andrew.key()
# > 'mymodel.Customer:01FKGX1DFEV9Z2XKF59WQ6DC9T'
```

With the model's Redis key, you can start `redis-cli` and inspect the data stored under that key. Here, we run `JSON.GET` command with `redis-cli` using the running "redis" container that this project's Docker Compose file defines:

```
$ docker-compose exec -T redis redis-cli HGETALL mymodel.Customer:01FKGX1DFEV9Z2XKF59WQ6DC9r

 1) "pk"
 2) "01FKGX1DFEV9Z2XKF59WQ6DC9T"
 3) "first_name"
 4) "Andrew"
 5) "last_name"
 6) "Brookins"
 7) "email"
 8) "andrew.brookins@example.com"
 9) "join_date"
10) "2021-11-02"
11) "age"
12) "38"
13) "bio"
14) "Super dope"
```

## Getting a Model

If you have the primary key of a model, you can call the `get()` method on the model class to get the model's data.

```python
import datetime
from typing import Optional

from redis_om import HashModel


class Customer(HashModel):
    first_name: str
    last_name: str
    email: str
    join_date: datetime.date
    age: int
    bio: Optional[str] = "Super dope"


andrew = Customer(
    first_name="Andrew",
    last_name="Brookins",
    email="andrew.brookins@example.com",
    join_date=datetime.date.today(),
    age=38)

andrew.save()

assert Customer.get(andrew.pk) == andrew
```

## Querying for Models With Expressions

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

## Calling Other Redis Commands

Sometimes you'll need to run a Redis command directly.  Redis OM supports this through the `db` method on your model's class.  This returns a connected Redis client instance which exposes a function named for each Redis command.  For example, let's perform some basic set operations:

```python
from redis_om import HashModel

class Demo(HashModel):
    some_field: str

redis_conn = Demo.db()

redis_conn.sadd("myset", "a", "b", "c", "d")

# Prints False
print(redis_conn.sismember("myset", "e"))

# Prints True
print(redis_conn.sismember("myset", "b"))
```

The parameters expected by each command function are those documented on the command's page on [redis.io](https://redis.io/commands/).

If you don't want to get a Redis connection from a model class, you can also use `get_redis_connection`:

```python
from redis_om import get_redis_connection

redis_conn = get_redis_connection()
redis_conn.set("hello", "world")
```

## Next Steps

Now that you know the basics of working with Redis OM, start playing around with it in your project!

If you're a FastAPI user, check out [how to integrate Redis OM with FastAPI](https://github.com/redis/redis-om-python/blob/main/docs/fastapi_integration.md).

<!-- Links -->

[redisearch-url]: https://redis.io/docs/stack/search/
[redis-json-url]: https://redis.io/docs/stack/json/
[pydantic-url]: https://github.com/samuelcolvin/pydantic
