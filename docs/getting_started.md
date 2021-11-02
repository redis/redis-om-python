# Getting Started With Redis OM

## Introduction

This tutorial will walk you through installing Redis OM, creating your first model, and using it to save and validate data.

## Prerequisites

Redis OM requires Python version 3.9 or above and a Redis instance to connect to.

## Python

Make sure you are running **Python version 3.9 or higher**:

```
python --version
Python 3.9.0
```

If you don't have Python installed, you can download it from [Python.org](https://www.python.org/downloads/), use [Pyenv](https://github.com/pyenv/pyenv), or install Python with your operating system's package manager.

## Redis

Redis OM saves data in Redis, so you will need Redis installed and running to complete this tutorial.

### Downloading Redis

The latest version of Redis is available from [Redis.io](https://redis.io/). You can also install Redis with your operating system's package manager.

**NOTE:** This tutorial will guide you through starting Redis locally, but the instructions will also work if Redis is running on a remote server.

### Installing Redis On Windows

Redis doesn't run directly on Windows, but you can use Windows Subsystem for Linux (WSL) to run Redis. See [our video on YouTube](https://youtu.be/_nFwPTHOMIY) for a walk-through.

Windows users can also use Docker. See the next section on running Redis with Docker for more information.

### Running Redis With Docker

Instead of installing Redis manually or with a package manager, you can run Redis with Docker. The official Redis Docker image is hosted on [Docker Hub](https://hub.docker.com/_/redis).

**TIP:** If you plan on using Docker, we recommend the [redismod](https://hub.docker.com/r/redislabs/redismod) image because it includes the RediSearch and RedisJSON modules.

## Recommended: RediSearch and RedisJSON

Redis OM relies on the [RediSearch][redisearch-url] and [RedisJSON][redis-json-url] Redis modules to support [rich queries](querying.md) and [embedded models](embedded_models.md).

You don't need these Redis modules to use Redis OM's data modeling, validation, and persistence features, but we recommend them to get the most out of Redis OM.

The easiest way to run these Redis modules during local development is to use the [redismod](https://hub.docker.com/r/redislabs/redismod) Docker image.

You can quickly start Redis with the redismod Docker image by running the following command:

docker run -d -p 6379:6379 redislabs/redismod
**TIP:** The `-d` option runs Redis in the background.

For other installation methods, follow the "Quick Start" guides on both modules' home pages for alternative installation methods.

## Start Redis

Before you get started with Redis OM, make sure you start Redis.

The command you use to start Redis will depend on how you installed it.

### Ubuntu Linux (Including WSL)

If you installed Redis using `apt`, start it with the `systemctl` command:

sudo systemctl restart redis.service
Otherwise, you can start the server manually:

redis-server start

### macOS with Homebrew

brew services start redis

### Docker

The command to start Redis with Docker depends on the image you've chosen to use.

#### Docker with the redismod image (recommended)

docker run -d -p 6379:6379 redislabs/redismod

### Docker iwth the redis image

docker run -d -p 6379:6379 redis

## Installing Redis OM

You can install Redis OM with `pip` by running the following command:

pip install redis-om
Or, if you're using Poetry, you can install Redis OM with the following command:

poetry install redis-om
With Pipenv, the command is:

pipenv install redis-om

## Setting the Redis URL Environment Variable

We're almost ready to create a Redis OM model! But first, we need to make sure that Redis OM knows how to connect to Redis.

By default, Redis OM tries to connect to Redis on your localhost at port 6379. Most local install methods will result in Redis running at this location, in which case you don't need to do anything special.

However, if you configured Redis to run on a different port, or if you're using a remote Redis server, you'll need to set the `REDIS_URL` environment variable.

The `REDIS_URL` environment variable follows the redis-py URL format:

redis://[[username]:[password]]@localhost:6379/[database number]
The default connection is eqivalent to the following `REDIS_URL` environment variable:

redis://@localhost:6379
**TIP:** Redis databases are numbered, and the default is 0. You can leave off the database number to use the default database.

Other supported prefixes include "rediss" for SSL connections and "unix" for Unix domain sockets:

rediss://[[username]:[password]]@localhost:6379/0
unix://[[username]:[password]]@/path/to/socket.sock?db=0
For more details about how to connect to Redis with Redis OM, see the [connections documentation](connections.md).

### Redis Cluster Support

Redis OM supports connecting to Redis Cluster, but this preview release does not support doing so with the `REDIS_URL` environment variable. However, you can connect by manually creating a connection object.

See the [connections documentation](connections.md) for examples of connecting to Redis Cluster.

Support for connecting to Redis Cluster via `REDIS_URL` will be added in a future release.

## Defining a Model

In this tutorial, we'll create a `Customer` model that validates and saves data. Let's start with a basic definition of the model. We'll add features as we go along.

```python
import datetime
from typing import Optional

from redis_om.model import (
    HashModel,
)


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

Let's dig into these two details a bit more.

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
Customer(
    first_name="Andrew",
    last_name="Brookins",
    email="andrew.brookins@example.com",
    join_date=datetime.date.today(),
    age=38)
```

All fields are required because none of the fields are marked `Optional`, so we get a validation error:

```
ValidationError: 1 validation error for Customer
bio
  field required (type=value_error.missing)
```

If we want the `bio` field to be optional, we need to change the type annotation:

```python
class Customer(HashModel):
    first_name: str
    last_name: str
    email: str
    join_date: datetime.date
    age: int
    bio: Optional[str]
```

Now we can create `Customer` objects with or without the `bio` field.

### Default Values

Fields can have default values.

```python
class Customer(HashModel):
    first_name: str
    last_name: str
    email: str
    join_date: datetime.date
    age: int
    bio: Optional[str] = "Super dope"
```

Now, if we create a `Customer` object without a `bio` field, it will use the default value.

```python
andrew = Customer(
    first_name="Andrew",
    last_name="Brookins",
    email="andrew.brookins@example.com",
    join_date=datetime.date.today(),
    age=38)

print(andrew.bio)
'Super Dope'
```

The model will then save this default value to Redis the next time you call `save()`.

### Automatic Primary Keys

Models generate a globally unique primary key automatically without needing to talk to Redis.

```python
print(andrew.pk)
'01FJM6PH661HCNNRC884H6K30C'
```

The ID is available *before* you save the model.

The default ID generation function creates [ULIDs](https://github.com/ulid/spec), though you can change the function that generates the primary key for models if you'd like to use a different kind of primary key.

## Saving Models

We can save the model to Redis by calling `save()`:

```python
andrew.save()
```

## Examining Your Data In Redis

## Validating Data

## Next Steps

Now that you know the basics of working with Redis OM, continue on for all the nitty-gritty details about [models and fields](validation.md).

<!-- Links -->

[redisearch-url]: https://oss.redis.com/redisearch/
[redis-json-url]: https://oss.redis.com/redisjson/
