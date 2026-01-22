# Redis OM Python

<p class="hero-section" markdown>
**Object mapping, and more, for Redis and Python.**
</p>

[Get Started](getting_started.md){ .md-button .md-button--primary }
[View on GitHub](https://github.com/redis/redis-om-python){ .md-button }

---

## Overview

Redis OM Python is a modern object mapping library for Redis that provides high-level abstractions to model and query Redis data with Python. Built on [Pydantic](https://docs.pydantic.dev/) for robust data validation, it supports both async and sync operations.

## Features

<div class="feature-grid" markdown>

<div class="feature-card" markdown>
### :material-database: Hash & JSON Models
Store data as Redis Hashes or JSON documents with automatic serialization.
</div>

<div class="feature-card" markdown>
### :material-magnify: Powerful Queries
Django-like ORM syntax with support for complex queries using RediSearch.
</div>

<div class="feature-card" markdown>
### :material-check-circle: Pydantic Validation
Full Pydantic v2 support for data validation and type safety.
</div>

<div class="feature-card" markdown>
### :material-lightning-bolt: Async & Sync
Both async (`aredis_om`) and sync (`redis_om`) APIs available.
</div>

</div>

## Quick Start

### Installation

```bash
pip install redis-om
```

### Define a Model

```python
from redis_om import HashModel, Field

class Customer(HashModel, index=True):
    name: str = Field(index=True)
    email: str = Field(index=True)
    age: int = Field(index=True, sortable=True)
```

### Create and Query

```python
# Create a customer
customer = Customer(name="Alice", email="alice@example.com", age=30)
customer.save()

# Find customers by name
results = Customer.find(Customer.name == "Alice").all()
```

## Requirements

- **Python 3.10+**
- **Redis 8** (recommended) or Redis Stack — see [Redis Setup](redis_setup.md)

## Learn More

- **[Getting Started](getting_started.md)** - Full tutorial to get up and running
- **[Redis Setup](redis_setup.md)** - Choose and connect to Redis
- **[Models](models.md)** - Deep dive into model definition and field types
- **[FastAPI Integration](fastapi_integration.md)** - Build APIs with Redis OM

!!! tip "Upgrading from 0.x?"
    See the [Migration Guide](migration_guide_0x_to_1x.md) for breaking changes and upgrade instructions.
