import random

import pytest
from redis import Redis

from redis_developer.connections import get_redis_connection


@pytest.fixture
def redis():
    yield get_redis_connection()


def _delete_test_keys(prefix: str, conn: Redis):
    keys = []
    for key in conn.scan_iter(f"{prefix}:*"):
        keys.append(key)
    if keys:
        conn.delete(*keys)


@pytest.fixture
def key_prefix(redis):
    key_prefix = f"redis-developer:{random.random()}"
    yield key_prefix
    _delete_test_keys(key_prefix, redis)


@pytest.fixture(autouse=True)
def delete_test_keys(redis, request, key_prefix):
    _delete_test_keys(key_prefix, redis)
