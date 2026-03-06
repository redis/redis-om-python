"""
Test datetime.date field handling specifically.
"""

import datetime
import os
import time

import pytest

from aredis_om import Field, Migrator
from aredis_om.model.model import (
    HashModel,
    JsonModel,
    convert_datetime_to_timestamp,
    convert_timestamp_to_datetime,
)

# We need to run this check as sync code (during tests) even in async mode
# because we call it in the top-level module scope.
from redis_om import has_redis_json

from .conftest import py_test_mark_asyncio


class HashModelWithDate(HashModel, index=True):
    name: str = Field(index=True)
    birth_date: datetime.date = Field(index=True, sortable=True)

    class Meta:
        global_key_prefix = "test_date_fix"


class JsonModelWithDate(JsonModel, index=True):
    name: str = Field(index=True)
    birth_date: datetime.date = Field(index=True, sortable=True)

    class Meta:
        global_key_prefix = "test_date_fix"


@pytest.mark.skipif(not hasattr(time, "tzset"), reason="time.tzset not available")
def test_date_timestamp_round_trip_is_tz_independent():
    """Date values should round-trip without shifting across local timezones."""
    original_tz = os.environ.get("TZ")
    try:
        os.environ["TZ"] = "Asia/Karachi"  # UTC+5 to expose local-midnight bugs
        time.tzset()

        test_date = datetime.date(2023, 1, 1)
        timestamp = convert_datetime_to_timestamp(test_date)

        # Stored timestamp should represent midnight UTC for that calendar date.
        expected = datetime.datetime(
            2023, 1, 1, 0, 0, 0, tzinfo=datetime.timezone.utc
        ).timestamp()
        assert timestamp == expected

        restored = convert_timestamp_to_datetime(
            {"birth_date": timestamp},
            {"birth_date": HashModelWithDate.model_fields["birth_date"]},
        )
        assert restored["birth_date"] == test_date
    finally:
        if original_tz is None:
            os.environ.pop("TZ", None)
        else:
            os.environ["TZ"] = original_tz
        time.tzset()


@py_test_mark_asyncio
async def test_hash_model_date_conversion(redis):
    """Test date conversion in HashModel."""
    # Update model to use test redis
    HashModelWithDate._meta.database = redis

    test_date = datetime.date(2023, 1, 1)
    test_model = HashModelWithDate(name="test", birth_date=test_date)

    try:
        await test_model.save()

        # Get the raw data to check timestamp conversion
        raw_data = await HashModelWithDate.db().hgetall(test_model.key())

        # The birth_date field should be stored as a timestamp (number)
        birth_date_value = raw_data.get(b"birth_date") or raw_data.get("birth_date")
        if isinstance(birth_date_value, bytes):
            birth_date_value = birth_date_value.decode("utf-8")

        # Should be able to parse as a float (timestamp)
        try:
            float(birth_date_value)
            is_timestamp = True
        except (ValueError, TypeError):
            is_timestamp = False

        assert is_timestamp, f"Expected timestamp, got: {birth_date_value}"

        # Retrieve the model to ensure conversion back works
        retrieved = await HashModelWithDate.get(test_model.pk)
        assert isinstance(retrieved.birth_date, datetime.date)
        assert retrieved.birth_date == test_date

    finally:
        # Clean up
        try:
            await HashModelWithDate.db().delete(test_model.key())
        except Exception:
            pass


@pytest.mark.skipif(not hasattr(time, "tzset"), reason="time.tzset not available")
@py_test_mark_asyncio
async def test_hash_model_date_query_is_tz_independent(redis):
    """Date equality queries should match UTC-normalized stored timestamps."""
    original_tz = os.environ.get("TZ")
    HashModelWithDate._meta.database = redis
    test_model = None

    try:
        os.environ["TZ"] = "Asia/Karachi"
        time.tzset()

        await Migrator().run()

        test_date = datetime.date(2023, 1, 1)
        test_model = HashModelWithDate(name="query-test", birth_date=test_date)
        await test_model.save()

        results = await HashModelWithDate.find(
            HashModelWithDate.birth_date == test_date
        ).all()

        assert test_model.pk in {m.pk for m in results}
    finally:
        if original_tz is None:
            os.environ.pop("TZ", None)
        else:
            os.environ["TZ"] = original_tz
        time.tzset()
        if test_model is not None:
            await HashModelWithDate.db().delete(test_model.key())


@pytest.mark.skipif(not has_redis_json(), reason="Redis JSON not available")
@py_test_mark_asyncio
async def test_json_model_date_conversion(redis):
    """Test date conversion in JsonModel."""
    # Update model to use test redis
    JsonModelWithDate._meta.database = redis

    test_date = datetime.date(2023, 1, 1)
    test_model = JsonModelWithDate(name="test", birth_date=test_date)

    try:
        await test_model.save()

        # Get the raw data to check timestamp conversion
        raw_data = await JsonModelWithDate.db().json().get(test_model.key())

        # The birth_date field should be stored as a timestamp (number)
        birth_date_value = raw_data.get("birth_date")

        assert isinstance(birth_date_value, (int, float)), (
            f"Expected timestamp, got: {birth_date_value} ({type(birth_date_value)})"
        )

        # Retrieve the model to ensure conversion back works
        retrieved = await JsonModelWithDate.get(test_model.pk)
        assert isinstance(retrieved.birth_date, datetime.date)
        assert retrieved.birth_date == test_date

    finally:
        # Clean up
        try:
            await JsonModelWithDate.db().delete(test_model.key())
        except Exception:
            pass
