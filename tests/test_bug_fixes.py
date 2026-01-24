# type: ignore
"""Tests for bug fixes #108, #254, and #499."""

import abc
from enum import Enum, IntEnum
from typing import Optional

import pytest
import pytest_asyncio

from aredis_om import Field, HashModel, JsonModel, Migrator

# We need to run this check as sync code (during tests) even in async mode
from redis_om import has_redisearch

from .conftest import py_test_mark_asyncio

if not has_redisearch():
    pytestmark = pytest.mark.skip


class Status(Enum):
    """Regular Enum with int values - this was broken in #108."""

    PENDING = 1
    ACTIVE = 2
    COMPLETED = 3


class Priority(IntEnum):
    """IntEnum - this worked correctly."""

    LOW = 1
    MEDIUM = 2
    HIGH = 3


@pytest_asyncio.fixture
async def models_for_bug_fixes(key_prefix, redis):
    """Fixture providing models for testing bug fixes."""

    class BaseHashModel(HashModel, abc.ABC):
        class Meta:
            global_key_prefix = key_prefix
            database = redis

    class BaseJsonModel(JsonModel, abc.ABC):
        class Meta:
            global_key_prefix = key_prefix
            database = redis

    # Model for #108 - Enum with int values
    class Task(BaseJsonModel, index=True):
        name: str = Field(index=True)
        status: int = Field(index=True)  # Store as int, query with Enum
        priority: int = Field(index=True)

    # Model for #254 - Optional field in HashModel
    class Person(BaseHashModel, index=True):
        name: str = Field(index=True)
        age: int
        weight: Optional[float] = None
        nickname: Optional[str] = None

    # Model for #499 - IN operator with NUMERIC fields
    class Product(BaseJsonModel, index=True):
        name: str = Field(index=True)
        price: int = Field(index=True)
        quantity: int = Field(index=True)

    await Migrator(conn=redis).run()

    return {
        "Task": Task,
        "Person": Person,
        "Product": Product,
    }


@py_test_mark_asyncio
async def test_issue_108_enum_int_in_query(models_for_bug_fixes):
    """Test that Enum with int values works in queries (#108).

    Previously, using a regular Enum (not IntEnum) with int values would
    produce incorrect query syntax like '@status:[Status.ACTIVE Status.ACTIVE]'
    instead of '@status:[2 2]'.
    """
    Task = models_for_bug_fixes["Task"]

    # Create tasks with different statuses
    task1 = Task(name="Task 1", status=Status.PENDING.value, priority=Priority.HIGH)
    task2 = Task(name="Task 2", status=Status.ACTIVE.value, priority=Priority.MEDIUM)
    task3 = Task(name="Task 3", status=Status.COMPLETED.value, priority=Priority.LOW)

    await task1.save()
    await task2.save()
    await task3.save()

    # Query using Enum value directly - this should work now
    results = await Task.find(Task.status == Status.ACTIVE).all()
    assert len(results) == 1
    assert results[0].name == "Task 2"

    # Query using IntEnum should also work
    results = await Task.find(Task.priority == Priority.HIGH).all()
    assert len(results) == 1
    assert results[0].name == "Task 1"

    # Test comparison operators with Enum
    results = await Task.find(Task.status >= Status.ACTIVE).all()
    assert len(results) == 2  # ACTIVE (2) and COMPLETED (3)


@py_test_mark_asyncio
async def test_issue_254_optional_field_retrieval(models_for_bug_fixes):
    """Test that Optional fields with None values can be retrieved (#254).

    Previously, HashModel stored None as empty string "", but on retrieval
    the empty string couldn't be parsed as the expected type (e.g., float),
    causing a ValidationError.
    """
    Person = models_for_bug_fixes["Person"]

    # Create a person with None values for optional fields
    person = Person(name="Joe", age=20, weight=None, nickname=None)
    await person.save()

    # Retrieve the person - this should not raise ValidationError
    retrieved = await Person.get(person.pk)

    assert retrieved.name == "Joe"
    assert retrieved.age == 20
    assert retrieved.weight is None  # Should be None, not ""
    assert retrieved.nickname is None  # Should be None, not ""


@py_test_mark_asyncio
async def test_issue_254_optional_field_with_value(models_for_bug_fixes):
    """Test that Optional fields with actual values still work correctly."""
    Person = models_for_bug_fixes["Person"]

    # Create a person with values for optional fields
    person = Person(name="Jane", age=25, weight=65.5, nickname="JJ")
    await person.save()

    # Retrieve the person
    retrieved = await Person.get(person.pk)

    assert retrieved.name == "Jane"
    assert retrieved.age == 25
    assert retrieved.weight == 65.5
    assert retrieved.nickname == "JJ"


@py_test_mark_asyncio
async def test_issue_499_in_operator_numeric_fields(models_for_bug_fixes):
    """Test that IN operator works with NUMERIC fields (#499).

    Previously, the IN operator (<<) only worked for TAG fields.
    For NUMERIC fields, it would not produce any results.
    """
    Product = models_for_bug_fixes["Product"]

    # Create products with different prices
    p1 = Product(name="Widget", price=10, quantity=100)
    p2 = Product(name="Gadget", price=20, quantity=50)
    p3 = Product(name="Gizmo", price=30, quantity=75)
    p4 = Product(name="Doohickey", price=40, quantity=25)

    await p1.save()
    await p2.save()
    await p3.save()
    await p4.save()

    # Query using IN operator with numeric values
    results = await Product.find(Product.price << [10, 30]).all()
    assert len(results) == 2
    names = {r.name for r in results}
    assert names == {"Widget", "Gizmo"}

    # Test with quantity field
    results = await Product.find(Product.quantity << [50, 75, 100]).all()
    assert len(results) == 3
    names = {r.name for r in results}
    assert names == {"Widget", "Gadget", "Gizmo"}


@py_test_mark_asyncio
async def test_issue_499_in_operator_single_value(models_for_bug_fixes):
    """Test IN operator with a single value."""
    Product = models_for_bug_fixes["Product"]

    p1 = Product(name="Solo", price=99, quantity=1)
    await p1.save()

    results = await Product.find(Product.price << [99]).all()
    assert len(results) == 1
    assert results[0].name == "Solo"


@py_test_mark_asyncio
async def test_issue_108_enum_with_in_operator(models_for_bug_fixes):
    """Test that Enum values work with IN operator on NUMERIC fields."""
    Task = models_for_bug_fixes["Task"]

    task1 = Task(name="Task A", status=Status.PENDING.value, priority=Priority.LOW)
    task2 = Task(name="Task B", status=Status.ACTIVE.value, priority=Priority.MEDIUM)
    task3 = Task(name="Task C", status=Status.COMPLETED.value, priority=Priority.HIGH)

    await task1.save()
    await task2.save()
    await task3.save()

    # Query using IN with Enum values
    results = await Task.find(Task.status << [Status.PENDING, Status.COMPLETED]).all()
    assert len(results) == 2
    names = {r.name for r in results}
    assert names == {"Task A", "Task C"}
