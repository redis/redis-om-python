"""
Comprehensive tests for enhanced datetime migration features.

Tests edge cases, error handling, batch processing, and verification.
"""

import asyncio
import datetime
import os
import tempfile
from unittest.mock import AsyncMock, MagicMock, patch

import pytest

from aredis_om import Field, HashModel, JsonModel
from aredis_om.model.migrations.data_migrator import DataMigrationError, DataMigrator
from aredis_om.model.migrations.datetime_migration import (
    ConversionFailureMode,
    DatetimeFieldMigration,
    MigrationStats,
)

from .conftest import py_test_mark_asyncio


class TestHashModelWithDatetime(HashModel, index=True):
    name: str = Field(index=True)
    created_at: datetime.datetime = Field(index=True, sortable=True)
    birth_date: datetime.date = Field(index=True)

    class Meta:
        global_key_prefix = "test_enhanced_migration"


class TestJsonModelWithDatetime(JsonModel, index=True):
    name: str = Field(index=True)
    created_at: datetime.datetime = Field(index=True, sortable=True)
    birth_date: datetime.date = Field(index=True)

    class Meta:
        global_key_prefix = "test_enhanced_migration"


@py_test_mark_asyncio
async def test_migration_stats_tracking(redis):
    """Test that migration statistics are properly tracked."""
    migration = DatetimeFieldMigration(
        redis_client=redis, failure_mode=ConversionFailureMode.LOG_AND_SKIP
    )

    # Test stats initialization
    assert migration.stats.processed_keys == 0
    assert migration.stats.converted_fields == 0
    assert migration.stats.failed_conversions == 0

    # Test adding stats
    migration.stats.add_processed_key()
    migration.stats.add_converted_field()
    migration.stats.add_conversion_error(
        "test_key", "test_field", "invalid_value", ValueError("test error")
    )

    assert migration.stats.processed_keys == 1
    assert migration.stats.converted_fields == 1
    assert migration.stats.failed_conversions == 1
    assert len(migration.stats.errors) == 1

    # Test summary
    summary = migration.stats.get_summary()
    assert summary["processed_keys"] == 1
    assert summary["converted_fields"] == 1
    assert summary["failed_conversions"] == 1
    assert summary["success_rate"] == 50.0  # 1 success out of 2 attempts


@py_test_mark_asyncio
async def test_safe_conversion_with_different_failure_modes(redis):
    """Test safe conversion with different failure modes."""

    # Test FAIL mode
    migration_fail = DatetimeFieldMigration(
        redis_client=redis, failure_mode=ConversionFailureMode.FAIL
    )

    with pytest.raises(DataMigrationError):
        migration_fail._safe_convert_datetime_value(
            "test_key", "test_field", "invalid_datetime"
        )

    # Test SKIP mode
    migration_skip = DatetimeFieldMigration(
        redis_client=redis, failure_mode=ConversionFailureMode.SKIP
    )

    result, success = migration_skip._safe_convert_datetime_value(
        "test_key", "test_field", "invalid_datetime"
    )
    assert result == "invalid_datetime"  # Original value returned
    assert success is True
    assert migration_skip.stats.skipped_fields == 1

    # Test DEFAULT mode
    migration_default = DatetimeFieldMigration(
        redis_client=redis, failure_mode=ConversionFailureMode.DEFAULT
    )

    result, success = migration_default._safe_convert_datetime_value(
        "test_key", "test_field", "invalid_datetime"
    )
    assert result == 0.0  # Default timestamp
    assert success is True
    assert migration_default.stats.converted_fields == 1

    # Test LOG_AND_SKIP mode
    migration_log_skip = DatetimeFieldMigration(
        redis_client=redis, failure_mode=ConversionFailureMode.LOG_AND_SKIP
    )

    result, success = migration_log_skip._safe_convert_datetime_value(
        "test_key", "test_field", "invalid_datetime"
    )
    assert result == "invalid_datetime"  # Original value returned
    assert success is True
    assert migration_log_skip.stats.skipped_fields == 1
    assert migration_log_skip.stats.failed_conversions == 1


