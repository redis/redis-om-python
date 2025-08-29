import hashlib
import os
import tempfile
from unittest.mock import AsyncMock, patch

import pytest

from aredis_om.model.migrations.migrator import schema_hash_key, schema_text_key
from aredis_om.model.migrations.schema_migrator import (
    BaseSchemaMigration,
    SchemaMigrator,
)


def get_worker_id():
    """Get pytest-xdist worker ID for test isolation."""
    return os.environ.get("PYTEST_XDIST_WORKER", "main")


def get_worker_prefix():
    """Get worker-specific prefix for Redis keys and indices."""
    worker_id = get_worker_id()
    return f"worker_{worker_id}"


pytestmark = pytest.mark.asyncio


@pytest.fixture
async def clean_redis(redis):
    """Provide a clean Redis instance for schema migration tests."""
    worker_prefix = get_worker_prefix()

    # Worker-specific Redis keys
    applied_migrations_key = f"redis_om:schema_applied_migrations:{worker_prefix}"
    schema_key_pattern = f"redis_om:schema:*:{worker_prefix}"

    # Cleanup before test
    await redis.delete(applied_migrations_key)
    keys = await redis.keys(schema_key_pattern)
    if keys:
        await redis.delete(*keys)

    # Clean up any test indices for this worker
    for i in range(1, 20):
        for suffix in ["", "a", "b"]:
            index_name = f"test_index_{worker_prefix}_{i:03d}{suffix}"
            try:
                await redis.ft(index_name).dropindex()
            except Exception:
                pass

    yield redis

    # Cleanup after test
    await redis.delete(applied_migrations_key)
    keys = await redis.keys(schema_key_pattern)
    if keys:
        await redis.delete(*keys)

    # Clean up any test indices for this worker
    for i in range(1, 20):
        for suffix in ["", "a", "b"]:
            index_name = f"test_index_{worker_prefix}_{i:03d}{suffix}"
            try:
                await redis.ft(index_name).dropindex()
            except Exception:
                pass


async def test_create_migration_file_when_no_ops(redis, monkeypatch):
    # Empty environment: no pending ops detected -> None

    # Temporarily clear the model registry to ensure clean environment
    from aredis_om.model.model import model_registry

    original_registry = model_registry.copy()
    model_registry.clear()

    try:
        with tempfile.TemporaryDirectory() as tmp:
            migrator = _WorkerAwareSchemaMigrator(
                redis_client=redis, migrations_dir=tmp
            )
            fp = await migrator.create_migration_file("noop")
            assert fp is None
    finally:
        # Restore the original registry
        model_registry.clear()
        model_registry.update(original_registry)


async def test_create_and_status_empty(clean_redis):
    with tempfile.TemporaryDirectory() as tmp:
        migrator = _WorkerAwareSchemaMigrator(
            redis_client=clean_redis, migrations_dir=tmp
        )
        status = await migrator.status()
        assert status["total_migrations"] == 0
        assert status["applied_count"] == 0
        assert status["pending_count"] == 0


async def test_rollback_noop(redis):
    with tempfile.TemporaryDirectory() as tmp:
        migrator = _WorkerAwareSchemaMigrator(redis_client=redis, migrations_dir=tmp)
        # Missing migration id should raise
        with pytest.raises(Exception):
            await migrator.rollback("missing", dry_run=True, verbose=True)


class _WorkerAwareSchemaMigrator(SchemaMigrator):
    """SchemaMigrator that uses worker-specific Redis keys for test isolation."""

    def __init__(self, redis_client, migrations_dir):
        super().__init__(redis_client, migrations_dir)
        self.worker_prefix = get_worker_prefix()
        # Override the class constant with worker-specific key
        self.APPLIED_MIGRATIONS_KEY = (
            f"redis_om:schema_applied_migrations:{self.worker_prefix}"
        )

    async def mark_unapplied(self, migration_id: str):
        """Mark migration as unapplied using worker-specific key."""
        await self.redis.srem(self.APPLIED_MIGRATIONS_KEY, migration_id)


