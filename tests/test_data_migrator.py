from types import SimpleNamespace

from aredis_om.model.migrations.data import DataMigrator

from .conftest import py_test_mark_asyncio


@py_test_mark_asyncio
async def test_dry_run_monitoring_result_preserves_its_original_shape(monkeypatch):
    migrator = DataMigrator(redis_client=object(), load_builtin_migrations=False)

    async def get_pending_migrations():
        return [SimpleNamespace(migration_id="one", description="First migration")]

    monkeypatch.setattr(migrator, "get_pending_migrations", get_pending_migrations)

    result = await migrator.run_migrations_with_monitoring(dry_run=True)

    assert result.keys() == {
        "applied_count",
        "total_migrations",
        "performance_stats",
        "errors",
        "dry_run",
    }
    assert result["applied_count"] == 1
    assert result["dry_run"] is True
