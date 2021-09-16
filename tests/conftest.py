import pytest
from redis import Redis

from redis_developer.connections import get_redis_connection
from redis_developer.orm.migrations.migrator import Migrator


@pytest.fixture(scope="module", autouse=True)
def migrations():
    Migrator().run()


@pytest.fixture
def redis():
    yield get_redis_connection()


@pytest.fixture
def key_prefix():
    # TODO
    yield "redis-developer"
    

def _delete_test_keys(prefix: str, conn: Redis):
    for key in conn.scan_iter(f"{prefix}:*"):
        conn.delete(key)


@pytest.fixture(scope="function", autouse=True)
def delete_test_keys(redis, request, key_prefix):
    _delete_test_keys(key_prefix, redis)
