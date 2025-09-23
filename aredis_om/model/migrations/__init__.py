"""
Migration system for Redis OM.

This module provides both data and schema migration capabilities for Redis OM
Python applications. The migration system is organized into domain-specific
submodules for better organization and maintainability.
"""

# Import from new locations for backward compatibility
from .data import BaseMigration, DataMigrationError, DataMigrator
from .schema import (
    BaseSchemaMigration,
    SchemaMigrationError,
    SchemaMigrator,
    Migrator,
    MigrationError,
    MigrationAction
)

# Maintain backward compatibility by exposing the same API
__all__ = [
    # Data migration classes
    "BaseMigration",
    "DataMigrationError",
    "DataMigrator",

    # Schema migration classes
    "BaseSchemaMigration",
    "SchemaMigrationError",
    "SchemaMigrator",

    # Legacy classes (for backward compatibility)
    "Migrator",
    "MigrationError",
    "MigrationAction",
]