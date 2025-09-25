"""
Schema migration system for Redis OM.

This module provides infrastructure for managing RediSearch index schema changes
and migrations in Redis OM Python applications.
"""

from .base import BaseSchemaMigration, SchemaMigrationError
from .migrator import SchemaMigrator
from .legacy_migrator import Migrator, MigrationError, MigrationAction

__all__ = [
    "BaseSchemaMigration",
    "SchemaMigrationError",
    "SchemaMigrator",
    "Migrator",
    "MigrationError",
    "MigrationAction"
]
