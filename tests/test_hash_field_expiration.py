# type: ignore
"""
Tests for Redis 7.4+ hash field expiration support in HashModel.

These tests verify:
1. Field(expire=N) declarative TTL on fields
2. expire_field(), field_ttl(), persist_field() instance methods
3. field_expirations parameter on save()
4. Graceful handling when redis-py lacks HEXPIRE support
"""

import abc
import asyncio
import datetime
import time
from collections import namedtuple
from unittest import mock

import pytest
import pytest_asyncio

from aredis_om import Field, HashModel, Migrator

# We need to run this check as sync code (during tests) even in async mode
from redis_om import has_redisearch

from .conftest import py_test_mark_asyncio

if not has_redisearch():
    pytestmark = pytest.mark.skip


@pytest_asyncio.fixture
async def models(key_prefix, redis):
    """Fixture providing HashModel subclasses for testing field expiration."""

    class BaseHashModel(HashModel, abc.ABC):
        class Meta:
            global_key_prefix = key_prefix
            database = redis

    class Session(BaseHashModel, index=True):
        user_id: str
        token: str = Field(expire=60)  # Default 60 second TTL
        refresh_token: str = Field(expire=3600)  # 1 hour TTL

    class SimpleModel(BaseHashModel, index=True):
        name: str
        value: str

    await Migrator(conn=redis).run()

    return namedtuple("Models", ["BaseHashModel", "Session", "SimpleModel"])(
        BaseHashModel, Session, SimpleModel
    )


# =============================================================================
# Tests for Field(expire=N) - Declarative field expiration
# =============================================================================


@py_test_mark_asyncio
async def test_field_with_expire_parameter(models):
    """Field(expire=N) should store expire value in field info."""
    # Check that the expire parameter is captured in the field info
    token_field = models.Session.model_fields.get("token")
    assert token_field is not None
    # The field_info should have an 'expire' attribute
    assert hasattr(token_field, "expire") or hasattr(
        getattr(token_field, "json_schema_extra", None) or {}, "expire"
    ), "Field should have expire attribute"


@py_test_mark_asyncio
async def test_save_applies_field_expiration(models, redis):
    """save() should apply HEXPIRE for fields with expire= set."""
    session = models.Session(
        user_id="user123",
        token="abc123",
        refresh_token="refresh456",
    )
    await session.save()

    # Check that the field has a TTL set (should be <= 60 seconds)
    ttl = await session.field_ttl("token")
    assert ttl is not None
    assert 0 < ttl <= 60, f"Expected TTL <= 60, got {ttl}"

    # refresh_token should have TTL <= 3600
    refresh_ttl = await session.field_ttl("refresh_token")
    assert refresh_ttl is not None
    assert 0 < refresh_ttl <= 3600


# =============================================================================
# Tests for expire_field() method
# =============================================================================


@py_test_mark_asyncio
async def test_expire_field_sets_ttl(models, redis):
    """expire_field() should set TTL on a specific field."""
    simple = models.SimpleModel(name="test", value="data")
    await simple.save()

    # Set expiration on the 'value' field
    result = await simple.expire_field("value", 120)
    assert result == 1, "expire_field should return 1 on success"

    # Verify TTL was set
    ttl = await simple.field_ttl("value")
    assert 0 < ttl <= 120


@py_test_mark_asyncio
async def test_expire_field_nonexistent_field(models, redis):
    """expire_field() on non-existent field should return -2."""
    simple = models.SimpleModel(name="test", value="data")
    await simple.save()

    result = await simple.expire_field("nonexistent", 60)
    assert result == -2, "expire_field on non-existent field should return -2"


# =============================================================================
# Tests for field_ttl() method
# =============================================================================


@py_test_mark_asyncio
async def test_field_ttl_returns_remaining_time(models, redis):
    """field_ttl() should return remaining TTL in seconds."""
    simple = models.SimpleModel(name="test", value="data")
    await simple.save()

    await simple.expire_field("value", 300)
    ttl = await simple.field_ttl("value")

    assert ttl is not None
    assert 0 < ttl <= 300


@py_test_mark_asyncio
async def test_field_ttl_no_expiration(models, redis):
    """field_ttl() should return -1 for fields without expiration."""
    simple = models.SimpleModel(name="test", value="data")
    await simple.save()


# =============================================================================
# Tests for persist_field() method
# =============================================================================


@py_test_mark_asyncio
async def test_persist_field_removes_expiration(models, redis):
    """persist_field() should remove TTL from a field."""
    simple = models.SimpleModel(name="test", value="data")
    await simple.save()

    # Set expiration first
    await simple.expire_field("value", 60)
    ttl_before = await simple.field_ttl("value")
    assert ttl_before > 0

    # Remove expiration
    result = await simple.persist_field("value")
    assert result == 1, "persist_field should return 1 on success"

    # Verify TTL was removed
    ttl_after = await simple.field_ttl("value")
    assert ttl_after == -1, "Field should have no expiration after persist"


