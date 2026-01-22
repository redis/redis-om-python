# Redis Setup

This page covers which Redis version to use and how to connect Redis OM to your Redis instance.

## Choosing a Redis Version

Redis OM Python works with **Redis 8** (recommended) or **Redis Stack**.

### Redis 8 (Recommended)

Redis 8 includes search and JSON capabilities built-in, so you don't need any additional modules. This is the simplest way to get started.

**With Docker:**

```bash
docker run -p 6379:6379 redis:8
```

### Redis Stack

[Redis Stack](https://redis.io/docs/latest/operate/oss_and_stack/install/install-stack/) bundles Redis with the RediSearch and RedisJSON modules. Use this if you need Redis 7.x compatibility.

**With Docker:**

```bash
docker run -p 6379:6379 -p 8001:8001 redis/redis-stack
```

This also gives you access to RedisInsight at `http://localhost:8001` for visualizing your data.

### Redis Cloud

Don't want to run Redis yourself? [Redis Cloud](https://redis.com/try-free/) provides managed Redis with all the features Redis OM needs.

## What Do You Need These Features For?

Without Redis's search and JSON capabilities, you can still use Redis OM to create declarative models backed by Redis Hashes, retrieve models by primary key, and get Pydantic validation.

The search and JSON features enable:

1. **Rich queries** - Find models using expressive queries like `Customer.find(Customer.age > 30)`
2. **Embedded models** - Nest models inside each other using `JsonModel` and `EmbeddedJsonModel`
3. **Full-text search** - Search text fields with `full_text_search=True`

## Connecting to Redis

### Environment Variable

By default, Redis OM connects to `localhost:6379`. To use a different Redis instance, set the `REDIS_OM_URL` environment variable:

```bash
export REDIS_OM_URL="redis://localhost:6379"
```

The URL format follows [redis-py conventions](https://redis-py.readthedocs.io/en/stable/#redis.Redis.from_url):

```
redis://[[username]:[password]]@host:port/[database]
```

**Examples:**

```bash
# Password only
redis://:your-password@localhost:6379

# Username and password
redis://your-username:your-password@localhost:6379

# SSL connection
rediss://your-username:your-password@your-host:6379

# Unix socket
unix://:password@/path/to/socket.sock?db=0
```

!!! warning "Database 0 Required for Indexing"
    Indexing only works with Redis logical database 0. Using a different database number will raise a `MigrationError` when running migrations.

### Connection Objects

You can also configure connections per-model using the `Meta` class:

```python
from redis_om import HashModel, get_redis_connection

redis = get_redis_connection(port=6378)

class Customer(HashModel):
    first_name: str
    last_name: str

    class Meta:
        database = redis
```

Or construct a client directly:

```python
from redis import Redis
from redis_om import HashModel

class Customer(HashModel):
    first_name: str
    last_name: str

    class Meta:
        database = Redis(host="localhost", port=6378)
```

!!! tip "Async and Sync"
    The `get_redis_connection()` helper works for both async (`aredis_om`) and sync (`redis_om`) modes.

