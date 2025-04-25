# type: ignore
import abc
import time
import struct

import pytest_asyncio

from aredis_om import Field, JsonModel, KNNExpression, Migrator, VectorFieldOptions

from .conftest import py_test_mark_asyncio

DIMENSIONS = 768


vector_field_options = VectorFieldOptions.flat(
    type=VectorFieldOptions.TYPE.FLOAT32,
    dimension=DIMENSIONS,
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
        embeddings: list[list[float]] | bytes = Field(
            [], vector_options=vector_field_options
        )
        embeddings_score: float | None = None

    await Migrator().run()

    return Member


def to_bytes(vectors: list[float]) -> bytes:
    return struct.pack(f"<{len(vectors)}f", *vectors)


@py_test_mark_asyncio
async def test_vector_field(m: type[JsonModel]):
    # Create a new instance of the Member model
    vectors = [0.3 for _ in range(DIMENSIONS)]
    member = m(name="seth", embeddings=[vectors])

    # Save the member to Redis
    mt = await member.save()

    assert m.get(mt.pk)

    time.sleep(1)

    knn = KNNExpression(
        k=1,
        vector_field=m.embeddings,
        score_field=m.embeddings_score,
        reference_vector=to_bytes(vectors),
    )

    query = m.find(knn=knn)

    members = await query.all()

    assert len(members) == 1
    assert members[0].embeddings_score is not None
