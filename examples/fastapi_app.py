"""
Comprehensive FastAPI + Redis OM 1.0 Example App

Demonstrates ALL major features of Redis OM:
- HashModel and JsonModel
- EmbeddedJsonModel for nested data
- All field types and options (index, sortable, full_text_search)
- CRUD operations
- Query operations (comparisons, text search, sorting, pagination)
- Expiration/TTL
- Custom primary keys
- Pydantic validation
"""
from contextlib import asynccontextmanager
from datetime import datetime, date, timedelta
from typing import List, Optional
from enum import Enum
import uuid

from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, EmailStr, field_validator
from httpx import ASGITransport
import httpx

from aredis_om import (
    HashModel, JsonModel, EmbeddedJsonModel, Field,
    Migrator, NotFoundError, get_redis_connection
)


# ============================================================
# ENUMS
# ============================================================

class OrderStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"


class Priority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"


# ============================================================
# EMBEDDED MODELS
# ============================================================

class Address(EmbeddedJsonModel, index=True):
    """Embedded address - queryable nested fields"""
    street: str
    city: str = Field(index=True)
    state: str = Field(index=True)
    zip_code: str = Field(index=True)
    country: str = Field(default="USA", index=True)


class ContactInfo(EmbeddedJsonModel, index=True):
    """Embedded contact information"""
    phone: Optional[str] = None
    email: Optional[str] = Field(default=None, index=True)
    preferred_contact: str = Field(default="email")


# ============================================================
# HASH MODELS (flat key-value storage)
# ============================================================

class User(HashModel, index=True):
    """
    HashModel example with various field types.
    Best for: Simple flat data, high-performance lookups
    """
    # Basic indexed fields
    username: str = Field(index=True)
    email: str = Field(index=True)

    # Sortable numeric field
    age: Optional[int] = Field(default=None, index=True, sortable=True)

    # Full-text searchable field
    bio: Optional[str] = Field(default=None, index=True, full_text_search=True)

    # Boolean field (stored as "1"/"0" in Redis)
    is_active: bool = Field(default=True, index=True)

    # DateTime fields (stored as Unix timestamps)
    created_at: datetime = Field(default_factory=datetime.now, index=True, sortable=True)
    last_login: Optional[datetime] = Field(default=None, index=True, sortable=True)

    # Date field
    birth_date: Optional[date] = Field(default=None)

    class Meta:
        global_key_prefix = "fastapi-comprehensive"
        model_key_prefix = "user"


class Session(HashModel, index=True):
    """
    HashModel with expiration (TTL).
    Useful for: Temporary data, caching, sessions
    """
    user_id: str = Field(index=True)
    token: str = Field(index=True)
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)

    class Meta:
        global_key_prefix = "fastapi-comprehensive"
        model_key_prefix = "session"


class CacheEntry(HashModel, index=True):
    """HashModel for demonstrating custom primary keys"""
    cache_key: str = Field(primary_key=True)  # Custom PK instead of ULID
    value: str
    hits: int = Field(default=0, index=True, sortable=True)
    created_at: datetime = Field(default_factory=datetime.now)

    class Meta:
        global_key_prefix = "fastapi-comprehensive"
        model_key_prefix = "cache"


# ============================================================
# JSON MODELS (complex nested data)
# ============================================================

class Product(JsonModel, index=True):
    """
    JsonModel with embedded models and lists.
    Best for: Complex nested data, arrays, rich documents
    """
    # Basic fields
    name: str = Field(index=True, full_text_search=True)
    sku: str = Field(index=True)
    description: Optional[str] = Field(default=None, full_text_search=True)

    # Numeric fields with sorting
    price: float = Field(index=True, sortable=True)
    cost: Optional[float] = Field(default=None)
    quantity: int = Field(default=0, index=True, sortable=True)

    # Tag field for exact matching
    category: str = Field(index=True)

    # List of strings (only works in JsonModel)
    tags: List[str] = Field(default_factory=list)

    # Boolean
    is_available: bool = Field(default=True, index=True)

    # Timestamps
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = Field(default=None)

    class Meta:
        global_key_prefix = "fastapi-comprehensive"
        model_key_prefix = "product"


