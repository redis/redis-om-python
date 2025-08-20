"""
Test datetime.date field handling specifically.
"""

import datetime

import pytest

from aredis_om import Field
from aredis_om.model.model import HashModel, JsonModel

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


@py_test_mark_asyncio
async def test_hash_model_date_conversion():
    """Test date conversion in HashModel."""
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


@py_test_mark_asyncio
async def test_json_model_date_conversion():
    """Test date conversion in JsonModel."""
    test_date = datetime.date(2023, 1, 1)
    test_model = JsonModelWithDate(name="test", birth_date=test_date)

    try:
        await test_model.save()

        # Get the raw data to check timestamp conversion
        raw_data = await JsonModelWithDate.db().json().get(test_model.key())

        # The birth_date field should be stored as a timestamp (number)
        birth_date_value = raw_data.get("birth_date")

        assert isinstance(
            birth_date_value, (int, float)
        ), f"Expected timestamp, got: {birth_date_value} ({type(birth_date_value)})"

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