# Test helper classes for rollback testing
class _TestSchemaMigration(BaseSchemaMigration):
    """Test schema migration with rollback support."""

    def __init__(self, migration_id: str, operations: list, redis_client):
        self.migration_id = migration_id
        self.operations = operations
        self.redis = redis_client

    async def up(self) -> None:
        """Apply the migration operations."""
        worker_prefix = get_worker_prefix()
        for op in self.operations:
            index_name = op["index_name"]
            new_schema = op["new_schema"]
            # Create new index
            await self.redis.execute_command(f"FT.CREATE {index_name} {new_schema}")
            # Update tracking keys with worker isolation
            new_hash = hashlib.sha1(new_schema.encode("utf-8")).hexdigest()
            await self.redis.set(
                f"{schema_hash_key(index_name)}:{worker_prefix}", new_hash
            )
            await self.redis.set(
                f"{schema_text_key(index_name)}:{worker_prefix}", new_schema
            )

    async def down(self) -> None:
        """Rollback the migration operations."""
        worker_prefix = get_worker_prefix()
        for op in reversed(self.operations):
            index_name = op["index_name"]
            prev_schema = (op["previous_schema"] or "").strip()
            try:
                await self.redis.ft(index_name).dropindex()
            except Exception:
                pass
            if prev_schema:
                await self.redis.execute_command(
                    f"FT.CREATE {index_name} {prev_schema}"
                )
                prev_hash = hashlib.sha1(prev_schema.encode("utf-8")).hexdigest()
                await self.redis.set(
                    f"{schema_hash_key(index_name)}:{worker_prefix}", prev_hash
                )
                await self.redis.set(
                    f"{schema_text_key(index_name)}:{worker_prefix}", prev_schema
                )


class _TestSchemaMigrationNoRollback(BaseSchemaMigration):
    """Test schema migration without rollback support."""

    def __init__(self, migration_id: str, operations: list, redis_client):
        self.migration_id = migration_id
        self.operations = operations
        self.redis = redis_client

    async def up(self) -> None:
        """Apply the migration operations."""
        pass  # No-op for testing


async def test_rollback_successful_single_operation(clean_redis):
    """Test successful rollback of migration with single operation."""
    with tempfile.TemporaryDirectory() as tmp:
        migrator = _WorkerAwareSchemaMigrator(
            redis_client=clean_redis, migrations_dir=tmp
        )
        redis = clean_redis
        worker_prefix = get_worker_prefix()

        # Setup: Create initial index and tracking keys
        index_name = f"test_index_{worker_prefix}_001"
        original_schema = "SCHEMA title TEXT"
        new_schema = "SCHEMA title TEXT description TEXT"

        # Create original index
        await redis.execute_command(f"FT.CREATE {index_name} {original_schema}")
        original_hash = hashlib.sha1(original_schema.encode("utf-8")).hexdigest()
        await redis.set(f"{schema_hash_key(index_name)}:{worker_prefix}", original_hash)
        await redis.set(
            f"{schema_text_key(index_name)}:{worker_prefix}", original_schema
        )

        # Create and apply migration
        migration = _TestSchemaMigration(
            migration_id="001_add_description",
            operations=[
                {
                    "index_name": index_name,
                    "new_schema": new_schema,
                    "previous_schema": original_schema,
                }
            ],
            redis_client=redis,
        )

        # Drop original index and apply new one
        await redis.ft(index_name).dropindex()
        await migration.up()

        # Mark as applied
        await migrator.mark_applied("001_add_description")

        # Verify new schema is active
        new_hash = await redis.get(f"{schema_hash_key(index_name)}:{worker_prefix}")
        assert new_hash == hashlib.sha1(new_schema.encode("utf-8")).hexdigest()

        # Mock discover_migrations to return our test migration
        async def mock_discover():
            return {"001_add_description": migration}

        migrator.discover_migrations = mock_discover

        # Perform rollback
        success = await migrator.rollback("001_add_description", verbose=True)
        assert success is True

        # Verify rollback restored original schema
        restored_hash = await redis.get(
            f"{schema_hash_key(index_name)}:{worker_prefix}"
        )
        restored_text = await redis.get(
            f"{schema_text_key(index_name)}:{worker_prefix}"
        )
        assert restored_hash == original_hash
        assert restored_text == original_schema

        # Verify migration is marked as unapplied
        applied_migrations = await migrator.get_applied()
        assert "001_add_description" not in applied_migrations

        # Cleanup
        try:
            await redis.ft(index_name).dropindex()
        except Exception:
            pass