class Order(JsonModel, index=True):
    """JsonModel with embedded models and enum field"""
    customer_id: str = Field(index=True)

    # Embedded models (queryable nested fields)
    shipping_address: Address
    billing_address: Optional[Address] = None
    contact: ContactInfo

    # List of items (complex nested data)
    items: List[dict]  # [{product_id, quantity, price}]

    # Numeric with sorting
    subtotal: float = Field(index=True, sortable=True)
    tax: float = Field(default=0.0)
    total: float = Field(index=True, sortable=True)

    # Enum field stored as string
    status: OrderStatus = Field(default=OrderStatus.PENDING, index=True)

    # Timestamps
    created_at: datetime = Field(default_factory=datetime.now)
    shipped_at: Optional[datetime] = Field(default=None)

    # Notes with full-text search
    notes: Optional[str] = Field(default=None, full_text_search=True)

    class Meta:
        global_key_prefix = "fastapi-comprehensive"
        model_key_prefix = "order"


class Task(JsonModel, index=True):
    """JsonModel with priority enum and date fields"""
    title: str = Field(index=True, full_text_search=True)
    description: Optional[str] = Field(default=None, full_text_search=True)

    # Enum priority
    priority: Priority = Field(default=Priority.MEDIUM, index=True)

    # Assignee
    assignee: Optional[str] = Field(default=None, index=True)

    # Tags list
    tags: List[str] = Field(default_factory=list)

    # Status boolean
    is_completed: bool = Field(default=False, index=True)

    # Date fields
    due_date: Optional[date] = Field(default=None)
    completed_at: Optional[datetime] = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.now)

    class Meta:
        global_key_prefix = "fastapi-comprehensive"
        model_key_prefix = "task"



# ============================================================
# REQUEST/RESPONSE MODELS (avoid ExpressionProxy in schema)
# ============================================================

class UserCreate(BaseModel):
    username: str
    email: str
    age: Optional[int] = None
    bio: Optional[str] = None
    birth_date: Optional[date] = None

class UserResponse(BaseModel):
    pk: str
    username: str
    email: str
    age: Optional[int]
    bio: Optional[str]
    is_active: bool
    created_at: datetime

class ProductCreate(BaseModel):
    name: str
    sku: str
    description: Optional[str] = None
    price: float
    cost: Optional[float] = None
    quantity: int = 0
    category: str
    tags: List[str] = []

class OrderCreate(BaseModel):
    customer_id: str
    shipping_address: dict
    billing_address: Optional[dict] = None
    contact: dict
    items: List[dict]
    subtotal: float
    tax: float = 0.0
    total: float
    notes: Optional[str] = None

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    priority: Priority = Priority.MEDIUM
    assignee: Optional[str] = None
    tags: List[str] = []
    due_date: Optional[date] = None


# ============================================================
# FASTAPI APP WITH LIFESPAN
# ============================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Modern lifespan pattern for startup/shutdown"""
    # Startup: Run migrations
    await Migrator().run()
    print("✓ Migrations complete")
    yield
    # Shutdown: cleanup if needed
    print("✓ Shutting down")

app = FastAPI(
    title="Redis OM Comprehensive Example",
    description="Demonstrates all Redis OM 1.0 features",
    lifespan=lifespan
)


# ============================================================
# USER ENDPOINTS (HashModel CRUD + Queries)
# ============================================================

@app.post("/users", response_model=UserResponse)
async def create_user(user: UserCreate):
    """Create a new user (HashModel)"""
    db_user = User(**user.model_dump())
    await db_user.save()
    return UserResponse(pk=db_user.pk, **db_user.model_dump(exclude={"pk"}))

@app.get("/users/{pk}")
async def get_user(pk: str):
    """Get user by primary key"""
    try:
        user = await User.get(pk)
        return user.model_dump()
    except NotFoundError:
        raise HTTPException(404, "User not found")

@app.get("/users")
async def list_users(
    username: Optional[str] = None,
    min_age: Optional[int] = None,
    max_age: Optional[int] = None,
    is_active: Optional[bool] = None,
    bio_search: Optional[str] = None,
    sort_by: str = Query("created_at", pattern="^-?(age|created_at|last_login)$"),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
):
    """
    Query users with filters, sorting, pagination.
    Demonstrates: ==, >=, <=, full_text_search, sort_by, page
    """
    filters = []
    if username:
        filters.append(User.username == username)
    if min_age is not None:
        filters.append(User.age >= min_age)
    if max_age is not None:
        filters.append(User.age <= max_age)
    if is_active is not None:
        filters.append(User.is_active == is_active)
    if bio_search:
        filters.append(User.bio % bio_search)  # Full-text search

    query = User.find(*filters) if filters else User.find()

    # Sorting
    query = query.sort_by(sort_by)

    # Pagination
    offset = (page - 1) * page_size
    results = await query.copy(offset=offset, limit=page_size).all()

    return {"page": page, "results": [u.model_dump() for u in results]}


