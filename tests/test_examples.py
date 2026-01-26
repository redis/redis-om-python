"""
Tests for the example applications.

These tests verify that the FastAPI and Flask example apps work correctly
with Redis OM. The tests use the same models and patterns as the examples.
"""

from datetime import datetime
from enum import Enum
from typing import List, Optional

import pytest

from aredis_om import (
    EmbeddedJsonModel,
    Field,
    HashModel,
    JsonModel,
    Migrator,
    NotFoundError,
)

from .conftest import py_test_mark_asyncio

# ============================================================
# ENUMS
# ============================================================


class OrderStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    SHIPPED = "shipped"


class Priority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


# ============================================================
# MODELS (matching example apps)
# ============================================================


class Address(EmbeddedJsonModel, index=True):
    street: str
    city: str = Field(index=True)
    state: str = Field(index=True)
    zip_code: str = Field(index=True)


class User(HashModel, index=True):
    username: str = Field(index=True)
    email: str = Field(index=True)
    age: Optional[int] = Field(default=None, index=True, sortable=True)
    bio: Optional[str] = Field(default=None, index=True, full_text_search=True)
    is_active: bool = Field(default=True, index=True)
    created_at: datetime = Field(default_factory=datetime.now, index=True)

    class Meta:
        global_key_prefix = "test-examples"
        model_key_prefix = "user"


class Product(JsonModel, index=True):
    name: str = Field(index=True, full_text_search=True)
    sku: str = Field(index=True)
    price: float = Field(index=True, sortable=True)
    quantity: int = Field(default=0, index=True)
    tags: List[str] = Field(default_factory=list)

    class Meta:
        global_key_prefix = "test-examples"
        model_key_prefix = "product"


class Order(JsonModel, index=True):
    customer_id: str = Field(index=True)
    shipping_address: Address
    status: OrderStatus = Field(default=OrderStatus.PENDING, index=True)
    total: float = Field(index=True, sortable=True)

    class Meta:
        global_key_prefix = "test-examples"
        model_key_prefix = "order"


class Task(JsonModel, index=True):
    title: str = Field(index=True, full_text_search=True)
    priority: Priority = Field(default=Priority.MEDIUM, index=True)
    assignee: Optional[str] = Field(default=None, index=True)
    is_completed: bool = Field(default=False, index=True)

    class Meta:
        global_key_prefix = "test-examples"
        model_key_prefix = "task"


# ============================================================
# FIXTURES
# ============================================================


@pytest.fixture(autouse=True)
async def run_migrations():
    """Run migrations before each test"""
    await Migrator().run()


# ============================================================
# HASHMODEL TESTS
# ============================================================


@py_test_mark_asyncio
async def test_user_hashmodel_crud():
    """Test basic CRUD for HashModel"""
    user = User(username="testuser", email="test@example.com", age=30, bio="Test bio")
    await user.save()

    retrieved = await User.get(user.pk)
    assert retrieved.username == "testuser"
    assert retrieved.email == "test@example.com"
    assert retrieved.age == 30

    await User.delete(user.pk)
    with pytest.raises(NotFoundError):
        await User.get(user.pk)


@py_test_mark_asyncio
async def test_user_hashmodel_queries():
    """Test query operations for HashModel"""
    user1 = User(username="alice", email="alice@example.com", age=25)
    user2 = User(username="bob", email="bob@example.com", age=35)
    await user1.save()
    await user2.save()

    try:
        # Exact match
        results = await User.find(User.username == "alice").all()
        assert len(results) == 1
        assert results[0].username == "alice"

        # Numeric comparison
        results = await User.find(User.age >= 30).all()
        assert len(results) >= 1
        assert all(r.age >= 30 for r in results)
    finally:
        await User.delete(user1.pk)
        await User.delete(user2.pk)


@py_test_mark_asyncio
async def test_user_full_text_search():
    """Test full-text search on HashModel"""
    user = User(
        username="searchuser",
        email="search@example.com",
        bio="Expert in Redis databases and caching",
    )
    await user.save()

    try:
        results = await User.find(User.bio % "Redis").all()
        assert len(results) >= 1
        assert any(u.username == "searchuser" for u in results)
    finally:
        await User.delete(user.pk)


# ============================================================
# JSONMODEL TESTS
# ============================================================


