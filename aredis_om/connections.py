import os

from . import redis


URL = os.environ.get("REDIS_OM_URL", None)


def get_redis_connection(**kwargs) -> redis.Redis:
    # Decode from UTF-8 by default
    if "decode_responses" not in kwargs:
        kwargs["decode_responses"] = True

    # If someone passed in a 'url' parameter, or specified a REDIS_OM_URL
    # environment variable, we'll create the Redis client from the URL.
    url = kwargs.pop("url", URL)
    if url:
        return redis.Redis.from_url(url, **kwargs)

    return redis.Redis(**kwargs)
