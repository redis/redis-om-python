"""
Comprehensive Flask + Redis OM 1.0 Example App (Sync Version)

Demonstrates ALL major features of Redis OM with sync API:
- HashModel and JsonModel
- EmbeddedJsonModel for nested data
- All field types and options (index, sortable, full_text_search)
- CRUD operations
- Query operations (comparisons, text search, sorting, pagination)
- Expiration/TTL
- Pydantic validation
"""
from datetime import datetime, date
from typing import List, Optional
from enum import Enum
import uuid

from flask import Flask, jsonify, request
from pydantic import BaseModel, ValidationError

from redis_om import (
    HashModel, JsonModel, EmbeddedJsonModel, Field,
    Migrator, NotFoundError
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


# ============================================================
# HASH MODELS
# ============================================================

class User(HashModel, index=True):
    """HashModel example with various field types"""
    username: str = Field(index=True)
    email: str = Field(index=True)
    age: Optional[int] = Field(default=None, index=True, sortable=True)
    bio: Optional[str] = Field(default=None, index=True, full_text_search=True)
    is_active: bool = Field(default=True, index=True)
    created_at: datetime = Field(default_factory=datetime.now, index=True, sortable=True)

    class Meta:
        global_key_prefix = "flask-comprehensive"
        model_key_prefix = "user"


class Session(HashModel, index=True):
    """HashModel with expiration (TTL)"""
    user_id: str = Field(index=True)
    token: str = Field(index=True)
    ip_address: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)

    class Meta:
        global_key_prefix = "flask-comprehensive"
        model_key_prefix = "session"


# ============================================================
# JSON MODELS
# ============================================================

class Product(JsonModel, index=True):
    """JsonModel with lists and full-text search"""
    name: str = Field(index=True, full_text_search=True)
    sku: str = Field(index=True)
    description: Optional[str] = Field(default=None, full_text_search=True)
    price: float = Field(index=True, sortable=True)
    quantity: int = Field(default=0, index=True, sortable=True)
    category: str = Field(index=True)
    tags: List[str] = Field(default_factory=list)
    is_available: bool = Field(default=True, index=True)
    created_at: datetime = Field(default_factory=datetime.now)

    class Meta:
        global_key_prefix = "flask-comprehensive"
        model_key_prefix = "product"


class Order(JsonModel, index=True):
    """JsonModel with embedded models and enum"""
    customer_id: str = Field(index=True)
    shipping_address: Address
    contact: ContactInfo
    items: List[dict]
    subtotal: float = Field(index=True, sortable=True)
    tax: float = Field(default=0.0)
    total: float = Field(index=True, sortable=True)
    status: OrderStatus = Field(default=OrderStatus.PENDING, index=True)
    notes: Optional[str] = Field(default=None, full_text_search=True)
    created_at: datetime = Field(default_factory=datetime.now)

    class Meta:
        global_key_prefix = "flask-comprehensive"
        model_key_prefix = "order"


class Task(JsonModel, index=True):
    """JsonModel with priority enum"""
    title: str = Field(index=True, full_text_search=True)
    description: Optional[str] = Field(default=None, full_text_search=True)
    priority: Priority = Field(default=Priority.MEDIUM, index=True)
    assignee: Optional[str] = Field(default=None, index=True)
    tags: List[str] = Field(default_factory=list)
    is_completed: bool = Field(default=False, index=True)
    completed_at: Optional[datetime] = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.now)



# ============================================================
# FLASK APP SETUP
# ============================================================

app = Flask(__name__)

@app.before_request
def run_migrations():
    """Run migrations on first request"""
    if not getattr(app, '_migrations_run', False):
        Migrator().run()
        app._migrations_run = True


# ============================================================
# USER ENDPOINTS (HashModel)
# ============================================================

@app.route("/users", methods=["POST"])
def create_user():
    """Create a new user"""
    try:
        user = User(**request.json)
        user.save()
        return jsonify({"pk": user.pk, "username": user.username}), 201
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400


@app.route("/users/<pk>")
def get_user(pk):
    """Get user by pk"""
    try:
        user = User.get(pk)
        return jsonify(user.model_dump())
    except NotFoundError:
        return jsonify({"error": "User not found"}), 404


@app.route("/users")
def list_users():
    """Query users with filters, sorting, pagination"""
    username = request.args.get("username")
    min_age = request.args.get("min_age", type=int)
    max_age = request.args.get("max_age", type=int)
    is_active = request.args.get("is_active")
    bio_search = request.args.get("bio_search")
    sort_by = request.args.get("sort_by", "created_at")
    page = request.args.get("page", 1, type=int)
    page_size = request.args.get("page_size", 10, type=int)

    filters = []
    if username:
        filters.append(User.username == username)
    if min_age is not None:
        filters.append(User.age >= min_age)
    if max_age is not None:
        filters.append(User.age <= max_age)
    if is_active is not None:
        filters.append(User.is_active == (is_active.lower() == "true"))
    if bio_search:
        filters.append(User.bio % bio_search)

    query = User.find(*filters) if filters else User.find()
    query = query.sort_by(sort_by)

    offset = (page - 1) * page_size
    results = query.copy(offset=offset, limit=page_size).all()
    return jsonify({"page": page, "results": [u.model_dump() for u in results]})


