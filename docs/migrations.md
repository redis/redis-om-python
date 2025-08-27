# Redis OM Python Migrations

Redis OM Python provides two types of migrations to help manage changes to your data and schemas:

1. **Schema Migrations** (`om migrate`) - Handle RediSearch index schema changes
2. **Data Migrations** (`om migrate-data`) - Handle data format transformations and updates

## CLI Options

Redis OMprovides two CLI interfaces:

### Unified CLI (Recommended)
```bash
om migrate          # Schema migrations  
om migrate-data     # Data migrations
```

### Individual Commands (Backward Compatible)
```bash
migrate             # Schema migrations (original command still works)
```

## Schema Migrations

Schema migrations manage RediSearch index definitions. When you change field types, indexing options, or other schema properties, Redis OMautomatically detects these changes and can update your indices accordingly.

### Directory Layout

By default, Redis OM uses a root migrations directory controlled by the environment variable `REDIS_OM_MIGRATIONS_DIR` (defaults to `migrations`).

Within this root directory:

- `schema-migrations/`: File-based schema migrations (RediSearch index snapshots)
- `data-migrations/`: Data migrations (transformations)

The CLI will offer to create these directories the first time you run or create migrations.

### Basic Usage

```bash
# Create a new schema migration snapshot from pending index changes
om migrate create add_sortable_on_user_name

# Review status
om migrate status

# Run schema migrations from files
om migrate run

# Override migrations dir
om migrate run --migrations-dir myapp/schema-migrations
```

> **Note**: The original `migrate` command is still available for backward compatibility.

### How Schema Migration Works

1. **Detection**: Auto-migrator detects index changes from your models
2. **Snapshot**: `om migrate create` writes a migration file capturing old/new index schemas
3. **Apply**: `om migrate run` executes migration files (drop/create indices) and records state
4. **Rollback**: `om migrate rollback <id>` restores previous index schema when available

### Example

```python
# Before: Simple field
class User(HashModel):
    name: str = Field(index=True)

# After: Add sortable option
class User(HashModel):
    name: str = Field(index=True, sortable=True)  # Schema change detected
```

Running `om migrate` will:
1. Drop the old index for `User`
2. Create a new index with sortable support
3. Update the stored schema hash

## Data Migrations

Data migrations handle transformations of your actual data. Use these when you need to:

- Convert data formats (e.g., datetime fields to timestamps)
- Migrate data between Redis instances
- Fix data inconsistencies
- Transform field values

### Basic Commands

```bash
# Check migration status
om migrate-data status

# Run pending migrations
om migrate-data run

# Dry run (see what would happen)
om migrate-data run --dry-run

# Create new migration
om migrate-data create migration_name
```

### Migration Status

```bash
om migrate-data status
```

Example output:
```
Migration Status:
  Total migrations: 2
  Applied: 1
  Pending: 1

Pending migrations:
  - 002_normalize_user_emails

Applied migrations:
  - 001_datetime_fields_to_timestamps
```

### Running Migrations

```bash
# Run all pending migrations
om migrate-data run

# Run with confirmation prompt
om migrate-data run  # Will ask "Run migrations? (y/n)"

# Run in dry-run mode
om migrate-data run --dry-run

# Run with verbose logging
om migrate-data run --verbose

# Limit number of migrations
om migrate-data run --limit 1
```

### Creating Custom Migrations

```bash
# Generate migration file
om migrate-data create normalize_emails
```

This creates a file like `migrations/20231201_143022_normalize_emails.py`:

```python
"""
Data migration: normalize_emails

Created: 2023-12-01 14:30:22
"""

from redis_om.model.migrations.data_migrator import BaseMigration


class NormalizeEmailsMigration(BaseMigration):
    migration_id = "20231201_143022_normalize_emails"
    description = "Normalize all email addresses to lowercase"
    dependencies = []  # List of migration IDs that must run first
    
    def up(self) -> None:
        """Apply the migration."""
        from myapp.models import User
        
        for user in User.find().all():
            if user.email:
                user.email = user.email.lower()
                user.save()
    
    def down(self) -> None:
        """Reverse the migration (optional)."""
        # Rollback logic here (optional)
        pass
    
    def can_run(self) -> bool:
        """Check if the migration can run (optional validation)."""
        return True
```

### Migration Dependencies

Migrations can depend on other migrations:

```python
class AdvancedMigration(BaseMigration):
    migration_id = "002_advanced_cleanup"
    description = "Advanced data cleanup"
    dependencies = ["001_datetime_fields_to_timestamps"]  # Must run first
    
    def up(self):
        # This runs only after 001_datetime_fields_to_timestamps
        pass
```

### Rollback Support

```bash
# Rollback a specific migration
om migrate-data rollback 001_datetime_fields_to_timestamps

# Rollback with dry-run
om migrate-data rollback 001_datetime_fields_to_timestamps --dry-run
```

## Built-in Migrations

### Datetime Field Migration

Redis OMincludes a built-in migration (`001_datetime_fields_to_timestamps`) that fixes datetime field indexing. This migration:

