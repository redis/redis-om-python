# type: ignore
import abc
import struct
from typing import Optional, Type

import pytest
import pytest_asyncio

from aredis_om import Field, JsonModel, KNNExpression, Migrator, VectorFieldOptions

# We need to run this check as sync code (during tests) even in async mode
# because we call it in the top-level module scope.
from redis_om import has_redis_json

from .conftest import py_test_mark_asyncio


if not has_redis_json():
    pytestmark = pytest.mark.skip


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
        embeddings: list[float] = Field([], vector_options=vector_field_options)
        embeddings_score: Optional[float] = None

    await Migrator(conn=redis).run()

    return Member


@pytest_asyncio.fixture
async def n(key_prefix, redis):
    class BaseJsonModel(JsonModel, abc.ABC):
        class Meta:
            global_key_prefix = key_prefix
            database = redis

    class Member(BaseJsonModel, index=True):
        name: str
        nested: list[list[float]] = Field([], vector_options=vector_field_options)
        embeddings_score: Optional[float] = None

    await Migrator(conn=redis).run()

    return Member


def to_bytes(vectors: list[float]) -> bytes:
    return struct.pack(f"<{len(vectors)}f", *vectors)


@py_test_mark_asyncio
async def test_vector_field(m: Type[JsonModel]):
    # Create a new instance of the Member model
    vectors = [0.3 for _ in range(DIMENSIONS)]
    member = m(name="seth", embeddings=vectors)

    # Save the member to Redis
    await member.save()

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


@py_test_mark_asyncio
async def test_nested_vector_field(n: Type[JsonModel]):
    # Create a new instance of the Member model
    vectors = [0.3 for _ in range(DIMENSIONS)]
    member = n(name="seth", nested=[vectors])

    # Save the member to Redis
    await member.save()

    knn = KNNExpression(
        k=1,
        vector_field=n.nested,
        score_field=n.embeddings_score,
        reference_vector=to_bytes(vectors),
    )

    query = n.find(knn=knn)

    members = await query.all()

    assert len(members) == 1
    assert members[0].embeddings_score is not None



@pytest_asyncio.fixture
async def album_model(key_prefix, redis):
    """Fixture for testing OR expressions with KNN."""
    class BaseJsonModel(JsonModel, abc.ABC):
        class Meta:
            global_key_prefix = key_prefix
            database = redis

    vector_options = VectorFieldOptions.flat(
        type=VectorFieldOptions.TYPE.FLOAT32,
        dimension=2,
        distance_metric=VectorFieldOptions.DISTANCE_METRIC.COSINE,
    )

    class Album(BaseJsonModel, index=True):
        title: str = Field(primary_key=True)
        tags: str = Field(index=True)
        title_embeddings: list[float] = Field(
            [], index=True, vector_options=vector_options
        )
        embeddings_score: Optional[float] = None

    await Migrator(conn=redis).run()

    return Album


@py_test_mark_asyncio
async def test_or_expression_with_knn(album_model):
    """Test that OR expressions work correctly with KNN.

    Regression test for GitHub issue #557: Using an OR expression with a
    KNN expression raises ResponseError with syntax error.
    """
    Album = album_model

    # Create test data
    albums = [
        Album(
            title="Rumours",
            tags="Genre:rock|Decade:70s",
            title_embeddings=[0.7, 0.3],
        ),
        Album(
            title="Abbey Road",
            tags="Genre:rock|Decade:60s",
            title_embeddings=[0.6, 0.4],
        ),
        Album(
            title="The Dark Side Of The Moon",
            tags="Genre:prog-rock|Decade:70s",
            title_embeddings=[0.5, 0.5],
        ),
    ]
    for album in albums:
        await album.save()

    # Create OR expression
    or_expr = (Album.tags == "Genre:rock|Decade:70s") | (
        Album.tags == "Genre:rock|Decade:60s"
    )

    # Create KNN expression
    knn = KNNExpression(
        k=3,
        vector_field=Album.title_embeddings,
        score_field=Album.embeddings_score,
        reference_vector=to_bytes([0.65, 0.35]),
    )

    # Query with just OR expression (should work)
    or_results = await Album.find(or_expr).all()
    assert len(or_results) == 2

    # Query with just KNN (should work)
    knn_results = await Album.find(knn=knn).all()
    assert len(knn_results) == 3

    # Query with OR expression AND KNN (this was failing before the fix)
    combined_results = await Album.find(or_expr, knn=knn).all()
    # Should return only the 2 albums matching the OR expression
    assert len(combined_results) == 2
    # All results should have an embeddings score from KNN
    for result in combined_results:
        assert result.embeddings_score is not None
