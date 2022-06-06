from aredis_om import redis
from aredis_om.util import ASYNC_MODE


def test_redis_type():
    import redis as sync_redis_module
    import redis.asyncio as async_redis_module

    mapping = {True: async_redis_module, False: sync_redis_module}
    assert mapping[ASYNC_MODE] is redis
