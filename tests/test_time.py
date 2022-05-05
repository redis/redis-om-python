import abc
import datetime
from operator import attrgetter

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

    class Post(BaseModel):
        created: datetime.datetime = Field(index=True)

    await Migrator().run()
    return Post


@py_test_mark_asyncio
async def test_datetime(post_model_datetime):
    now = datetime.datetime(1980, 1, 1, hour=2, second=20, tzinfo=datetime.timezone.utc)
    now_p10 = now + datetime.timedelta(seconds=10)
    now_m10 = now - datetime.timedelta(seconds=10)

    next_hour_timezone = datetime.timezone(datetime.timedelta(hours=1))
    now_01_00 = now.replace(hour=3, tzinfo=next_hour_timezone)
    assert now == now_01_00

    posts = [
        post_model_datetime(created=time_point)
        for time_point in (now, now_p10, now_m10)
    ]
    for post in posts:
        await post.save()

    expected_sorted_posts = sorted(posts, key=attrgetter("created"))

    assert (
        await post_model_datetime.find().sort_by("created").all()
        == expected_sorted_posts
    )
    assert await post_model_datetime.find(post_model_datetime.created == now).all() == [
        posts[0]
    ]
    assert await post_model_datetime.find(
        post_model_datetime.created == now_01_00
    ).all() == [posts[0]]

    post = await post_model_datetime.find(post_model_datetime.created == now).first()
    assert post.created == now == now_01_00

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

    class Post(BaseModel):
        created: datetime.date = Field(index=True)

    await Migrator().run()
    return Post


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

    assert (
        await post_model_date.find().sort_by("created").all() == expected_sorted_posts
    )
    assert await post_model_date.find(post_model_date.created == now).all() == [
        posts[0]
    ]

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

    class Post(BaseModel):
        created: datetime.time = Field(index=True)

        # TODO: Find better / more correct approach!!!!!!!!!!
        # TODO: Provide our field type instead of date datetime.time?
        # https://pydantic-docs.helpmanual.io/usage/types/#datetime-types
        # datetime.time is parsing only from time obj or iso? str
        @validator("created", pre=True, allow_reuse=True)
        def time_validator(cls, value):
            if isinstance(value, str):
                value = int(value)
            if isinstance(value, int):
                return datetime.time(
                    hour=value // 1000 // 3600 % 24,
                    minute=value // 1000 // 60 % 60,
                    second=value // 1000 % 60,
                    microsecond=(value % 1000) * 1000,
                    tzinfo=datetime.timezone.utc,
                )
            return value

    await Migrator().run()
    return Post


@py_test_mark_asyncio
async def test_time(post_model_time):
    now = datetime.time(hour=2, second=20, tzinfo=datetime.timezone.utc)
    now_p10 = now.replace(second=30)
    now_m10 = now.replace(second=10)

    next_hour_timezone = datetime.timezone(datetime.timedelta(hours=1))
    now_01_00 = now.replace(hour=3, tzinfo=next_hour_timezone)
    assert now == now_01_00

    posts = [
        post_model_time(created=time_point) for time_point in (now, now_p10, now_m10)
    ]
    for post in posts:
        await post.save()

    expected_sorted_posts = sorted(posts, key=attrgetter("created"))

    assert (
        await post_model_time.find().sort_by("created").all() == expected_sorted_posts
    )
    assert await post_model_time.find(post_model_time.created == now).all() == [
        posts[0]
    ]
    assert await post_model_time.find(post_model_time.created == now_01_00).all() == [
        posts[0]
    ]

    post = await post_model_time.find(post_model_time.created == now).first()
    assert post.created == now == now_01_00

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
