"""
Base classes and exceptions for schema migrations.

This module contains the core base classes and exceptions used by the schema
migration system in Redis OM Python.
"""

import abc

from ....connections import get_redis_connection


class SchemaMigrationError(Exception):
    """Exception raised when schema migration operations fail."""

    pass


class BaseSchemaMigration(abc.ABC):
    """
    Base class for file-based schema migrations.
    """

    migration_id: str = ""
    description: str = ""

    def __init__(self, redis_client=None):
        self.redis = redis_client or get_redis_connection()
        if not self.migration_id:
            raise SchemaMigrationError(
                f"Migration {self.__class__.__name__} must define migration_id"
            )

    @abc.abstractmethod
    async def up(self) -> None:
        """Apply the schema migration."""
        raise NotImplementedError

    async def down(self) -> None:
        """Rollback the schema migration (optional)."""
        raise NotImplementedError(
            f"Migration {self.migration_id} does not support rollback"
        )
