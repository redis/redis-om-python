"""
Data migration system for Redis OM.

This module provides the DataMigrator class for managing data transformations
and migrations in Redis OM Python applications.
"""

import asyncio
import importlib
import importlib.util
import os
import time
from datetime import date, datetime
from pathlib import Path
from typing import Any, Callable, Dict, List, Optional, Set

import redis

from ....connections import get_redis_connection
from .base import BaseMigration, DataMigrationError, PerformanceMonitor


class DataMigrator:
    """
    Manages discovery, execution, and tracking of data migrations.

    Supports both file-based migrations in a directory and module-based migrations.
    Handles dependencies, rollback, and migration state tracking in Redis.
    """

    APPLIED_MIGRATIONS_KEY = "redis_om:applied_migrations"

    def __init__(
        self,
        redis_client: Optional[redis.Redis] = None,
        migrations_dir: Optional[str] = None,
        migration_module: Optional[str] = None,
        load_builtin_migrations: bool = True,
    ):
        self.redis = redis_client or get_redis_connection()
        self.migrations_dir = migrations_dir
        self.migration_module = migration_module
        self.load_builtin_migrations = load_builtin_migrations
        self._discovered_migrations: Dict[str, BaseMigration] = {}

    async def discover_migrations(self) -> Dict[str, BaseMigration]:
        """
        Discover all available migrations from files or modules.

        Returns:
            Dict[str, BaseMigration]: Mapping of migration_id to migration instance
        """
        if not self._discovered_migrations:
            if self.migrations_dir:
                await self._load_migrations_from_directory(self.migrations_dir)
            elif self.migration_module:
                await self._load_migrations_from_module(self.migration_module)
            elif self.load_builtin_migrations:
                # Default: try to load built-in migrations
                await self._load_builtin_migrations()

        return self._discovered_migrations

    async def _load_migrations_from_directory(self, migrations_dir: str) -> None:
        """Load migrations from Python files in a directory."""
        migrations_path = Path(migrations_dir)

        if not migrations_path.exists():
            return

        # Import all Python files in the migrations directory
        for file_path in migrations_path.glob("*.py"):
            if file_path.name == "__init__.py":
                continue

            # Dynamically import the migration file
            spec = importlib.util.spec_from_file_location(file_path.stem, file_path)
            if spec and spec.loader:
                module = importlib.util.module_from_spec(spec)
                spec.loader.exec_module(module)

                # Find all BaseMigration subclasses in the module
                for name in dir(module):
                    obj = getattr(module, name)
                    if (
                        isinstance(obj, type)
                        and issubclass(obj, BaseMigration)
                        and obj is not BaseMigration
                    ):
                        migration = obj(self.redis)
                        self._discovered_migrations[migration.migration_id] = migration

    async def _load_migrations_from_module(self, module_name: str) -> None:
        """Load migrations from a Python module."""
        try:
            module = importlib.import_module(module_name)
        except ImportError:
            raise DataMigrationError(
                f"Could not import migration module: {module_name}"
            )

        # Look for MIGRATIONS list or find BaseMigration subclasses
        if hasattr(module, "MIGRATIONS"):
            for migration_cls in module.MIGRATIONS:
                migration = migration_cls(self.redis)
                self._discovered_migrations[migration.migration_id] = migration
        else:
            # Find all BaseMigration subclasses in the module
            for name in dir(module):
                obj = getattr(module, name)
                if (
                    isinstance(obj, type)
                    and issubclass(obj, BaseMigration)
                    and obj is not BaseMigration
                ):
                    migration = obj(self.redis)
                    self._discovered_migrations[migration.migration_id] = migration

    async def _load_builtin_migrations(self) -> None:
        """Load built-in migrations."""
        # Import the datetime migration
        from .builtin.datetime_migration import DatetimeFieldMigration

        migration = DatetimeFieldMigration(self.redis)
        self._discovered_migrations[migration.migration_id] = migration

    async def get_applied_migrations(self) -> Set[str]:
        """Get set of migration IDs that have been applied."""
        applied = await self.redis.smembers(self.APPLIED_MIGRATIONS_KEY)  # type: ignore[misc]
        return {m.decode("utf-8") if isinstance(m, bytes) else m for m in applied or []}

    async def mark_migration_applied(self, migration_id: str) -> None:
        """Mark a migration as applied."""
        await self.redis.sadd(self.APPLIED_MIGRATIONS_KEY, migration_id)  # type: ignore[misc]

    async def mark_migration_unapplied(self, migration_id: str) -> None:
        """Mark a migration as unapplied (for rollback)."""
        await self.redis.srem(self.APPLIED_MIGRATIONS_KEY, migration_id)  # type: ignore[misc]

    def _topological_sort(self, migrations: Dict[str, BaseMigration]) -> List[str]:
        """
        Sort migrations by dependencies using topological sort.

        Args:
            migrations: Dict of migration_id to migration instance

        Returns:
            List[str]: Migration IDs in dependency order
        """
        # Build dependency graph
        graph = {}
        in_degree = {}

        for migration_id, migration in migrations.items():
            graph[migration_id] = migration.dependencies[:]
            in_degree[migration_id] = 0

        # Calculate in-degrees
        for migration_id, deps in graph.items():
            for dep in deps:
                if dep not in migrations:
                    raise DataMigrationError(
                        f"Migration {migration_id} depends on {dep}, but {dep} was not found"
                    )
                in_degree[migration_id] += 1

        # Topological sort using Kahn's algorithm
        queue = [mid for mid, degree in in_degree.items() if degree == 0]
        result = []

        while queue:
            current = queue.pop(0)
            result.append(current)

            # Process dependencies
            for migration_id, deps in graph.items():
                if current in deps:
                    in_degree[migration_id] -= 1
                    if in_degree[migration_id] == 0:
                        queue.append(migration_id)

        if len(result) != len(migrations):
            raise DataMigrationError("Circular dependency detected in migrations")

        return result

    async def get_pending_migrations(self) -> List[BaseMigration]:
        """Get list of pending migrations in dependency order."""
        all_migrations = await self.discover_migrations()
        applied_migrations = await self.get_applied_migrations()

        pending_migration_ids = {
            mid for mid in all_migrations.keys() if mid not in applied_migrations
        }

        if not pending_migration_ids:
            return []

        # Sort ALL migrations by dependencies, then filter to pending ones
        sorted_ids = self._topological_sort(all_migrations)
        pending_sorted_ids = [mid for mid in sorted_ids if mid in pending_migration_ids]
        return [all_migrations[mid] for mid in pending_sorted_ids]

    async def status(self) -> Dict:
        """
        Get migration status information.

        Returns:
            Dict with migration status details
        """
        all_migrations = await self.discover_migrations()
        applied_migrations = await self.get_applied_migrations()
        pending_migrations = await self.get_pending_migrations()

        return {
            "total_migrations": len(all_migrations),
            "applied_count": len(applied_migrations),
            "pending_count": len(pending_migrations),
            "applied_migrations": sorted(applied_migrations),
            "pending_migrations": [m.migration_id for m in pending_migrations],
        }

    async def run_migrations(
        self, dry_run: bool = False, limit: Optional[int] = None, verbose: bool = False
    ) -> int:
        """
        Run pending migrations.

        Args:
            dry_run: If True, show what would be done without applying changes
            limit: Maximum number of migrations to run
            verbose: Enable verbose logging

        Returns:
            int: Number of migrations applied
        """
        pending_migrations = await self.get_pending_migrations()

        if limit:
            pending_migrations = pending_migrations[:limit]

        if not pending_migrations:
            if verbose:
                print("No pending migrations found.")
            return 0

        if verbose:
            print(f"Found {len(pending_migrations)} pending migration(s):")
            for migration in pending_migrations:
                print(f"- {migration.migration_id}: {migration.description}")

        if dry_run:
            if verbose:
                print("Dry run mode - no changes will be applied.")
            return len(pending_migrations)

        applied_count = 0

        for migration in pending_migrations:
            if verbose:
                print(f"Running migration: {migration.migration_id}")
                start_time = time.time()

            # Check if migration can run
            if not await migration.can_run():
                if verbose:
                    print(
                        f"Skipping migration {migration.migration_id}: can_run() returned False"
                    )
                continue

            try:
                await migration.up()
                await self.mark_migration_applied(migration.migration_id)
                applied_count += 1

                if verbose:
                    end_time = time.time()
                    print(
                        f"Applied migration {migration.migration_id} in {end_time - start_time:.2f}s"
                    )

            except Exception as e:
                if verbose:
                    print(f"Migration {migration.migration_id} failed: {e}")
                raise DataMigrationError(
                    f"Migration {migration.migration_id} failed: {e}"
                )

        if verbose:
            print(f"Applied {applied_count} migration(s).")

        return applied_count

    async def run_migrations_with_monitoring(
        self,
        dry_run: bool = False,
        limit: Optional[int] = None,
        verbose: bool = False,
        progress_callback: Optional[Callable] = None,  # type: ignore,
    ) -> Dict[str, Any]:
        """
        Run pending migrations with enhanced performance monitoring.

        Args:
            dry_run: If True, show what would be done without applying changes
            limit: Maximum number of migrations to run
            verbose: Enable verbose logging
            progress_callback: Optional callback for progress updates

        Returns:
            Dict containing migration results and performance stats
        """
        monitor = PerformanceMonitor()
        monitor.start()

        pending_migrations = await self.get_pending_migrations()

        if limit:
            pending_migrations = pending_migrations[:limit]

        if not pending_migrations:
            if verbose:
                print("No pending migrations found.")
            return {
                "applied_count": 0,
                "total_migrations": 0,
                "performance_stats": monitor.get_stats(),
                "errors": [],
            }

        if verbose:
            print(f"Found {len(pending_migrations)} pending migration(s):")
            for migration in pending_migrations:
                print(f"- {migration.migration_id}: {migration.description}")

        if dry_run:
            if verbose:
                print("Dry run mode - no changes will be applied.")
            return {
                "applied_count": len(pending_migrations),
                "total_migrations": len(pending_migrations),
                "performance_stats": monitor.get_stats(),
                "errors": [],
                "dry_run": True,
            }

        applied_count = 0
        errors = []

        for i, migration in enumerate(pending_migrations):
            batch_start_time = time.time()

            if verbose:
                print(
                    f"Running migration {i + 1}/{len(pending_migrations)}: {migration.migration_id}"
                )

            # Check if migration can run
            if not await migration.can_run():
                if verbose:
                    print(
                        f"Skipping migration {migration.migration_id}: can_run() returned False"
                    )
                continue

            try:
                await migration.up()
                await self.mark_migration_applied(migration.migration_id)
                applied_count += 1

                batch_time = time.time() - batch_start_time
                monitor.record_batch_time(batch_time)
                monitor.update_progress(applied_count)

                if verbose:
                    print(
                        f"Applied migration {migration.migration_id} in {batch_time:.2f}s"
                    )

                # Call progress callback if provided
                if progress_callback:
                    progress_callback(
                        applied_count, len(pending_migrations), migration.migration_id
                    )

            except Exception as e:
                error_info = {
                    "migration_id": migration.migration_id,
                    "error": str(e),
                    "timestamp": datetime.now().isoformat(),
                }
                errors.append(error_info)

                if verbose:
                    print(f"Migration {migration.migration_id} failed: {e}")

                # For now, stop on first error - could be made configurable
                break

        monitor.finish()

        result = {
            "applied_count": applied_count,
            "total_migrations": len(pending_migrations),
            "performance_stats": monitor.get_stats(),
            "errors": errors,
            "success_rate": (
                (applied_count / len(pending_migrations)) * 100
                if pending_migrations
                else 100
            ),
        }

        if verbose:
            print(f"Applied {applied_count}/{len(pending_migrations)} migration(s).")
            stats = result["performance_stats"]
            if stats:
                print(f"Total time: {stats.get('total_time_seconds', 0):.2f}s")
                if "items_per_second" in stats:  # type: ignore
                    print(f"Performance: {stats['items_per_second']:.1f} items/second")  # type: ignore
                if "peak_memory_mb" in stats:  # type: ignore
                    print(f"Peak memory: {stats['peak_memory_mb']:.1f} MB")  # type: ignore

        return result

    async def rollback_migration(
        self, migration_id: str, dry_run: bool = False, verbose: bool = False
    ) -> bool:
        """
        Rollback a specific migration.

        Args:
            migration_id: ID of migration to rollback
            dry_run: If True, show what would be done without applying changes
            verbose: Enable verbose logging

        Returns:
            bool: True if rollback was successful
        """
        all_migrations = await self.discover_migrations()
        applied_migrations = await self.get_applied_migrations()

        if migration_id not in all_migrations:
            raise DataMigrationError(f"Migration {migration_id} not found")

        if migration_id not in applied_migrations:
            if verbose:
                print(f"Migration {migration_id} is not applied, nothing to rollback.")
            return False

        migration = all_migrations[migration_id]

        if verbose:
            print(f"Rolling back migration: {migration_id}")

        if dry_run:
            if verbose:
                print("Dry run mode - no changes will be applied.")
            return True

        try:
            await migration.down()
            await self.mark_migration_unapplied(migration_id)

            if verbose:
                print(f"Rolled back migration: {migration_id}")

            return True
        except NotImplementedError:
            if verbose:
                print(f"Migration {migration_id} does not support rollback")
            return False
        except Exception as e:
            if verbose:
                print(f"Rollback failed for {migration_id}: {e}")
            raise DataMigrationError(f"Rollback failed for {migration_id}: {e}")

    async def create_migration_file(
        self, name: str, migrations_dir: str = "migrations"
    ) -> str:
        """
        Create a new migration file from template.

        Args:
            name: Name of the migration (will be part of filename)
            migrations_dir: Directory to create migration in

        Returns:
            str: Path to created migration file
        """
        # Create migrations directory if it doesn't exist
        os.makedirs(migrations_dir, exist_ok=True)

        # Generate migration ID with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        migration_id = f"{timestamp}_{name}"
        filename = f"{migration_id}.py"
        filepath = os.path.join(migrations_dir, filename)

        # Template content
        # Build template components separately to avoid flake8 formatting issues
        class_name = name.title().replace("_", "") + "Migration"
        description = name.replace("_", " ").title()
        created_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        template = f'''"""  # noqa: E272, E241, E271
Data migration: {name}

Created: {created_time}
"""

from aredis_om.model.migrations.data import BaseMigration


class {class_name}(BaseMigration):
    migration_id = "{migration_id}"
    description = "{description}"
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
'''

        with open(filepath, "w") as f:
            f.write(template)

        return filepath
