"""
Async Data Migration System for Redis OM Python

This module provides a framework for managing data transformations and migrations
in Redis OM Python applications. Use this for converting data formats, fixing
data inconsistencies, and other data transformation tasks.
"""

import abc
import asyncio
import importlib
import importlib.util
import os
import time
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional, Set

try:
    import psutil
except ImportError:
    psutil = None

import redis

from ...connections import get_redis_connection


class DataMigrationError(Exception):
    """Exception raised when data migration operations fail."""

    pass


class PerformanceMonitor:
    """Monitor migration performance and resource usage."""

    def __init__(self):
        self.start_time = None
        self.end_time = None
        self.start_memory = None
        self.peak_memory = None
        self.processed_items = 0
        self.batch_times = []

    def start(self):
        """Start performance monitoring."""
        self.start_time = time.time()
        if psutil:
            try:
                process = psutil.Process()
                self.start_memory = process.memory_info().rss / 1024 / 1024  # MB
                self.peak_memory = self.start_memory
            except (psutil.NoSuchProcess, Exception):
                self.start_memory = None
                self.peak_memory = None
        else:
            self.start_memory = None
            self.peak_memory = None

    def update_progress(self, items_processed: int):
        """Update progress and check memory usage."""
        self.processed_items = items_processed
        if psutil:
            try:
                process = psutil.Process()
                current_memory = process.memory_info().rss / 1024 / 1024  # MB
                if self.peak_memory is None or current_memory > self.peak_memory:
                    self.peak_memory = current_memory
            except (psutil.NoSuchProcess, Exception):
                pass

    def record_batch_time(self, batch_time: float):
        """Record time taken for a batch."""
        self.batch_times.append(batch_time)

    def finish(self):
        """Finish monitoring and calculate final stats."""
        self.end_time = time.time()

    def get_stats(self) -> Dict[str, Any]:
        """Get performance statistics."""
        if self.start_time is None:
            return {}

        total_time = (self.end_time or time.time()) - self.start_time
        avg_batch_time = (
            sum(self.batch_times) / len(self.batch_times) if self.batch_times else 0
        )

        stats = {
            "total_time_seconds": total_time,
            "processed_items": self.processed_items,
            "items_per_second": (
                self.processed_items / total_time if total_time > 0 else 0
            ),
            "average_batch_time": avg_batch_time,
            "total_batches": len(self.batch_times),
        }

        if self.start_memory is not None:
            stats.update(
                {
                    "start_memory_mb": self.start_memory,
                    "peak_memory_mb": self.peak_memory,
                    "memory_increase_mb": (self.peak_memory or 0) - self.start_memory,
                }
            )

        return stats


