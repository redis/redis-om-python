# Migration Performance Tuning Guide

This guide provides recommendations for optimizing Redis OM Python datetime migration performance for different scenarios and dataset sizes.

## Performance Overview

The datetime migration system includes several performance optimizations:

- **Batch processing**: Processes keys in configurable batches
- **Progress tracking**: Saves state periodically for resume capability
- **Memory management**: Optimizes memory usage for large datasets
- **Error handling**: Continues processing despite individual failures
- **Parallel processing**: Efficient Redis operations

## Dataset Size Categories

### Small Datasets (< 1,000 keys)
- **Batch size**: 1000 (default)
- **Expected time**: < 1 minute
- **Memory usage**: Minimal
- **Recommendations**: Use default settings

```bash
om migrate-data run
```

### Medium Datasets (1,000 - 100,000 keys)
- **Batch size**: 500-1000
- **Expected time**: 1-10 minutes
- **Memory usage**: Low-moderate
- **Recommendations**: Monitor progress, consider verbose output

```bash
om migrate-data run --batch-size 1000 --verbose
```

### Large Datasets (100,000 - 1,000,000 keys)
- **Batch size**: 200-500
- **Expected time**: 10-60 minutes
- **Memory usage**: Moderate
- **Recommendations**: Use smaller batches, monitor resources

```bash
om migrate-data run --batch-size 500 --verbose --max-errors 1000
```

### Very Large Datasets (> 1,000,000 keys)
- **Batch size**: 100-200
- **Expected time**: 1+ hours
- **Memory usage**: High
- **Recommendations**: Optimize Redis, use maintenance window

```bash
om migrate-data run --batch-size 200 --verbose --max-errors 5000
```

## Batch Size Optimization

### Determining Optimal Batch Size

1. **Start with dataset size estimate:**
   ```bash
   om migrate-data stats
   ```

2. **Test with small batch:**
   ```bash
   om migrate-data run --batch-size 100 --dry-run
   ```

3. **Monitor performance:**
   ```bash
   # Run with monitoring
   om migrate-data run --batch-size 500 --verbose
   ```

### Batch Size Guidelines

| Dataset Size | Recommended Batch Size | Rationale |
|--------------|----------------------|-----------|
| < 1K keys    | 1000 (default)      | Minimal overhead |
| 1K - 10K     | 500-1000            | Balance speed/memory |
| 10K - 100K   | 200-500             | Prevent memory spikes |
| 100K - 1M    | 100-200             | Conservative memory use |
| > 1M         | 50-100              | Maximum stability |

### Dynamic Batch Size Adjustment

```bash
# Start conservative for large datasets
om migrate-data run --batch-size 100

# If performance is good, restart with larger batches
om migrate-data clear-progress
om migrate-data run --batch-size 500
```

## Redis Performance Optimization

### Redis Configuration Tuning

#### Memory Settings
```bash
# Increase Redis memory limit
redis-cli CONFIG SET maxmemory 4gb

# Use appropriate eviction policy
redis-cli CONFIG SET maxmemory-policy allkeys-lru
```

#### Persistence Settings (Temporary)
```bash
# Disable persistence during migration (if data loss is acceptable)
redis-cli CONFIG SET save ""
redis-cli CONFIG SET appendonly no

# Re-enable after migration
redis-cli CONFIG SET save "900 1 300 10 60 10000"
redis-cli CONFIG SET appendonly yes
```

#### Connection Settings
```bash
# Increase timeout for large operations
redis-cli CONFIG SET timeout 300

# Increase client output buffer
redis-cli CONFIG SET client-output-buffer-limit "normal 256mb 128mb 60"
```

### Redis Monitoring During Migration

```bash
# Monitor Redis performance
redis-cli INFO stats | grep -E "(instantaneous_ops_per_sec|used_memory_human)"

# Watch for slow operations
redis-cli CONFIG SET slowlog-log-slower-than 10000
redis-cli SLOWLOG GET 10

# Monitor memory usage
watch -n 5 'redis-cli INFO memory | grep used_memory_human'
```

## System Resource Optimization

### Memory Management

#### Monitor System Memory
```bash
# Watch memory usage
watch -n 5 'free -h'

# Check for memory pressure
dmesg | grep -i "killed process"
```

#### Optimize Memory Usage
```bash
# Use smaller batches for memory-constrained systems
om migrate-data run --batch-size 50

# Clear system caches if needed (Linux)
sudo sync && sudo sysctl vm.drop_caches=3
```

### CPU Optimization

#### Monitor CPU Usage
```bash
# Watch CPU usage during migration
top -p $(pgrep -f "om migrate-data")

# Check for CPU bottlenecks
iostat -x 1
```

#### CPU Optimization Tips
- Run migration during low-traffic periods
- Consider CPU affinity for Redis process
- Monitor for context switching overhead

### Disk I/O Optimization