async def test_rollback_with_empty_previous_schema(redis):
    """Test rollback when previous_schema is empty (new index creation)."""
    with tempfile.TemporaryDirectory() as tmp:
        migrator = _WorkerAwareSchemaMigrator(redis_client=redis, migrations_dir=tmp)
        worker_prefix = get_worker_prefix()

        index_name = f"test_index_{worker_prefix}_002"
        new_schema = "SCHEMA title TEXT"

        # Create migration that creates new index (no previous schema)
        migration = _TestSchemaMigration(
            migration_id="002_create_index",
            operations=[
                {
                    "index_name": index_name,
                    "new_schema": new_schema,
                    "previous_schema": None,  # New index creation
                }
            ],
            redis_client=redis,
        )

        # Apply migration
        await migration.up()
        await migrator.mark_applied("002_create_index")

        # Verify index exists
        info = await redis.ft(index_name).info()
        assert info is not None

        # Mock discover_migrations
        async def mock_discover():
            return {"002_create_index": migration}

        migrator.discover_migrations = mock_discover

        # Perform rollback
        success = await migrator.rollback("002_create_index", verbose=True)
        assert success is True

        # Verify index was dropped and no new index was created
        with pytest.raises(Exception):  # Index should not exist
            await redis.ft(index_name).info()

        # Verify migration is marked as unapplied
        applied_migrations = await migrator.get_applied()
        assert "002_create_index" not in applied_migrations


async def test_rollback_multiple_operations(redis):
    """Test rollback of migration with multiple index operations."""
    with tempfile.TemporaryDirectory() as tmp:
        migrator = _WorkerAwareSchemaMigrator(redis_client=redis, migrations_dir=tmp)
        worker_prefix = get_worker_prefix()

        # Setup multiple indices
        index1_name = f"test_index_{worker_prefix}_003a"
        index2_name = f"test_index_{worker_prefix}_003b"

        original_schema1 = "SCHEMA title TEXT"
        original_schema2 = "SCHEMA name TAG"
        new_schema1 = "SCHEMA title TEXT description TEXT"
        new_schema2 = "SCHEMA name TAG category TAG"

        # Create original indices
        await redis.execute_command(f"FT.CREATE {index1_name} {original_schema1}")
        await redis.execute_command(f"FT.CREATE {index2_name} {original_schema2}")

        # Set up tracking
        hash1 = hashlib.sha1(original_schema1.encode("utf-8")).hexdigest()
        hash2 = hashlib.sha1(original_schema2.encode("utf-8")).hexdigest()
        await redis.set(f"{schema_hash_key(index1_name)}:{worker_prefix}", hash1)
        await redis.set(
            f"{schema_text_key(index1_name)}:{worker_prefix}", original_schema1
        )
        await redis.set(f"{schema_hash_key(index2_name)}:{worker_prefix}", hash2)
        await redis.set(
            f"{schema_text_key(index2_name)}:{worker_prefix}", original_schema2
        )

        # Create migration with multiple operations
        migration = _TestSchemaMigration(
            migration_id="003_update_multiple",
            operations=[
                {
                    "index_name": index1_name,
                    "new_schema": new_schema1,
                    "previous_schema": original_schema1,
                },
                {
                    "index_name": index2_name,
                    "new_schema": new_schema2,
                    "previous_schema": original_schema2,
                },
            ],
            redis_client=redis,
        )

        # Apply migration (drop old indices, create new ones)
        await redis.ft(index1_name).dropindex()
        await redis.ft(index2_name).dropindex()
        await migration.up()
        await migrator.mark_applied("003_update_multiple")

        # Mock discover_migrations
        async def mock_discover():
            return {"003_update_multiple": migration}

        migrator.discover_migrations = mock_discover

        # Perform rollback
        success = await migrator.rollback("003_update_multiple", verbose=True)
        assert success is True

        # Verify both indices were rolled back to original schemas
        restored_hash1 = await redis.get(
            f"{schema_hash_key(index1_name)}:{worker_prefix}"
        )
        restored_text1 = await redis.get(
            f"{schema_text_key(index1_name)}:{worker_prefix}"
        )
        restored_hash2 = await redis.get(
            f"{schema_hash_key(index2_name)}:{worker_prefix}"
        )
        restored_text2 = await redis.get(
            f"{schema_text_key(index2_name)}:{worker_prefix}"
        )

        assert restored_hash1 == hash1
        assert restored_text1 == original_schema1
        assert restored_hash2 == hash2
        assert restored_text2 == original_schema2

        # Cleanup
        try:
            await redis.ft(index1_name).dropindex()
            await redis.ft(index2_name).dropindex()
        except Exception:
            pass


