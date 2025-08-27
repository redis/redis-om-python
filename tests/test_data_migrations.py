"""
Tests for the async data migration system.
"""

import datetime
import tempfile
from pathlib import Path
from unittest.mock import patch

import pytest
import pytest_asyncio

from aredis_om import Field, Migrator
from aredis_om.model.migrations.data_migrator import (
    BaseMigration,
    DataMigrationError,
    DataMigrator,
)
from aredis_om.model.model import HashModel, JsonModel

# We need to run this check as sync code (during tests) even in async mode
# because we call it in the top-level module scope.
from redis_om import has_redis_json

from .conftest import py_test_mark_asyncio


class MigrationTestHashModel(HashModel, index=True):
    name: str = Field(index=True)
    created_at: datetime.datetime = Field(index=True, sortable=True)

    class Meta:
        global_key_prefix = "test_migration"


class MigrationTestJsonModel(JsonModel, index=True):
    name: str = Field(index=True)
    created_at: datetime.datetime = Field(index=True, sortable=True)

    class Meta:
        global_key_prefix = "test_migration"


class SampleMigration(BaseMigration):
    migration_id = "001_test_migration"
    description = "Test migration"
    dependencies = []

    def __init__(self, redis_client=None):
        super().__init__(redis_client)
        self.executed = False
        self.rolled_back = False

    async def up(self):
        self.executed = True

    async def down(self):
        self.rolled_back = True


class DependentMigration(BaseMigration):
    migration_id = "002_dependent_migration"
    description = "Migration with dependencies"
    dependencies = ["001_test_migration"]

    def __init__(self, redis_client=None):
        super().__init__(redis_client)
        self.executed = False

    async def up(self):
        self.executed = True


class FailingMigration(BaseMigration):
    migration_id = "003_failing_migration"
    description = "Migration that fails"
    dependencies = []

    def __init__(self, redis_client=None):
        super().__init__(redis_client)

    async def up(self):
        raise Exception("Migration failed")


class NoRollbackMigration(BaseMigration):
    migration_id = "004_no_rollback"
    description = "Migration without rollback support"
    dependencies = []

    def __init__(self, redis_client=None):
        super().__init__(redis_client)
        self.executed = False

    async def up(self):
        self.executed = True

    # No down method - rollback not supported


@pytest_asyncio.fixture
async def migrator():
    """Create a DataMigrator instance for testing."""
    import uuid

    migrator = DataMigrator(load_builtin_migrations=False)
    # Use unique key for each test to avoid parallel test interference
    unique_key = f"redis_om:applied_migrations:test:{uuid.uuid4()}"
    migrator.APPLIED_MIGRATIONS_KEY = unique_key
    # Clean up any existing migrations from previous tests
    await migrator.redis.delete(migrator.APPLIED_MIGRATIONS_KEY)
    yield migrator
    # Clean up after the test
    await migrator.redis.delete(migrator.APPLIED_MIGRATIONS_KEY)


@pytest.fixture
def sample_migrations():
    """Create sample migration instances."""
    return [
        SampleMigration(),
        DependentMigration(),
        FailingMigration(),
        NoRollbackMigration(),
    ]


@py_test_mark_asyncio
async def test_migration_discovery_empty(migrator):
    """Test migration discovery with no migrations."""
    migrations = await migrator.discover_migrations()

    # Should find no migrations since built-in migrations are disabled in test fixture
    assert len(migrations) == 0


@py_test_mark_asyncio
async def test_migration_discovery_from_module(migrator, sample_migrations):
    """Test migration discovery from module."""
    # Mock module loading
    migrator._discovered_migrations = {m.migration_id: m for m in sample_migrations}

    migrations = await migrator.discover_migrations()

    assert len(migrations) == 4
    assert "001_test_migration" in migrations
    assert "002_dependent_migration" in migrations


@py_test_mark_asyncio
async def test_applied_migrations_tracking(migrator):
    """Test tracking of applied migrations."""
    # Initially no migrations applied
    applied = await migrator.get_applied_migrations()
    assert len(applied) == 0

    # Mark migration as applied
    await migrator.mark_migration_applied("001_test_migration")
    applied = await migrator.get_applied_migrations()
    assert "001_test_migration" in applied

    # Mark migration as unapplied
    await migrator.mark_migration_unapplied("001_test_migration")
    applied = await migrator.get_applied_migrations()
    assert "001_test_migration" not in applied


