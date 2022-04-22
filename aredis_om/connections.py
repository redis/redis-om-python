import os

import aioredis

URL = os.environ.get("REDIS_OM_URL", None)


def get_redis_connection(**kwargs) -> aioredis.Redis:
    # If someone passed in a 'url' parameter, or specified a REDIS_OM_URL
    # environment variable, we'll create the Redis client from the URL.
    url = kwargs.pop("url", URL)
    if url:
        return aioredis.Redis.from_url(url, **kwargs)

    # Decode from UTF-8 by default
    if "decode_responses" not in kwargs:
        kwargs["decode_responses"] = True
    return aioredis.Redis(**kwargs)
