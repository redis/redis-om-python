import abc
import datetime
from operator import attrgetter

import pytest
import pytest_asyncio
from pydantic import validator

from aredis_om import Field, HashModel, JsonModel, Migrator

from .conftest import py_test_mark_asyncio


# TODO: disable tests based on checks
@pytest_asyncio.fixture(params=[HashModel, JsonModel])
async def post_model_datetime(request, key_prefix):
    base_model = request.param

    class BaseModel(base_model, abc.ABC):
        class Meta:
            global_key_prefix = key_prefix

    class PostDatetime(BaseModel):
        created: datetime.datetime = Field(index=True)

    await Migrator().run()
    return PostDatetime


# TODO: code duplication
@py_test_mark_asyncio
async def test_datetime(post_model_datetime):
    now = datetime.datetime(1980, 1, 1, hour=2, second=20, tzinfo=datetime.timezone.utc)
    now_p10 = now + datetime.timedelta(seconds=10)
    now_m10 = now - datetime.timedelta(seconds=10)

    next_hour_timezone = datetime.timezone(datetime.timedelta(hours=1))
    now_01_00 = now.replace(hour=3, tzinfo=next_hour_timezone)
    # Sanity check
    assert now == now_01_00

    posts = [
        post_model_datetime(created=time_point)
        for time_point in (now, now_p10, now_m10)
    ]
    for post in posts:
        await post.save()

    expected_sorted_posts = sorted(posts, key=attrgetter("created"))

    # Check all
    assert (
        await post_model_datetime.find().sort_by("created").all()
        == expected_sorted_posts
    )
    # Check one
    assert await post_model_datetime.find(post_model_datetime.created == now).all() == [
        posts[0]
    ]
    # Check one using different timezone but the same time
    assert await post_model_datetime.find(
        post_model_datetime.created == now_01_00
    ).all() == [posts[0]]

    # Check one
    post = await post_model_datetime.find(post_model_datetime.created == now).first()
    assert post.created == now == now_01_00

    # Check index comparison
    assert (
        await post_model_datetime.find(post_model_datetime.created < now_p10)
        .sort_by("created")
        .all()
        == expected_sorted_posts[:2]
    )
    assert (
        await post_model_datetime.find(post_model_datetime.created < now)
        .sort_by("created")
        .all()
        == expected_sorted_posts[:1]
    )
    assert (
        await post_model_datetime.find(post_model_datetime.created < now_m10)
        .sort_by("created")
        .all()
        == []
    )


# TODO: disable tests based on checks
@pytest_asyncio.fixture(params=[HashModel, JsonModel])
async def post_model_date(request, key_prefix):
    base_model = request.param

    class BaseModel(base_model, abc.ABC):
        class Meta:
            global_key_prefix = key_prefix

    class PostDate(BaseModel):
        created: datetime.date = Field(index=True)

    await Migrator().run()
    return PostDate


# TODO: code duplication
@py_test_mark_asyncio
async def test_date(post_model_date):
    now = datetime.date(1980, 1, 2)
    now_next = now.replace(day=3)
    now_prev = now.replace(day=1)

    posts = [
        post_model_date(created=time_point) for time_point in (now, now_next, now_prev)
    ]
    for post in posts:
        await post.save()

    expected_sorted_posts = sorted(posts, key=attrgetter("created"))

    # Check all
    assert (
        await post_model_date.find().sort_by("created").all() == expected_sorted_posts
    )
    # Check one
    assert await post_model_date.find(post_model_date.created == now).all() == [
        posts[0]
    ]

    # Check index comparison
    assert (
        await post_model_date.find(post_model_date.created < now_next)
        .sort_by("created")
        .all()
        == expected_sorted_posts[:2]
    )
    assert (
        await post_model_date.find(post_model_date.created < now)
        .sort_by("created")
        .all()
        == expected_sorted_posts[:1]
    )
    assert (
        await post_model_date.find(post_model_date.created < now_prev)
        .sort_by("created")
        .all()
        == []
    )