@py_test_mark_asyncio
async def test_topological_sort(migrator, sample_migrations):
    """Test dependency sorting of migrations."""
    migrations_dict = {m.migration_id: m for m in sample_migrations}

    sorted_ids = migrator._topological_sort(migrations_dict)

    # Should sort by dependencies: 001 before 002
    assert sorted_ids.index("001_test_migration") < sorted_ids.index(
        "002_dependent_migration"
    )


@py_test_mark_asyncio
async def test_topological_sort_circular_dependency(migrator):
    """Test detection of circular dependencies."""

    class CircularA(BaseMigration):
        migration_id = "circular_a"
        dependencies = ["circular_b"]

        async def up(self):
            pass

    class CircularB(BaseMigration):
        migration_id = "circular_b"
        dependencies = ["circular_a"]

        async def up(self):
            pass

    migrations = {"circular_a": CircularA(), "circular_b": CircularB()}

    with pytest.raises(DataMigrationError, match="Circular dependency"):
        migrator._topological_sort(migrations)


@py_test_mark_asyncio
async def test_topological_sort_missing_dependency(migrator):
    """Test detection of missing dependencies."""

    class MissingDepMigration(BaseMigration):
        migration_id = "missing_dep"
        dependencies = ["nonexistent"]

        async def up(self):
            pass

    migrations = {"missing_dep": MissingDepMigration()}

    with pytest.raises(DataMigrationError, match="depends on nonexistent"):
        migrator._topological_sort(migrations)


@py_test_mark_asyncio
async def test_get_pending_migrations(migrator, sample_migrations):
    """Test getting pending migrations."""
    migrator._discovered_migrations = {m.migration_id: m for m in sample_migrations}

    # All migrations should be pending initially
    pending = await migrator.get_pending_migrations()
    assert len(pending) == 4

    # Mark one as applied
    await migrator.mark_migration_applied("001_test_migration")
    pending = await migrator.get_pending_migrations()
    assert len(pending) == 3
    assert all(m.migration_id != "001_test_migration" for m in pending)


@py_test_mark_asyncio
async def test_migration_status(migrator, sample_migrations):
    """Test migration status reporting."""
    migrator._discovered_migrations = {m.migration_id: m for m in sample_migrations}

    status = await migrator.status()

    assert status["total_migrations"] == 4
    assert status["applied_count"] == 0
    assert status["pending_count"] == 4

    # Apply a migration and check status
    await migrator.mark_migration_applied("001_test_migration")
    status = await migrator.status()

    assert status["applied_count"] == 1
    assert status["pending_count"] == 3
    assert "001_test_migration" in status["applied_migrations"]


@py_test_mark_asyncio
async def test_run_migrations_success(migrator):
    """Test successful migration execution."""
    sample_migration = SampleMigration()
    migrator._discovered_migrations = {sample_migration.migration_id: sample_migration}

    count = await migrator.run_migrations()

    assert count == 1
    assert sample_migration.executed

    # Check that migration is marked as applied
    applied = await migrator.get_applied_migrations()
    assert sample_migration.migration_id in applied


@py_test_mark_asyncio
async def test_run_migrations_dry_run(migrator):
    """Test dry run mode."""
    sample_migration = SampleMigration()
    migrator._discovered_migrations = {sample_migration.migration_id: sample_migration}

    count = await migrator.run_migrations(dry_run=True)

    assert count == 1
    assert not sample_migration.executed  # Should not actually execute

    # Check that migration is not marked as applied
    applied = await migrator.get_applied_migrations()
    assert sample_migration.migration_id not in applied


@py_test_mark_asyncio
async def test_run_migrations_with_limit(migrator, sample_migrations):
    """Test running migrations with limit."""
    # Use only non-failing migrations for this test
    non_failing_migrations = [
        m for m in sample_migrations if not isinstance(m, FailingMigration)
    ]
    migrator._discovered_migrations = {
        m.migration_id: m for m in non_failing_migrations
    }

    count = await migrator.run_migrations(limit=2)

    assert count == 2


@py_test_mark_asyncio
async def test_run_migrations_failure(migrator):
    """Test migration failure handling."""
    failing_migration = FailingMigration()
    migrator._discovered_migrations = {
        failing_migration.migration_id: failing_migration
    }

    with pytest.raises(DataMigrationError, match="Migration failed"):
        await migrator.run_migrations()

    # Failed migration should not be marked as applied
    applied = await migrator.get_applied_migrations()
    assert failing_migration.migration_id not in applied


