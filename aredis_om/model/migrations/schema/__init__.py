"""
Schema migration system for Redis OM.

This module provides infrastructure for managing RediSearch index schema changes
and migrations in Redis OM Python applications.

Use SchemaMigrator for file-based migrations with tracking and rollback support,
or the `om migrate` CLI commands.
"""

from .base import BaseSchemaMigration, SchemaMigrationError
from .legacy_migrator import MigrationAction, MigrationError, Migrator, SchemaDetector
from .migrator import SchemaMigrator

__all__ = [
    # Primary API
    "BaseSchemaMigration",
    "SchemaMigrationError",
    "SchemaMigrator",
    # Internal (exposed for advanced use cases)
    "SchemaDetector",
    "MigrationError",
    "MigrationAction",
    # Deprecated alias
    "Migrator",
]
