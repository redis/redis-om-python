"""
Test the async datetime field indexing fix.
"""

import datetime
from zoneinfo import ZoneInfo

import pytest

from aredis_om import Field
from aredis_om.model.model import HashModel, JsonModel

# We need to run this check as sync code (during tests) even in async mode
# because we call it in the top-level module scope.
from redis_om import has_redis_json

from .conftest import py_test_mark_asyncio


class HashModelWithDatetime(HashModel, index=True):
    name: str = Field(index=True)
    created_at: datetime.datetime = Field(index=True, sortable=True)

    class Meta:
        global_key_prefix = "test_datetime"


class JsonModelWithDatetime(JsonModel, index=True):
    name: str = Field(index=True)
    created_at: datetime.datetime = Field(index=True, sortable=True)

    class Meta:
        global_key_prefix = "test_datetime"


@py_test_mark_asyncio
async def test_hash_model_datetime_conversion(redis):
    """Test datetime conversion in HashModel."""
    # Update model to use test redis
    HashModelWithDatetime._meta.database = redis

    # Create test data
    test_dt = datetime.datetime(2023, 1, 1, 12, 0, 0)
    test_model = HashModelWithDatetime(name="test", created_at=test_dt)

    try:
        await test_model.save()

        # Get the raw data to check timestamp conversion
        raw_data = await HashModelWithDatetime.db().hgetall(test_model.key())

        # The created_at field should be stored as a timestamp (number)
        created_at_value = raw_data.get(b"created_at") or raw_data.get("created_at")
        if isinstance(created_at_value, bytes):
            created_at_value = created_at_value.decode("utf-8")

        print(f"Stored value: {created_at_value} (type: {type(created_at_value)})")

        # Should be able to parse as a float (timestamp)
        try:
            timestamp = float(created_at_value)
            is_timestamp = True
        except (ValueError, TypeError):
            is_timestamp = False

        assert is_timestamp, f"Expected timestamp, got: {created_at_value}"

        # Verify the timestamp is approximately correct
        expected_timestamp = test_dt.timestamp()
        assert (
            abs(timestamp - expected_timestamp) < 1
        ), f"Timestamp mismatch: got {timestamp}, expected {expected_timestamp}"

        # Retrieve the model to ensure conversion back works
        retrieved = await HashModelWithDatetime.get(test_model.pk)
        assert isinstance(retrieved.created_at, datetime.datetime)

        # Verify the returned datetime is UTC-aware
        assert (
            retrieved.created_at.tzinfo is not None
        ), "Retrieved datetime should be timezone-aware"
        assert (
            retrieved.created_at.tzinfo == datetime.timezone.utc
        ), "Retrieved datetime should be in UTC"

        # The datetime should represent the same instant in time
        # Compare timestamps since one is naive and one is aware
        time_diff = abs(retrieved.created_at.timestamp() - test_dt.timestamp())
        assert (
            time_diff < 1
        ), f"Datetime mismatch: got {retrieved.created_at}, expected {test_dt}"

    finally:
        # Clean up
        try:
            await HashModelWithDatetime.db().delete(test_model.key())
        except Exception:
            pass


@py_test_mark_asyncio
async def test_hash_model_timezone_aware_datetime(redis):
    """Test that timezone-aware datetimes are stored and retrieved correctly."""
    HashModelWithDatetime._meta.database = redis

    # Create a timezone-aware datetime in a non-UTC timezone
    pacific = ZoneInfo("America/Los_Angeles")
    test_dt = datetime.datetime(2023, 6, 15, 10, 30, 0, tzinfo=pacific)

    test_model = HashModelWithDatetime(name="tz_test", created_at=test_dt)

    try:
        await test_model.save()

        # Retrieve the model
        retrieved = await HashModelWithDatetime.get(test_model.pk)

        # The retrieved datetime should be UTC-aware
        assert retrieved.created_at.tzinfo == datetime.timezone.utc

        # The actual instant in time should be the same
        # (comparing timestamps ensures we're comparing the same moment)
        assert abs(retrieved.created_at.timestamp() - test_dt.timestamp()) < 1

        # Converting the retrieved UTC datetime to Pacific should give us
        # the original time
        retrieved_pacific = retrieved.created_at.astimezone(pacific)
        assert retrieved_pacific.hour == test_dt.hour
        assert retrieved_pacific.minute == test_dt.minute

    finally:
        try:
            await HashModelWithDatetime.db().delete(test_model.key())
        except Exception:
            pass


