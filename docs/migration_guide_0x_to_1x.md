# Redis OM Python 0.x to 1.0 Migration Guide

This guide covers the breaking changes and migration steps required when upgrading from Redis OM Python 0.x to 1.0.

## Overview of Breaking Changes

Redis OM Python 1.0 introduces several breaking changes that improve performance and provide better query capabilities:

1. **Model-level indexing** - Models are now indexed at the class level instead of field-by-field
2. **Datetime field indexing** - Datetime fields are now indexed as NUMERIC instead of TAG for better range queries
3. **Enhanced migration system** - New data migration capabilities with rollback support

## Breaking Change 1: Model-Level Indexing

### What Changed

In 0.x, you marked individual fields as indexed. In 1.0, you mark the entire model as indexed and then specify field-level indexing options.

### Before (0.x)
```python
class Member(HashModel):
    id: int = Field(index=True, primary_key=True)
    first_name: str = Field(index=True, case_sensitive=True)
    last_name: str = Field(index=True)
    email: str = Field(index=True)
    join_date: datetime.date
    age: int = Field(index=True, sortable=True)
    bio: str = Field(index=True, full_text_search=True)
```

### After (1.0)
```python
class Member(HashModel, index=True):  # ← Model-level indexing
    id: int = Field(index=True, primary_key=True)
    first_name: str = Field(index=True, case_sensitive=True)
    last_name: str = Field(index=True)
    email: str = Field(index=True)
    join_date: datetime.date
    age: int = Field(sortable=True)  # ← No need for index=True if model is indexed
    bio: str = Field(full_text_search=True)  # ← No need for index=True if model is indexed
```

### Migration Steps

1. **Add `index=True` to your model class**:
   ```python
   # Change this:
   class MyModel(HashModel):
   
   # To this:
   class MyModel(HashModel, index=True):
   ```

2. **Remove redundant `index=True` from fields** (optional but recommended):
   - Keep `index=True` on fields that need special indexing behavior
   - Remove `index=True` from fields that only need basic indexing
   - Keep field-specific options like `sortable=True`, `full_text_search=True`, `case_sensitive=True`

3. **Update both HashModel and JsonModel classes**:
   ```python
   class User(JsonModel, index=True):  # ← Add index=True here too
       name: str = Field(index=True)
       age: int = Field(sortable=True)
   ```

## Breaking Change 2: Datetime Field Indexing

### What Changed

Datetime fields are now indexed as NUMERIC fields (Unix timestamps) instead of TAG fields (ISO strings). This enables:
- Range queries on datetime fields
- Sorting by datetime fields
- Better query performance

### Impact on Your Code

**Queries that now work** (previously failed):
```python
# Range queries
users = await User.find(User.created_at > datetime.now() - timedelta(days=7)).all()

# Sorting by datetime
users = await User.find().sort_by('created_at').all()

# Between queries
start = datetime(2023, 1, 1)
end = datetime(2023, 12, 31)
users = await User.find(
    (User.created_at >= start) & (User.created_at <= end)
).all()
```

**Data storage format change**:
- **Before**: `"2023-12-01T14:30:22.123456"` (ISO string)
- **After**: `1701435022` (Unix timestamp)

### Migration Steps

1. **Run schema migration** to update indexes:
   ```bash
   om migrate
   ```

2. **Run data migration** to convert datetime values:
   ```bash
   om migrate-data run
   ```

3. **Verify migration** completed successfully:
   ```bash
   om migrate-data verify
   ```

For detailed datetime migration instructions, see the [Datetime Migration Section](#datetime-migration-details) below.

## Migration Process

### Step 1: Backup Your Data

**Critical**: Always backup your Redis data before migrating:

```bash
# Create Redis backup
redis-cli BGSAVE

# Or use Redis persistence
redis-cli SAVE
```

### Step 2: Update Your Models

Update all your model classes to use the new indexing syntax:

```python
# Before
class Product(HashModel):
    name: str = Field(index=True)
    price: float = Field(index=True, sortable=True)
    category: str = Field(index=True)

# After  
class Product(HashModel, index=True):
    name: str = Field(index=True)
    price: float = Field(sortable=True)
    category: str = Field(index=True)
```

### Step 3: Install Redis OM 1.0

```bash
pip install redis-om-python>=1.0.0
```

### Step 4: Run Schema Migration

Update your RediSearch indexes to match the new model definitions:

```bash
om migrate
```

### Step 5: Run Data Migration

Convert datetime fields from ISO strings to Unix timestamps:

```bash
# Check what will be migrated
om migrate-data status

# Run the migration
om migrate-data run

# Verify completion
om migrate-data verify
```

### Step 6: Test Your Application

- Test datetime queries and sorting
- Verify all indexed fields work correctly
- Check application functionality

## Datetime Migration Details

### Prerequisites

- Redis with RediSearch module
- Backup of your Redis data
- Redis OM Python 1.0+

### Migration Commands

```bash
# Check migration status
om migrate-data status

# Run migration with progress monitoring
om migrate-data run --verbose

# Verify data integrity
om migrate-data verify --check-data

# Check for schema mismatches
om migrate-data check-schema
```

### Migration Options

For large datasets or specific requirements:

```bash
# Custom batch size for large datasets
om migrate-data run --batch-size 500

# Handle errors gracefully
om migrate-data run --failure-mode log_and_skip --max-errors 100

# Dry run to preview changes
om migrate-data run --dry-run
```

### Rollback

If you need to rollback the datetime migration:

```bash
# Rollback to previous format
om migrate-data rollback 001_datetime_fields_to_timestamps

# Or restore from backup
redis-cli FLUSHALL
# Restore your backup file
```

## Troubleshooting

### Common Issues

1. **Schema mismatch errors**:
   ```bash
   om migrate-data check-schema
   ```

2. **Migration fails with high error rate**:
   ```bash
   om migrate-data run --failure-mode log_and_skip
   ```

3. **Out of memory during migration**:
   ```bash
   om migrate-data run --batch-size 100
   ```

### Getting Help

For detailed troubleshooting, see:
- [Migration Documentation](migrations.md)
- [Error Handling Guide](errors.md)

## Compatibility Notes

### What Still Works

- All existing query syntax
- Model field definitions (with updated indexing)
- Redis connection configuration
- Async/sync dual API

### What's Deprecated

- Field-by-field indexing without model-level `index=True`
- Old migration CLI (`migrate` command - use `om migrate` instead)

## Next Steps

After successful migration:

1. **Update your code** to take advantage of datetime range queries
2. **Remove redundant `index=True`** from fields where not needed
3. **Test performance** with the new NUMERIC datetime indexing
4. **Update documentation** to reflect new model syntax

## Example: Complete Migration

Here's a complete before/after example:

### Before (0.x)
```python
class User(HashModel):
    name: str = Field(index=True)
    email: str = Field(index=True)
    created_at: datetime.datetime = Field(index=True)
    age: int = Field(index=True, sortable=True)
    bio: str = Field(index=True, full_text_search=True)
```

### After (1.0)
```python
class User(HashModel, index=True):
    name: str = Field(index=True)
    email: str = Field(index=True)
    created_at: datetime.datetime  # Now supports range queries!
    age: int = Field(sortable=True)
    bio: str = Field(full_text_search=True)

# New capabilities:
recent_users = await User.find(
    User.created_at > datetime.now() - timedelta(days=30)
).sort_by('created_at').all()
```

This migration unlocks powerful new datetime query capabilities while maintaining backward compatibility for most use cases.
