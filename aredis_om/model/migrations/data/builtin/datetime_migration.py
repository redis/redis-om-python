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
import time
from enum import Enum
from typing import Any, Dict, List, Optional, Set, Tuple

from ..base import BaseMigration, DataMigrationError

log = logging.getLogger(__name__)


class SchemaMismatchError(Exception):
    """Raised when deployed code expects different field types than what's in Redis."""

    pass


class DatetimeFieldDetector:
    """Detects datetime field schema mismatches between code and Redis."""

    def __init__(self, redis):
        self.redis = redis

    async def check_for_schema_mismatches(self, models: List[Any]) -> Dict[str, Any]:
        """
        Check if any models have datetime fields that are indexed as TAG instead of NUMERIC.

        This detects the scenario where:
        1. User had old code with datetime fields indexed as TAG
        2. User deployed new code that expects NUMERIC indexing
        3. User hasn't run the migration yet

        Returns:
            Dict with mismatch information and recommended actions
        """
        mismatches = []

        for model in models:
            try:
                # Get the current index schema from Redis
                index_name = (
                    f"{model._meta.global_key_prefix}:{model._meta.model_key_prefix}"
                )

                try:
                    # Try to get index info
                    index_info = await self.redis.execute_command("FT.INFO", index_name)
                    current_schema = self._parse_index_schema(index_info)
                except Exception:  # nosec B112
                    # Index doesn't exist or other error - skip this model
                    continue

                # Check datetime fields in the model
                datetime_fields = self._get_datetime_fields(model)

                for field_name, field_info in datetime_fields.items():
                    redis_field_type = current_schema.get(field_name, {}).get("type")

                    if (
                        redis_field_type == "TAG"
                        and field_info.get("expected_type") == "NUMERIC"
                    ):
                        mismatches.append(
                            {
                                "model": model.__name__,
                                "field": field_name,
                                "current_type": "TAG",
                                "expected_type": "NUMERIC",
                                "index_name": index_name,
                            }
                        )

            except Exception as e:
                log.warning(f"Could not check schema for model {model.__name__}: {e}")
                continue

        return {
            "has_mismatches": len(mismatches) > 0,
            "mismatches": mismatches,
            "total_affected_models": len(set(m["model"] for m in mismatches)),
            "recommendation": self._get_recommendation(mismatches),
        }

    def _parse_index_schema(self, index_info: List) -> Dict[str, Dict[str, Any]]:
        """Parse FT.INFO output to extract field schema information."""
        schema = {}

        # FT.INFO returns a list of key-value pairs
        info_dict = {}
        for i in range(0, len(index_info), 2):
            if i + 1 < len(index_info):
                key = (
                    index_info[i].decode()
                    if isinstance(index_info[i], bytes)
                    else str(index_info[i])
                )
                value = index_info[i + 1]
                info_dict[key] = value

        # Extract attributes (field definitions)
        attributes = info_dict.get("attributes", [])

        for attr in attributes:
            if isinstance(attr, list) and len(attr) >= 4:
                field_name = (
                    attr[0].decode() if isinstance(attr[0], bytes) else str(attr[0])
                )
                field_type = (
                    attr[2].decode() if isinstance(attr[2], bytes) else str(attr[2])
                )

                schema[field_name] = {"type": field_type, "raw_attr": attr}

        return schema

    def _get_datetime_fields(self, model) -> Dict[str, Dict[str, Any]]:
        """Get datetime fields from a model and their expected types."""
        datetime_fields = {}

        try:
            # Get model fields in a compatible way
            if hasattr(model, "_get_model_fields"):
                model_fields = model._get_model_fields()
            elif hasattr(model, "model_fields"):
                model_fields = model.model_fields
            else:
                model_fields = getattr(model, "__fields__", {})

            for field_name, field_info in model_fields.items():
                # Check if this is a datetime field
                field_type = getattr(field_info, "annotation", None)
                if field_type in (datetime.datetime, datetime.date):
                    datetime_fields[field_name] = {
                        "expected_type": "NUMERIC",  # New code expects NUMERIC
                        "field_info": field_info,
                    }

        except Exception as e:
            log.warning(f"Could not analyze fields for model {model.__name__}: {e}")

        return datetime_fields

    def _get_recommendation(self, mismatches: List[Dict]) -> str:
        """Get recommendation based on detected mismatches."""
        if not mismatches:
            return "No schema mismatches detected."

        return (
            f"CRITICAL: Found {len(mismatches)} datetime field(s) with schema mismatches. "
            f"Your deployed code expects NUMERIC indexing but Redis has TAG indexing. "
            f"Run 'om migrate-data datetime' to fix this before queries fail. "
            f"Affected models: {', '.join(set(m['model'] for m in mismatches))}"
        )


