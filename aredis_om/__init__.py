from .async_redis import redis  # isort:skip
from .checks import has_redis_json, has_redisearch
from .connections import get_redis_connection
from .model.migrations import MigrationError, SchemaMigrator
from .model.migrations.schema.legacy_migrator import SchemaDetector
from .model.model import (
    EmbeddedJsonModel,
    Field,
    FindQuery,
    HashModel,
    JsonModel,
    KNNExpression,
    NotFoundError,
    QueryNotSupportedError,
    QuerySyntaxError,
    RedisModel,
    RedisModelError,
    VectorFieldOptions,
)
from .model.types import Coordinates, GeoFilter

# Backward compatibility alias - deprecated, use SchemaDetector or SchemaMigrator
Migrator = SchemaDetector

__all__ = [
    "Coordinates",
    "EmbeddedJsonModel",
    "Field",
    "FindQuery",
    "GeoFilter",
    "HashModel",
    "JsonModel",
    "KNNExpression",
    "MigrationError",
    "Migrator",  # Deprecated - use SchemaMigrator for production
    "NotFoundError",
    "QueryNotSupportedError",
    "QuerySyntaxError",
    "RedisModel",
    "RedisModelError",
    "SchemaMigrator",
    "SchemaDetector",
    "VectorFieldOptions",
    "get_redis_connection",
    "has_redis_json",
    "has_redisearch",
    "redis",
]
