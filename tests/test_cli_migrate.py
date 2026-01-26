import os
import subprocess
import sys
import tempfile


def test_migrate_status_and_run_and_create_cli():
    with tempfile.TemporaryDirectory() as tmp:
        env = os.environ.copy()
        env["REDIS_OM_MIGRATIONS_DIR"] = tmp
        env["REDIS_OM_URL"] = "redis://localhost:6380?decode_responses=True"

        # status should work with empty directory
        r = subprocess.run(
            [sys.executable, "-m", "aredis_om.cli.main", "migrate", "status"],
            env=env,
            capture_output=True,
            text=True,
            check=False,
        )
        assert r.returncode == 0
        assert "Schema Migration Status:" in r.stdout

        # run in dry-run mode should succeed even if nothing to run
        r = subprocess.run(
            [
                sys.executable,
                "-m",
                "aredis_om.cli.main",
                "migrate",
                "run",
                "-y",
                "--dry-run",
            ],
            env=env,
            capture_output=True,
            text=True,
            check=False,
        )
        assert r.returncode == 0

        # create should offer no snapshot if no pending changes
        r = subprocess.run(
            [
                sys.executable,
                "-m",
                "aredis_om.cli.main",
                "migrate",
                "create",
                "test_snap",
                "-y",
            ],
            env=env,
            capture_output=True,
            text=True,
            check=False,
        )
        assert r.returncode == 0
        assert "No pending schema changes detected" in r.stdout


def test_migrate_rollback_cli_dry_run():
    with tempfile.TemporaryDirectory() as tmp:
        schema_dir = os.path.join(tmp, "schema-migrations")
        os.makedirs(schema_dir, exist_ok=True)
        env = os.environ.copy()
        env["REDIS_OM_MIGRATIONS_DIR"] = tmp
        env["REDIS_OM_URL"] = "redis://localhost:6380?decode_responses=True"

        migration_id = "20240101_000000_test"
        file_path = os.path.join(schema_dir, f"{migration_id}.py")
        with open(file_path, "w") as f:
            f.write("""
from aredis_om.model.migrations.schema import BaseSchemaMigration


class TestSchemaMigration(BaseSchemaMigration):
    migration_id = "20240101_000000_test"
    description = "Test schema migration"

    async def up(self) -> None:
        pass

    async def down(self) -> None:
        pass
""")

        # status should show 1 pending
        r = subprocess.run(
            [sys.executable, "-m", "aredis_om.cli.main", "migrate", "status"],
            env=env,
            capture_output=True,
            text=True,
            check=False,
        )
        assert r.returncode == 0
        assert "Total migrations: 1" in r.stdout

        # rollback dry-run (not applied yet)
        r = subprocess.run(
            [
                sys.executable,
                "-m",
                "aredis_om.cli.main",
                "migrate",
                "rollback",
                migration_id,
                "--migrations-dir",
                schema_dir,
                "--dry-run",
                "-y",
            ],
            env=env,
            capture_output=True,
            text=True,
            check=False,
        )
        assert r.returncode == 0
