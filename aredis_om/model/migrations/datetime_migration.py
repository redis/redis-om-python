"""
Built-in migration to convert datetime fields from ISO strings to timestamps.

This migration fixes datetime field indexing by converting stored datetime values
from ISO string format to Unix timestamps, enabling proper NUMERIC indexing for
range queries and sorting.
"""

import asyncio
import datetime
import json
import logging
from typing import Any, Dict, List

from .data_migrator import BaseMigration


log = logging.getLogger(__name__)


class DatetimeFieldMigration(BaseMigration):
    """
    Migration to convert datetime fields from ISO strings to Unix timestamps.

    This migration:
    1. Identifies all models with datetime fields
    2. Converts stored datetime values from ISO strings to Unix timestamps
    3. Handles both HashModel and JsonModel storage formats
    4. Enables proper NUMERIC indexing for datetime fields
    """

    migration_id = "001_datetime_fields_to_timestamps"
    description = "Convert datetime fields from ISO strings to Unix timestamps for proper indexing"
    dependencies = []

    def __init__(self, redis_client=None):
        super().__init__(redis_client)
        self._processed_keys = 0
        self._converted_fields = 0

    async def up(self) -> None:
        """Apply the datetime conversion migration."""
        log.info("Starting datetime field migration...")

        # Import model registry at runtime to avoid import loops
        from ..model import model_registry

        models_with_datetime_fields = []

        # Find all models with datetime fields
        for model_name, model_class in model_registry.items():
            datetime_fields = []
            for field_name, field_info in model_class.model_fields.items():
                field_type = getattr(field_info, "annotation", None)
                if field_type in (datetime.datetime, datetime.date):
                    datetime_fields.append(field_name)

            if datetime_fields:
                models_with_datetime_fields.append(
                    (model_name, model_class, datetime_fields)
                )

        if not models_with_datetime_fields:
            log.info("No models with datetime fields found.")
            return

        log.info(
            f"Found {len(models_with_datetime_fields)} model(s) with datetime fields"
        )

        # Process each model
        for model_name, model_class, datetime_fields in models_with_datetime_fields:
            log.info(
                f"Processing model {model_name} with datetime fields: {datetime_fields}"
            )

            # Determine if this is a HashModel or JsonModel
            is_json_model = (
                hasattr(model_class, "_meta")
                and getattr(model_class._meta, "database_type", None) == "json"
            )

            if is_json_model:
                await self._process_json_model(model_class, datetime_fields)
            else:
                await self._process_hash_model(model_class, datetime_fields)

        log.info(
            f"Migration completed. Processed {self._processed_keys} keys, converted {self._converted_fields} datetime fields."
        )

    async def _process_hash_model(
        self, model_class, datetime_fields: List[str]
    ) -> None:
        """Process HashModel instances to convert datetime fields."""
        # Get all keys for this model
        key_pattern = model_class.make_key("*")

        scan_iter = self.redis.scan_iter(match=key_pattern, _type="HASH")
        async for key in scan_iter:  # type: ignore[misc]
            if isinstance(key, bytes):
                key = key.decode("utf-8")

            # Get all fields from the hash
            hash_data = await self.redis.hgetall(key)  # type: ignore[misc]

            if not hash_data:
                continue

            # Convert byte keys/values to strings if needed
            if hash_data and isinstance(next(iter(hash_data.keys())), bytes):
                hash_data = {
                    k.decode("utf-8"): v.decode("utf-8") for k, v in hash_data.items()
                }

            updates = {}

            # Check each datetime field
            for field_name in datetime_fields:
                if field_name in hash_data:
                    value = hash_data[field_name]
                    converted = await self._convert_datetime_value(value)
                    if converted is not None and converted != value:
                        updates[field_name] = str(converted)
                        self._converted_fields += 1

            # Update the hash if we have changes
            if updates:
                await self.redis.hset(key, mapping=updates)  # type: ignore[misc]

            self._processed_keys += 1

    async def _process_json_model(
        self, model_class, datetime_fields: List[str]
    ) -> None:
        """Process JsonModel instances to convert datetime fields."""
        # Get all keys for this model
        key_pattern = model_class.make_key("*")

        scan_iter = self.redis.scan_iter(match=key_pattern, _type="ReJSON-RL")
        async for key in scan_iter:  # type: ignore[misc]
            if isinstance(key, bytes):
                key = key.decode("utf-8")

            # Get the JSON document
            try:
                document = await self.redis.json().get(key)
            except Exception as e:
                log.warning(f"Failed to get JSON document from {key}: {e}")
                continue

            if not document:
                continue

            # Convert datetime fields in the document
            updated_document = await self._convert_datetime_fields_in_dict(
                document, datetime_fields
            )

            # Update if changes were made
            if updated_document != document:
                await self.redis.json().set(key, "$", updated_document)

            self._processed_keys += 1

    async def _convert_datetime_fields_in_dict(
        self, data: Any, datetime_fields: List[str]
    ) -> Any:
        """Recursively convert datetime fields in nested dictionaries."""
        if isinstance(data, dict):
            result = {}
            for key, value in data.items():
                if key in datetime_fields:
                    converted = await self._convert_datetime_value(value)
                    if converted is not None:
                        result[key] = converted
                        if converted != value:
                            self._converted_fields += 1
                    else:
                        result[key] = value
                else:
                    # Recurse for nested structures
                    result[key] = await self._convert_datetime_fields_in_dict(
                        value, datetime_fields
                    )
            return result
        elif isinstance(data, list):
            return [
                await self._convert_datetime_fields_in_dict(item, datetime_fields)
                for item in data
            ]
        else:
            return data

    async def _convert_datetime_value(self, value: Any) -> Any:
        """
        Convert a datetime value from ISO string to Unix timestamp.

        Args:
            value: The value to convert (may be string, number, etc.)

        Returns:
            Converted timestamp or None if conversion not needed/possible
        """
        if not isinstance(value, str):
            # Already a number, probably already converted
            return value

        # Try to parse as ISO datetime string
        try:
            # Handle various ISO formats
            if "T" in value:
                # Full datetime with T separator
                if value.endswith("Z"):
                    dt = datetime.datetime.fromisoformat(value.replace("Z", "+00:00"))
                elif "+" in value or value.count("-") > 2:
                    dt = datetime.datetime.fromisoformat(value)
                else:
                    dt = datetime.datetime.fromisoformat(value)
            else:
                # Date only (YYYY-MM-DD)
                dt = datetime.datetime.strptime(value, "%Y-%m-%d")

            # Convert to timestamp
            return dt.timestamp()

        except (ValueError, TypeError):
            # Not a datetime string or already converted
            return value

    async def down(self) -> None:
        """
        Reverse the migration by converting timestamps back to ISO strings.

        Note: This rollback is approximate since we lose some precision
        and timezone information in the conversion process.
        """
        log.info("Starting datetime field migration rollback...")

        # Import model registry at runtime
        from ..model import model_registry

        models_with_datetime_fields = []

        # Find all models with datetime fields
        for model_name, model_class in model_registry.items():
            datetime_fields = []
            for field_name, field_info in model_class.model_fields.items():
                field_type = getattr(field_info, "annotation", None)
                if field_type in (datetime.datetime, datetime.date):
                    datetime_fields.append(field_name)

            if datetime_fields:
                models_with_datetime_fields.append(
                    (model_name, model_class, datetime_fields)
                )

        if not models_with_datetime_fields:
            log.info("No models with datetime fields found.")
            return

        log.info(
            f"Found {len(models_with_datetime_fields)} model(s) with datetime fields"
        )

        # Process each model
        for model_name, model_class, datetime_fields in models_with_datetime_fields:
            log.info(
                f"Rolling back model {model_name} with datetime fields: {datetime_fields}"
            )

            # Determine if this is a HashModel or JsonModel
            is_json_model = (
                hasattr(model_class, "_meta")
                and getattr(model_class._meta, "database_type", None) == "json"
            )

            if is_json_model:
                await self._rollback_json_model(model_class, datetime_fields)
            else:
                await self._rollback_hash_model(model_class, datetime_fields)

        log.info("Migration rollback completed.")

    async def _rollback_hash_model(
        self, model_class, datetime_fields: List[str]
    ) -> None:
        """Rollback HashModel instances by converting timestamps back to ISO strings."""
        key_pattern = model_class.make_key("*")

        scan_iter = self.redis.scan_iter(match=key_pattern, _type="HASH")
        async for key in scan_iter:  # type: ignore[misc]
            if isinstance(key, bytes):
                key = key.decode("utf-8")

            hash_data = await self.redis.hgetall(key)  # type: ignore[misc]

            if not hash_data:
                continue

            # Convert byte keys/values to strings if needed
            if hash_data and isinstance(next(iter(hash_data.keys())), bytes):
                hash_data = {
                    k.decode("utf-8"): v.decode("utf-8") for k, v in hash_data.items()
                }

            updates = {}

            # Check each datetime field
            for field_name in datetime_fields:
                if field_name in hash_data:
                    value = hash_data[field_name]
                    converted = await self._convert_timestamp_to_iso(value)
                    if converted is not None and converted != value:
                        updates[field_name] = str(converted)

            # Update the hash if we have changes
            if updates:
                await self.redis.hset(key, mapping=updates)  # type: ignore[misc]

    async def _rollback_json_model(
        self, model_class, datetime_fields: List[str]
    ) -> None:
        """Rollback JsonModel instances by converting timestamps back to ISO strings."""
        key_pattern = model_class.make_key("*")

        scan_iter = self.redis.scan_iter(match=key_pattern, _type="ReJSON-RL")
        async for key in scan_iter:  # type: ignore[misc]
            if isinstance(key, bytes):
                key = key.decode("utf-8")

            try:
                document = await self.redis.json().get(key)
            except Exception as e:
                log.warning(f"Failed to get JSON document from {key}: {e}")
                continue

            if not document:
                continue

            # Convert timestamp fields back to ISO strings
            updated_document = await self._rollback_datetime_fields_in_dict(
                document, datetime_fields
            )

            # Update if changes were made
            if updated_document != document:
                await self.redis.json().set(key, "$", updated_document)

    async def _rollback_datetime_fields_in_dict(
        self, data: Any, datetime_fields: List[str]
    ) -> Any:
        """Recursively convert timestamp fields back to ISO strings."""
        if isinstance(data, dict):
            result = {}
            for key, value in data.items():
                if key in datetime_fields:
                    converted = await self._convert_timestamp_to_iso(value)
                    result[key] = converted if converted is not None else value
                else:
                    result[key] = await self._rollback_datetime_fields_in_dict(
                        value, datetime_fields
                    )
            return result
        elif isinstance(data, list):
            return [
                await self._rollback_datetime_fields_in_dict(item, datetime_fields)
                for item in data
            ]
        else:
            return data

    async def _convert_timestamp_to_iso(self, value: Any) -> Any:
        """Convert a Unix timestamp back to ISO string format."""
        if isinstance(value, str):
            # Already a string, probably already converted
            return value

        try:
            # Convert number to datetime and then to ISO string
            if isinstance(value, (int, float)):
                dt = datetime.datetime.fromtimestamp(value)
                return dt.isoformat()
            else:
                return value
        except (ValueError, TypeError, OSError):
            # Not a valid timestamp
            return value

    async def can_run(self) -> bool:
        """Check if migration can run by verifying Redis connection."""
        try:
            await self.redis.ping()  # type: ignore[misc]
            return True
        except Exception:
            return False
