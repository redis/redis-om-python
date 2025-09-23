import asyncio
import random

import pytest
import pytest_asyncio

from aredis_om import get_redis_connection


TEST_PREFIX = "redis-om:testing"


py_test_mark_asyncio = pytest.mark.asyncio


# "pytest_mark_sync" causes problem in pytest
def py_test_mark_sync(f):
    return f  # no-op decorator


@pytest_asyncio.fixture(scope="function")
async def redis():
    # Per-test client bound to current loop; close after each test
    # Force a new connection for each test to avoid event loop issues
    import os

    url = os.environ.get("REDIS_OM_URL", "redis://localhost:6380?decode_responses=True")
    from aredis_om import redis as redis_module

    client = redis_module.Redis.from_url(url, decode_responses=True)
    try:
        # Ensure client is working with current event loop
        await client.ping()
        yield client
    finally:
        try:
            # Close connection pool to prevent event loop issues
            await client.aclose()
        except Exception:
            # Ignore cleanup errors
            pass


def _delete_test_keys(prefix: str, conn):
    keys = []
    for key in conn.scan_iter(f"{prefix}:*"):
        keys.append(key)
    if keys:
        conn.delete(*keys)


@pytest.fixture
def key_prefix(request):
    key_prefix = f"{TEST_PREFIX}:{random.random()}"
    yield key_prefix


@pytest.fixture(scope="session", autouse=True)
def cleanup_keys(request):
    # Always use the sync Redis connection with finalizer. Setting up an
    # async finalizer should work, but I'm not suer how yet!
    import redis
    import os

    # Create sync Redis connection for cleanup
    url = os.environ.get("REDIS_OM_URL", "redis://localhost:6380?decode_responses=True")
    conn = redis.Redis.from_url(url, decode_responses=True)

    # Increment for every pytest-xdist worker
    once_key = f"{TEST_PREFIX}:cleanup_keys"
    conn.incr(once_key)

    yield

    # Delete keys only once
    if conn.decr(once_key) == 0:
        _delete_test_keys(TEST_PREFIX, conn)
