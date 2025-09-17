# Migration Troubleshooting Guide

This guide helps diagnose and resolve common issues with Redis OM Python datetime field migrations.

## Quick Diagnosis

### Check Migration Status
```bash
# Get overall status
om migrate-data status --detailed

# Check for errors
om migrate-data verify --check-data

# View progress of interrupted migrations
om migrate-data progress

# Get performance statistics
om migrate-data stats
```

## Common Issues and Solutions

### 1. Migration Fails to Start

#### Symptoms
- Migration command exits immediately
- "No migrations found" message
- Connection errors

#### Diagnosis
```bash
# Check Redis connection
redis-cli ping

# Verify migration discovery
om migrate-data status --verbose

# Check Redis OM installation
python -c "import aredis_om; print(aredis_om.__version__)"
```

#### Solutions
- **Redis not running**: Start Redis server
- **Connection issues**: Check Redis host/port configuration
- **Missing migrations**: Ensure you're using Redis OM 1.0+
- **Import errors**: Reinstall Redis OM Python

### 2. High Error Rates During Migration

#### Symptoms
- Many "Failed to convert" warnings
- Low success rate in migration stats
- Data integrity check failures

#### Diagnosis
```bash
# Check error details
om migrate-data run --verbose --dry-run

# Examine specific errors
om migrate-data verify --check-data --verbose

# Sample problematic data
redis-cli HGETALL "your_model:some_key"
```

#### Solutions

**For corrupted datetime data:**
```bash
# Use default values for invalid data
om migrate-data run --failure-mode default
```

**For non-standard formats:**
```bash
# Skip invalid data and continue
om migrate-data run --failure-mode log_and_skip --max-errors 1000
```

**For mixed data quality:**
```bash
# Log errors but continue, with error threshold
om migrate-data run --failure-mode log_and_skip --max-errors 100
```

### 3. Migration Runs Out of Memory

#### Symptoms
- Redis memory usage spikes
- Migration process killed
- "Out of memory" errors

#### Diagnosis
```bash
# Check Redis memory usage
redis-cli INFO memory

# Check system memory
free -h

# Review batch size
om migrate-data stats
```

#### Solutions

**Reduce batch size:**
```bash
om migrate-data run --batch-size 100
```

**Increase Redis memory:**
```bash
# In redis.conf
maxmemory 2gb
maxmemory-policy allkeys-lru
```

**Use smaller progress save intervals:**
```bash
# This is handled automatically, but you can restart if needed
om migrate-data run  # Will resume from last saved progress
```

### 4. Migration Appears Stuck

#### Symptoms
- No progress updates for extended time
- High CPU usage but no progress
- Migration doesn't complete

#### Diagnosis
```bash
# Check current progress
om migrate-data progress

# Monitor Redis operations
redis-cli MONITOR

# Check for large keys
redis-cli --bigkeys
```

#### Solutions

**For large individual keys:**
```bash
# Reduce batch size
om migrate-data run --batch-size 50
```

**For stuck migration:**
```bash
# Clear progress and restart
om migrate-data clear-progress --yes
om migrate-data run --batch-size 500
```

**For Redis performance issues:**
```bash
# Check Redis slow log
redis-cli SLOWLOG GET 10
```

### 5. Data Integrity Issues After Migration

#### Symptoms
- Verification reports issues
- Application errors with datetime fields
- Incorrect timestamp values

#### Diagnosis
```bash
# Run comprehensive verification
om migrate-data verify --check-data --verbose

# Check specific model data
redis-cli HGETALL "your_model:key"
redis-cli JSON.GET "your_model:key"

# Test datetime queries in your application
```

#### Solutions

**For timestamp validation errors:**
```bash
# Re-run migration with stricter error handling
om migrate-data run --failure-mode fail
```

**For application compatibility:**
- Check that your application expects timestamp format
- Update application code to handle numeric datetime fields
- Verify timezone handling in your application

### 6. Rollback Issues

