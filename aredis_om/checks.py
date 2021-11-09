from functools import lru_cache
from typing import List

from aredis_om.connections import get_redis_connection


@lru_cache(maxsize=None)
async def get_modules(conn) -> List[str]:
    modules = await conn.execute_command("module", "list")
    return [m[1] for m in modules]


@lru_cache(maxsize=None)
async def has_redis_json(conn=None):
    if conn is None:
        conn = get_redis_connection()
    names = await get_modules(conn)
    return b"ReJSON" in names or "ReJSON" in names


@lru_cache(maxsize=None)
async def has_redisearch(conn=None):
    if conn is None:
        conn = get_redis_connection()
    if has_redis_json(conn):
        return True
    names = await get_modules(conn)
    return b"search" in names or "search" in names