class ConversionFailureMode(Enum):
    """How to handle datetime conversion failures."""

    SKIP = "skip"  # Skip the field, leave original value
    FAIL = "fail"  # Raise exception and stop migration
    DEFAULT = "default"  # Use a default timestamp value
    LOG_AND_SKIP = "log_and_skip"  # Log error but continue


class MigrationStats:
    """Track migration statistics and errors."""

    def __init__(self):
        self.processed_keys = 0
        self.converted_fields = 0
        self.skipped_fields = 0
        self.failed_conversions = 0
        self.errors: List[Tuple[str, str, str, Exception]] = (
            []
        )  # (key, field, value, error)

    def add_conversion_error(self, key: str, field: str, value: Any, error: Exception):
        """Record a conversion error."""
        self.failed_conversions += 1
        self.errors.append((key, field, str(value), error))
        return None

    def add_converted_field(self):
        """Record a successful field conversion."""
        self.converted_fields += 1

    def add_skipped_field(self):
        """Record a skipped field."""
        self.skipped_fields += 1

    def add_processed_key(self):
        """Record a processed key."""
        self.processed_keys += 1

    def get_summary(self) -> Dict[str, Any]:
        """Get migration statistics summary."""
        return {
            "processed_keys": self.processed_keys,
            "converted_fields": self.converted_fields,
            "skipped_fields": self.skipped_fields,
            "failed_conversions": self.failed_conversions,
            "error_count": len(self.errors),
            "success_rate": (
                self.converted_fields
                / max(1, self.converted_fields + self.failed_conversions)
            )
            * 100,
        }


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

    def __init__(
        self,
        redis_client=None,
        failure_mode: ConversionFailureMode = ConversionFailureMode.LOG_AND_SKIP,
        batch_size: int = 1000,
        max_errors: Optional[int] = None,
        enable_resume: bool = True,
        progress_save_interval: int = 100,
    ):
        super().__init__(redis_client)
        self.failure_mode = failure_mode
        self.batch_size = batch_size
        self.max_errors = max_errors
        self.enable_resume = enable_resume
        self.progress_save_interval = progress_save_interval
        self.stats = MigrationStats()
        self.migration_state = (
            MigrationState(self.redis, self.migration_id) if enable_resume else None
        )
        self.processed_keys_set: Set[str] = set()

        # Legacy compatibility
        self._processed_keys = 0
        self._converted_fields = 0

    def _safe_convert_datetime_value(
        self, key: str, field_name: str, value: Any
    ) -> Tuple[Any, bool]:
        """
        Safely convert a datetime value with comprehensive error handling.

        Returns:
            Tuple[Any, bool]: (converted_value, success_flag)
        """
        try:
            converted = self._convert_datetime_value(value)
            if converted != value:  # Conversion actually happened
                self.stats.add_converted_field()
                return converted, True
            else:
                self.stats.add_skipped_field()
                return value, True

        except Exception as e:
            self.stats.add_conversion_error(key, field_name, value, e)

    async def _convert_datetime_value(self, value: Any) -> Any:
        """Legacy method for compatibility - delegates to safe conversion."""
        converted, _ = self._safe_convert_datetime_value("unknown", "unknown", value)
        return converted

    def _check_error_threshold(self):
        """Check if we've exceeded the maximum allowed errors."""
        if (
            self.max_errors is not None
            and self.stats.failed_conversions >= self.max_errors
        ):
            raise DataMigrationError(
                f"Migration stopped: exceeded maximum error threshold of {self.max_errors} errors. "
                f"Current error count: {self.stats.failed_conversions}"
            )

    def _log_progress(self, current: int, total: int, operation: str = "Processing"):
        """Log migration progress."""
        if current % 100 == 0 or current == total:
            percentage = (current / total) * 100 if total > 0 else 0
            log.info(f"{operation}: {current}/{total} ({percentage:.1f}%)")

    def get_migration_stats(self) -> Dict[str, Any]:
        """Get detailed migration statistics."""
        stats = self.stats.get_summary()
        stats.update(
            {
                "failure_mode": self.failure_mode.value,
                "batch_size": self.batch_size,
                "max_errors": self.max_errors,
                "recent_errors": [
                    {"key": key, "field": field, "value": value, "error": str(error)}
                    for key, field, value, error in self.stats.errors[
                        -10:
                    ]  # Last 10 errors
                ],
            }
        )
        return stats

    async def _load_previous_progress(self) -> bool:
        """Load previous migration progress if available."""
        if not self.migration_state:
            return False

        if not await self.migration_state.has_saved_progress():
            return False

        progress = await self.migration_state.load_progress()

        if progress["processed_keys"]:
            self.processed_keys_set = set(progress["processed_keys"])
            self._processed_keys = len(self.processed_keys_set)

            # Restore stats if available
            if progress.get("stats"):
                saved_stats = progress["stats"]
                self.stats.processed_keys = saved_stats.get("processed_keys", 0)
                self.stats.converted_fields = saved_stats.get("converted_fields", 0)
                self.stats.skipped_fields = saved_stats.get("skipped_fields", 0)
                self.stats.failed_conversions = saved_stats.get("failed_conversions", 0)

            log.info(
                f"Resuming migration from previous state: "
                f"{len(self.processed_keys_set)} keys already processed"
            )
            return True

        return False

    async def _save_progress_if_needed(self, current_model: str, total_keys: int):
        """Save progress periodically during migration."""
        if not self.migration_state:
            return

        if self.stats.processed_keys % self.progress_save_interval == 0:
            await self.migration_state.save_progress(
                processed_keys=self.processed_keys_set,
                current_model=current_model,
                total_keys=total_keys,
                stats=self.stats.get_summary(),
            )

    async def _clear_progress_on_completion(self):
        """Clear saved progress when migration completes successfully."""
        if self.migration_state:
            await self.migration_state.clear_progress()


