# Redis OM Python 1.0 Release Notes

Redis OM Python 1.0 is a major release that brings significant improvements to performance, type safety, and query capabilities.

## Breaking Changes

See the [Migration Guide](migration_guide_0x_to_1x.md) for detailed upgrade instructions.

- **Python 3.10+ required** - Dropped support for Python 3.8 and 3.9
- **Pydantic v2 required** - Dropped support for Pydantic v1
- **Model-level indexing** - Models now use `class MyModel(HashModel, index=True)` syntax
- **Datetime indexing** - Datetime fields indexed as NUMERIC (Unix timestamps) for range queries

## New Features

### Datetime Range Queries
Query datetime fields with comparison operators:
```python
recent = await User.find(User.created_at > datetime.now() - timedelta(days=7)).all()
```

### Geo Filtering
Filter results by geographic location:
```python
nearby = await Store.find(Store.location.within(lat, lon, radius_km)).all()
```

### Hash Field Expiration (Redis 7.4+)
Set expiration on individual hash fields:
```python
await user.expire_field("session_token", 3600)
```

### Conditional Save (nx/xx flags)
Save only if key exists or doesn't exist:
```python
await user.save(nx=True)  # Only save if not exists
await user.save(xx=True)  # Only save if exists
```

### Field Projection
Return only specific fields from queries:
```python
names = await User.find().only("name", "email").all()
```

### RedisVL Integration
Redis OM now includes [RedisVL](https://github.com/redis/redis-vl-python) as a dependency, providing advanced vector search capabilities:
```python
from aredis_om.redisvl import get_redisvl_index
from redisvl.query import VectorQuery

index = get_redisvl_index(MyModel)
results = await index.query(VectorQuery(
    vector=query_embedding,
    vector_field_name="embedding",
    num_results=10,
))
```

### py.typed Marker
Full mypy compatibility with PEP 561 py.typed marker.

## Bug Fixes

- Fixed `has_redisearch` coroutine not awaited warning
- Fixed Pydantic 2.12+ compatibility for custom FieldInfo with Annotated types
- Fixed Python 3.13 issubclass changes for nested vector fields
- Fixed Python 3.14 dict iteration error in JsonModel
- Fixed broken redis.io documentation URLs
- Fixed Pydantic V3 deprecation warnings
- Fixed inconsistent `.pk` behavior with custom primary keys (#570)
- Fixed HashModel list validation blocking vector fields (#544, #552)
- Fixed OR expression with KNN producing syntax error (#557)
- Fixed bytes fields failing with UnicodeDecodeError (#779)
- Fixed CLI `import_submodules` not working with pyenv (#682)

## Dependency Updates

- Redis client: >=3.5.3,<7.0.0
- python-ulid: Support for 3.1.0
- Development status: Production/Stable

## Contributors

Thanks to all contributors who made this release possible!

