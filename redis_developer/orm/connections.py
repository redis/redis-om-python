import redis


def get_redis_connection() -> redis.Redis:
    return redis.Redis()