@app.route("/users/<pk>", methods=["DELETE"])
def delete_user(pk):
    """Delete user"""
    try:
        User.get(pk)
        User.delete(pk)
        return jsonify({"deleted": pk})
    except NotFoundError:
        return jsonify({"error": "User not found"}), 404


# ============================================================
# SESSION ENDPOINTS (HashModel with TTL)
# ============================================================

@app.route("/sessions", methods=["POST"])
def create_session():
    """Create session with TTL"""
    user_id = request.args.get("user_id", "unknown")
    ttl = request.args.get("ttl", 3600, type=int)

    session = Session(
        user_id=user_id,
        token=str(uuid.uuid4()),
        ip_address=request.remote_addr
    )
    session.save()
    session.expire(ttl)
    return jsonify({"pk": session.pk, "token": session.token, "ttl": ttl})


@app.route("/sessions/<token>")
def get_session_by_token(token):
    """Find session by token"""
    session = Session.find(Session.token == token).first()
    if not session:
        return jsonify({"error": "Session not found"}), 404
    return jsonify(session.model_dump())


# ============================================================
# PRODUCT ENDPOINTS (JsonModel with Lists)
# ============================================================

@app.route("/products", methods=["POST"])
def create_product():
    """Create product"""
    try:
        product = Product(**request.json)
        product.save()
        return jsonify({"pk": product.pk}), 201
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400


@app.route("/products/<pk>")
def get_product(pk):
    try:
        product = Product.get(pk)
        return jsonify(product.model_dump())
    except NotFoundError:
        return jsonify({"error": "Product not found"}), 404


@app.route("/products")
def list_products():
    """Query products"""
    category = request.args.get("category")
    min_price = request.args.get("min_price", type=float)
    max_price = request.args.get("max_price", type=float)
    search = request.args.get("search")
    sort_by = request.args.get("sort_by", "price")

    filters = []
    if category:
        filters.append(Product.category == category)
    if min_price is not None:
        filters.append(Product.price >= min_price)
    if max_price is not None:
        filters.append(Product.price <= max_price)
    if search:
        filters.append((Product.name % search) | (Product.description % search))

    query = Product.find(*filters) if filters else Product.find()
    return jsonify([p.model_dump() for p in query.sort_by(sort_by).all()])


@app.route("/products/<pk>", methods=["PATCH"])
def update_product(pk):
    """Partial update"""
    try:
        product = Product.get(pk)
        if "price" in request.args:
            product.price = float(request.args["price"])
        if "quantity" in request.args:
            product.quantity = int(request.args["quantity"])
        product.save()
        return jsonify(product.model_dump())
    except NotFoundError:
        return jsonify({"error": "Product not found"}), 404


# ============================================================
# ORDER ENDPOINTS (JsonModel with Embedded Models)
# ============================================================

@app.route("/orders", methods=["POST"])
def create_order():
    """Create order with embedded models"""
    try:
        data = request.json
        order = Order(
            customer_id=data["customer_id"],
            shipping_address=Address(**data["shipping_address"]),
            contact=ContactInfo(**data["contact"]),
            items=data["items"],
            subtotal=data["subtotal"],
            tax=data.get("tax", 0.0),
            total=data["total"],
            notes=data.get("notes")
        )
        order.save()
        return jsonify({"pk": order.pk}), 201
    except (ValidationError, KeyError) as e:
        return jsonify({"error": str(e)}), 400


@app.route("/orders/<pk>")
def get_order(pk):
    try:
        order = Order.get(pk)
        return jsonify(order.model_dump())
    except NotFoundError:
        return jsonify({"error": "Order not found"}), 404


@app.route("/orders")
def list_orders():
    """Query orders with embedded field queries"""
    customer_id = request.args.get("customer_id")
    status = request.args.get("status")
    city = request.args.get("city")
    min_total = request.args.get("min_total", type=float)

    filters = []
    if customer_id:
        filters.append(Order.customer_id == customer_id)
    if status:
        filters.append(Order.status == status)
    if city:
        filters.append(Order.shipping_address.city == city)
    if min_total is not None:
        filters.append(Order.total >= min_total)

    query = Order.find(*filters) if filters else Order.find()
    return jsonify([o.model_dump() for o in query.sort_by("-total").all()])


@app.route("/orders/<pk>/status", methods=["PATCH"])
def update_order_status(pk):
    """Update order status"""
    try:
        order = Order.get(pk)
        status = request.args.get("status")
        if status:
            order.status = OrderStatus(status)
            if status == "shipped":
                order.shipped_at = datetime.now()
        order.save()
        return jsonify(order.model_dump())
    except NotFoundError:
        return jsonify({"error": "Order not found"}), 404



# ============================================================
# TASK ENDPOINTS (JsonModel with Enum)
# ============================================================

