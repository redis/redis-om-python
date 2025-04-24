# type: ignore
import abc
import time

import pytest_asyncio

from aredis_om import Field, JsonModel, KNNExpression, Migrator, VectorFieldOptions

from .conftest import py_test_mark_asyncio


vector_field_options = VectorFieldOptions.flat(
    type=VectorFieldOptions.TYPE.FLOAT32,
    dimension=768,
    distance_metric=VectorFieldOptions.DISTANCE_METRIC.COSINE,
)


@pytest_asyncio.fixture
async def m(key_prefix, redis):
    class BaseJsonModel(JsonModel, abc.ABC):
        class Meta:
            global_key_prefix = key_prefix
            database = redis

    class Member(BaseJsonModel, index=True):
        name: str
        embeddings: list[list[float]] = Field([], vector_options=vector_field_options)
        embeddings_score: float | None = None

    await Migrator().run()

    return Member


@pytest_asyncio.fixture
async def embedding_bytes():
    return b"\x00" * 3072


@py_test_mark_asyncio
async def test_vector_field(m: type[JsonModel], embedding_bytes):
    # Create a new instance of the Member model
    member = m(name="seth", embeddings=[[0.1, 0.2, 0.3]])

    # Save the member to Redis
    mt = await member.save()

    assert m.get(mt.pk)

    time.sleep(1)

    knn = KNNExpression(
        k=1,
        vector_field=m.embeddings,
        score_field=m.embeddings_score,
        reference_vector=embedding_bytes,
    )

    query = m.find()

    members = await query.all()

    assert len(members) == 1
    assert members[0].embeddings_score is not None
