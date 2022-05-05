import abc
import datetime
from operator import attrgetter

import pytest_asyncio

from aredis_om import Field, Migrator, JsonModel, HashModel
from .conftest import py_test_mark_asyncio


# TODO: disable tests based on checks
@pytest_asyncio.fixture(params=[HashModel, JsonModel])
async def post_model(request, key_prefix):
    base_model = request.param

    class BaseJsonModel(base_model, abc.ABC):
        class Meta:
            global_key_prefix = key_prefix

    class Post(BaseJsonModel):
        created: datetime.datetime = Field(index=True)

    await Migrator().run()
    return Post


@py_test_mark_asyncio
async def test_time(post_model):
    now = datetime.datetime(1980, 1, 1, hour=2, second=20, tzinfo=datetime.timezone.utc)
    now_p10 = now + datetime.timedelta(seconds=10)
    now_m10 = now - datetime.timedelta(seconds=10)

    next_hour_timezone = datetime.timezone(datetime.timedelta(hours=1))
    now_01_00 = now.replace(hour=3, tzinfo=next_hour_timezone)
    assert now == now_01_00

    posts = [post_model(created=time_point) for time_point in (now, now_p10, now_m10)]
    for post in posts:
        await post.save()

    expected_sorted_posts = sorted(posts, key=attrgetter("created"))

    assert await post_model.find().sort_by("created").all() == expected_sorted_posts
    assert await post_model.find(post_model.created == now).all() == [posts[0]]
    assert await post_model.find(post_model.created == now_01_00).all() == [posts[0]]

    post = await post_model.find(post_model.created == now).first()
    assert post.created == now == now_01_00

    assert (
        await post_model.find(post_model.created < now_p10).sort_by("created").all()
        == expected_sorted_posts[:2]
    )
    assert (
        await post_model.find(post_model.created < now).sort_by("created").all()
        == expected_sorted_posts[:1]
    )
    assert (
        await post_model.find(post_model.created < now_m10).sort_by("created").all()
        == []
    )