async def test_rollback_not_supported(redis):
    """Test rollback of migration that doesn't support it."""
    with tempfile.TemporaryDirectory() as tmp:
        migrator = _WorkerAwareSchemaMigrator(redis_client=redis, migrations_dir=tmp)

        # Create migration without rollback support
        migration = _TestSchemaMigrationNoRollback(
            migration_id="004_no_rollback", operations=[], redis_client=redis
        )

        await migrator.mark_applied("004_no_rollback")

        # Mock discover_migrations
        async def mock_discover():
            return {"004_no_rollback": migration}

        migrator.discover_migrations = mock_discover

        # Perform rollback - should return False for unsupported rollback
        success = await migrator.rollback("004_no_rollback", verbose=True)
        assert success is False

        # Migration should still be marked as applied
        applied_migrations = await migrator.get_applied()
        assert "004_no_rollback" in applied_migrations


async def test_rollback_unapplied_migration(redis):
    """Test rollback of migration that was never applied."""
    with tempfile.TemporaryDirectory() as tmp:
        migrator = _WorkerAwareSchemaMigrator(redis_client=redis, migrations_dir=tmp)
        worker_prefix = get_worker_prefix()

        migration = _TestSchemaMigration(
            migration_id="005_unapplied",
            operations=[
                {
                    "index_name": f"test_index_{worker_prefix}_005",
                    "new_schema": "SCHEMA title TEXT",
                    "previous_schema": None,
                }
            ],
            redis_client=redis,
        )

        # Don't mark as applied

        # Mock discover_migrations
        async def mock_discover():
            return {"005_unapplied": migration}

        migrator.discover_migrations = mock_discover

        # Perform rollback of unapplied migration
        success = await migrator.rollback("005_unapplied", verbose=True)
        assert success is False  # Should return False for unapplied migration


async def test_rollback_dry_run(redis):
    """Test dry-run rollback functionality."""
    with tempfile.TemporaryDirectory() as tmp:
        migrator = _WorkerAwareSchemaMigrator(redis_client=redis, migrations_dir=tmp)
        worker_prefix = get_worker_prefix()

        index_name = f"test_index_{worker_prefix}_006"
        original_schema = "SCHEMA title TEXT"
        new_schema = "SCHEMA title TEXT description TEXT"

        # Setup migration and apply it
        migration = _TestSchemaMigration(
            migration_id="006_dry_run_test",
            operations=[
                {
                    "index_name": index_name,
                    "new_schema": new_schema,
                    "previous_schema": original_schema,
                }
            ],
            redis_client=redis,
        )

        await redis.execute_command(f"FT.CREATE {index_name} {new_schema}")
        new_hash = hashlib.sha1(new_schema.encode("utf-8")).hexdigest()
        await redis.set(f"{schema_hash_key(index_name)}:{worker_prefix}", new_hash)
        await redis.set(f"{schema_text_key(index_name)}:{worker_prefix}", new_schema)

        await migrator.mark_applied("006_dry_run_test")

        # Mock discover_migrations
        async def mock_discover():
            return {"006_dry_run_test": migration}

        migrator.discover_migrations = mock_discover

        # Perform dry-run rollback
        success = await migrator.rollback(
            "006_dry_run_test", dry_run=True, verbose=True
        )
        assert success is True

        # Verify nothing actually changed (dry run)
        current_hash = await redis.get(f"{schema_hash_key(index_name)}:{worker_prefix}")
        current_text = await redis.get(f"{schema_text_key(index_name)}:{worker_prefix}")
        assert current_hash == new_hash
        assert current_text == new_schema

        # Migration should still be marked as applied
        applied_migrations = await migrator.get_applied()
        assert "006_dry_run_test" in applied_migrations

        # Cleanup
        try:
            await redis.ft(index_name).dropindex()
        except Exception:
            pass