# TODO: disable tests based on checks
@pytest_asyncio.fixture(params=[HashModel, JsonModel])
async def post_model_time(request, key_prefix):
    base_model = request.param

    class BaseModel(base_model, abc.ABC):
        class Meta:
            global_key_prefix = key_prefix

    class PostTime(BaseModel):
        created: datetime.time = Field(index=True)

        # TODO: Provide our field type instead of date datetime.time?
        # https://pydantic-docs.helpmanual.io/usage/types/#datetime-types
        # datetime.time is parsing only from time obj or iso? str
        @validator("created", pre=True, allow_reuse=True)
        def time_validator(cls, value):
            if isinstance(value, str):
                value = int(value)
            if isinstance(value, int):
                # TODO: check if correct
                return (
                    datetime.datetime.fromtimestamp(
                        value // 1000, tz=datetime.timezone.utc
                    )
                    .time()
                    .replace(tzinfo=datetime.timezone.utc)
                )
            return value

    await Migrator().run()
    return PostTime


# TODO: code duplication
@py_test_mark_asyncio
async def test_time(post_model_time):
    now = datetime.time(hour=2, second=20, tzinfo=datetime.timezone.utc)
    now_p10 = now.replace(second=30)
    now_m10 = now.replace(second=10)

    next_hour_timezone = datetime.timezone(datetime.timedelta(hours=1))
    now_01_00 = now.replace(hour=3, tzinfo=next_hour_timezone)
    # Sanity check
    assert now == now_01_00

    posts = [
        post_model_time(created=time_point) for time_point in (now, now_p10, now_m10)
    ]
    for post in posts:
        await post.save()

    expected_sorted_posts = sorted(posts, key=attrgetter("created"))

    # Check all
    assert (
        await post_model_time.find().sort_by("created").all() == expected_sorted_posts
    )
    # Check one
    assert await post_model_time.find(post_model_time.created == now).all() == [
        posts[0]
    ]
    # Check one using different timezone but the same time
    assert await post_model_time.find(post_model_time.created == now_01_00).all() == [
        posts[0]
    ]

    # Check one
    post = await post_model_time.find(post_model_time.created == now).first()
    assert post.created == now == now_01_00

    # Check index comparison
    assert (
        await post_model_time.find(post_model_time.created < now_p10)
        .sort_by("created")
        .all()
        == expected_sorted_posts[:2]
    )
    assert (
        await post_model_time.find(post_model_time.created < now)
        .sort_by("created")
        .all()
        == expected_sorted_posts[:1]
    )
    assert (
        await post_model_time.find(post_model_time.created < now_m10)
        .sort_by("created")
        .all()
        == []
    )


@pytest.fixture(
    params=[
        datetime.timezone.utc,
        datetime.timezone(datetime.timedelta(hours=2)),
        datetime.timezone(datetime.timedelta(hours=-5)),
    ],
    ids=["UTC", "UTC+2", "UTC-5"],
)
def timezone(request):
    return request.param


@py_test_mark_asyncio
async def test_mixing(post_model_time, post_model_date, post_model_datetime, timezone):
    now = datetime.datetime(1980, 1, 1, hour=2, second=20, tzinfo=timezone)
    now_date, now_time = now.date(), now.time().replace(tzinfo=timezone)

    # Serialize + Deserialize datetime.datetime
    await post_model_datetime(created=now).save()
    obj = await post_model_datetime.find().first()
    assert obj.created == now

    # Serialize + Deserialize datetime.date
    await post_model_date(created=now_date).save()
    obj_date = await post_model_date.find().first()
    assert obj_date.created == now_date

    # Serialize + Deserialize datetime.time
    await post_model_time(created=now_time).save()
    obj_time = await post_model_time.find().first()
    assert obj_time.created == now_time

    # Combine deserialized and compare to expected
    restored = datetime.datetime.combine(obj_date.created, obj_time.created)
    assert restored == now


@py_test_mark_asyncio
async def test_precision(post_model_datetime):
    now = datetime.datetime(
        1980, 1, 1, hour=2, second=20, microsecond=123457, tzinfo=datetime.timezone.utc
    )
    # Serialize + Deserialize datetime.datetime
    await post_model_datetime(created=now).save()
    obj = await post_model_datetime.find().first()
    obj_now = obj.created

    # Test seconds
    assert obj_now.replace(microsecond=0) == now.replace(microsecond=0)

    # Test milliseconds
    assert obj_now.replace(microsecond=obj_now.microsecond // 1000) == now.replace(
        microsecond=now.microsecond // 1000
    )

    # Test microseconds
    # Our precision is millisecond
    with pytest.raises(AssertionError):
        assert obj_now == now

    # We should be in 1000 microsecond range
    assert (
        datetime.timedelta(microseconds=-1000)
        <= obj_now - now
        <= datetime.timedelta(microseconds=1000)
    )
