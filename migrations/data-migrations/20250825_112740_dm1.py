"""  # noqa: E272, E241, E271
Data migration: dm1

Created: 2025-08-25 11:27:40
"""

from aredis_om.model.migrations.data_migrator import BaseMigration


class Dm1Migration(BaseMigration):
    migration_id = "20250825_112740_dm1"
    description = "Dm1"
    dependencies = []  # List of migration IDs that must run first

    async def up(self) -> None:
        """Apply the migration."""
        # TODO: Implement your migration logic here
        pass

    async def down(self) -> None:
        """Reverse the migration (optional)."""
        # TODO: Implement rollback logic here (optional)
        pass

    async def can_run(self) -> bool:
        """Check if the migration can run (optional validation)."""
        return True
