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

from .data_migrator import BaseMigration, DataMigrationError


log = logging.getLogger(__name__)


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

            if self.failure_mode == ConversionFailureMode.FAIL:
                raise DataMigrationError(
                    f"Failed to convert datetime field '{field_name}' in key '{key}': {e}"
                )
            elif self.failure_mode == ConversionFailureMode.DEFAULT:
                # Use epoch timestamp as default
                default_value = 0.0
                log.warning(
                    f"Using default timestamp for failed conversion in {key}.{field_name}: {e}"
                )
                self.stats.add_converted_field()
                return default_value, True
            elif self.failure_mode == ConversionFailureMode.LOG_AND_SKIP:
                log.warning(
                    f"Skipping failed datetime conversion in {key}.{field_name}: {e}"
                )
                self.stats.add_skipped_field()
                return value, True
            else:  # SKIP mode
                self.stats.add_skipped_field()
                return value, True

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
