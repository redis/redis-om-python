import asyncio
import random

import pytest

from aredis_om import get_redis_connection


@pytest.fixture(scope="session")
def event_loop(request):
    """
    Starlette needs a session-scoped event loop during test runs.
    https://github.com/pytest-dev/pytest-asyncio/issues/169
    """
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


@pytest.fixture(scope="session")
def redis():
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