class BaseMigration(abc.ABC):
    """
    Base class for all data migrations.

    Each migration must implement the `up` method to apply the migration.
    Optionally implement `down` for rollback support and `can_run` for validation.
    """

    migration_id: str = ""
    description: str = ""
    dependencies: List[str] = []

    def __init__(self, redis_client=None):
        self.redis = redis_client or get_redis_connection()
        if not self.migration_id:
            raise DataMigrationError(
                f"Migration {self.__class__.__name__} must define migration_id"
            )

    @abc.abstractmethod
    async def up(self) -> None:
        """Apply the migration. Must be implemented by subclasses."""
        pass

    async def down(self) -> None:
        """
        Reverse the migration (optional).

        If not implemented, rollback will not be available for this migration.
        """
        raise NotImplementedError(
            f"Migration {self.migration_id} does not support rollback"
        )

    async def can_run(self) -> bool:
        """
        Check if the migration can run (optional validation).

        Returns:
            bool: True if migration can run, False otherwise
        """
        return True


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
        from .datetime_migration import DatetimeFieldMigration

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
        progress_callback: Optional[callable] = None,
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
                if "items_per_second" in stats:
                    print(f"Performance: {stats['items_per_second']:.1f} items/second")
                if "peak_memory_mb" in stats:
                    print(f"Peak memory: {stats['peak_memory_mb']:.1f} MB")

        return result

    async def verify_data_integrity(self, verbose: bool = False) -> Dict[str, Any]:
        """
        Verify data integrity after migrations.

        This method checks for common issues that might occur after datetime migrations:
        - Datetime fields that weren't properly converted
        - Invalid timestamp values
        - Missing or corrupted data

        Args:
            verbose: Enable verbose output

        Returns:
            Dict containing verification results
        """
        issues = []
        checked_keys = 0

        try:
            # Import model registry to check all models
            from ..model import model_registry

            for model_name, model_class in model_registry.items():
                if verbose:
                    print(f"Verifying {model_name}...")

                # Find datetime fields in this model
                datetime_fields = []
                for field_name, field_info in model_class.model_fields.items():
                    field_type = getattr(field_info, "annotation", None)
                    if field_type in (datetime.datetime, datetime.date):
                        datetime_fields.append(field_name)

                if not datetime_fields:
                    continue  # No datetime fields to verify

                # Check if this is a JsonModel or HashModel
                is_json_model = (
                    hasattr(model_class, "_meta")
                    and getattr(model_class._meta, "database_type", None) == "json"
                )

                # Verify data for this model
                model_issues = await self._verify_model_data(
                    model_class, datetime_fields, is_json_model, verbose
                )
                issues.extend(model_issues)

                # Count keys checked
                key_pattern = model_class.make_key("*")
                if is_json_model:
                    scan_iter = self.redis.scan_iter(
                        match=key_pattern, _type="ReJSON-RL"
                    )
                else:
                    scan_iter = self.redis.scan_iter(match=key_pattern, _type="HASH")

                async for _ in scan_iter:  # type: ignore[misc]
                    checked_keys += 1

        except Exception as e:
            issues.append(f"Error during verification: {e}")

        return {
            "success": len(issues) == 0,
            "issues": issues,
            "checked_keys": checked_keys,
            "total_issues": len(issues),
        }

    async def _verify_model_data(
        self,
        model_class,
        datetime_fields: List[str],
        is_json_model: bool,
        verbose: bool,
    ) -> List[str]:
        """Verify data integrity for a specific model."""
        issues = []
        key_pattern = model_class.make_key("*")

        if is_json_model:
            scan_iter = self.redis.scan_iter(match=key_pattern, _type="ReJSON-RL")
        else:
            scan_iter = self.redis.scan_iter(match=key_pattern, _type="HASH")

        async for key in scan_iter:  # type: ignore[misc]
            if isinstance(key, bytes):
                key = key.decode("utf-8")

            try:
                if is_json_model:
                    document = await self.redis.json().get(key)
                    if document:
                        model_issues = self._verify_json_datetime_fields(
                            key, document, datetime_fields
                        )
                        issues.extend(model_issues)
                else:
                    hash_data = await self.redis.hgetall(key)  # type: ignore[misc]
                    if hash_data:
                        # Convert byte keys/values to strings if needed
                        if isinstance(next(iter(hash_data.keys())), bytes):
                            hash_data = {
                                k.decode("utf-8"): v.decode("utf-8")
                                for k, v in hash_data.items()
                            }
                        model_issues = self._verify_hash_datetime_fields(
                            key, hash_data, datetime_fields
                        )
                        issues.extend(model_issues)

            except Exception as e:
                issues.append(f"Error verifying key {key}: {e}")

        return issues

    def _verify_json_datetime_fields(
        self, key: str, document: Any, datetime_fields: List[str]
    ) -> List[str]:
        """Verify datetime fields in JSON document."""
        issues = []

        def check_nested_fields(data, path=""):
            if isinstance(data, dict):
                for field_name, value in data.items():
                    current_path = f"{path}.{field_name}" if path else field_name

                    if field_name in datetime_fields:
                        # This should be a timestamp (number)
                        if not isinstance(value, (int, float)):
                            issues.append(
                                f"Key {key}, field {current_path}: "
                                f"Expected timestamp, got {type(value).__name__}: {value}"
                            )
                        elif not self._is_valid_timestamp(value):
                            issues.append(
                                f"Key {key}, field {current_path}: "
                                f"Invalid timestamp value: {value}"
                            )
                    else:
                        # Recurse into nested structures
                        check_nested_fields(value, current_path)
            elif isinstance(data, list):
                for i, item in enumerate(data):
                    check_nested_fields(item, f"{path}[{i}]")

        check_nested_fields(document)
        return issues

    def _verify_hash_datetime_fields(
        self, key: str, hash_data: Dict[str, str], datetime_fields: List[str]
    ) -> List[str]:
        """Verify datetime fields in hash data."""
        issues = []

        for field_name in datetime_fields:
            if field_name in hash_data:
                value = hash_data[field_name]
                try:
                    # Should be a string representation of a timestamp
                    timestamp = float(value)
                    if not self._is_valid_timestamp(timestamp):
                        issues.append(
                            f"Key {key}, field {field_name}: "
                            f"Invalid timestamp value: {value}"
                        )
                except (ValueError, TypeError):
                    issues.append(
                        f"Key {key}, field {field_name}: "
                        f"Expected timestamp string, got: {value}"
                    )

        return issues

    def _is_valid_timestamp(self, timestamp: float) -> bool:
        """Check if a timestamp is valid."""
        try:
            # Check if timestamp is within reasonable bounds
            # Unix timestamp should be positive and not too far in the future
            if timestamp < 0:
                return False
            if timestamp > 4102444800:  # Year 2100
                return False
            # Try to convert to datetime to verify it's valid
            datetime.fromtimestamp(timestamp)
            return True
        except (ValueError, OSError, OverflowError):
            return False

    async def get_migration_statistics(self) -> Dict[str, Any]:
        """Get comprehensive migration statistics."""
        try:
            # Import model registry to analyze models
            from ..model import model_registry

            stats = {
                "total_models": len(model_registry),
                "models_with_datetime_fields": 0,
                "total_datetime_fields": 0,
                "estimated_keys_to_migrate": 0,
                "model_details": [],
            }

            for model_name, model_class in model_registry.items():
                datetime_fields = []
                for field_name, field_info in model_class.model_fields.items():
                    field_type = getattr(field_info, "annotation", None)
                    if field_type in (datetime.datetime, datetime.date):
                        datetime_fields.append(field_name)

                if datetime_fields:
                    stats["models_with_datetime_fields"] += 1
                    stats["total_datetime_fields"] += len(datetime_fields)

                    # Count keys for this model
                    key_pattern = model_class.make_key("*")
                    is_json_model = (
                        hasattr(model_class, "_meta")
                        and getattr(model_class._meta, "database_type", None) == "json"
                    )

                    key_count = 0
                    if is_json_model:
                        scan_iter = self.redis.scan_iter(
                            match=key_pattern, _type="ReJSON-RL"
                        )
                    else:
                        scan_iter = self.redis.scan_iter(
                            match=key_pattern, _type="HASH"
                        )

                    async for _ in scan_iter:  # type: ignore[misc]
                        key_count += 1

                    stats["estimated_keys_to_migrate"] += key_count

                    stats["model_details"].append(
                        {
                            "model_name": model_name,
                            "model_type": "JsonModel" if is_json_model else "HashModel",
                            "datetime_fields": datetime_fields,
                            "key_count": key_count,
                        }
                    )

            return stats

        except Exception as e:
            return {
                "error": f"Failed to get migration statistics: {e}",
                "total_models": 0,
                "models_with_datetime_fields": 0,
                "total_datetime_fields": 0,
                "estimated_keys_to_migrate": 0,
                "model_details": [],
            }

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

from aredis_om.model.migrations.data_migrator import BaseMigration


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
