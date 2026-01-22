# Redis OM Python Migrations

Redis OM Python provides comprehensive migration capabilities to manage schema changes and data transformations.

## Migration Types

1. **Schema Migrations** (`om migrate`) - Handle RediSearch index schema changes
2. **Data Migrations** (`om migrate-data`) - Handle data format transformations and updates

## Upgrading from 0.x to 1.0

If you're upgrading from Redis OM Python 0.x to 1.0, see the **[0.x to 1.0 Migration Guide](migration_guide_0x_to_1x.md)** for breaking changes and upgrade instructions, including:

- Model-level indexing changes
- Datetime field indexing improvements
- Required data migrations

## CLI Commands

```bash
# Schema migrations (recommended)
om migrate          # File-based schema migrations with rollback support
om migrate-data     # Data migrations and transformations

# Legacy command (deprecated)
migrate             # Automatic schema migrations (use om migrate instead)
```

## Schema Migrations

Schema migrations manage RediSearch index definitions. When you change field types, indexing options, or other schema properties, Redis OM automatically detects these changes and can update your indices accordingly.

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

> **Note**: The legacy `migrate` command performs automatic migrations without file tracking and is deprecated. Use `om migrate` for production deployments.

### Migration Approaches

Redis OM provides two approaches to schema migrations:

#### File-based Migrations (`om migrate`) - Recommended
- **Controlled**: Migrations are saved as versioned files
- **Rollback**: Previous schemas can be restored
- **Team-friendly**: Migration files can be committed to git
- **Production-safe**: Explicit migration approval workflow

#### Automatic Migrations (`migrate`) - Deprecated  
- **Immediate**: Detects and applies changes instantly
- **No rollback**: Cannot undo schema changes
- **Development-only**: Suitable for rapid prototyping
- **⚠️ Deprecated**: Use `om migrate` for production

### How File-based Migration Works

1. **Detection**: Auto-migrator detects index changes from your models
2. **Snapshot**: `om migrate create` writes a migration file capturing old/new index schemas
3. **Apply**: `om migrate run` executes migration files (drop/create indices) and records state
4. **Rollback**: `om migrate rollback <id>` restores previous index schema when available

### Example

```python
# Before: Simple field
class User(HashModel, index=True):
    name: str = Field(index=True)

# After: Add sortable option
class User(HashModel, index=True):
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

Redis OM includes a built-in migration for datetime field indexing improvements. This migration converts datetime storage from ISO strings to Unix timestamps, enabling range queries and sorting.

For detailed information about this migration, see the **[0.x to 1.0 Migration Guide](migration_guide_0x_to_1x.md#datetime-migration-details)**.

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
class User(HashModel, index=True):
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

## Performance and Troubleshooting

### Performance Tips

For large datasets:
```bash
# Use smaller batch sizes
om migrate-data run --batch-size 500

# Monitor progress
om migrate-data run --verbose

# Handle errors gracefully
om migrate-data run --failure-mode log_and_skip --max-errors 100
```

### Common Issues

**Schema Migration Issues**:
- **Index already exists**: Usually safe to ignore
- **Index does not exist**: Check if indices were manually deleted
- **Database > 0**: RediSearch only works in database 0

**Data Migration Issues**:
- **High error rates**: Use `--failure-mode log_and_skip`
- **Out of memory**: Reduce `--batch-size`
- **Migration stuck**: Check `om migrate-data progress`

### Getting Help

```bash
# Check status and errors
om migrate-data status --detailed
om migrate-data verify --check-data

# Test changes safely
om migrate-data run --dry-run --verbose
```

For complex migration scenarios, ensure your Redis instance has sufficient memory and is properly configured for RediSearch operations.
