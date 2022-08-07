import os

import aioredis


URL = os.environ.get("REDIS_OM_URL", None)


def get_redis_connection(**kwargs) -> aioredis.Redis:
    # If someone passed in a 'url' parameter, or specified a REDIS_OM_URL
    # environment variable, we'll create the Redis client from the URL.
    if not kwargs.get("url", None) and URL:
        kwargs["url"] = URL
    # Decode from UTF-8 by default
    if not kwargs.get("decode_responses", None):
        kwargs["decode_responses"] = True
    return aioredis.from_url(**kwargs)
