"""
Internal schema detection utilities for Redis OM migrations.

This module provides internal utilities for detecting schema changes between
the current model definitions and the indexes stored in Redis. It is used
by SchemaMigrator to generate migration files.

Note: This module is internal. Use SchemaMigrator for migrations.
"""

import hashlib
import importlib
import logging
import pkgutil
from dataclasses import dataclass
from enum import Enum
from typing import List, Optional

import redis


log = logging.getLogger(__name__)


class MigrationError(Exception):
    """Error during schema migration operations."""

    pass


def import_submodules(root_module_name: str):
    """Import all submodules of a module, recursively.

    This function adds the current working directory to sys.path to ensure
    that modules can be imported when using tools like pyenv where the Python
    binaries are stored outside the project directory.
    """
    import os
    import sys

    # Add cwd to sys.path so modules can be found when using pyenv or similar
    # tools where Python binaries are stored outside the project directory.
    cwd = os.getcwd()
    if cwd not in sys.path:
        sys.path.insert(0, cwd)

    root_module = importlib.import_module(root_module_name)

    if not hasattr(root_module, "__path__"):
        raise MigrationError(
            "The root module must be a Python package. "
            f"You specified: {root_module_name}"
        )

    for loader, module_name, is_pkg in pkgutil.walk_packages(
        root_module.__path__,
        root_module.__name__ + ".",  # type: ignore
    ):
        importlib.import_module(module_name)


def schema_hash_key(index_name):
    return f"{index_name}:hash"


def schema_text_key(index_name):
    return f"{index_name}:schema"


async def create_index(conn: redis.Redis, index_name, schema, current_hash):
    db_number = conn.connection_pool.connection_kwargs.get("db")
    if db_number and db_number > 0:
        raise MigrationError(
            "Creating search indexes is only supported in database 0. "
            f"You attempted to create an index in database {db_number}"
        )
    try:
        await conn.ft(index_name).info()
    except redis.ResponseError:
        await conn.execute_command(f"ft.create {index_name} {schema}")
        # TODO: remove "type: ignore" when type stubs will be fixed
        await conn.set(schema_hash_key(index_name), current_hash)  # type: ignore
        await conn.set(schema_text_key(index_name), schema)  # type: ignore
    else:
        log.info("Index already exists, skipping. Index hash: %s", index_name)


class MigrationAction(Enum):
    CREATE = 2
    DROP = 1


@dataclass
class IndexMigration:
    model_name: str
    index_name: str
    schema: str
    hash: str
    action: MigrationAction
    conn: redis.Redis
    previous_hash: Optional[str] = None

    async def run(self):
        if self.action is MigrationAction.CREATE:
            await self.create()
        elif self.action is MigrationAction.DROP:
            await self.drop()

    async def create(self):
        try:
            await create_index(self.conn, self.index_name, self.schema, self.hash)
        except redis.ResponseError:
            log.info("Index already exists: %s", self.index_name)

    async def drop(self):
        try:
            await self.conn.ft(self.index_name).dropindex()
        except redis.ResponseError:
            log.info("Index does not exist: %s", self.index_name)


class SchemaDetector:
    """
    Detects schema differences between model definitions and Redis indexes.

    This is an internal class used by SchemaMigrator to generate migration files.
    It compares the current model schemas against what's stored in Redis and
    identifies indexes that need to be created or updated.

    For running migrations, use SchemaMigrator or the `om migrate` CLI instead.
    """

    def __init__(self, module=None, conn=None):
        self.module = module
        self.conn = conn
        self.migrations: List[IndexMigration] = []

    def _get_connection(self, cls):
        """Return a Redis connection for a model, recovering closed loops."""
        try:
            return self.conn or cls.db()
        except RuntimeError as e:
            if "Event loop is closed" not in str(e):
                raise

            from ....connections import get_redis_connection

            return get_redis_connection()

    def _get_schema(self, name, cls):
        try:
            schema = cls.redisearch_schema()
        except NotImplementedError:
            log.info("Skipping migrations for %s", name)
            return None

        current_hash = hashlib.sha1(schema.encode("utf-8")).hexdigest()  # nosec
        return schema, current_hash

    async def _index_exists(self, conn, index_name):
        try:
            await conn.ft(index_name).info()
            return conn, True
        except RuntimeError as e:
            if "Event loop is closed" not in str(e):
                raise

            from ....connections import get_redis_connection

            conn = get_redis_connection()
            try:
                await conn.ft(index_name).info()
                return conn, True
            except redis.ResponseError:
                return conn, False
        except redis.ResponseError:
            return conn, False

    def _append_create_migration(self, name, cls, schema, current_hash, conn):
        self.migrations.append(
            IndexMigration(
                name,
                cls.Meta.index_name,
                schema,
                current_hash,
                MigrationAction.CREATE,
                conn,
            )
        )

    def _append_recreate_migrations(
        self, name, cls, schema, current_hash, conn, stored_hash
    ):
        # TODO: Switch out schema with an alias to avoid downtime -- separate migration?
        self.migrations.append(
            IndexMigration(
                name,
                cls.Meta.index_name,
                schema,
                current_hash,
                MigrationAction.DROP,
                conn,
                stored_hash,
            )
        )
        self.migrations.append(
            IndexMigration(
                name,
                cls.Meta.index_name,
                schema,
                current_hash,
                MigrationAction.CREATE,
                conn,
                stored_hash,
            )
        )

    async def detect_migrations(self):
        """Detect schema changes between models and Redis indexes."""
        if self.module:
            import_submodules(self.module)

        # Import this at run-time to avoid triggering import-time side effects,
        # e.g. checks for RedisJSON, etc.
        from aredis_om.model.model import model_registry

        for name, cls in model_registry.items():
            hash_key = schema_hash_key(cls.Meta.index_name)

            schema_data = self._get_schema(name, cls)
            if schema_data is None:
                continue

            schema, current_hash = schema_data
            conn = self._get_connection(cls)

            conn, exists = await self._index_exists(conn, cls.Meta.index_name)
            if not exists:
                self._append_create_migration(name, cls, schema, current_hash, conn)
                continue

            stored_hash = await conn.get(hash_key)
            if isinstance(stored_hash, bytes):
                stored_hash = stored_hash.decode("utf-8")

            if current_hash != stored_hash:
                self._append_recreate_migrations(
                    name, cls, schema, current_hash, conn, stored_hash
                )

    async def run(self):
        """
        Run all detected migrations (DROP + CREATE).

        Warning: This performs destructive operations. For production use,
        prefer SchemaMigrator which provides migration tracking and rollback.
        """
        await self.detect_migrations()
        for migration in self.migrations:
            await migration.run()


# Backward compatibility alias (deprecated)
Migrator = SchemaDetector