@py_test_mark_asyncio
async def test_product_jsonmodel_crud():
    """Test basic CRUD for JsonModel"""
    product = Product(
        name="Test Product",
        sku="TEST001",
        price=99.99,
        quantity=10,
        tags=["test", "example"],
    )
    await product.save()

    retrieved = await Product.get(product.pk)
    assert retrieved.name == "Test Product"
    assert retrieved.price == 99.99
    assert "test" in retrieved.tags

    await Product.delete(product.pk)


@py_test_mark_asyncio
async def test_product_jsonmodel_queries():
    """Test query operations for JsonModel"""
    prod1 = Product(name="Expensive Widget", sku="EXP001", price=500.0)
    prod2 = Product(name="Cheap Widget", sku="CHP001", price=10.0)
    await prod1.save()
    await prod2.save()

    try:
        # Price range query
        results = await Product.find(Product.price >= 100).all()
        assert len(results) >= 1
        assert all(r.price >= 100 for r in results)

        # Full-text search
        results = await Product.find(Product.name % "Widget").all()
        assert len(results) >= 2
    finally:
        await Product.delete(prod1.pk)
        await Product.delete(prod2.pk)


# ============================================================
# EMBEDDED MODEL TESTS
# ============================================================


@py_test_mark_asyncio
async def test_order_with_embedded_address():
    """Test JsonModel with EmbeddedJsonModel"""
    order = Order(
        customer_id="cust123",
        shipping_address=Address(
            street="123 Main St", city="Boston", state="MA", zip_code="02101"
        ),
        total=150.0,
    )
    await order.save()

    try:
        retrieved = await Order.get(order.pk)
        assert retrieved.shipping_address.city == "Boston"
        assert retrieved.shipping_address.state == "MA"

        # Query by embedded field
        results = await Order.find(Order.shipping_address.city == "Boston").all()
        assert len(results) >= 1
    finally:
        await Order.delete(order.pk)


# ============================================================
# ENUM FIELD TESTS
# ============================================================


@py_test_mark_asyncio
async def test_task_with_enum_priority():
    """Test JsonModel with enum fields"""
    task = Task(title="Important task", priority=Priority.HIGH, assignee="alice")
    await task.save()

    try:
        retrieved = await Task.get(task.pk)
        assert retrieved.priority == Priority.HIGH

        # Query by enum
        results = await Task.find(Task.priority == Priority.HIGH.value).all()
        assert len(results) >= 1
    finally:
        await Task.delete(task.pk)


@py_test_mark_asyncio
async def test_order_status_enum():
    """Test updating enum fields"""
    order = Order(
        customer_id="cust456",
        shipping_address=Address(
            street="456 Oak Ave", city="Seattle", state="WA", zip_code="98101"
        ),
        status=OrderStatus.PENDING,
        total=200.0,
    )
    await order.save()

    try:
        order.status = OrderStatus.SHIPPED
        await order.save()

        retrieved = await Order.get(order.pk)
        assert retrieved.status == OrderStatus.SHIPPED
    finally:
        await Order.delete(order.pk)


# ============================================================
# SORTING AND PAGINATION TESTS
# ============================================================


@py_test_mark_asyncio
async def test_sorting_products():
    """Test sorting query results"""
    products = [
        Product(name=f"Product {i}", sku=f"SKU{i:03d}", price=float(i * 100))
        for i in range(1, 4)
    ]
    for p in products:
        await p.save()

    try:
        # Sort by price descending
        results = await Product.find().sort_by("-price").all()
        prices = [r.price for r in results if r.sku.startswith("SKU00")]
        # Check that our test products are in descending order
        assert prices == sorted(prices, reverse=True)
    finally:
        for p in products:
            await Product.delete(p.pk)


@py_test_mark_asyncio
async def test_pagination():
    """Test pagination with offset and limit"""
    users = [
        User(username=f"pageuser{i}", email=f"page{i}@example.com", age=20 + i)
        for i in range(5)
    ]
    for u in users:
        await u.save()

    try:
        # Get first 2 results - use age range query instead of text search
        query = User.find(User.age >= 20)
        page1 = await query.copy(offset=0, limit=2).all()
        assert len(page1) >= 2

        # Get next 2 results
        page2 = await query.copy(offset=2, limit=2).all()
        assert len(page2) >= 2
    finally:
        for u in users:
            await User.delete(u.pk)
