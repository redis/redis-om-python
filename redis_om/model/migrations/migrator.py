import hashlib
import logging
from dataclasses import dataclass
from enum import Enum
from typing import Optional

from redis import ResponseError

from redis_om.connections import get_redis_connection
from redis_om.model.model import model_registry


redis = get_redis_connection()
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


def create_index(index_name, schema, current_hash):
    try:
        redis.execute_command(f"ft.info {index_name}")
    except ResponseError:
        redis.execute_command(f"ft.create {index_name} {schema}")
        redis.set(schema_hash_key(index_name), current_hash)
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
    previous_hash: Optional[str] = None

    def run(self):
        if self.action is MigrationAction.CREATE:
            self.create()
        elif self.action is MigrationAction.DROP:
            self.drop()

    def create(self):
        try:
            return create_index(self.index_name, self.schema, self.hash)
        except ResponseError:
            log.info("Index already exists: %s", self.index_name)

    def drop(self):
        try:
            redis.execute_command(f"FT.DROPINDEX {self.index_name}")
        except ResponseError:
            log.info("Index does not exist: %s", self.index_name)


class Migrator:
    def __init__(self, module=None):
        # Try to load any modules found under the given path or module name.
        if module:
            import_submodules(module)

        self.migrations = []

        for name, cls in model_registry.items():
            hash_key = schema_hash_key(cls.Meta.index_name)
            try:
                schema = cls.redisearch_schema()
            except NotImplementedError:
                log.info("Skipping migrations for %s", name)
                continue
            current_hash = hashlib.sha1(schema.encode("utf-8")).hexdigest()  # nosec

            try:
                redis.execute_command("ft.info", cls.Meta.index_name)
            except ResponseError:
                self.migrations.append(
                    IndexMigration(
                        name,
                        cls.Meta.index_name,
                        schema,
                        current_hash,
                        MigrationAction.CREATE,
                    )
                )
                continue

            stored_hash = redis.get(hash_key)
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
                        stored_hash,
                    )
                )

    def run(self):
        # TODO: Migration history
        # TODO: Dry run with output
        for migration in self.migrations:
            migration.run()