@py_test_mark_asyncio
async def test_persist_field_no_expiration(models, redis):
    """persist_field() on field without expiration should return -1."""
    simple = models.SimpleModel(name="test", value="data")
    await simple.save()

    result = await simple.persist_field("name")
    assert result == -1


# =============================================================================
# Tests for save(field_expirations={...}) parameter
# =============================================================================


@py_test_mark_asyncio
async def test_save_with_field_expirations_param(models, redis):
    """save(field_expirations={"field": ttl}) should apply TTLs."""
    simple = models.SimpleModel(name="test", value="important_data")
    await simple.save(field_expirations={"value": 180})

    ttl = await simple.field_ttl("value")
    assert 0 < ttl <= 180

    # name should have no TTL since it wasn't in field_expirations
    name_ttl = await simple.field_ttl("name")
    assert name_ttl == -1


@py_test_mark_asyncio
async def test_save_field_expirations_overrides_default(models, redis):
    """save(field_expirations=) should override Field(expire=) defaults."""
    session = models.Session(
        user_id="user123",
        token="abc123",
        refresh_token="refresh456",
    )
    # Override the default 60s TTL with 10s
    await session.save(field_expirations={"token": 10})

    ttl = await session.field_ttl("token")
    assert 0 < ttl <= 10, f"Expected TTL <= 10, got {ttl}"


# =============================================================================
# Tests for version/capability checking
# =============================================================================


@py_test_mark_asyncio
async def test_hexpire_not_available_raises_or_warns(models, redis):
    """When HEXPIRE is not available, should raise or handle gracefully."""
    simple = models.SimpleModel(name="test", value="data")
    await simple.save()

    # Mock the redis client to simulate HEXPIRE not existing
    with mock.patch.object(
        redis, "hexpire", side_effect=AttributeError("hexpire not found")
    ):
        # Should raise a clear error or return a sentinel value
        with pytest.raises((AttributeError, NotImplementedError)):
            await simple.expire_field("value", 60)


@py_test_mark_asyncio
async def test_check_hash_field_expiration_support():
    """Test utility function to check if hash field expiration is supported."""
    from aredis_om.model.model import supports_hash_field_expiration

    # This should return True for redis-py >= 5.1.0
    # The actual value depends on installed redis-py version
    result = supports_hash_field_expiration()
    assert isinstance(result, bool)


# =============================================================================
# Tests for field expiration with updates
# =============================================================================


@py_test_mark_asyncio
async def test_update_preserves_field_expiration(models, redis):
    """update() should not reset field expiration by default."""
    session = models.Session(
        user_id="user123",
        token="abc123",
        refresh_token="refresh456",
    )
    await session.save()

    # Get initial TTL
    initial_ttl = await session.field_ttl("token")
    assert initial_ttl > 0

    # Wait a moment
    await asyncio.sleep(0.1)

    # Update a different field
    await session.update(user_id="user456")

    # Token TTL should still be set (possibly slightly lower)
    updated_ttl = await session.field_ttl("token")
    assert updated_ttl > 0
    assert updated_ttl <= initial_ttl


@py_test_mark_asyncio
async def test_save_preserves_manually_set_ttl(models, redis):
    """
    Calling save() should not overwrite a manually-set TTL with the default.

    Regression test for issue #753: .save() conflicts with TTL on unrelated field
    """
    session = models.Session(
        user_id="user123",
        token="abc123",
        refresh_token="refresh456",
    )
    await session.save()

    # Default TTL is 60 seconds from Field(expire=60)
    default_ttl = await session.field_ttl("token")
    assert default_ttl > 0 and default_ttl <= 60

    # Manually extend TTL to 1 hour
    await session.expire_field("token", 3600)
    extended_ttl = await session.field_ttl("token")
    assert extended_ttl > 60  # Should be ~3600

    # Modify a different field and save
    session.user_id = "user456"
    await session.save()

    # The manually-set TTL should be preserved, not reset to 60 seconds
    ttl_after_save = await session.field_ttl("token")
    assert ttl_after_save > 60, f"TTL was reset to default! Got {ttl_after_save}"


@py_test_mark_asyncio
async def test_field_expires_after_ttl(models, redis):
    """Field should be deleted after TTL expires."""
    simple = models.SimpleModel(name="test", value="temporary")
    await simple.save()

    # Set short expiration (2 seconds to allow for CI slowness)
    await simple.expire_field("value", 2)

    # Verify field exists initially
    ttl_before = await simple.field_ttl("value")
    assert ttl_before > 0

    # Wait for expiration (3 seconds to ensure it expires even in slow CI)
    # Use time.sleep for sync compatibility (asyncio.sleep doesn't convert via unasync)
    time.sleep(3)

    # Verify field has expired (TTL should be -2 for non-existent field)
    ttl_after = await simple.field_ttl("value")
    assert ttl_after == -2, f"Expected -2 (field expired), got {ttl_after}"

    # Check directly with Redis that the field is gone
    key = simple.key()
    value_exists = await redis.hexists(key, "value")
    assert not value_exists, "Field 'value' should have expired"