#### Symptoms
- Rollback command fails
- Data not restored to original format
- Application still broken after rollback

#### Diagnosis
```bash
# Check rollback support
om migrate-data status --detailed

# Verify rollback execution
om migrate-data rollback 001_datetime_fields_to_timestamps --dry-run
```

#### Solutions

**If rollback is not supported:**
```bash
# Restore from backup
redis-cli FLUSHALL
# Restore your backup file
redis-cli --rdb /path/to/backup.rdb
```

**If rollback partially fails:**
```bash
# Manual data restoration may be needed
# Contact support with specific error details
```

## Performance Troubleshooting

### Slow Migration Performance

#### Diagnosis
```bash
# Check migration statistics
om migrate-data stats

# Monitor Redis performance
redis-cli INFO stats

# Check system resources
top
iostat 1
```

#### Optimization

**Tune batch size:**
```bash
# For fast systems with lots of memory
om migrate-data run --batch-size 2000

# For slower systems or limited memory
om migrate-data run --batch-size 200
```

**Redis optimization:**
```bash
# Disable Redis persistence during migration (if acceptable)
redis-cli CONFIG SET save ""
redis-cli CONFIG SET appendonly no

# Re-enable after migration
redis-cli CONFIG SET save "900 1 300 10 60 10000"
redis-cli CONFIG SET appendonly yes
```

### Memory Usage Optimization

#### Monitor memory usage:
```bash
# Redis memory
redis-cli INFO memory | grep used_memory_human

# System memory
watch -n 1 'free -h'
```

#### Optimize memory usage:
```bash
# Use smaller batches
om migrate-data run --batch-size 100

# Clear Redis memory if safe
redis-cli MEMORY PURGE
```

## Error Code Reference

### Migration Error Codes

- **DataMigrationError**: General migration failure
- **ConnectionError**: Redis connection issues
- **TimeoutError**: Redis operation timeout
- **ValidationError**: Data validation failure

### Common Error Messages

**"Migration stopped: exceeded maximum error threshold"**
- Increase `--max-errors` or fix data quality issues

**"Failed to convert datetime field"**
- Use `--failure-mode log_and_skip` or fix data format

**"Redis connection failed"**
- Check Redis server status and connection settings

**"Migration not found"**
- Ensure Redis OM 1.0+ is installed and migrations are discovered

## Advanced Debugging

### Enable Debug Logging
```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

### Manual Data Inspection
```bash
# Check raw data format
redis-cli HGETALL "your_model:key"

# Check JSON data
redis-cli JSON.GET "your_model:key"

# Check index information
redis-cli FT.INFO "your_model_index"
```

### Custom Migration Testing
```python
from aredis_om.model.migrations.datetime_migration import DatetimeFieldMigration

# Test conversion on specific values
migration = DatetimeFieldMigration()
result, success = migration._safe_convert_datetime_value(
    "test_key", "test_field", "2023-01-01T12:00:00"
)
print(f"Result: {result}, Success: {success}")
```

## Getting Support

### Information to Collect

1. **Migration status:**
   ```bash
   om migrate-data status --detailed --verbose
   ```

2. **Error logs:**
   ```bash
   om migrate-data run --verbose 2>&1 | tee migration.log
   ```

3. **System information:**
   ```bash
   redis-cli INFO server
   python --version
   pip show redis-om-python
   ```

4. **Data samples:**
   ```bash
   # Sample of problematic data (anonymized)
   redis-cli --scan --pattern "your_model:*" | head -5
   ```

### Support Channels

- GitHub Issues: Include logs and system information
- Documentation: Check latest migration guides
- Community: Redis OM Python discussions

## Prevention

### Best Practices for Future Migrations

1. **Regular backups** before any migration
2. **Staging environment testing** for all migrations
3. **Data quality monitoring** to catch issues early
4. **Migration testing** with representative data
5. **Rollback planning** for all breaking changes
6. **Performance monitoring** during migrations
7. **Documentation updates** after successful migrations