@py_test_mark_asyncio
async def test_error_threshold_checking(redis):
    """Test that migration stops when error threshold is exceeded."""
    migration = DatetimeFieldMigration(
        redis_client=redis,
        failure_mode=ConversionFailureMode.LOG_AND_SKIP,
        max_errors=2,
    )

    # Add errors up to threshold
    migration.stats.add_conversion_error(
        "key1", "field1", "value1", ValueError("error1")
    )
    migration.stats.add_conversion_error(
        "key2", "field2", "value2", ValueError("error2")
    )

    # Should not raise yet
    migration._check_error_threshold()

    # Add one more error to exceed threshold
    migration.stats.add_conversion_error(
        "key3", "field3", "value3", ValueError("error3")
    )

    # Should raise now
    with pytest.raises(DataMigrationError, match="exceeded maximum error threshold"):
        migration._check_error_threshold()


@py_test_mark_asyncio
async def test_timezone_aware_datetime_conversion(redis):
    """Test conversion of timezone-aware datetime objects."""
    migration = DatetimeFieldMigration(redis_client=redis)

    # Test timezone-aware datetime string
    tz_aware_string = "2023-01-01T12:00:00+05:00"
    result, success = migration._safe_convert_datetime_value(
        "test_key", "test_field", tz_aware_string
    )

    assert success is True
    assert isinstance(result, float)

    # Verify the timestamp is correct (accounting for timezone)
    expected_dt = datetime.datetime.fromisoformat(tz_aware_string)
    expected_timestamp = expected_dt.timestamp()
    assert (
        abs(result - expected_timestamp) < 1
    )  # Allow small floating point differences


@py_test_mark_asyncio
async def test_null_and_empty_value_handling(redis):
    """Test handling of null and empty values."""
    migration = DatetimeFieldMigration(redis_client=redis)

    # Test None value
    result, success = migration._safe_convert_datetime_value(
        "test_key", "test_field", None
    )
    assert result is None
    assert success is True

    # Test empty string
    result, success = migration._safe_convert_datetime_value(
        "test_key", "test_field", ""
    )
    assert result == ""
    assert success is True

    # Test numeric values (should be left unchanged)
    result, success = migration._safe_convert_datetime_value(
        "test_key", "test_field", 1672531200.0
    )
    assert result == 1672531200.0
    assert success is True


@py_test_mark_asyncio
async def test_batch_processing_with_large_dataset(redis):
    """Test batch processing with a simulated large dataset."""
    # Set up test models to use test redis
    TestHashModelWithDatetime._meta.database = redis

    # Create test data
    test_data = []
    for i in range(50):  # Create 50 test records
        model = TestHashModelWithDatetime(
            name=f"test_{i}",
            created_at=datetime.datetime(2023, 1, 1, 12, i % 60),  # Different times
            birth_date=datetime.date(1990, 1, 1),
        )
        await model.save()
        test_data.append(model)

    try:
        # Create migration with small batch size
        migration = DatetimeFieldMigration(
            redis_client=redis,
            batch_size=10,  # Small batch size for testing
            failure_mode=ConversionFailureMode.LOG_AND_SKIP,
        )

        # Run migration
        await migration.up()

        # Verify all keys were processed
        assert migration.stats.processed_keys == 50

        # Verify batch processing worked (should have processed in 5 batches)
        # This is implicit in the successful completion

    finally:
        # Clean up
        for model in test_data:
            try:
                await redis.delete(model.key())
            except Exception:
                pass


