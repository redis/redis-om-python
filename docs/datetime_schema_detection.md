# Datetime Field Schema Detection

## Overview

Redis OM Python includes automatic detection for datetime field schema mismatches to prevent runtime errors when deploying new code without running required migrations.

## The Problem

When upgrading to Redis OM Python 1.0+, datetime fields are indexed as NUMERIC instead of TAG for better performance and range query support. However, if you deploy the new code without running the migration, you'll have:

- **Redis**: Datetime fields indexed as TAG (old format)
- **Code**: Expecting datetime fields as NUMERIC (new format)

This mismatch causes query failures with cryptic syntax errors.

## Automatic Detection

### During Query Execution

Redis OM automatically detects potential schema mismatches when queries fail:

```python
# If this query fails with a syntax error on a datetime field
users = await User.find(User.created_at > datetime.now()).all()

# You'll see a warning in logs:
# WARNING: Query failed with syntax error on model with datetime fields.
# This might indicate a schema mismatch where datetime fields are
# indexed as TAG but code expects NUMERIC.
# Run 'om migrate-data check-schema' to verify and
# 'om migrate-data datetime' to fix.
```

### Manual Schema Check

Check for schema mismatches explicitly:

```bash
# Check all models for datetime field schema mismatches
om migrate-data check-schema
```

Example output when mismatches are found:
```
🔍 Checking for datetime field schema mismatches...
⚠️  Found 2 datetime field schema mismatch(es):

  Model: User
  Field: created_at
  Current Redis type: TAG
  Expected type: NUMERIC
  Index: myapp:user

  Model: Order
  Field: order_date
  Current Redis type: TAG
  Expected type: NUMERIC
  Index: myapp:order

🚨 CRITICAL ISSUE DETECTED:
CRITICAL: Found 2 datetime field(s) with schema mismatches.
Your deployed code expects NUMERIC indexing but Redis has TAG indexing.
Run 'om migrate-data datetime' to fix this before queries fail.
Affected models: User, Order

To fix this issue, run:
  om migrate-data datetime
```

### Programmatic Check

Check schema compatibility in your application code:

```python
from aredis_om import User

# Check a specific model
result = await User.check_datetime_schema_compatibility()

if result['has_mismatches']:
    print(f"Schema mismatch detected: {result['recommendation']}")
    # Handle the mismatch (e.g., alert, prevent startup, etc.)
```

## Resolution

When schema mismatches are detected:

1. **Run the migration immediately**:
   ```bash
   om migrate-data datetime
   ```

2. **Verify the fix**:
   ```bash
   om migrate-data check-schema
   ```

3. **Expected output after fix**:
   ```
   ✅ No schema mismatches detected - all datetime fields are properly indexed
   ```

## Production Deployment Strategy

### Safe Deployment Process

1. **Before deploying new code**:
   ```bash
   # Check current schema
   om migrate-data check-schema
   
   # If mismatches found, run migration first
   om migrate-data datetime
   
   # Verify migration completed
   om migrate-data verify
   ```

2. **Deploy new code** only after migration is complete

3. **Post-deployment verification**:
   ```bash
   # Confirm no schema mismatches
   om migrate-data check-schema
   ```

### Integration with CI/CD

Add schema checking to your deployment pipeline:

```yaml
# Example GitHub Actions step
- name: Check datetime schema compatibility
  run: |
    om migrate-data check-schema
    if [ $? -ne 0 ]; then
      echo "Schema mismatch detected. Run migration before deploying."
      exit 1
    fi
```

### Application Startup Check

Add schema validation to your application startup:

```python
import asyncio
import logging
from aredis_om import get_redis_connection
from aredis_om.model.migrations.datetime_migration import DatetimeFieldDetector
from myapp.models import User, Order  # Your models

async def check_schema_on_startup():
    """Check for schema mismatches during application startup."""
    try:
        redis = get_redis_connection()
        detector = DatetimeFieldDetector(redis)
        
        models = [User, Order]  # Add all your models
        result = await detector.check_for_schema_mismatches(models)
        
        if result['has_mismatches']:
            logging.critical(
                f"CRITICAL: Schema mismatch detected on startup. "
                f"{result['recommendation']}"
            )
            # Option 1: Fail startup
            raise RuntimeError("Schema mismatch prevents safe operation")
            
            # Option 2: Alert but continue (risky)
            # logging.warning("Continuing with schema mismatch - queries may fail")
            
    except Exception as e:
        logging.error(f"Could not check schema compatibility: {e}")

# Call during application startup
asyncio.run(check_schema_on_startup())
```

## Technical Details

### Detection Method

The schema detector:

1. **Queries Redis** for current index schema using `FT.INFO`
2. **Analyzes model fields** to identify datetime fields
3. **Compares expectations** (NUMERIC) vs reality (TAG/NUMERIC)
4. **Reports mismatches** with specific field and model information

### Supported Field Types

Detection works for these datetime field types:
- `datetime.datetime`
- `datetime.date`

### Limitations

- Only detects mismatches for indexed models
- Requires Redis with RediSearch module
- Cannot detect mismatches if index doesn't exist yet

## Error Messages

### Query Failure Warning
```
WARNING: Query failed with syntax error on model with datetime fields.
This might indicate a schema mismatch where datetime fields are
indexed as TAG but code expects NUMERIC.
Run 'om migrate-data check-schema' to verify and
'om migrate-data datetime' to fix.
```

### Schema Check Results
```
CRITICAL: Found X datetime field(s) with schema mismatches.
Your deployed code expects NUMERIC indexing but Redis has TAG indexing.
Run 'om migrate-data datetime' to fix this before queries fail.
Affected models: ModelA, ModelB
```

## Best Practices

1. **Always run schema check** before deploying datetime-related code changes
2. **Include schema validation** in your CI/CD pipeline
3. **Monitor application logs** for schema mismatch warnings
4. **Test migrations** in staging environment first
5. **Have rollback plan** ready in case of migration issues

This detection system helps prevent production issues by catching schema mismatches early and providing clear guidance on resolution.
