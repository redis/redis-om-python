# type: ignore
"""Tests for issue #488: TAG field separator support.

This module tests that the `separator` parameter in Field() is properly
supported for TAG fields in both HashModel and JsonModel, allowing users
to specify custom separators (e.g., comma) instead of the default pipe.
"""

import abc

import pytest
import pytest_asyncio

from aredis_om import Field, HashModel, JsonModel, Migrator
from aredis_om.model.model import SINGLE_VALUE_TAG_FIELD_SEPARATOR

# We need to run this check as sync code (during tests) even in async mode
from redis_om import has_redisearch

from .conftest import py_test_mark_asyncio

if not has_redisearch():
    pytestmark = pytest.mark.skip


class TestFieldSeparatorParameter:
    """Test that Field() accepts and stores the separator parameter."""

    def test_field_accepts_separator_parameter(self):
        """Field() should accept a separator parameter without error."""
        field = Field(index=True, separator=",")
        assert hasattr(field, "separator")
        assert field.separator == ","

    def test_field_default_separator_is_pipe(self):
        """Field() without separator should default to pipe."""
        field = Field(index=True)
        assert hasattr(field, "separator")
        assert field.separator == SINGLE_VALUE_TAG_FIELD_SEPARATOR
        assert field.separator == "|"

    def test_field_accepts_various_separators(self):
        """Field() should accept various separator characters."""
        for sep in [",", ";", ":", "/", "-", "_"]:
            field = Field(index=True, separator=sep)
            assert field.separator == sep


@pytest_asyncio.fixture
async def separator_models(key_prefix, redis):
    """Fixture providing models with custom separators for testing."""

    class BaseHashModel(HashModel, abc.ABC):
        class Meta:
            global_key_prefix = key_prefix
            database = redis

    class BaseJsonModel(JsonModel, abc.ABC):
        class Meta:
            global_key_prefix = key_prefix
            database = redis

    class HashDocWithCustomSeparator(BaseHashModel, index=True):
        name: str = Field(index=True)
        tags: str = Field(index=True, separator=",")

    class JsonDocWithCustomSeparator(BaseJsonModel, index=True):
        name: str = Field(index=True)
        tags: str = Field(index=True, separator=",")

    class HashDocWithDefaultSeparator(BaseHashModel, index=True):
        name: str = Field(index=True)
        tags: str = Field(index=True)  # Default pipe separator

    class JsonDocWithDefaultSeparator(BaseJsonModel, index=True):
        name: str = Field(index=True)
        tags: str = Field(index=True)  # Default pipe separator

    await Migrator(conn=redis).run()

    return {
        "HashCustom": HashDocWithCustomSeparator,
        "JsonCustom": JsonDocWithCustomSeparator,
        "HashDefault": HashDocWithDefaultSeparator,
        "JsonDefault": JsonDocWithDefaultSeparator,
    }


class TestSchemaGeneration:
    """Test that separator is used in schema generation."""

    @py_test_mark_asyncio
    async def test_hash_model_schema_uses_custom_separator(self, separator_models):
        """HashModel should use custom separator in FT.CREATE schema."""
        HashCustom = separator_models["HashCustom"]
        schema = HashCustom.redisearch_schema()

        # The tags field should use comma separator
        assert "tags TAG SEPARATOR ," in schema

    @py_test_mark_asyncio
    async def test_json_model_schema_uses_custom_separator(self, separator_models):
        """JsonModel should use custom separator in FT.CREATE schema."""
        JsonCustom = separator_models["JsonCustom"]
        schema = JsonCustom.redisearch_schema()

        # The tags field should use comma separator
        assert "tags TAG SEPARATOR ," in schema

    @py_test_mark_asyncio
    async def test_hash_model_schema_uses_default_separator(self, separator_models):
        """HashModel without custom separator should use pipe."""
        HashDefault = separator_models["HashDefault"]
        schema = HashDefault.redisearch_schema()

        # The tags field should use default pipe separator
        assert "tags TAG SEPARATOR |" in schema

    @py_test_mark_asyncio
    async def test_json_model_schema_uses_default_separator(self, separator_models):
        """JsonModel without custom separator should use pipe."""
        JsonDefault = separator_models["JsonDefault"]
        schema = JsonDefault.redisearch_schema()

        # The tags field should use default pipe separator
        assert "tags TAG SEPARATOR |" in schema


