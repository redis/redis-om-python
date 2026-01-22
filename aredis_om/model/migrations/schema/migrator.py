"""
Schema migration system for Redis OM.

This module provides the SchemaMigrator class for managing RediSearch index
schema changes and migrations in Redis OM Python applications.
"""

import hashlib
import importlib.util
import os
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Set

from ....connections import get_redis_connection
from ....settings import get_root_migrations_dir
from .base import BaseSchemaMigration, SchemaMigrationError
from .legacy_migrator import (
    MigrationAction,
    SchemaDetector,
    schema_hash_key,
    schema_text_key,
)


class SchemaMigrator:
    """
    Manages discovery, execution, rollback, and snapshot creation of schema migrations.
    """

    APPLIED_MIGRATIONS_KEY = "redis_om:schema_applied_migrations"

    def __init__(
        self,
        redis_client=None,
        migrations_dir: Optional[str] = None,
    ):
        self.redis = redis_client or get_redis_connection()
        root_dir = migrations_dir or os.path.join(
            get_root_migrations_dir(), "schema-migrations"
        )
        self.migrations_dir = root_dir
        self._discovered: Dict[str, BaseSchemaMigration] = {}

    async def discover_migrations(self) -> Dict[str, BaseSchemaMigration]:
        if self._discovered:
            return self._discovered
        path = Path(self.migrations_dir)
        if not path.exists():
            return {}
        for file_path in path.glob("*.py"):
            if file_path.name == "__init__.py":
                continue
            spec = importlib.util.spec_from_file_location(file_path.stem, file_path)
            if spec and spec.loader:
                module = importlib.util.module_from_spec(spec)
                spec.loader.exec_module(module)
                for name in dir(module):
                    obj = getattr(module, name)
                    try:
                        if (
                            isinstance(obj, type)
                            and issubclass(obj, BaseSchemaMigration)
                            and obj is not BaseSchemaMigration
                        ):
                            migration = obj(self.redis)
                            self._discovered[migration.migration_id] = migration
                    except TypeError:
                        continue
        return self._discovered

    async def get_applied(self) -> Set[str]:
        applied = await self.redis.smembers(self.APPLIED_MIGRATIONS_KEY)  # type: ignore[misc]
        return {m.decode("utf-8") if isinstance(m, bytes) else m for m in applied or []}

    async def mark_applied(self, migration_id: str) -> None:
        await self.redis.sadd(self.APPLIED_MIGRATIONS_KEY, migration_id)  # type: ignore[misc]

    async def mark_unapplied(self, migration_id: str) -> None:
        await self.redis.srem(self.APPLIED_MIGRATIONS_KEY, migration_id)  # type: ignore[misc]

    async def status(self) -> Dict:
        # Count files on disk for total/pending status to avoid import edge cases
        path = Path(self.migrations_dir)
        file_ids: List[str] = []
        if path.exists():
            for file_path in path.glob("*.py"):
                if file_path.name == "__init__.py":
                    continue
                file_ids.append(file_path.stem)

        applied = await self.get_applied()
        pending = [mid for mid in sorted(file_ids) if mid not in applied]

        return {
            "total_migrations": len(file_ids),
            "applied_count": len(applied),
            "pending_count": len(pending),
            "applied_migrations": sorted(applied),
            "pending_migrations": pending,
        }

    async def run(
        self, dry_run: bool = False, limit: Optional[int] = None, verbose: bool = False
    ) -> int:
        discovered = await self.discover_migrations()
        applied = await self.get_applied()
        pending_ids = [mid for mid in sorted(discovered.keys()) if mid not in applied]
        if not pending_ids:
            if verbose:
                print("No pending schema migrations found.")
            return 0
        if limit:
            pending_ids = pending_ids[:limit]
        if dry_run:
            if verbose:
                print(f"Would apply {len(pending_ids)} schema migration(s):")
                for mid in pending_ids:
                    print(f"- {mid}")
            return len(pending_ids)
        count = 0
        for mid in pending_ids:
            mig = discovered[mid]
            if verbose:
                print(f"Applying schema migration: {mid}")
            await mig.up()
            await self.mark_applied(mid)
            count += 1
        if verbose:
            print(f"Applied {count} schema migration(s).")
        return count

    async def rollback(
        self, migration_id: str, dry_run: bool = False, verbose: bool = False
    ) -> bool:
        discovered = await self.discover_migrations()
        applied = await self.get_applied()
        if migration_id not in discovered:
            raise SchemaMigrationError(f"Migration {migration_id} not found")
        if migration_id not in applied:
            if verbose:
                print(f"Migration {migration_id} is not applied, nothing to rollback.")
            return False
        mig = discovered[migration_id]
        if dry_run:
            if verbose:
                print(f"Would rollback schema migration: {migration_id}")
            return True
        try:
            await mig.down()
            # Only mark as unapplied after successful rollback
            await self.mark_unapplied(migration_id)
            if verbose:
                print(f"Rolled back migration: {migration_id}")
            return True
        except NotImplementedError:
            if verbose:
                print(f"Migration {migration_id} does not support rollback")
            return False
        except Exception as e:
            if verbose:
                print(f"Rollback failed for migration {migration_id}: {e}")
            # Don't mark as unapplied if rollback failed for other reasons
            return False

    async def downgrade(
        self, steps: int = 1, dry_run: bool = False, verbose: bool = False
    ) -> int:
        """
        Rollback the last N applied migrations in reverse order.

        Args:
            steps: Number of migrations to rollback (default 1)
            dry_run: If True, show what would be done without applying
            verbose: Enable verbose output

        Returns:
            Number of migrations successfully rolled back
        """
        discovered = await self.discover_migrations()
        applied = await self.get_applied()

        if not applied:
            if verbose:
                print("No applied migrations to rollback.")
            return 0

        # Sort applied migrations in reverse order (most recent first)
        sorted_applied = sorted(applied, reverse=True)
        to_rollback = sorted_applied[:steps]

        if dry_run:
            if verbose:
                print(f"Would rollback {len(to_rollback)} migration(s):")
                for mid in to_rollback:
                    print(f"- {mid}")
            return len(to_rollback)

        count = 0
        for mid in to_rollback:
            if mid not in discovered:
                if verbose:
                    print(f"Warning: Migration {mid} not found on disk, skipping")
                continue
            mig = discovered[mid]
            try:
                if verbose:
                    print(f"Rolling back: {mid}")
                await mig.down()
                await self.mark_unapplied(mid)
                count += 1
            except NotImplementedError:
                if verbose:
                    print(f"Migration {mid} does not support rollback, stopping")
                break
            except Exception as e:
                if verbose:
                    print(f"Rollback failed for {mid}: {e}, stopping")
                break

        if verbose:
            print(f"Rolled back {count} migration(s).")
        return count

    async def create_migration_file(self, name: str) -> Optional[str]:
        """
        Snapshot current pending schema operations into a migration file.

        Returns the path to the created file, or None if no operations.
        """
        # Detect pending operations using the schema detector
        detector = SchemaDetector(module=None, conn=self.redis)
        await detector.detect_migrations()
        ops = detector.migrations
        if not ops:
            return None

        # Group operations by index and collapse DROP+CREATE pairs
        grouped: Dict[str, Dict[str, str]] = {}
        for op in ops:
            entry = grouped.setdefault(
                op.index_name,
                {"model_name": op.model_name, "new_schema": "", "previous_schema": ""},
            )
            if op.action is MigrationAction.DROP:
                # Try to fetch previous schema text
                prev = await op.conn.get(schema_text_key(op.index_name))
                if isinstance(prev, bytes):
                    prev = prev.decode("utf-8")
                entry["previous_schema"] = prev or ""
            elif op.action is MigrationAction.CREATE:
                entry["new_schema"] = op.schema

        # Prepare file path
        os.makedirs(self.migrations_dir, exist_ok=True)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        migration_id = f"{timestamp}_{name}"
        filename = f"{migration_id}.py"
        filepath = os.path.join(self.migrations_dir, filename)

        class_name = name.title().replace("_", "") + "SchemaMigration"
        description = name.replace("_", " ").title()

        # Build operations source literal safely with triple-quoted strings
        ops_lines: List[str] = ["operations = ["]
        for index_name, data in grouped.items():
            model_name = data.get("model_name", "")
            new_schema = (data.get("new_schema") or "").replace("""""", """\"\"\"""")
            prev_schema = (data.get("previous_schema") or "").replace(
                """""", """\"\"\""""
            )
            ops_lines.append(
                "    {\n"
                f"        'index_name': '{index_name}',\n"
                f"        'model_name': '{model_name}',\n"
                f"        'new_schema': '''{new_schema}''',\n"
                f"        'previous_schema': '''{prev_schema}''',\n"
                "    },"
            )
        ops_lines.append("]")
        ops_literal = "\n".join(ops_lines)

        template = '''"""
Schema migration: {name}

Created: {created_time}
"""

import hashlib

from aredis_om.model.migrations.schema import BaseSchemaMigration
from aredis_om.model.migrations.schema.legacy_migrator import schema_hash_key, schema_text_key


class {class_name}(BaseSchemaMigration):
    migration_id = "{migration_id}"
    description = "{description}"

    {ops_literal}

    async def up(self) -> None:
        for op in self.operations:
            index_name = op['index_name']
            new_schema = (op['new_schema'] or '').strip()
            if not new_schema:
                # Nothing to create
                continue
            try:
                await self.redis.ft(index_name).dropindex()
            except Exception:
                pass
            await self.redis.execute_command(f"FT.CREATE {{index_name}} {{new_schema}}".format(index_name=index_name, new_schema=new_schema))
            new_hash = hashlib.sha1(new_schema.encode('utf-8')).hexdigest()
            await self.redis.set(schema_hash_key(index_name), new_hash)  # type: ignore[misc]
            await self.redis.set(schema_text_key(index_name), new_schema)  # type: ignore[misc]

    async def down(self) -> None:
        for op in reversed(self.operations):
            index_name = op['index_name']
            prev_schema = (op['previous_schema'] or '').strip()
            try:
                await self.redis.ft(index_name).dropindex()
            except Exception:
                pass
            if prev_schema:
                await self.redis.execute_command(f"FT.CREATE {{index_name}} {{prev_schema}}".format(index_name=index_name, prev_schema=prev_schema))
                prev_hash = hashlib.sha1(prev_schema.encode('utf-8')).hexdigest()
                await self.redis.set(schema_hash_key(index_name), prev_hash)  # type: ignore[misc]
                await self.redis.set(schema_text_key(index_name), prev_schema)  # type: ignore[misc]
'''.format(
            name=name,
            created_time=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            class_name=class_name,
            migration_id=migration_id,
            description=description,
            ops_literal=ops_literal,
        )

        with open(filepath, "w") as f:
            f.write(template)

        return filepath