- Converts datetime fields from ISO strings to Unix timestamps
- Enables proper NUMERIC indexing for range queries and sorting
- Handles both HashModel and JsonModel

**Before Migration**:
```python
# Datetime stored as: "2023-12-01T14:30:22.123456"
# Indexed as: TAG (no range queries)
```

**After Migration**:
```python
# Datetime stored as: 1701435022
# Indexed as: NUMERIC (range queries work)
```

This migration runs automatically when you use `om migrate-data run`.

## Advanced Usage

### Module-Based Migrations

Instead of file-based migrations, you can define migrations in Python modules:

```python
# myapp/migrations.py
from redis_om import BaseMigration

class UserEmailNormalization(BaseMigration):
    migration_id = "001_normalize_emails"
    description = "Normalize user email addresses"
    
    def up(self):
        # Migration logic
        pass

# Make discoverable
MIGRATIONS = [UserEmailNormalization]
```

Run with:
```bash
om migrate-data run --module myapp.migrations
```

### Custom Migration Directory

```bash
# Use custom directory
om migrate-data run --migrations-dir custom/migrations

# Create in custom directory
om migrate-data create fix_data --migrations-dir custom/migrations
```

### Programmatic Usage

```python
from redis_om import DataMigrator

# Create migrator
migrator = DataMigrator(migrations_dir="migrations")

# Check status
status = migrator.status()
print(f"Pending: {status['pending_migrations']}")

# Run migrations
count = migrator.run_migrations(dry_run=False)
print(f"Applied {count} migrations")

# Load from module
migrator = DataMigrator()
migrator._load_migrations_from_module("myapp.migrations")
migrator.run_migrations()
```

## Best Practices

### Schema Migrations

1. **Test First**: Always test schema changes in development
2. **Backup Data**: Schema migrations drop and recreate indices
3. **Minimal Changes**: Make incremental schema changes when possible
4. **Monitor Performance**: Large datasets may take time to reindex

### Data Migrations

1. **Backup First**: Always backup data before running migrations
2. **Use Dry Run**: Test with `--dry-run` before applying
3. **Incremental**: Process large datasets in batches
4. **Idempotent**: Migrations should be safe to run multiple times
5. **Dependencies**: Use dependencies to ensure proper migration order
6. **Rollback Plan**: Implement `down()` method when possible

### Migration Strategy

```python
# Good: Incremental, safe migration
class SafeMigration(BaseMigration):
    def up(self):
        for user in User.find().all():
            if not user.email_normalized:  # Check if already done
                user.email = user.email.lower()
                user.email_normalized = True
                user.save()

# Avoid: All-or-nothing operations without safety checks
class UnsafeMigration(BaseMigration):
    def up(self):
        for user in User.find().all():
            user.email = user.email.lower()  # No safety check
            user.save()
```

## Error Handling

### Migration Failures

If a migration fails:

1. **Check Logs**: Use `--verbose` for detailed error information
2. **Fix Issues**: Address the underlying problem
3. **Resume**: Run `om migrate-data run` again
4. **Rollback**: Use rollback if safe to do so

### Recovery

```bash
# Check what's applied
om migrate-data status

# Try dry-run to see issues
om migrate-data run --dry-run --verbose

# Fix and retry
om migrate-data run --verbose
```

## Complete Workflow Example

Here's a complete workflow for adding a new feature with migrations:

1. **Modify Models**:
```python
class User(HashModel):
    name: str = Field(index=True)
    email: str = Field(index=True)
    created_at: datetime.datetime = Field(index=True, sortable=True)  # New field
```

2. **Run Schema Migration**:
```bash
om migrate  # Updates RediSearch indices
```

3. **Create Data Migration**:
```bash
om migrate-data create populate_created_at
```

4. **Implement Migration**:
```python
class PopulateCreatedAtMigration(BaseMigration):
    migration_id = "002_populate_created_at"
    description = "Populate created_at for existing users"
    
    def up(self):
        import datetime
        for user in User.find().all():
            if not user.created_at:
                user.created_at = datetime.datetime.now()
                user.save()
```

5. **Run Data Migration**:
```bash
om migrate-data run
```

6. **Verify**:
```bash
om migrate-data status
```

This ensures both your schema and data are properly migrated for the new feature.

## Troubleshooting

### Common Issues

**Schema Migration Issues**:
- **Index already exists**: Usually safe to ignore
- **Index does not exist**: Check if indices were manually deleted
- **Database > 0**: RediSearch only works in database 0

**Data Migration Issues**:
- **Migration won't run**: Check `can_run()` method returns `True`
- **Dependency errors**: Ensure dependency migrations are applied first
- **Performance issues**: Process large datasets in smaller batches

### Getting Help

```bash
# Verbose logging
om migrate-data run --verbose

# Check migration implementation
om migrate-data status

# Test without changes
om migrate-data run --dry-run
```

For more complex scenarios, check the migration logs and ensure your Redis instance is properly configured for RediSearch operations.
