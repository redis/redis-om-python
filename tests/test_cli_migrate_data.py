import os
import tempfile

from click.testing import CliRunner

from aredis_om.cli.main import om


def test_migrate_data_status_and_create_defaults():
    runner = CliRunner()
    with tempfile.TemporaryDirectory() as tmp:
        env = {"REDIS_OM_MIGRATIONS_DIR": tmp}

        # status uses <root>/data-migrations by default
        result = runner.invoke(om, ["migrate-data", "status"], env=env)
        assert result.exit_code == 0
        assert "Migration Status:" in result.output

        # create should create default directory when -y supplied
        result = runner.invoke(
            om,
            ["migrate-data", "create", "dm1", "-y"],
            env=env,
        )
        assert result.exit_code == 0
        assert "Created migration:" in result.output
