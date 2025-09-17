# Redis OM Python Migration Guide

This guide covers the enhanced migration system introduced in Redis OM Python 1.0, specifically for the datetime field migration that converts datetime storage from ISO strings to Unix timestamps.

## Overview

The datetime field migration is a **breaking change** that improves datetime field functionality by:

- Converting datetime storage from ISO strings to Unix timestamps
- Enabling proper NUMERIC indexing for datetime fields
- Supporting range queries and sorting on datetime fields
- Providing comprehensive error handling and recovery

## Prerequisites

Before running the migration:

1. **Backup your Redis data**
   ```bash
   redis-cli BGSAVE
   # Or create a full backup of your Redis instance
   ```

2. **Test in staging environment**
   - Run the migration on a copy of your production data
   - Verify application functionality after migration
   - Test rollback procedures if needed

3. **Check migration requirements**
   ```bash
   om migrate-data stats
   ```

## Migration Commands

### Check Migration Status
```bash
# Basic status
om migrate-data status

# Detailed status with migration information
om migrate-data status --detailed

# Check for saved progress from interrupted migrations
om migrate-data progress
```

### Run Migration
```bash
# Basic migration run
om migrate-data run

# Run with enhanced error handling options
om migrate-data run \
  --failure-mode log_and_skip \
  --batch-size 1000 \
  --max-errors 100 \
  --verbose

# Dry run to see what would be done
om migrate-data run --dry-run
```

### Verify Migration
```bash
# Verify migration status
om migrate-data verify

# Verify with data integrity checks
om migrate-data verify --check-data

# Get migration statistics
om migrate-data stats
```

## Migration Options

### Failure Modes

- **`skip`**: Skip failed conversions silently
- **`fail`**: Stop migration on first error (default for critical environments)
- **`default`**: Use default timestamp (0.0) for failed conversions
- **`log_and_skip`**: Log errors but continue migration (recommended)

### Batch Processing

- **`--batch-size`**: Number of keys to process in each batch (default: 1000)
- **`--max-errors`**: Maximum errors before stopping migration
- **`--verbose`**: Enable detailed progress reporting

## Step-by-Step Migration Process

### 1. Pre-Migration Assessment
```bash
# Check what will be migrated
om migrate-data stats

# Verify current status
om migrate-data status --detailed
```

### 2. Schema Migration
```bash
# Update Redis indices for datetime fields
om migrate run
```

### 3. Data Migration
```bash
# Run the datetime field conversion
om migrate-data run --verbose
```

### 4. Verification
```bash
# Verify migration completed successfully
om migrate-data verify --check-data
```

### 5. Application Testing
- Test your application with the migrated data
- Verify datetime queries work correctly
- Check that sorting and range queries function as expected

## Resume Capability

The migration system supports automatic resume for interrupted migrations:

### Check for Interrupted Migrations
```bash
om migrate-data progress
```

### Resume Migration
```bash
# Simply run the migration again - it will resume automatically
om migrate-data run
```

### Clear Saved Progress
```bash
# If you want to start fresh
om migrate-data clear-progress
```

## Performance Considerations

### Large Datasets

For datasets with >10,000 keys:

```bash
# Use smaller batch sizes to reduce memory usage
om migrate-data run --batch-size 500

# Monitor progress with verbose output
om migrate-data run --batch-size 500 --verbose

# Set error thresholds for large datasets
om migrate-data run --max-errors 1000 --failure-mode log_and_skip
```

### Memory Management

- Batch processing automatically manages memory usage
- Progress is saved periodically to enable resume
- Monitor Redis memory usage during migration

### Time Estimates

Use the stats command to get time estimates:
```bash
om migrate-data stats
# Shows estimated migration time based on dataset size
```

## Rollback Procedures

### Automatic Rollback
```bash
# Rollback the datetime migration
om migrate-data rollback 001_datetime_fields_to_timestamps
```

### Manual Rollback
If automatic rollback fails:

1. **Restore from backup**
   ```bash
   # Stop your application
   # Restore Redis from backup
   redis-cli FLUSHALL
   redis-cli --rdb /path/to/backup.rdb
   ```

2. **Downgrade Redis OM**
   ```bash
   pip install redis-om-python==0.x.x  # Previous version
   ```

## Troubleshooting

### Common Issues

1. **Migration fails with connection errors**
   - Check Redis connectivity
   - Verify Redis has sufficient memory
   - Check for Redis timeouts

2. **High error rates during conversion**
   - Review error logs for patterns
   - Consider using `--failure-mode default` for corrupted data
   - Check for non-standard datetime formats

3. **Migration appears stuck**
   - Check progress with `om migrate-data progress`
   - Monitor Redis memory and CPU usage
   - Consider reducing batch size

### Getting Help

1. **Enable verbose logging**
   ```bash
   om migrate-data run --verbose
   ```

2. **Check detailed status**
   ```bash
   om migrate-data status --detailed
   om migrate-data verify --check-data --verbose
   ```

3. **Review migration statistics**
   ```bash
   om migrate-data stats --verbose
   ```

## Production Deployment Checklist

- [ ] Full Redis backup created
- [ ] Migration tested in staging environment
- [ ] Application tested with migrated data
- [ ] Rollback procedures tested
- [ ] Monitoring in place for migration progress
- [ ] Maintenance window scheduled
- [ ] Team notified of migration timeline
- [ ] Error handling strategy defined
- [ ] Post-migration verification plan ready

## Best Practices

1. **Always backup before migration**
2. **Test in staging first**
3. **Use appropriate failure modes for your data quality**
4. **Monitor progress during migration**
5. **Verify data integrity after migration**
6. **Keep migration logs for troubleshooting**
7. **Plan for rollback if needed**

## Next Steps

After successful migration:

1. **Update application code** to use new datetime query capabilities
2. **Remove old datetime handling code** if any
3. **Update documentation** to reflect new datetime behavior
4. **Monitor application performance** with new indexing
