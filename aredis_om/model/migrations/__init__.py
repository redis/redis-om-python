"""
Migration system for Redis OM.

This module provides both data and schema migration capabilities for Redis OM
Python applications.

For schema migrations, use SchemaMigrator or the `om migrate` CLI.
For data migrations, use DataMigrator or the `om migrate-data` CLI.
"""

from .data import BaseMigration, DataMigrationError, DataMigrator
from .schema import (
    BaseSchemaMigration,
    MigrationAction,
    MigrationError,
    SchemaDetector,
    SchemaMigrationError,
    SchemaMigrator,
)

__all__ = [
    # Data migrations
    "BaseMigration",
    "DataMigrationError",
    "DataMigrator",
    # Schema migrations
    "BaseSchemaMigration",
    "SchemaMigrationError",
    "SchemaMigrator",
    # Internal utilities
    "SchemaDetector",
    "MigrationError",
    "MigrationAction",
]