class MigrationState:
    """Track and persist migration state for resume capability."""

    def __init__(self, redis_client, migration_id: str):
        self.redis = redis_client
        self.migration_id = migration_id
        self.state_key = f"redis_om:migration_state:{migration_id}"

    async def save_progress(
        self,
        processed_keys: Set[str],
        current_model: Optional[str] = None,
        total_keys: int = 0,
        stats: Optional[Dict[str, Any]] = None,
    ):
        """Save current migration progress."""
        state_data = {
            "processed_keys": list(processed_keys),
            "current_model": current_model,
            "total_keys": total_keys,
            "timestamp": datetime.datetime.now().isoformat(),
            "stats": stats or {},
        }

        await self.redis.set(
            self.state_key, json.dumps(state_data), ex=86400  # Expire after 24 hours
        )

    async def load_progress(self) -> Dict[str, Any]:
        """Load saved migration progress."""
        state_data = await self.redis.get(self.state_key)
        if state_data:
            try:
                return json.loads(state_data)
            except json.JSONDecodeError:
                log.warning(f"Failed to parse migration state for {self.migration_id}")

        return {
            "processed_keys": [],
            "current_model": None,
            "total_keys": 0,
            "timestamp": None,
            "stats": {},
        }

    async def clear_progress(self):
        """Clear saved migration progress."""
        await self.redis.delete(self.state_key)

    async def has_saved_progress(self) -> bool:
        """Check if there's saved progress for this migration."""
        return await self.redis.exists(self.state_key)

    async def up(self) -> None:
        """Apply the datetime conversion migration with resume capability."""
        log.info("Starting datetime field migration...")

        # Try to load previous progress
        resumed = await self._load_previous_progress()
        if resumed:
            log.info("Resumed from previous migration state")

        # Import model registry at runtime to avoid import loops
        from ....model import model_registry

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

        # Log detailed migration statistics
        stats = self.get_migration_stats()
        log.info(
            f"Migration completed. Processed {stats['processed_keys']} keys, "
            f"converted {stats['converted_fields']} datetime fields, "
            f"skipped {stats['skipped_fields']} fields, "
            f"failed {stats['failed_conversions']} conversions. "
            f"Success rate: {stats['success_rate']:.1f}%"
        )

        # Log errors if any occurred
        if stats["failed_conversions"] > 0:
            log.warning(
                f"Migration completed with {stats['failed_conversions']} conversion errors"
            )
            for error_info in stats["recent_errors"]:
                log.warning(
                    f"Error in {error_info['key']}.{error_info['field']}: {error_info['error']}"
                )

        # Clear progress state on successful completion
        await self._clear_progress_on_completion()
        log.info("Migration state cleared - migration completed successfully")

    async def _process_hash_model(
        self, model_class, datetime_fields: List[str]
    ) -> None:
        """Process HashModel instances to convert datetime fields with enhanced error handling."""
        # Get all keys for this model
        key_pattern = model_class.make_key("*")

        # Collect all keys first for batch processing
        all_keys = []
        scan_iter = self.redis.scan_iter(match=key_pattern, _type="HASH")
        async for key in scan_iter:  # type: ignore[misc]
            if isinstance(key, bytes):
                key = key.decode("utf-8")
            all_keys.append(key)

        total_keys = len(all_keys)
        log.info(
            f"Processing {total_keys} HashModel keys for {model_class.__name__} in batches of {self.batch_size}"
        )

        processed_count = 0

        # Process keys in batches
        for batch_start in range(0, total_keys, self.batch_size):
            batch_end = min(batch_start + self.batch_size, total_keys)
            batch_keys = all_keys[batch_start:batch_end]

            batch_start_time = time.time()

            for key in batch_keys:
                try:
                    # Skip if already processed (resume capability)
                    if key in self.processed_keys_set:
                        continue

                    # Get all fields from the hash
                    try:
                        hash_data = await self.redis.hgetall(key)  # type: ignore[misc]
                    except Exception as e:
                        log.warning(f"Failed to get hash data from {key}: {e}")
                        continue

                    if not hash_data:
                        continue

                    # Convert byte keys/values to strings if needed
                    if hash_data and isinstance(next(iter(hash_data.keys())), bytes):
                        hash_data = {
                            k.decode("utf-8"): v.decode("utf-8")
                            for k, v in hash_data.items()
                        }

                    updates = {}

                    # Check each datetime field with safe conversion
                    for field_name in datetime_fields:
                        if field_name in hash_data:
                            value = hash_data[field_name]
                            converted, success = self._safe_convert_datetime_value(
                                key, field_name, value
                            )

                            if success and converted != value:
                                updates[field_name] = str(converted)

                    # Update the hash if we have changes
                    if updates:
                        try:
                            await self.redis.hset(key, mapping=updates)  # type: ignore[misc]
                        except Exception as e:
                            log.error(f"Failed to update hash {key}: {e}")
                            if self.failure_mode == ConversionFailureMode.FAIL:
                                raise DataMigrationError(
                                    f"Failed to update hash {key}: {e}"
                                )

                    # Mark key as processed
                    self.processed_keys_set.add(key)
                    self.stats.add_processed_key()
                    self._processed_keys += 1
                    processed_count += 1

                    # Error threshold checking
                    self._check_error_threshold()

                    # Save progress periodically
                    await self._save_progress_if_needed(
                        model_class.__name__, total_keys
                    )

                except DataMigrationError:
                    # Re-raise migration errors
                    raise
                except Exception as e:
                    log.error(f"Unexpected error processing hash key {key}: {e}")
                    if self.failure_mode == ConversionFailureMode.FAIL:
                        raise DataMigrationError(
                            f"Unexpected error processing hash key {key}: {e}"
                        )
                    # Continue with next key for other failure modes

            # Log batch completion
            batch_time = time.time() - batch_start_time
            batch_size_actual = len(batch_keys)
            log.info(
                f"Completed batch {batch_start // self.batch_size + 1}: "
                f"{batch_size_actual} keys in {batch_time:.2f}s "
                f"({batch_size_actual / batch_time:.1f} keys/sec)"
            )

            # Progress reporting
            self._log_progress(processed_count, total_keys, "HashModel keys")

    async def _process_json_model(
        self, model_class, datetime_fields: List[str]
    ) -> None:
        """Process JsonModel instances to convert datetime fields with enhanced error handling."""
        # Get all keys for this model
        key_pattern = model_class.make_key("*")

        # Collect all keys first for batch processing
        all_keys = []
        scan_iter = self.redis.scan_iter(match=key_pattern, _type="ReJSON-RL")
        async for key in scan_iter:  # type: ignore[misc]
            if isinstance(key, bytes):
                key = key.decode("utf-8")
            all_keys.append(key)

        total_keys = len(all_keys)
        log.info(
            f"Processing {total_keys} JsonModel keys for {model_class.__name__} in batches of {self.batch_size}"
        )

        processed_count = 0

        # Process keys in batches
        for batch_start in range(0, total_keys, self.batch_size):
            batch_end = min(batch_start + self.batch_size, total_keys)
            batch_keys = all_keys[batch_start:batch_end]

            batch_start_time = time.time()

            for key in batch_keys:
                try:
                    # Skip if already processed (resume capability)
                    if key in self.processed_keys_set:
                        continue

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
                        document, datetime_fields, key
                    )

                    # Update if changes were made
                    if updated_document != document:
                        try:
                            await self.redis.json().set(key, "$", updated_document)
                        except Exception as e:
                            log.error(f"Failed to update JSON document {key}: {e}")
                            if self.failure_mode == ConversionFailureMode.FAIL:
                                raise DataMigrationError(
                                    f"Failed to update JSON document {key}: {e}"
                                )

                    # Mark key as processed
                    self.processed_keys_set.add(key)
                    self.stats.add_processed_key()
                    self._processed_keys += 1
                    processed_count += 1

                    # Error threshold checking
                    self._check_error_threshold()

                    # Save progress periodically
                    await self._save_progress_if_needed(
                        model_class.__name__, total_keys
                    )

                except DataMigrationError:
                    # Re-raise migration errors
                    raise
                except Exception as e:
                    log.error(f"Unexpected error processing JSON key {key}: {e}")
                    if self.failure_mode == ConversionFailureMode.FAIL:
                        raise DataMigrationError(
                            f"Unexpected error processing JSON key {key}: {e}"
                        )
                    # Continue with next key for other failure modes

            # Log batch completion
            batch_time = time.time() - batch_start_time
            batch_size_actual = len(batch_keys)
            log.info(
                f"Completed batch {batch_start // self.batch_size + 1}: "
                f"{batch_size_actual} keys in {batch_time:.2f}s "
                f"({batch_size_actual / batch_time:.1f} keys/sec)"
            )

            # Progress reporting
            self._log_progress(processed_count, total_keys, "JsonModel keys")

    async def _convert_datetime_fields_in_dict(
        self, data: Any, datetime_fields: List[str], redis_key: str = "unknown"
    ) -> Any:
        """Recursively convert datetime fields in nested dictionaries with safe conversion."""
        if isinstance(data, dict):
            result = {}
            for field_name, value in data.items():
                if field_name in datetime_fields:
                    converted, success = self._safe_convert_datetime_value(
                        redis_key, field_name, value
                    )
                    result[field_name] = converted
                else:
                    # Recurse for nested structures
                    result[field_name] = await self._convert_datetime_fields_in_dict(
                        value, datetime_fields, redis_key
                    )
            return result
        elif isinstance(data, list):
            return [
                await self._convert_datetime_fields_in_dict(
                    item, datetime_fields, redis_key
                )
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
        from ....model import model_registry

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