#### Monitor Disk Usage
```bash
# Watch disk I/O
iostat -x 1

# Check Redis disk usage
du -sh /var/lib/redis/
```

#### I/O Optimization
- Use SSD storage for Redis
- Ensure sufficient disk space (2x current data size)
- Monitor disk queue depth

## Network Optimization

### Redis Connection Tuning

```python
# In your Redis OM configuration
REDIS_OM_URL = "redis://localhost:6379/0?socket_keepalive=true&socket_keepalive_options=1,3,5"
```

### Connection Pool Settings
```python
# Optimize connection pooling
import redis
pool = redis.ConnectionPool(
    host='localhost',
    port=6379,
    max_connections=20,
    socket_keepalive=True,
    socket_keepalive_options={1: 1, 2: 3, 3: 5}
)
```

## Error Handling Performance

### Error Mode Impact

| Failure Mode | Performance Impact | Use Case |
|--------------|-------------------|----------|
| `fail` | Fastest (stops on error) | Clean data, testing |
| `skip` | Fast (minimal logging) | Known data issues |
| `log_and_skip` | Moderate (logs errors) | Production (recommended) |
| `default` | Slower (processes all) | Data recovery scenarios |

### Error Threshold Tuning

```bash
# For high-quality data
om migrate-data run --max-errors 10

# For mixed-quality data
om migrate-data run --max-errors 1000 --failure-mode log_and_skip

# For data recovery
om migrate-data run --failure-mode default
```

## Progress Tracking Optimization

### Progress Save Frequency

The migration saves progress every 100 processed keys by default. For very large datasets, you might want to adjust this:

```python
# In custom migration code
migration = DatetimeFieldMigration(
    progress_save_interval=500  # Save every 500 keys instead of 100
)
```

### Resume Strategy

```bash
# Check progress before resuming
om migrate-data progress

# Resume with optimized settings
om migrate-data run --batch-size 200 --verbose
```

## Performance Monitoring

### Real-time Monitoring

```bash
# Monitor migration progress
watch -n 10 'om migrate-data progress'

# Monitor Redis performance
watch -n 5 'redis-cli INFO stats | grep instantaneous_ops_per_sec'

# Monitor system resources
watch -n 5 'free -h && echo "---" && iostat -x 1 1'
```

### Performance Metrics

Track these metrics during migration:

1. **Keys per second**: Target 100-1000 keys/sec
2. **Memory usage**: Should remain stable
3. **Error rate**: Should be < 1% for good data
4. **CPU usage**: Should be moderate (< 80%)
5. **Disk I/O**: Should not be saturated

## Troubleshooting Performance Issues

### Slow Migration Performance

#### Symptoms
- Low keys/second rate
- High CPU usage
- Long batch processing times

#### Solutions
```bash
# Reduce batch size
om migrate-data run --batch-size 100

# Check Redis performance
redis-cli INFO stats

# Optimize Redis configuration
redis-cli CONFIG SET tcp-keepalive 60
```

### Memory Issues

#### Symptoms
- Increasing memory usage
- Out of memory errors
- System swapping

#### Solutions
```bash
# Use smaller batches
om migrate-data run --batch-size 50

# Clear Redis memory
redis-cli MEMORY PURGE

# Restart migration with conservative settings
om migrate-data run --batch-size 25
```

### High Error Rates

#### Symptoms
- Many conversion failures
- Low success rate
- Slow progress due to error handling

#### Solutions
```bash
# Use faster error mode for known issues
om migrate-data run --failure-mode skip --max-errors 10000

# Pre-clean data if possible
# Then re-run with stricter settings
```

## Production Deployment Optimization

### Pre-Migration Optimization

1. **Scale Redis resources** before migration
2. **Optimize Redis configuration** for bulk operations
3. **Schedule during low-traffic periods**
4. **Prepare monitoring dashboards**

### During Migration

1. **Monitor key metrics** continuously
2. **Be prepared to adjust batch sizes**
3. **Watch for resource exhaustion**
4. **Have rollback plan ready**

### Post-Migration

1. **Restore normal Redis configuration**
2. **Re-enable persistence settings**
3. **Monitor application performance**
4. **Clean up migration artifacts**

## Benchmarking

### Performance Testing

```bash
# Test with small dataset first
om migrate-data run --batch-size 1000 --dry-run

# Measure actual performance
time om migrate-data run --batch-size 500

# Compare different batch sizes
for size in 100 200 500 1000; do
  echo "Testing batch size: $size"
  time om migrate-data run --batch-size $size --dry-run
done
```

### Expected Performance

| Dataset Size | Batch Size | Expected Time | Keys/Second |
|--------------|------------|---------------|-------------|
| 1K keys      | 1000       | 10 seconds    | 100         |
| 10K keys     | 500        | 2 minutes     | 83          |
| 100K keys    | 200        | 20 minutes    | 83          |
| 1M keys      | 100        | 3 hours       | 93          |

*Performance varies based on hardware, Redis configuration, and data complexity.*
