"""
Test the async datetime field indexing fix.
"""

import datetime

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

        # The datetime should be the same (within a small margin for floating point precision)
        time_diff = abs((retrieved.created_at - test_dt).total_seconds())
        assert (
            time_diff < 1
        ), f"Datetime mismatch: got {retrieved.created_at}, expected {test_dt}"

    finally:
        # Clean up
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

        # The datetime should be the same (within a small margin for floating point precision)
        time_diff = abs((retrieved.created_at - test_dt).total_seconds())
        assert (
            time_diff < 1
        ), f"Datetime mismatch: got {retrieved.created_at}, expected {test_dt}"

    finally:
        # Clean up
        try:
            await JsonModelWithDatetime.db().delete(test_model.key())
        except Exception:
            pass