@py_test_mark_asyncio
async def test_concurrent_migration_safety(redis):
    """Test that migration handles concurrent access safely."""
    # This test simulates concurrent access by running multiple migration instances
    # In practice, this should be prevented by application logic, but the migration
    # should handle it gracefully

    TestHashModelWithDatetime._meta.database = redis

    # Create test data
    model = TestHashModelWithDatetime(
        name="concurrent_test",
        created_at=datetime.datetime(2023, 1, 1, 12, 0),
        birth_date=datetime.date(1990, 1, 1),
    )
    await model.save()

    try:
        # Create two migration instances
        migration1 = DatetimeFieldMigration(redis_client=redis)
        migration2 = DatetimeFieldMigration(redis_client=redis)

        # Run them concurrently
        results = await asyncio.gather(
            migration1.up(), migration2.up(), return_exceptions=True
        )

        # At least one should succeed, and no exceptions should be raised
        # (Both might succeed if they process different keys or handle concurrency well)
        exceptions = [r for r in results if isinstance(r, Exception)]
        assert len(exceptions) == 0, f"Unexpected exceptions: {exceptions}"

    finally:
        # Clean up
        try:
            await redis.delete(model.key())
        except Exception:
            pass


@py_test_mark_asyncio
async def test_partial_migration_failure_recovery(redis):
    """Test recovery from partial migration failures."""
    TestHashModelWithDatetime._meta.database = redis

    # Create test data with some invalid datetime strings
    valid_model = TestHashModelWithDatetime(
        name="valid",
        created_at=datetime.datetime(2023, 1, 1, 12, 0),
        birth_date=datetime.date(1990, 1, 1),
    )
    await valid_model.save()

    # Manually insert invalid datetime data
    invalid_key = TestHashModelWithDatetime.make_key("invalid")
    await redis.hset(
        invalid_key,
        mapping={
            "name": "invalid",
            "created_at": "not_a_datetime",
            "birth_date": "also_not_a_date",
        },
    )

    try:
        # Run migration with LOG_AND_SKIP mode
        migration = DatetimeFieldMigration(
            redis_client=redis, failure_mode=ConversionFailureMode.LOG_AND_SKIP
        )

        await migration.up()

        # Should have processed both keys
        assert migration.stats.processed_keys == 2

        # Should have some conversion failures
        assert migration.stats.failed_conversions > 0

        # Should have some successful conversions (from the valid model)
        assert migration.stats.converted_fields > 0

        # Verify the valid model was converted properly
        valid_data = await redis.hgetall(valid_model.key())
        assert "created_at" in valid_data
        # Should be a timestamp now
        timestamp = float(valid_data["created_at"])
        assert isinstance(timestamp, float)

    finally:
        # Clean up
        try:
            await redis.delete(valid_model.key())
            await redis.delete(invalid_key)
        except Exception:
            pass


@py_test_mark_asyncio
async def test_migration_verification(redis):
    """Test the migration verification functionality."""
    migrator = DataMigrator(redis_client=redis, load_builtin_migrations=True)

    # Test verification on clean database
    result = await migrator.verify_data_integrity(verbose=False)

    assert result["success"] is True
    assert result["checked_keys"] >= 0
    assert len(result["issues"]) == 0


@py_test_mark_asyncio
async def test_migration_statistics(redis):
    """Test migration statistics gathering."""
    migrator = DataMigrator(redis_client=redis, load_builtin_migrations=True)

    stats = await migrator.get_migration_statistics()

    assert "total_models" in stats
    assert "models_with_datetime_fields" in stats
    assert "total_datetime_fields" in stats
    assert "estimated_keys_to_migrate" in stats
    assert "model_details" in stats

    # Should find our test models
    assert stats["total_models"] >= 2  # At least our test models


