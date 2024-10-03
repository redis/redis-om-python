import os
from typing import Union

from . import redis

URL = os.environ.get("REDIS_OM_URL", None)


def get_redis_connection(**kwargs) -> Union[redis.Redis, redis.RedisCluster]:
    # Decode from UTF-8 by default
    if "decode_responses" not in kwargs:
        kwargs["decode_responses"] = True

    # If someone passed in a 'url' parameter, or specified a REDIS_OM_URL
    # environment variable, we'll create the Redis client from the URL.
    url = kwargs.pop("url", URL)
    cluster = kwargs.get("cluster", False) or "cluster=true" in str(url).lower()
    conn_obj = redis.RedisCluster if cluster else redis.Redis
    if url:
        return conn_obj.from_url(url, **kwargs)

    return conn_obj(**kwargs)
