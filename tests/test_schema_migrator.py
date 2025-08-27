import os
import tempfile

import pytest

from aredis_om.model.migrations.migrator import schema_hash_key, schema_text_key
from aredis_om.model.migrations.schema_migrator import SchemaMigrator


pytestmark = pytest.mark.asyncio


async def test_create_migration_file_when_no_ops(redis, monkeypatch):
    # Empty environment: no pending ops detected -> None
    
    # Temporarily clear the model registry to ensure clean environment
    from aredis_om.model.model import model_registry
    original_registry = model_registry.copy()
    model_registry.clear()
    
    try:
        with tempfile.TemporaryDirectory() as tmp:
            migrator = SchemaMigrator(redis_client=redis, migrations_dir=tmp)
            fp = await migrator.create_migration_file("noop")
            assert fp is None
    finally:
        # Restore the original registry
        model_registry.clear()
        model_registry.update(original_registry)


async def test_create_and_status_empty(redis):
    with tempfile.TemporaryDirectory() as tmp:
        migrator = SchemaMigrator(redis_client=redis, migrations_dir=tmp)
        status = await migrator.status()
        assert status["total_migrations"] == 0
        assert status["applied_count"] == 0
        assert status["pending_count"] == 0


async def test_rollback_noop(redis):
    with tempfile.TemporaryDirectory() as tmp:
        migrator = SchemaMigrator(redis_client=redis, migrations_dir=tmp)
        # Missing migration id should raise
        with pytest.raises(Exception):
            await migrator.rollback("missing", dry_run=True, verbose=True)
