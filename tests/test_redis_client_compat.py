# type: ignore
"""Compatibility checks for redis-py 6.3+/7.x/8.x search reply shapes."""

import abc
from collections import namedtuple

import pytest
import pytest_asyncio
import redis as redis_lib

from aredis_om import Field, HashModel, Migrator
from aredis_om.model.migrations.data.builtin.datetime_migration import (
    DatetimeFieldDetector,
)
from redis_om import has_redisearch

from .conftest import py_test_mark_asyncio


if not has_redisearch():
    pytestmark = pytest.mark.skip


def _redis_py_version_tuple():
    return tuple(int(part) for part in redis_lib.__version__.split(".")[:3])


@pytest_asyncio.fixture
async def compat_model(key_prefix, redis):
    class BaseHashModel(HashModel, abc.ABC):
        class Meta:
            global_key_prefix = key_prefix
            database = redis

    class Person(BaseHashModel, index=True):
        first_name: str = Field(index=True)
        age: int = Field(index=True, sortable=True)

    await Migrator(conn=redis).run()
    return namedtuple("Models", ["Person"])(Person)


@py_test_mark_asyncio
async def test_redis_py_version_is_supported():
    version = _redis_py_version_tuple()
    assert version >= (6, 3, 0)
    assert version != (8, 0, 0)


@py_test_mark_asyncio
async def test_hash_find_and_count_roundtrip(compat_model):
    person = compat_model.Person(first_name="Andrew", age=38)
    await person.save()

    results = await compat_model.Person.find(
        compat_model.Person.first_name == "Andrew"
    ).all()
    assert len(results) == 1
    assert results[0].first_name == "Andrew"
    assert results[0].age == 38
    assert (
        await compat_model.Person.find(
            compat_model.Person.first_name == "Andrew"
        ).count()
        == 1
    )


@py_test_mark_asyncio
async def test_raw_search_reply_is_parseable(compat_model, redis):
    person = compat_model.Person(first_name="Andrew", age=38)
    await person.save()

    raw_result = await redis.execute_command(
        "FT.SEARCH",
        compat_model.Person.Meta.index_name,
        "@first_name:{Andrew}",
        "LIMIT",
        "0",
        "10",
    )

    parsed = compat_model.Person.from_redis(raw_result)
    assert [doc.first_name for doc in parsed] == ["Andrew"]


@py_test_mark_asyncio
async def test_ft_info_schema_parse(compat_model, redis):
    detector = DatetimeFieldDetector(redis)
    index_info = await redis.execute_command(
        "FT.INFO", compat_model.Person.Meta.index_name
    )
    schema = detector._parse_index_schema(index_info)
    assert schema["first_name"]["type"] == "TAG"
    assert schema["age"]["type"] == "NUMERIC"
