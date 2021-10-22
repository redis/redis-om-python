import random

import pytest

from redis_om.connections import get_redis_connection


@pytest.fixture
def redis(event_loop):
    yield get_redis_connection()


async def _delete_test_keys(prefix: str, conn):
    keys = []
    async for key in conn.scan_iter(f"{prefix}:*"):
        keys.append(key)
    if keys:
        conn.delete(*keys)


@pytest.fixture
def key_prefix(redis):
    key_prefix = f"redis-om:{random.random()}"
    yield key_prefix


@pytest.fixture(autouse=True)
async def delete_test_keys(redis, request, key_prefix):
    await _delete_test_keys(key_prefix, redis)