@app.delete("/users/{pk}")
async def delete_user(pk: str):
    """Delete user by pk (class method pattern)"""
    try:
        await User.get(pk)  # Verify exists
        await User.delete(pk)
        return {"deleted": pk}
    except NotFoundError:
        raise HTTPException(404, "User not found")


# ============================================================
# SESSION ENDPOINTS (HashModel with TTL/Expiration)
# ============================================================

@app.post("/sessions")
async def create_session(user_id: str, ttl_seconds: int = 3600):
    """Create session with expiration"""
    session = Session(
        user_id=user_id,
        token=str(uuid.uuid4()),
        ip_address="127.0.0.1",
        user_agent="test-client"
    )
    await session.save()
    await session.expire(ttl_seconds)  # Set TTL
    return {"pk": session.pk, "token": session.token, "expires_in": ttl_seconds}

@app.get("/sessions/{token}")
async def get_session_by_token(token: str):
    """Find session by token (demonstrates first())"""
    session = await Session.find(Session.token == token).first()
    if not session:
        raise HTTPException(404, "Session not found or expired")
    return session.model_dump()


# ============================================================
# CACHE ENDPOINTS (Custom Primary Key)
# ============================================================

@app.post("/cache/{cache_key}")
async def set_cache(cache_key: str, value: str, ttl: Optional[int] = None):
    """Set cache with custom primary key"""
    entry = CacheEntry(cache_key=cache_key, value=value)
    await entry.save()
    if ttl:
        await entry.expire(ttl)
    return {"key": entry.pk, "value": entry.value}

@app.get("/cache/{cache_key}")
async def get_cache(cache_key: str):
    """Get cache entry by custom key"""
    try:
        entry = await CacheEntry.get(cache_key)
        entry.hits += 1
        await entry.save()
        return {"key": entry.pk, "value": entry.value, "hits": entry.hits}
    except NotFoundError:
        raise HTTPException(404, "Cache miss")


# ============================================================
# PRODUCT ENDPOINTS (JsonModel with Lists)
# ============================================================

@app.post("/products")
async def create_product(product: ProductCreate):
    """Create product (JsonModel with tags list)"""
    db_product = Product(**product.model_dump())
    await db_product.save()
    return {"pk": db_product.pk}

@app.get("/products/{pk}")
async def get_product(pk: str):
    try:
        product = await Product.get(pk)
        return product.model_dump()
    except NotFoundError:
        raise HTTPException(404, "Product not found")

@app.get("/products")
async def list_products(
    category: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    is_available: Optional[bool] = None,
    search: Optional[str] = None,
    sort_by: str = Query("price", pattern="^-?(price|quantity)$"),
):
    """Query products with various filters"""
    filters = []
    if category:
        filters.append(Product.category == category)
    if min_price is not None:
        filters.append(Product.price >= min_price)
    if max_price is not None:
        filters.append(Product.price <= max_price)
    if is_available is not None:
        filters.append(Product.is_available == is_available)
    if search:
        # Search in name OR description
        filters.append((Product.name % search) | (Product.description % search))

    query = Product.find(*filters) if filters else Product.find()
    results = await query.sort_by(sort_by).all()
    return [p.model_dump() for p in results]

@app.patch("/products/{pk}")
async def update_product(pk: str, price: Optional[float] = None, quantity: Optional[int] = None):
    """Partial update product"""
    try:
        product = await Product.get(pk)
        if price is not None:
            product.price = price
        if quantity is not None:
            product.quantity = quantity
        product.updated_at = datetime.now()
        await product.save()
        return product.model_dump()
    except NotFoundError:
        raise HTTPException(404, "Product not found")


# ============================================================
# ORDER ENDPOINTS (JsonModel with Embedded Models)
# ============================================================

@app.post("/orders")
async def create_order(order: OrderCreate):
    """Create order with embedded address and contact"""
    db_order = Order(
        customer_id=order.customer_id,
        shipping_address=Address(**order.shipping_address),
        billing_address=Address(**order.billing_address) if order.billing_address else None,
        contact=ContactInfo(**order.contact),
        items=order.items,
        subtotal=order.subtotal,
        tax=order.tax,
        total=order.total,
        notes=order.notes
    )
    await db_order.save()
    return {"pk": db_order.pk}

