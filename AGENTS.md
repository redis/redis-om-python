# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Redis OM Python is an object mapping library for Redis that provides high-level abstractions to model and query Redis data with modern Python applications. It supports both async (aredis_om) and sync (redis_om) versions, with sync code automatically generated from async code using unasync.

## Development Commands

### Setup and Installation
```bash
# Install dependencies using Poetry (preferred)
poetry install

# Or directly with pip
pip install -e .
```

### Core Development Tasks
```bash
# Run linting (includes isort, black, flake8, mypy, bandit)
make lint

# Format code 
make format

# Run full test suite against redis-stack
make test

# Run tests against OSS Redis
make test_oss

# Generate sync code from async code (REQUIRED after any aredis_om changes)
make sync

# Build distribution packages
make dist

# Start Redis instances via Docker Compose
make redis

# Run all linting, formatting, and tests
make all
```

**IMPORTANT**: Always run `make sync` after making any changes to `aredis_om/` or `tests/` to regenerate the corresponding sync versions.

### Testing Commands
```bash
# Run specific test file
pytest tests/test_hash_model.py

# Run specific test with verbose output
pytest tests/test_hash_model.py::test_values_method_with_specific_fields -v

# Run async tests (uses pytest-asyncio)
pytest tests/ -v

# Run sync tests  
pytest tests_sync/ -v

# Run tests with coverage
pytest --cov-report term-missing --cov aredis_om tests/
```

### CLI Tools
```bash
# Migration CLI (async version, recommended)
om migrate

# Legacy migration CLI (sync version)
migrate
```

## Code Architecture

### Dual Async/Sync Design
- **aredis_om/**: Primary async implementation - **WRITE ALL CODE HERE**
- **redis_om/**: Sync version auto-generated from async using unasync - **NEVER EDIT THIS DIRECTORY**
- **tests/**: Async tests - **WRITE ALL TESTS HERE**
- **tests_sync/**: Sync tests auto-generated from async tests - **NEVER EDIT THIS DIRECTORY**
- **make_sync.py**: Script that generates sync versions using unasync transformations

### CRITICAL RULE: Only Edit Async Code
**NEVER write, modify, or edit any files in `redis_om/` or `tests_sync/` directories. These are automatically generated from the async versions using unasync. All development must be done in `aredis_om/` and `tests/` directories only. The `make sync` command regenerates the sync versions.**

### Core Components

#### Model System (aredis_om/model/model.py)
- **RedisModel**: Abstract base class for all models
- **HashModel**: For Redis Hash storage (simple key-value fields)
- **JsonModel**: For Redis JSON storage (complex nested structures)
- **EmbeddedJsonModel**: For nested models within JsonModels

Key classes:
- `FindQuery`: Handles search queries with RediSearch
- `Expression/NegatedExpression`: Query expression trees
- `FieldInfo`: Enhanced Pydantic field with Redis-specific options
- `ModelMeta`: Metaclass handling model registration and field processing

#### Field Types and Indexing
- Automatic field type detection for RediSearch indexing
- Support for TAG, TEXT, NUMERIC, GEO, and VECTOR field types
- Configurable indexing with `Field(index=True, sortable=True, full_text_search=True)`
- Vector search support with FLAT and HNSW algorithms

#### Migration System (aredis_om/model/migrations/)
- **migrator.py**: Core migration engine
- **data_migrator.py**: Data transformation utilities
- **datetime_migration.py**: Specific migration for datetime field indexing
- Automatic index creation and schema management

#### Query System
- Django-like ORM syntax: `Model.find(Model.field == value)`
- Support for complex queries with AND, OR, NOT operations
- KNN vector search capabilities
- Pagination, sorting, and field projection
- `.values()` and `.only()` methods for efficient field selection

### Key Features

#### DateTime Handling
- Automatic conversion of datetime objects to Unix timestamps for Redis storage
- Proper indexing support for datetime fields
- Conversion back to datetime objects on retrieval

#### Connection Management
- Multiple Redis connection support via Meta.database
- Pipeline support for bulk operations
- Async/await pattern throughout

#### Validation and Type Safety
- Built on Pydantic v2 for robust data validation
- Type hints throughout codebase
- Automatic field type inference for indexing

## Development Patterns

**REMEMBER: All code changes must be made in `aredis_om/` directory only. Never edit `redis_om/`.**

### Model Definition
```python
from aredis_om import HashModel, JsonModel, Field
import datetime

# Hash model for simple structures
class User(HashModel, index=True):
    name: str = Field(index=True)
    email: str = Field(index=True)
    age: int = Field(index=True, sortable=True)

# JSON model for complex nested data
class Order(JsonModel, index=True):
    user_id: str = Field(index=True)
    items: List[OrderItem]
    created_at: datetime.datetime
    
# Embedded models
class Address(EmbeddedJsonModel):
    street: str = Field(index=True)
    city: str = Field(index=True)
```

### Testing Patterns
- Use `pytest.mark.asyncio` for async tests
- Tests use `conftest.py` fixtures for Redis connection and cleanup
- Separate test files for hash vs JSON models
- Integration tests with actual Redis instances via Docker

### Migration Development
- Migrations auto-discover models in the registry
- Data migrations support field transformations
- Always test migrations against representative data

## Project Structure Notes

- **docs/**: Comprehensive documentation in Markdown
- **docker-compose.yml**: Redis Stack and OSS Redis instances for testing
- **pyproject.toml**: Poetry configuration with CLI script definitions
- **.github/**: CI/CD workflows and issue templates
- **Session.vim**: Vim session configuration for development

## Important Implementation Details

- Primary keys default to ULID format for ordering and uniqueness
- Boolean fields stored as "1"/"0" strings in HashModel, native booleans in JsonModel
- Field validation occurs at model instantiation for indexed models
- RediSearch schema generation is automatic based on field types and annotations
- Pipeline operations supported throughout for performance
- Comprehensive error handling with custom exception types

## CLI Integration

The project provides two CLI entry points:
- `om`: Modern unified CLI using async components
- `migrate`: Legacy CLI for backward compatibility

Both support model discovery, index creation, and data migration operations.