# Redis OM Python Examples

This directory contains example applications demonstrating Redis OM Python with popular web frameworks.

## Examples

| File | Framework | Description |
|------|-----------|-------------|
| `fastapi_app.py` | FastAPI (async) | Comprehensive async example with all Redis OM features |
| `flask_app.py` | Flask (sync) | Comprehensive sync example with all Redis OM features |

## Features Demonstrated

Both examples cover:

- **HashModel** - Flat key-value storage for simple data
- **JsonModel** - Nested data structures with lists and embedded models
- **EmbeddedJsonModel** - Queryable nested fields
- **Field options** - `index=True`, `sortable=True`, `full_text_search=True`
- **Field types** - str, int, float, bool, Optional, List, datetime, Enum
- **CRUD operations** - save(), get(), delete()
- **Query operations** - comparisons, full-text search, combining with `&`/`|`
- **Sorting and pagination** - sort_by(), pagination with offset/limit
- **TTL/Expiration** - expire() for session management

## Installation

Install Redis OM with the examples dependencies:

```bash
# Using uv
uv sync --extra examples

# Or using pip
pip install redis-om[examples]
```

## Prerequisites

You need a running Redis instance with the Search module. The easiest way is to use Redis Stack:

```bash
docker run -d --name redis-stack -p 6379:6379 redis/redis-stack:latest
```

## Running the Examples

### FastAPI (Async)

Run the FastAPI app:

```bash
cd examples
python fastapi_app.py
```

This runs the built-in test suite. To run as a server:

```bash
uvicorn fastapi_app:app --reload --port 8000
```

### Flask (Sync)

Run the Flask app:

```bash
cd examples
python flask_app.py
```

This runs the built-in test suite. To run as a server:

```bash
cd examples
flask --app flask_app run --port 5000
```

## API Endpoints

Both apps expose similar REST endpoints:

### Users (HashModel)
- `POST /users` - Create user
- `GET /users/{pk}` - Get user by primary key
- `GET /users` - List/query users with filters
- `DELETE /users/{pk}` - Delete user

### Sessions (HashModel with TTL)
- `POST /sessions` - Create session with expiration
- `GET /sessions/{token}` - Get session by token

### Products (JsonModel)
- `POST /products` - Create product
- `GET /products/{pk}` - Get product
- `GET /products` - List/query products
- `PATCH /products/{pk}` - Update product

### Orders (JsonModel with Embedded Models)
- `POST /orders` - Create order with embedded address
- `GET /orders/{pk}` - Get order
- `GET /orders` - Query orders (including by embedded fields like city)
- `PATCH /orders/{pk}/status` - Update order status

### Tasks (JsonModel with Enum)
- `POST /tasks` - Create task
- `GET /tasks` - List/query tasks
- `PATCH /tasks/{pk}/complete` - Mark task complete

## Query Examples

Filter by field:
```
GET /users?username=alice
GET /products?category=software
```

Range queries:
```
GET /users?min_age=25&max_age=40
GET /products?min_price=100&max_price=500
```

Full-text search:
```
GET /users?bio_search=Redis
GET /products?search=database
```

Query embedded fields:
```
GET /orders?city=Boston
GET /orders?state=MA
```

Sorting:
```
GET /users?sort_by=age
GET /users?sort_by=-created_at  # Descending
GET /products?sort_by=price
```

Pagination:
```
GET /users?page=2&page_size=10
```