@app.get("/orders/{pk}")
async def get_order(pk: str):
    try:
        order = await Order.get(pk)
        return order.model_dump()
    except NotFoundError:
        raise HTTPException(404, "Order not found")

@app.get("/orders")
async def list_orders(
    customer_id: Optional[str] = None,
    status: Optional[OrderStatus] = None,
    city: Optional[str] = None,
    state: Optional[str] = None,
    min_total: Optional[float] = None,
    notes_search: Optional[str] = None,
):
    """Query orders with embedded model field queries"""
    filters = []
    if customer_id:
        filters.append(Order.customer_id == customer_id)
    if status:
        filters.append(Order.status == status.value)
    if city:
        # Query embedded model field
        filters.append(Order.shipping_address.city == city)
    if state:
        filters.append(Order.shipping_address.state == state)
    if min_total is not None:
        filters.append(Order.total >= min_total)
    if notes_search:
        filters.append(Order.notes % notes_search)

    query = Order.find(*filters) if filters else Order.find()
    results = await query.sort_by("-total").all()
    return [o.model_dump() for o in results]

@app.patch("/orders/{pk}/status")
async def update_order_status(pk: str, status: OrderStatus):
    """Update order status (demonstrates enum handling)"""
    try:
        order = await Order.get(pk)
        order.status = status
        if status == OrderStatus.SHIPPED:
            order.shipped_at = datetime.now()
        await order.save()
        return order.model_dump()
    except NotFoundError:
        raise HTTPException(404, "Order not found")


# ============================================================
# TASK ENDPOINTS (JsonModel with Priority Enum)
# ============================================================

@app.post("/tasks")
async def create_task(task: TaskCreate):
    """Create task with priority enum"""
    db_task = Task(**task.model_dump())
    await db_task.save()
    return {"pk": db_task.pk}

@app.get("/tasks")
async def list_tasks(
    assignee: Optional[str] = None,
    priority: Optional[Priority] = None,
    is_completed: Optional[bool] = None,
    search: Optional[str] = None,
):
    """Query tasks with filters"""
    filters = []
    if assignee:
        filters.append(Task.assignee == assignee)
    if priority:
        filters.append(Task.priority == priority.value)
    if is_completed is not None:
        filters.append(Task.is_completed == is_completed)
    if search:
        filters.append((Task.title % search) | (Task.description % search))

    query = Task.find(*filters) if filters else Task.find()
    return [t.model_dump() for t in await query.all()]

@app.patch("/tasks/{pk}/complete")
async def complete_task(pk: str):
    """Mark task as completed"""
    try:
        task = await Task.get(pk)
        task.is_completed = True
        task.completed_at = datetime.now()
        await task.save()
        return task.model_dump()
    except NotFoundError:
        raise HTTPException(404, "Task not found")


# ============================================================
# TEST RUNNER
# ============================================================