@py_test_mark_asyncio
async def test_rollback_migration_success(migrator):
    """Test successful migration rollback."""
    sample_migration = SampleMigration()
    migrator._discovered_migrations = {sample_migration.migration_id: sample_migration}

    # Apply migration first
    await migrator.run_migrations()
    assert sample_migration.executed

    # Rollback
    success = await migrator.rollback_migration(sample_migration.migration_id)

    assert success
    assert sample_migration.rolled_back

    # Check that migration is no longer marked as applied
    applied = await migrator.get_applied_migrations()
    assert sample_migration.migration_id not in applied


@py_test_mark_asyncio
async def test_rollback_migration_not_applied(migrator):
    """Test rollback of unapplied migration."""
    sample_migration = SampleMigration()
    migrator._discovered_migrations = {sample_migration.migration_id: sample_migration}

    success = await migrator.rollback_migration(sample_migration.migration_id)

    assert not success


@py_test_mark_asyncio
async def test_rollback_migration_not_supported(migrator):
    """Test rollback of migration that doesn't support it."""
    no_rollback_migration = NoRollbackMigration()
    migrator._discovered_migrations = {
        no_rollback_migration.migration_id: no_rollback_migration
    }

    # Apply migration first
    await migrator.run_migrations()

    # Try rollback
    success = await migrator.rollback_migration(no_rollback_migration.migration_id)

    assert not success


@py_test_mark_asyncio
async def test_rollback_nonexistent_migration(migrator):
    """Test rollback of nonexistent migration."""
    with pytest.raises(DataMigrationError, match="not found"):
        await migrator.rollback_migration("nonexistent_migration")


@py_test_mark_asyncio
async def test_create_migration_file(migrator):
    """Test migration file creation."""
    with tempfile.TemporaryDirectory() as temp_dir:
        filepath = await migrator.create_migration_file("test_migration", temp_dir)

        assert Path(filepath).exists()
        assert "test_migration" in filepath

        # Check file content
        with open(filepath) as f:
            content = f.read()
            assert "TestMigrationMigration" in content
            assert "async def up" in content
            assert "async def down" in content


@py_test_mark_asyncio
async def test_migration_with_dependencies(migrator):
    """Test migration execution order with dependencies."""
    sample_migration = SampleMigration()
    dependent_migration = DependentMigration()

    migrator._discovered_migrations = {
        sample_migration.migration_id: sample_migration,
        dependent_migration.migration_id: dependent_migration,
    }

    count = await migrator.run_migrations()

    assert count == 2
    assert sample_migration.executed
    assert dependent_migration.executed


@py_test_mark_asyncio
async def test_datetime_migration_can_run():
    """Test that the datetime migration can run."""
    from aredis_om.model.migrations.datetime_migration import DatetimeFieldMigration

    migration = DatetimeFieldMigration()
    can_run = await migration.can_run()

    # Should be able to run if Redis is available
    assert isinstance(can_run, bool)


@py_test_mark_asyncio
async def test_hash_model_datetime_conversion(migrator):
    """Test datetime conversion in HashModel."""
    # Create test data
    test_model = MigrationTestHashModel(name="test", created_at=datetime.datetime.now())
    await test_model.save()

    # Get the raw data to check timestamp conversion
    raw_data = await MigrationTestHashModel.db().hgetall(test_model.key())

    # The created_at field should be stored as a timestamp (number)
    created_at_value = raw_data.get(b"created_at") or raw_data.get("created_at")
    if isinstance(created_at_value, bytes):
        created_at_value = created_at_value.decode("utf-8")

    # Should be able to parse as a float (timestamp)
    try:
        float(created_at_value)
        is_timestamp = True
    except (ValueError, TypeError):
        is_timestamp = False

    assert is_timestamp, f"Expected timestamp, got: {created_at_value}"

    # Retrieve the model to ensure conversion back works
    retrieved = await MigrationTestHashModel.get(test_model.pk)
    assert isinstance(retrieved.created_at, datetime.datetime)

    # Clean up
    await MigrationTestHashModel.db().delete(test_model.key())


# Note: JsonModel datetime conversion is already tested in test_datetime_fix.py