@pytest.mark.skipif(not has_redis_json(), reason="Redis JSON not available")
@py_test_mark_asyncio
async def test_json_model_datetime_conversion(redis):
    """Test datetime conversion in JsonModel."""
    # Update model to use test redis
    JsonModelWithDatetime._meta.database = redis

    # Create test data
    test_dt = datetime.datetime(2023, 1, 1, 12, 0, 0)
    test_model = JsonModelWithDatetime(name="test", created_at=test_dt)

    try:
        await test_model.save()

        # Get the raw data to check timestamp conversion
        raw_data = await JsonModelWithDatetime.db().json().get(test_model.key())

        # The created_at field should be stored as a timestamp (number)
        created_at_value = raw_data.get("created_at")

        print(f"Stored value: {created_at_value} (type: {type(created_at_value)})")

        assert isinstance(
            created_at_value, (int, float)
        ), f"Expected timestamp, got: {created_at_value} ({type(created_at_value)})"

        # Verify the timestamp is approximately correct
        expected_timestamp = test_dt.timestamp()
        assert (
            abs(created_at_value - expected_timestamp) < 1
        ), f"Timestamp mismatch: got {created_at_value}, expected {expected_timestamp}"

        # Retrieve the model to ensure conversion back works
        retrieved = await JsonModelWithDatetime.get(test_model.pk)
        assert isinstance(retrieved.created_at, datetime.datetime)

        # Verify the returned datetime is UTC-aware
        assert (
            retrieved.created_at.tzinfo is not None
        ), "Retrieved datetime should be timezone-aware"
        assert (
            retrieved.created_at.tzinfo == datetime.timezone.utc
        ), "Retrieved datetime should be in UTC"

        # The datetime should represent the same instant in time
        # Compare timestamps since one is naive and one is aware
        time_diff = abs(retrieved.created_at.timestamp() - test_dt.timestamp())
        assert (
            time_diff < 1
        ), f"Datetime mismatch: got {retrieved.created_at}, expected {test_dt}"

    finally:
        # Clean up
        try:
            await JsonModelWithDatetime.db().delete(test_model.key())
        except Exception:
            pass


@pytest.mark.skipif(not has_redis_json(), reason="Redis JSON not available")
@py_test_mark_asyncio
async def test_json_model_timezone_aware_datetime(redis):
    """Test that timezone-aware datetimes are stored and retrieved correctly."""
    JsonModelWithDatetime._meta.database = redis

    # Create a timezone-aware datetime in a non-UTC timezone
    pacific = ZoneInfo("America/Los_Angeles")
    test_dt = datetime.datetime(2023, 6, 15, 10, 30, 0, tzinfo=pacific)

    test_model = JsonModelWithDatetime(name="tz_test", created_at=test_dt)

    try:
        await test_model.save()

        # Retrieve the model
        retrieved = await JsonModelWithDatetime.get(test_model.pk)

        # The retrieved datetime should be UTC-aware
        assert retrieved.created_at.tzinfo == datetime.timezone.utc

        # The actual instant in time should be the same
        assert abs(retrieved.created_at.timestamp() - test_dt.timestamp()) < 1

        # Converting the retrieved UTC datetime to Pacific should give us
        # the original time
        retrieved_pacific = retrieved.created_at.astimezone(pacific)
        assert retrieved_pacific.hour == test_dt.hour
        assert retrieved_pacific.minute == test_dt.minute

    finally:
        try:
            await JsonModelWithDatetime.db().delete(test_model.key())
        except Exception:
            pass
