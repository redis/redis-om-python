"""
Schema migration system for Redis OM.

This module provides infrastructure for managing RediSearch index schema changes
and migrations in Redis OM Python applications.
"""

from .base import BaseSchemaMigration, SchemaMigrationError
from .legacy_migrator import MigrationAction, MigrationError, Migrator
from .migrator import SchemaMigrator


__all__ = [
    "BaseSchemaMigration",
    "SchemaMigrationError",
    "SchemaMigrator",
    "Migrator",
    "MigrationError",
    "MigrationAction",
]