async def test_rollback_with_redis_command_failure(redis):
    """Test rollback behavior when Redis commands fail."""
    with tempfile.TemporaryDirectory() as tmp:
        migrator = _WorkerAwareSchemaMigrator(redis_client=redis, migrations_dir=tmp)
        worker_prefix = get_worker_prefix()

        index_name = f"test_index_{worker_prefix}_007"
        original_schema = "SCHEMA title TEXT"

        migration = _TestSchemaMigration(
            migration_id="007_redis_failure",
            operations=[
                {
                    "index_name": index_name,
                    "new_schema": "SCHEMA title TEXT description TEXT",
                    "previous_schema": original_schema,
                }
            ],
            redis_client=redis,
        )

        await migrator.mark_applied("007_redis_failure")

        # Mock discover_migrations
        async def mock_discover():
            return {"007_redis_failure": migration}

        migrator.discover_migrations = mock_discover

        # Mock Redis execute_command to fail on FT.CREATE
        original_execute = redis.execute_command

        async def failing_execute_command(*args, **kwargs):
            if args[0] == "FT.CREATE":
                raise Exception("Simulated Redis failure")
            return await original_execute(*args, **kwargs)

        redis.execute_command = failing_execute_command

        try:
            # Rollback should handle the Redis failure gracefully
            success = await migrator.rollback("007_redis_failure", verbose=True)
            # The rollback method should still complete, but index recreation fails
            assert success is True

            # Migration should still be marked as unapplied despite Redis failure
            applied_migrations = await migrator.get_applied()
            assert "007_redis_failure" not in applied_migrations

        finally:
            # Restore original execute_command
            redis.execute_command = original_execute


async def test_rollback_state_consistency(redis):
    """Test that rollback maintains consistent schema tracking state."""
    with tempfile.TemporaryDirectory() as tmp:
        migrator = _WorkerAwareSchemaMigrator(redis_client=redis, migrations_dir=tmp)
        worker_prefix = get_worker_prefix()

        index_name = f"test_index_{worker_prefix}_008"
        original_schema = "SCHEMA title TEXT"
        new_schema = "SCHEMA title TEXT description TEXT"

        # Setup: Create original index
        await redis.execute_command(f"FT.CREATE {index_name} {original_schema}")
        original_hash = hashlib.sha1(original_schema.encode("utf-8")).hexdigest()
        await redis.set(f"{schema_hash_key(index_name)}:{worker_prefix}", original_hash)
        await redis.set(
            f"{schema_text_key(index_name)}:{worker_prefix}", original_schema
        )

        migration = _TestSchemaMigration(
            migration_id="008_consistency_test",
            operations=[
                {
                    "index_name": index_name,
                    "new_schema": new_schema,
                    "previous_schema": original_schema,
                }
            ],
            redis_client=redis,
        )

        # Apply migration
        await redis.ft(index_name).dropindex()
        await migration.up()
        await migrator.mark_applied("008_consistency_test")

        # Verify new state
        new_hash = await redis.get(f"{schema_hash_key(index_name)}:{worker_prefix}")
        new_text = await redis.get(f"{schema_text_key(index_name)}:{worker_prefix}")
        expected_new_hash = hashlib.sha1(new_schema.encode("utf-8")).hexdigest()
        assert new_hash == expected_new_hash
        assert new_text == new_schema

        # Mock discover_migrations
        async def mock_discover():
            return {"008_consistency_test": migration}

        migrator.discover_migrations = mock_discover

        # Perform rollback
        success = await migrator.rollback("008_consistency_test", verbose=True)
        assert success is True

        # Verify complete state consistency after rollback
        restored_hash = await redis.get(
            f"{schema_hash_key(index_name)}:{worker_prefix}"
        )
        restored_text = await redis.get(
            f"{schema_text_key(index_name)}:{worker_prefix}"
        )

        # Hash and text should match original exactly
        assert restored_hash == original_hash
        assert restored_text == original_schema

        # Applied migrations should not contain our migration
        applied_migrations = await migrator.get_applied()
        assert "008_consistency_test" not in applied_migrations

        # Verify index actually exists and has correct schema (by trying to query it)
        try:
            info = await redis.ft(index_name).info()
            assert info is not None
        except Exception as e:
            pytest.fail(f"Index should exist after rollback: {e}")

        # Cleanup
        try:
            await redis.ft(index_name).dropindex()
        except Exception:
            pass