class TestEndToEndWithCustomSeparator:
    """End-to-end tests for custom separator functionality."""

    @py_test_mark_asyncio
    async def test_hash_model_save_and_query_with_custom_separator(
        self, separator_models
    ):
        """HashModel with custom separator should save and query correctly."""
        HashCustom = separator_models["HashCustom"]

        # Save a document with comma-separated tags
        doc = HashCustom(name="Test Doc", tags="tag1,tag2,tag3")
        await doc.save()

        # Query should find the document
        results = await HashCustom.find(HashCustom.name == "Test Doc").all()
        assert len(results) == 1
        assert results[0].tags == "tag1,tag2,tag3"

    @py_test_mark_asyncio
    async def test_json_model_save_and_query_with_custom_separator(
        self, separator_models
    ):
        """JsonModel with custom separator should save and query correctly."""
        JsonCustom = separator_models["JsonCustom"]

        # Save a document with comma-separated tags
        doc = JsonCustom(name="Test Doc", tags="tag1,tag2,tag3")
        await doc.save()

        # Query should find the document
        results = await JsonCustom.find(JsonCustom.name == "Test Doc").all()
        assert len(results) == 1
        assert results[0].tags == "tag1,tag2,tag3"

    @py_test_mark_asyncio
    async def test_hash_model_query_individual_tag_with_custom_separator(
        self, separator_models
    ):
        """HashModel should be able to query individual tags with custom separator."""
        HashCustom = separator_models["HashCustom"]

        # Save documents with different tags
        doc1 = HashCustom(name="Doc 1", tags="python,redis")
        doc2 = HashCustom(name="Doc 2", tags="javascript,redis")
        doc3 = HashCustom(name="Doc 3", tags="python,mongodb")
        await doc1.save()
        await doc2.save()
        await doc3.save()

        # Query for documents with "redis" tag
        results = await HashCustom.find(HashCustom.tags == "redis").all()
        assert len(results) == 2
        names = {r.name for r in results}
        assert names == {"Doc 1", "Doc 2"}

        # Query for documents with "python" tag
        results = await HashCustom.find(HashCustom.tags == "python").all()
        assert len(results) == 2
        names = {r.name for r in results}
        assert names == {"Doc 1", "Doc 3"}

    @py_test_mark_asyncio
    async def test_json_model_query_individual_tag_with_custom_separator(
        self, separator_models
    ):
        """JsonModel should be able to query individual tags with custom separator."""
        JsonCustom = separator_models["JsonCustom"]

        # Save documents with different tags
        doc1 = JsonCustom(name="Doc 1", tags="python,redis")
        doc2 = JsonCustom(name="Doc 2", tags="javascript,redis")
        doc3 = JsonCustom(name="Doc 3", tags="python,mongodb")
        await doc1.save()
        await doc2.save()
        await doc3.save()

        # Query for documents with "redis" tag
        results = await JsonCustom.find(JsonCustom.tags == "redis").all()
        assert len(results) == 2
        names = {r.name for r in results}
        assert names == {"Doc 1", "Doc 2"}

        # Query for documents with "python" tag
        results = await JsonCustom.find(JsonCustom.tags == "python").all()
        assert len(results) == 2
        names = {r.name for r in results}
        assert names == {"Doc 1", "Doc 3"}

    @py_test_mark_asyncio
    async def test_default_separator_still_works(self, separator_models):
        """Default pipe separator should continue to work correctly."""
        HashDefault = separator_models["HashDefault"]

        # Save documents with pipe-separated tags
        doc1 = HashDefault(name="Doc 1", tags="python|redis")
        doc2 = HashDefault(name="Doc 2", tags="javascript|redis")
        await doc1.save()
        await doc2.save()

        # Query for documents with "redis" tag
        results = await HashDefault.find(HashDefault.tags == "redis").all()
        assert len(results) == 2
        names = {r.name for r in results}
        assert names == {"Doc 1", "Doc 2"}


class TestFullTextSearchWithCustomSeparator:
    """Test full-text search fields with custom separator."""

    @py_test_mark_asyncio
    async def test_full_text_search_schema_uses_custom_separator(
        self, key_prefix, redis
    ):
        """Full-text search fields should use custom separator in schema."""

        class DocWithFTS(JsonModel, index=True):
            title: str = Field(index=True, full_text_search=True, separator=",")

            class Meta:
                global_key_prefix = key_prefix
                database = redis

        schema = DocWithFTS.redisearch_schema()

        # Should have TAG with custom separator AND TEXT field
        assert "title TAG SEPARATOR ," in schema
        assert "title_fts TEXT" in schema


class TestEdgeCases:
    """Test edge cases for separator functionality."""

    def test_separator_with_non_indexed_field(self):
        """Separator on non-indexed field should be stored but not affect schema."""
        field = Field(index=False, separator=",")
        assert field.separator == ","

    @py_test_mark_asyncio
    async def test_multiple_fields_with_different_separators(self, key_prefix, redis):
        """Multiple fields can have different separators."""

        class MultiSepDoc(JsonModel, index=True):
            comma_tags: str = Field(index=True, separator=",")
            semicolon_tags: str = Field(index=True, separator=";")
            default_tags: str = Field(index=True)  # Default pipe

            class Meta:
                global_key_prefix = key_prefix
                database = redis

        schema = MultiSepDoc.redisearch_schema()

        assert "comma_tags TAG SEPARATOR ," in schema
        assert "semicolon_tags TAG SEPARATOR ;" in schema
        assert "default_tags TAG SEPARATOR |" in schema

    @py_test_mark_asyncio
    async def test_primary_key_uses_default_separator(self, key_prefix, redis):
        """Primary key fields should use default separator."""

        class DocWithPK(JsonModel, index=True):
            custom_pk: str = Field(primary_key=True)
            tags: str = Field(index=True, separator=",")

            class Meta:
                global_key_prefix = key_prefix
                database = redis

        schema = DocWithPK.redisearch_schema()

        # Primary key should use default separator
        assert "custom_pk TAG SEPARATOR |" in schema
        # Tags should use custom separator
        assert "tags TAG SEPARATOR ," in schema