async def run_tests():
    """Comprehensive test of all endpoints"""
    from asgi_lifespan import LifespanManager

    print("=" * 60)
    print("COMPREHENSIVE REDIS OM FASTAPI TESTS")
    print("=" * 60)

    async with LifespanManager(app):
        transport = ASGITransport(app=app)
        async with httpx.AsyncClient(transport=transport, base_url="http://test") as client:

            # --- USER TESTS (HashModel) ---
            print("\n=== HashModel: Users ===")
            r = await client.post("/users", json={
                "username": "alice", "email": "alice@example.com",
                "age": 30, "bio": "Software engineer who loves Redis"
            })
            assert r.status_code == 200, f"Create user failed: {r.text}"
            user1_pk = r.json()["pk"]
            print(f"✓ Created user: {user1_pk}")

            r = await client.post("/users", json={
                "username": "bob", "email": "bob@example.com",
                "age": 25, "bio": "Database administrator"
            })
            user2_pk = r.json()["pk"]
            print(f"✓ Created user: {user2_pk}")

            r = await client.get(f"/users/{user1_pk}")
            assert r.json()["username"] == "alice"
            print("✓ Get user by pk")

            r = await client.get("/users", params={"min_age": 28})
            assert len(r.json()["results"]) >= 1
            print(f"✓ Query users age >= 28: found {len(r.json()['results'])}")

            r = await client.get("/users", params={"bio_search": "Redis"})
            print(f"✓ Full-text search bio: found {len(r.json()['results'])}")

            # --- SESSION TESTS (TTL) ---
            print("\n=== HashModel with TTL: Sessions ===")
            r = await client.post("/sessions", params={"user_id": user1_pk, "ttl_seconds": 60})
            token = r.json()["token"]
            print(f"✓ Created session with 60s TTL")

            r = await client.get(f"/sessions/{token}")
            assert r.status_code == 200
            print("✓ Retrieved session by token")

            # --- CACHE TESTS ---
            print("\n=== Cache (HashModel with hits counter) ===")
            r = await client.post("/cache/test-key", params={"value": "test-value"})
            cache_pk = r.json()["key"]
            print(f"✓ Created cache entry: {cache_pk}")

            r = await client.get(f"/cache/{cache_pk}")
            print(f"✓ Cache retrieved, hits={r.json().get('hits', 'N/A')}")

            # --- PRODUCT TESTS (JsonModel) ---
            print("\n=== JsonModel: Products ===")
            r = await client.post("/products", json={
                "name": "Redis Enterprise", "sku": "RE001",
                "description": "High-performance Redis cluster",
                "price": 999.99, "quantity": 10, "category": "software",
                "tags": ["database", "cache", "nosql"]
            })
            prod1_pk = r.json()["pk"]
            print(f"✓ Created product with tags list")

            r = await client.post("/products", json={
                "name": "Redis Insight", "sku": "RI001",
                "description": "GUI for Redis management",
                "price": 0.0, "quantity": 999, "category": "software",
                "tags": ["gui", "tools"]
            })
            prod2_pk = r.json()["pk"]

            r = await client.get("/products", params={"search": "Redis"})
            print(f"✓ Product full-text search: found {len(r.json())}")

            r = await client.get("/products", params={"min_price": 100, "sort_by": "-price"})
            print(f"✓ Price filter + sort: found {len(r.json())}")

            r = await client.patch(f"/products/{prod1_pk}", params={"price": 899.99})
            assert r.json()["price"] == 899.99
            print("✓ Partial update product")

            # --- ORDER TESTS (Embedded Models) ---
            print("\n=== JsonModel with Embedded: Orders ===")
            r = await client.post("/orders", json={
                "customer_id": user1_pk,
                "shipping_address": {
                    "street": "123 Main St", "city": "Boston",
                    "state": "MA", "zip_code": "02101"
                },
                "contact": {"email": "alice@example.com", "phone": "555-1234"},
                "items": [{"product_id": prod1_pk, "quantity": 1, "price": 899.99}],
                "subtotal": 899.99, "tax": 62.99, "total": 962.98,
                "notes": "Rush delivery please"
            })
            order1_pk = r.json()["pk"]
            print(f"✓ Created order with embedded address")

            r = await client.get("/orders", params={"city": "Boston"})
            assert len(r.json()) >= 1
            print("✓ Query by embedded field (city)")

            r = await client.get("/orders", params={"notes_search": "Rush"})
            print(f"✓ Full-text search in notes: found {len(r.json())}")

            r = await client.patch(f"/orders/{order1_pk}/status", params={"status": "shipped"})
            assert r.json()["status"] == "shipped"
            assert r.json()["shipped_at"] is not None
            print("✓ Update order status (enum)")

            # --- TASK TESTS (Priority Enum) ---
            print("\n=== JsonModel with Enum: Tasks ===")
            r = await client.post("/tasks", json={
                "title": "Review Redis OM docs",
                "description": "Check all examples work",
                "priority": "high", "assignee": "alice",
                "tags": ["documentation", "review"]
            })
            task1_pk = r.json()["pk"]
            print("✓ Created task with priority enum")

            r = await client.get("/tasks", params={"priority": "high"})
            assert len(r.json()) >= 1
            print("✓ Query by priority enum")

            r = await client.patch(f"/tasks/{task1_pk}/complete")
            assert r.json()["is_completed"] == True
            print("✓ Complete task")

            # --- CLEANUP ---
            print("\n=== Cleanup ===")
            await User.delete(user1_pk)
            await User.delete(user2_pk)
            await CacheEntry.delete(cache_pk)
            await Product.delete(prod1_pk)
            await Product.delete(prod2_pk)
            await Order.delete(order1_pk)
            await Task.delete(task1_pk)
            print("✓ Cleaned up test data")

    print("\n" + "=" * 60)
    print("ALL COMPREHENSIVE TESTS PASSED!")
    print("=" * 60)


if __name__ == "__main__":
    import asyncio
    asyncio.run(run_tests())

