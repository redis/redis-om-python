# Connecting to Redis

You can control how Redis OM connects to Redis with the `REDIS_OM_URL` environment variable, or by manually constructing Redis client objects.

## Environment Variable

By default, Redis OM tries to connect to Redis on your localhost at port 6379. Most local install methods will result in Redis running at this location, in which case you don't need to do anything special for Redis OM to connect to Redis.

However, if you configured Redis to run on a different port, or if you're using a remote Redis server, you'll need to set the `REDIS_OM_URL` environment variable.

The `REDIS_OM_URL` environment variable follows the redis-py URL format:

    redis://[[username]:[password]]@localhost:6379/[database number]

**NOTE:** The square brackets indicate an optional value and are not part of the URL format.

The default connection is equivalent to the following `REDIS_OM_URL` environment variable:

    redis://localhost:6379

**Note:** Indexing only works for data stored in Redis logical database 0.  If you are using a different database number when connecting to Redis, you can expect the code to raise a `MigrationError` when you run the migrator.

### Passwords and Usernames

Redis can be configured with password protection and a "default" user, in which case you might connect using only the password.

You can do so with Redis OM like this:

    redis://:your-password@localhost:6379

If your Redis instance requires both a username and a password, you would include both in the URL:

    redis://your-username:your-password@localhost:6379

### Database Number

Redis databases are numbered, and the default is 0. You can leave off the database number to use the default database, or specify it.

**Note:** Indexing only works for data stored in Redis logical database 0.  If you are using a different database number when connecting to Redis, you can expect the code to raise a `MigrationError` when you run the migrator.

### SSL Connections

Use the "rediss" prefix for SSL connections:

    rediss://[[username]:[password]]@localhost:6379/0

### Unix Domain Sockets

Use the "unix" prefix to connect to Redis over Unix domain sockets:

    unix://[[username]:[password]]@/path/to/socket.sock?db=0

### To Learn More

To learn more about the URL format that Redis OM Python uses, consult the [redis-py URL documentation](https://redis-py.readthedocs.io/en/stable/#redis.Redis.from_url).

**TIP:** The URL format is the same if you're using async or sync mode with Redis OM (i.e., importing `aredis_om` for async or `redis_om` for sync).

## Connection Objects

Aside from controlling connections via the `REDIS_OM_URL` environment variable, you can manually construct Redis client connections for a specific OM model class.

**NOTE:** This method takes precedence over the `REDIS_OM_URL` environment variable.

You can control the connection a specific model class should use by assigning an object to the *database* field of a model's _Meta_ object, like so:

```python
from redis_om import HashModel, get_redis_connection


redis = get_redis_connection(port=6378)


class Customer(HashModel):
    first_name: str
    last_name: str
    age: int

    class Meta:
        database = redis
```

The `get_redis_connection()` function is a Redis OM helper that passes keyword arguments to either `aioredis.Redis.from_url()` or `redis.Redis.from_url()`, depending on whether you are using Redis OM in async or sync mode.

You can also manually construct a client object:

```python
from redis import Redis

from redis_om import HashModel


class Customer(HashModel):
    first_name: str
    last_name: str
    age: int

    class Meta:
        database = Redis(port=6378)
```