@py_test_mark_asyncio
async def test_rollback_functionality(redis):
    """Test migration rollback functionality."""
    TestHashModelWithDatetime._meta.database = redis

    # Create test data with timestamps (simulating already migrated data)
    model = TestHashModelWithDatetime(
        name="rollback_test",
        created_at=datetime.datetime(2023, 1, 1, 12, 0),
        birth_date=datetime.date(1990, 1, 1),
    )
    await model.save()

    # Manually convert to timestamp format (simulate migrated state)
    timestamp = datetime.datetime(2023, 1, 1, 12, 0).timestamp()
    date_timestamp = datetime.datetime.combine(
        datetime.date(1990, 1, 1), datetime.time.min
    ).timestamp()

    await redis.hset(
        model.key(),
        mapping={"created_at": str(timestamp), "birth_date": str(date_timestamp)},
    )

    try:
        # Create migration and test rollback
        migration = DatetimeFieldMigration(redis_client=redis)

        # Run rollback
        await migration.down()

        # Verify data was converted back to ISO format
        data = await redis.hgetall(model.key())

        # Should be ISO strings now
        created_at_value = data["created_at"]
        birth_date_value = data["birth_date"]

        # Should be able to parse as ISO datetime
        datetime.datetime.fromisoformat(created_at_value)
        datetime.datetime.fromisoformat(birth_date_value)

    finally:
        # Clean up
        try:
            await redis.delete(model.key())
        except Exception:
            pass


@py_test_mark_asyncio
async def test_json_model_nested_datetime_fields(redis):
    """Test migration of nested datetime fields in JSON models."""
    TestJsonModelWithDatetime._meta.database = redis

    # Create test data with nested structure
    nested_data = {
        "name": "nested_test",
        "created_at": "2023-01-01T12:00:00",
        "birth_date": "1990-01-01",
        "metadata": {
            "last_updated": "2023-06-01T10:30:00",
            "events": [
                {"timestamp": "2023-01-15T09:00:00", "type": "login"},
                {"timestamp": "2023-01-16T14:30:00", "type": "logout"},
            ],
        },
    }

    key = TestJsonModelWithDatetime.make_key("nested_test")
    await redis.json().set(key, "$", nested_data)

    try:
        migration = DatetimeFieldMigration(redis_client=redis)

        # Run migration
        await migration.up()

        # Verify main datetime fields were converted
        result = await redis.json().get(key)

        # Main fields should be timestamps
        assert isinstance(result["created_at"], (int, float))
        assert isinstance(result["birth_date"], (int, float))

        # Nested fields should remain as strings (not in datetime_fields list)
        assert isinstance(result["metadata"]["last_updated"], str)

    finally:
        # Clean up
        try:
            await redis.delete(key)
        except Exception:
            pass


@py_test_mark_asyncio
async def test_performance_monitoring(redis):
    """Test performance monitoring during migration."""
    from aredis_om.model.migrations.data_migrator import PerformanceMonitor

    monitor = PerformanceMonitor()

    # Test monitoring lifecycle
    monitor.start()
    assert monitor.start_time is not None

    # Simulate some work
    await asyncio.sleep(0.1)

    monitor.update_progress(100)
    monitor.record_batch_time(0.05)
    monitor.record_batch_time(0.03)

    monitor.finish()

    stats = monitor.get_stats()

    assert stats["total_time_seconds"] > 0
    assert stats["processed_items"] == 100
    assert stats["items_per_second"] > 0
    assert stats["average_batch_time"] > 0
    assert stats["total_batches"] == 2


