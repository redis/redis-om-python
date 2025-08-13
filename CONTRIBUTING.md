# Contributing to Redis OM Python

Thank you for your interest in contributing to Redis OM Python! We welcome contributions from the community and are grateful for any help you can provide.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Architecture](#project-architecture)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Code Style](#code-style)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)

## Getting Started

Redis OM Python is an object mapping library for Redis that provides declarative models built on Pydantic. Before contributing, please:

1. Read the [README.md](README.md) to understand the project
2. Check existing [issues](https://github.com/redis/redis-om-python/issues) and [pull requests](https://github.com/redis/redis-om-python/pulls)
3. Review this contributing guide thoroughly

## Development Setup

### Prerequisites

- Python 3.8 or higher (we test on 3.8-3.13)
- [Poetry](https://python-poetry.org/docs/#installation) for dependency management
- Docker and Docker Compose for running Redis
- Make (for running development commands)

### Initial Setup

1. **Fork and clone the repository:**

   ```bash
   git clone https://github.com/YOUR_USERNAME/redis-om-python.git
   cd redis-om-python
   ```

2. **Install dependencies:**

   ```bash
   make install
   ```

   This will use Poetry to install all dependencies in a virtual environment.

3. **Start Redis containers:**

   ```bash
   make redis
   ```

   This starts two Redis instances:
   - Redis Stack (port 6380) - includes RediSearch and RedisJSON modules
   - Redis OSS (port 6381) - standard Redis for compatibility testing

4. **Enter the Poetry shell (optional):**

   ```bash
   make shell
   ```

## Project Architecture

### � Critical: Dual Async/Sync Architecture

This project uses a unique dual-codebase approach:

- **`/aredis_om/`** - The PRIMARY source code (async implementation)
- **`/redis_om/`** - GENERATED sync version (DO NOT EDIT DIRECTLY)
- **`/tests/`** - Async tests
- **`/tests_sync/`** - GENERATED sync tests

**IMPORTANT:**

- Always implement features in `/aredis_om/` first
- Never directly edit files in `/redis_om/` or `/tests_sync/`
- After making changes, run `make sync` to generate the sync versions

### Key Components

- **Models**: `HashModel` (Redis Hashes) and `JsonModel` (RedisJSON documents)
- **Query System**: Expression-based queries with Django ORM-like syntax
- **Field System**: Pydantic fields extended with Redis-specific features
- **Migration System**: Automatic RediSearch index management

## Development Workflow

### 1. Making Code Changes

For any new feature or bug fix:

```bash
# 1. Create a new branch
git checkout -b feature/your-feature-name

# 2. Make changes in /aredis_om/ (async code)
# Edit files...

# 3. Generate sync version
make sync

# 4. Format your code
make format

# 5. Run linters
make lint

# 6. Run tests
make test
```

### 2. Common Development Commands

```bash
make install    # Install dependencies
make redis      # Start Redis containers
make sync       # Generate sync code from async
make format     # Format code with black and isort
make lint       # Run all linters (flake8, mypy, bandit)
make test       # Run full test suite against Redis Stack
make test_oss   # Run tests against OSS Redis
make clean      # Remove generated files and containers
make all        # Run lint, format, and test
```

### 3. Development Cycle Example

Here's a typical development cycle for adding a new feature:

```bash
# 1. Start Redis
make redis

# 2. Create your feature in /aredis_om/
vim aredis_om/model/model.py

# 3. Generate sync version
make sync

# 4. Write tests in /tests/
vim tests/test_your_feature.py

# 5. Run tests iteratively
poetry run pytest tests/test_your_feature.py -vv

# 6. Format and lint
make format
make lint

# 7. Run full test suite
make test
```

## Testing

### Running Tests

```bash
# Run all tests
make test

# Run specific test file
poetry run pytest tests/test_hash_model.py -vv

# Run specific test
poetry run pytest tests/test_hash_model.py::test_saves_model -vv

# Run with coverage
poetry run pytest --cov=aredis_om --cov=redis_om --cov-report=term-missing

# Run tests in parallel
poetry run pytest -n auto

# Test against OSS Redis (without modules)
make test_oss
```

### Writing Tests

1. Write async tests in `/tests/`
2. Use fixtures from `conftest.py` for Redis connections
3. Mark module-dependent tests appropriately:

   ```python
   @pytest.mark.asyncio
   async def test_json_model_feature():
       # Test requiring RedisJSON
       pass
   ```

4. Ensure tests work with both Redis Stack and OSS Redis where applicable

### Test Coverage

We aim for high test coverage. New features should include comprehensive tests covering:

- Happy path scenarios
- Edge cases
- Error conditions
- Both async and sync versions (sync tests are auto-generated)

## Code Style

### Formatting and Linting

We use several tools to maintain code quality:

- **black** - Code formatting
- **isort** - Import sorting
- **flake8** - Style guide enforcement
- **mypy** - Static type checking
- **bandit** - Security linting

Run all checks with:

```bash
make format  # Auto-format code
make lint    # Check for issues
```

### Style Guidelines

1. **Type Hints**: Use type hints for all function signatures
2. **Docstrings**: Add docstrings to public methods and classes
3. **Async First**: Implement in async (`/aredis_om/`) first
4. **Pydantic Models**: Leverage Pydantic's validation features
5. **Error Messages**: Provide clear, actionable error messages

### Example Code Style

```python
from typing import Optional, List
from pydantic import Field
from aredis_om import HashModel

class Customer(HashModel):
    """A customer model stored as a Redis Hash."""

    first_name: str = Field(index=True)
    last_name: str = Field(index=True)
    email: str = Field(index=True)
    age: int = Field(index=True, ge=0, le=120)

    class Meta:
        database = get_redis_connection()
```

## Submitting Changes

### Pull Request Process

1. **Ensure all tests pass:**

   ```bash
   make test
   ```

2. **Update documentation:**
   - Add docstrings for new functions/classes
   - Update README.md if adding major features
   - Add examples for new functionality

3. **Create Pull Request:**
   - Use a clear, descriptive title
   - Reference any related issues
   - Describe what changes you made and why
   - Include examples of how to use new features

### Pull Request Checklist

- [ ] Code is in `/aredis_om/` (async implementation)
- [ ] Ran `make sync` to generate sync version
- [ ] All tests pass (`make test`)
- [ ] Code is formatted (`make format`)
- [ ] Linters pass (`make lint`)
- [ ] Added/updated tests for changes
- [ ] Added docstrings for public APIs
- [ ] Commits are logical and well-described

### Commit Messages

Use clear, descriptive commit messages:

- Start with a verb (Add, Fix, Update, Remove)
- Keep the first line under 50 characters
- Reference issues when applicable

Examples:

```
Add support for vector similarity search
Fix index creation for nested JSON models
Update dependencies to support Python 3.13
Remove deprecated query methods
```

## Reporting Issues

### Bug Reports

When reporting bugs, please include:

1. **Environment details:**
   - Python version
   - Redis OM version
   - Redis server version
   - OS and version

2. **Minimal reproducible example:**

   ```python
   # Your code that demonstrates the issue
   ```

3. **Expected vs actual behavior**

4. **Full error messages and stack traces**

### Feature Requests

For feature requests, please describe:

- The use case you're trying to solve
- How you envision the feature working
- Code examples of the proposed API

## Additional Resources

- [Redis OM Documentation](https://redis.io/docs/stack/get-started/tutorials/stack-python/)
- [RediSearch Documentation](https://redis.io/docs/stack/search/)
- [RedisJSON Documentation](https://redis.io/docs/stack/json/)
- [Pydantic Documentation](https://docs.pydantic.dev/)

## Getting Help

- **Issues**: [GitHub Issues](https://github.com/redis/redis-om-python/issues)
- **Discussions**: [GitHub Discussions](https://github.com/redis/redis-om-python/discussions)
- **Discord**: [Redis Discord Server](https://discord.gg/redis)

## License

By contributing to Redis OM Python, you agree that your contributions will be licensed under the [MIT License](LICENSE).

## Thank You

Thank you for contributing to Redis OM Python! Your efforts help make this library better for everyone in the Redis community.