@app.route("/tasks", methods=["POST"])
def create_task():
    """Create task"""
    try:
        task = Task(**request.json)
        task.save()
        return jsonify({"pk": task.pk}), 201
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400


@app.route("/tasks")
def list_tasks():
    """Query tasks"""
    assignee = request.args.get("assignee")
    priority = request.args.get("priority")
    is_completed = request.args.get("is_completed")
    search = request.args.get("search")

    filters = []
    if assignee:
        filters.append(Task.assignee == assignee)
    if priority:
        filters.append(Task.priority == priority)
    if is_completed is not None:
        filters.append(Task.is_completed == (is_completed.lower() == "true"))
    if search:
        filters.append((Task.title % search) | (Task.description % search))

    query = Task.find(*filters) if filters else Task.find()
    return jsonify([t.model_dump() for t in query.all()])


@app.route("/tasks/<pk>/complete", methods=["PATCH"])
def complete_task(pk):
    """Mark task completed"""
    try:
        task = Task.get(pk)
        task.is_completed = True
        task.completed_at = datetime.now()
        task.save()
        return jsonify(task.model_dump())
    except NotFoundError:
        return jsonify({"error": "Task not found"}), 404


# ============================================================
# TEST RUNNER
# ============================================================

def run_tests():
    """Comprehensive test of all Flask endpoints"""
    print("=" * 60)
    print("COMPREHENSIVE FLASK + REDIS OM SYNC TESTS")
    print("=" * 60)

    Migrator().run()
    client = app.test_client()

    # --- USER TESTS ---
    print("\n=== HashModel: Users ===")
    r = client.post("/users", json={
        "username": "alice", "email": "alice@example.com",
        "age": 30, "bio": "Loves Redis databases"
    })
    assert r.status_code == 201
    user1_pk = r.json["pk"]
    print(f"✓ Created user: {user1_pk}")

    r = client.post("/users", json={
        "username": "bob", "email": "bob@example.com",
        "age": 25, "bio": "Backend developer"
    })
    user2_pk = r.json["pk"]
    print(f"✓ Created user: {user2_pk}")

    r = client.get(f"/users/{user1_pk}")
    assert r.json["username"] == "alice"
    print("✓ Get user by pk")

    r = client.get("/users?min_age=28")
    print(f"✓ Query users age >= 28: found {len(r.json['results'])}")

    r = client.get("/users?bio_search=Redis")
    print(f"✓ Full-text search bio: found {len(r.json['results'])}")

    # --- SESSION TESTS ---
    print("\n=== HashModel with TTL: Sessions ===")
    r = client.post("/sessions?user_id=" + user1_pk + "&ttl=60")
    token = r.json["token"]
    print("✓ Created session with 60s TTL")

    r = client.get(f"/sessions/{token}")
    assert r.status_code == 200
    print("✓ Retrieved session by token")

    # --- PRODUCT TESTS ---
    print("\n=== JsonModel: Products ===")
    r = client.post("/products", json={
        "name": "Redis Stack", "sku": "RS001",
        "description": "Full-featured Redis with modules",
        "price": 0.0, "quantity": 999, "category": "software",
        "tags": ["database", "search", "json"]
    })
    prod1_pk = r.json["pk"]
    print("✓ Created product with tags list")

    r = client.get("/products?search=Redis")
    print(f"✓ Product full-text search: found {len(r.json)}")

    # --- ORDER TESTS ---
    print("\n=== JsonModel with Embedded: Orders ===")
    r = client.post("/orders", json={
        "customer_id": user1_pk,
        "shipping_address": {"street": "123 Main", "city": "Boston", "state": "MA", "zip_code": "02101"},
        "contact": {"email": "alice@example.com"},
        "items": [{"product_id": prod1_pk, "quantity": 1, "price": 0.0}],
        "subtotal": 0.0, "tax": 0.0, "total": 0.0,
        "notes": "Free tier subscription"
    })
    order1_pk = r.json["pk"]
    print("✓ Created order with embedded address")

    r = client.get("/orders?city=Boston")
    assert len(r.json) >= 1
    print("✓ Query by embedded field (city)")

    # --- TASK TESTS ---
    print("\n=== JsonModel with Enum: Tasks ===")
    r = client.post("/tasks", json={
        "title": "Deploy Redis", "description": "Set up production cluster",
        "priority": "high", "assignee": "alice"
    })
    task1_pk = r.json["pk"]
    print("✓ Created task with priority enum")

    r = client.get("/tasks?priority=high")
    assert len(r.json) >= 1
    print("✓ Query by priority enum")

    r = client.patch(f"/tasks/{task1_pk}/complete")
    assert r.json["is_completed"] == True
    print("✓ Complete task")

    # --- CLEANUP ---
    print("\n=== Cleanup ===")
    User.delete(user1_pk)
    User.delete(user2_pk)
    Product.delete(prod1_pk)
    Order.delete(order1_pk)
    Task.delete(task1_pk)
    print("✓ Cleaned up test data")

    print("\n" + "=" * 60)
    print("ALL COMPREHENSIVE FLASK TESTS PASSED!")
    print("=" * 60)


if __name__ == "__main__":
    run_tests()

