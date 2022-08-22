import hashlib
import logging
from dataclasses import dataclass
from enum import Enum
from typing import List, Optional

from ... import redis


log = logging.getLogger(__name__)


import importlib  # noqa: E402
import pkgutil  # noqa: E402


class MigrationError(Exception):
    pass


def import_submodules(root_module_name: str):
    """Import all submodules of a module, recursively."""
    # TODO: Call this without specifying a module name, to import everything?
    root_module = importlib.import_module(root_module_name)

    if not hasattr(root_module, "__path__"):
        raise MigrationError(
            "The root module must be a Python package. "
            f"You specified: {root_module_name}"
        )

    for loader, module_name, is_pkg in pkgutil.walk_packages(
        root_module.__path__, root_module.__name__ + "."  # type: ignore
    ):
        importlib.import_module(module_name)


def schema_hash_key(index_name):
    return f"{index_name}:hash"


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


class Migrator:
    def __init__(self, module=None):
        self.module = module
        self.migrations: List[IndexMigration] = []

    async def detect_migrations(self):
        # Try to load any modules found under the given path or module name.
        if self.module:
            import_submodules(self.module)

        # Import this at run-time to avoid triggering import-time side effects,
        # e.g. checks for RedisJSON, etc.
        from aredis_om.model.model import model_registry

        for name, cls in model_registry.items():
            hash_key = schema_hash_key(cls.Meta.index_name)
            conn = cls.db()
            try:
                schema = cls.redisearch_schema()
            except NotImplementedError:
                log.info("Skipping migrations for %s", name)
                continue
            current_hash = hashlib.sha1(schema.encode("utf-8")).hexdigest()  # nosec

            try:
                await conn.ft(cls.Meta.index_name).info()
            except redis.ResponseError:
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
                continue

            stored_hash = await conn.get(hash_key)
            schema_out_of_date = current_hash != stored_hash

            if schema_out_of_date:
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

    async def run(self):
        # TODO: Migration history
        # TODO: Dry run with output
        await self.detect_migrations()
        for migration in self.migrations:
            await migration.run()
