# Redis Modules

Some advanced features of Redis OM, like rich query expressions and saving data as JSON, rely on core features from two source available Redis modules: **RediSearch** and **RedisJSON**.

These modules are the "magic" behind the scenes:

* RediSearch adds querying, indexing, and full-text search to Redis
* RedisJSON adds the JSON data type to Redis

## Why this is important

Without RediSearch or RedisJSON installed, you can still use Redis OM to create declarative models backed by Redis.

We'll store your model data in Redis as Hashes, and you can retrieve models using their primary keys. You'll also get all the validation features from Pydantic.

So, what won't work without these modules?

1. Without RedisJSON, you won't be able to nest models inside each other, like we did with the example model of a `Customer` model that has an `Address` embedded inside it.
2. Without RediSearch, you won't be able to use our expressive queries to find models -- just primary keys.

## So how do you get RediSearch and RedisJSON?

You can use RediSearch and RedisJSON with your self-hosted Redis deployment. Just follow the instructions on installing the binary versions of the modules in their Quick Start Guides:

- [RedisJSON Quick Start - Running Binaries](https://redis.io/docs/stack/json/)
- [RediSearch Quick Start - Running Binaries](https://redis.io/docs/stack/search/quick_start/)

**NOTE**: Both of these modules' Quick Start Guides also have instructions on how to run the modules in Redis with Docker.

Don't want to run Redis yourself? RediSearch and RedisJSON are also available on Redis Cloud. [Get started here.](https://redis.com/try-free/)