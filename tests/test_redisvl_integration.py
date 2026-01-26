# type: ignore
"""Tests for RedisVL integration module."""

import abc
from typing import Optional

import pytest
import pytest_asyncio
from redisvl.index import AsyncSearchIndex, SearchIndex
from redisvl.schema import IndexSchema

from aredis_om import Field, HashModel, JsonModel, Migrator, VectorFieldOptions
from aredis_om.redisvl import get_redisvl_index, to_redisvl_schema

# We need to run this check as sync code (during tests) even in async mode
# because we call it in the top-level module scope.
from redis_om import has_redis_json

from .conftest import py_test_mark_asyncio

if not has_redis_json():
    pytestmark = pytest.mark.skip


DIMENSIONS = 128


@pytest_asyncio.fixture
async def json_model_with_vector(key_prefix, redis):
    """JsonModel with vector field for testing."""

    class BaseJsonModel(JsonModel, abc.ABC):
        class Meta:
            global_key_prefix = key_prefix
            database = redis

    vector_options = VectorFieldOptions.flat(
        type=VectorFieldOptions.TYPE.FLOAT32,
        dimension=DIMENSIONS,
        distance_metric=VectorFieldOptions.DISTANCE_METRIC.COSINE,
    )

    class Document(BaseJsonModel, index=True):
        title: str = Field(index=True)
        category: str = Field(index=True)
        content: str = Field(full_text_search=True)
        views: int = Field(index=True, sortable=True)
        embedding: list[float] = Field([], vector_options=vector_options)

    await Migrator(conn=redis).run()

    return Document


@pytest_asyncio.fixture
async def hash_model_indexed(key_prefix, redis):
    """HashModel with indexed fields for testing."""

    class BaseHashModel(HashModel, abc.ABC):
        class Meta:
            global_key_prefix = key_prefix
            database = redis

    class Product(BaseHashModel, index=True):
        name: str = Field(index=True)
        description: str = Field(full_text_search=True)
        price: float = Field(index=True, sortable=True)
        in_stock: bool = Field(index=True)

    await Migrator(conn=redis).run()

    return Product


@pytest_asyncio.fixture
async def non_indexed_model(key_prefix, redis):
    """Model without index=True for testing error cases."""

    class BaseJsonModel(JsonModel, abc.ABC):
        class Meta:
            global_key_prefix = key_prefix
            database = redis

    class SimpleModel(BaseJsonModel):
        name: str

    return SimpleModel


@py_test_mark_asyncio
async def test_to_redisvl_schema_json_model(json_model_with_vector):
    """Test converting a JsonModel to RedisVL schema."""
    Document = json_model_with_vector

    schema = to_redisvl_schema(Document)

    assert isinstance(schema, IndexSchema)
    assert schema.index.name == Document.Meta.index_name
    assert schema.index.storage_type.value == "json"

    # Check fields are present
    field_names = list(schema.fields.keys())
    assert "title" in field_names
    assert "category" in field_names
    assert "content" in field_names
    assert "views" in field_names
    assert "embedding" in field_names


@py_test_mark_asyncio
async def test_to_redisvl_schema_hash_model(hash_model_indexed):
    """Test converting a HashModel to RedisVL schema."""
    Product = hash_model_indexed

    schema = to_redisvl_schema(Product)

    assert isinstance(schema, IndexSchema)
    assert schema.index.storage_type.value == "hash"

    field_names = list(schema.fields.keys())
    assert "name" in field_names
    assert "description" in field_names
    assert "price" in field_names
    assert "in_stock" in field_names


@py_test_mark_asyncio
async def test_to_redisvl_schema_non_indexed_raises(non_indexed_model):
    """Test that non-indexed models raise ValueError."""
    SimpleModel = non_indexed_model

    with pytest.raises(ValueError, match="is not indexed"):
        to_redisvl_schema(SimpleModel)


@py_test_mark_asyncio
async def test_get_redisvl_index_async(json_model_with_vector):
    """Test getting an async RedisVL index."""
    Document = json_model_with_vector

    index = get_redisvl_index(Document, async_client=True)

    assert isinstance(index, AsyncSearchIndex)
    assert index.schema.index.name == Document.Meta.index_name


@py_test_mark_asyncio
async def test_get_redisvl_index_sync(json_model_with_vector):
    """Test getting a sync RedisVL index."""
    Document = json_model_with_vector

    index = get_redisvl_index(Document, async_client=False)

    assert isinstance(index, SearchIndex)
    assert index.schema.index.name == Document.Meta.index_name