@py_test_mark_asyncio
async def test_migration_with_corrupted_data(redis):
    """Test migration behavior with corrupted or malformed data."""
    TestHashModelWithDatetime._meta.database = redis

    # Create various types of corrupted data
    corrupted_keys = []

    # Completely invalid JSON in hash
    key1 = TestHashModelWithDatetime.make_key("corrupted1")
    await redis.hset(
        key1,
        mapping={
            "name": "corrupted1",
            "created_at": '{"invalid": "json"',  # Malformed JSON
            "birth_date": "1990-01-01",
        },
    )
    corrupted_keys.append(key1)

    # Binary data in datetime field
    key2 = TestHashModelWithDatetime.make_key("corrupted2")
    await redis.hset(
        key2,
        mapping={
            "name": "corrupted2",
            "created_at": b"\x00\x01\x02\x03",  # Binary data
            "birth_date": "1990-01-01",
        },
    )
    corrupted_keys.append(key2)

    # Extremely large timestamp
    key3 = TestHashModelWithDatetime.make_key("corrupted3")
    await redis.hset(
        key3,
        mapping={
            "name": "corrupted3",
            "created_at": "99999999999999999999",  # Way too large
            "birth_date": "1990-01-01",
        },
    )
    corrupted_keys.append(key3)

    try:
        migration = DatetimeFieldMigration(
            redis_client=redis, failure_mode=ConversionFailureMode.LOG_AND_SKIP
        )

        # Should complete without crashing
        await migration.up()

        # Should have recorded failures
        assert migration.stats.failed_conversions > 0
        assert len(migration.stats.errors) > 0

        # Should have processed all keys
        assert migration.stats.processed_keys >= 3

    finally:
        # Clean up
        for key in corrupted_keys:
            try:
                await redis.delete(key)
            except Exception:
                pass


@py_test_mark_asyncio
async def test_migration_resume_capability(redis):
    """Test that migration can handle interruption and resume."""
    TestHashModelWithDatetime._meta.database = redis

    # Create multiple test records
    test_keys = []
    for i in range(10):
        model = TestHashModelWithDatetime(
            name=f"resume_test_{i}",
            created_at=datetime.datetime(2023, 1, 1, 12, i),
            birth_date=datetime.date(1990, 1, 1),
        )
        await model.save()
        test_keys.append(model.key())

    try:
        # First migration - simulate interruption by limiting max_errors
        migration1 = DatetimeFieldMigration(
            redis_client=redis,
            failure_mode=ConversionFailureMode.LOG_AND_SKIP,
            max_errors=0,  # Will stop immediately on any "error"
        )

        # This should process some but not all records
        try:
            await migration1.up()
        except DataMigrationError:
            pass  # Expected due to max_errors=0

        # Second migration - should handle already converted data gracefully
        migration2 = DatetimeFieldMigration(
            redis_client=redis, failure_mode=ConversionFailureMode.LOG_AND_SKIP
        )

        # Should complete successfully
        await migration2.up()

        # Verify all records are now properly converted
        for key in test_keys:
            data = await redis.hgetall(key)
            # Should be able to parse as float (timestamp)
            float(data["created_at"])
            float(data["birth_date"])

    finally:
        # Clean up
        for key in test_keys:
            try:
                await redis.delete(key)
            except Exception:
                pass


@py_test_mark_asyncio
async def test_data_integrity_verification_with_issues(redis):
    """Test data integrity verification when there are actual issues."""
    TestHashModelWithDatetime._meta.database = redis

    # Create data with integrity issues
    valid_key = TestHashModelWithDatetime.make_key("valid")
    await redis.hset(
        valid_key,
        mapping={
            "name": "valid",
            "created_at": "1672531200.0",  # Valid timestamp
            "birth_date": "631152000.0",  # Valid timestamp
        },
    )

    invalid_key = TestHashModelWithDatetime.make_key("invalid")
    await redis.hset(
        invalid_key,
        mapping={
            "name": "invalid",
            "created_at": "not_a_timestamp",  # Invalid
            "birth_date": "-1",  # Invalid (negative timestamp)
        },
    )

    try:
        migrator = DataMigrator(redis_client=redis, load_builtin_migrations=True)

        result = await migrator.verify_data_integrity(verbose=False)

        # Should detect issues
        assert result["success"] is False
        assert len(result["issues"]) > 0
        assert result["checked_keys"] >= 2

        # Should report specific issues
        issues_text = " ".join(result["issues"])
        assert "not_a_timestamp" in issues_text or "Invalid timestamp" in issues_text

    finally:
        # Clean up
        try:
            await redis.delete(valid_key)
            await redis.delete(invalid_key)
        except Exception:
            pass
