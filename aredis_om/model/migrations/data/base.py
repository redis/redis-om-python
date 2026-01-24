"""
Base classes and exceptions for data migrations.

This module contains the core base classes and exceptions used by the data
migration system in Redis OM Python.
"""

import abc
import time
from typing import Any, Dict, List

try:
    import psutil
except ImportError:
    psutil = None

from ....connections import get_redis_connection


class DataMigrationError(Exception):
    """Exception raised when data migration operations fail."""

    pass


class PerformanceMonitor:
    """Monitor migration performance and resource usage."""

    def __init__(self):
        self.start_time = None
        self.end_time = None
        self.start_memory = None
        self.peak_memory = None
        self.processed_items = 0
        self.batch_times = []

    def start(self):
        """Start performance monitoring."""
        self.start_time = time.time()
        if psutil:
            try:
                process = psutil.Process()
                self.start_memory = process.memory_info().rss / 1024 / 1024  # MB
                self.peak_memory = self.start_memory
            except (psutil.NoSuchProcess, Exception):
                self.start_memory = None
                self.peak_memory = None
        else:
            self.start_memory = None
            self.peak_memory = None

    def update_progress(self, items_processed: int):
        """Update progress and check memory usage."""
        self.processed_items = items_processed
        if psutil:
            try:
                process = psutil.Process()
                current_memory = process.memory_info().rss / 1024 / 1024  # MB
                if self.peak_memory is None or current_memory > self.peak_memory:
                    self.peak_memory = current_memory
            except (psutil.NoSuchProcess, Exception):
                pass

    def record_batch_time(self, batch_time: float):
        """Record time taken for a batch."""
        self.batch_times.append(batch_time)

    def finish(self):
        """Finish monitoring and calculate final stats."""
        self.end_time = time.time()

    def get_stats(self) -> Dict[str, Any]:
        """Get performance statistics."""
        if self.start_time is None:
            return {}

        total_time = (self.end_time or time.time()) - self.start_time
        avg_batch_time = (
            sum(self.batch_times) / len(self.batch_times) if self.batch_times else 0
        )

        stats = {
            "total_time_seconds": total_time,
            "processed_items": self.processed_items,
            "items_per_second": (
                self.processed_items / total_time if total_time > 0 else 0
            ),
            "average_batch_time": avg_batch_time,
            "total_batches": len(self.batch_times),
        }

        if self.start_memory is not None:
            stats.update(
                {
                    "start_memory_mb": self.start_memory,
                    "peak_memory_mb": self.peak_memory,
                    "memory_increase_mb": (self.peak_memory or 0) - self.start_memory,
                }
            )

        return stats


class BaseMigration(abc.ABC):
    """
    Base class for all data migrations.

    Each migration must implement the `up` method to apply the migration.
    Optionally implement `down` for rollback support and `can_run` for validation.
    """

    migration_id: str = ""
    description: str = ""
    dependencies: List[str] = []

    def __init__(self, redis_client=None):
        self.redis = redis_client or get_redis_connection()
        if not self.migration_id:
            raise DataMigrationError(
                f"Migration {self.__class__.__name__} must define migration_id"
            )

    @abc.abstractmethod
    async def up(self) -> None:
        """Apply the migration. Must be implemented by subclasses."""
        pass

    async def down(self) -> None:
        """
        Reverse the migration (optional).

        If not implemented, rollback will not be available for this migration.
        """
        raise NotImplementedError(
            f"Migration {self.migration_id} does not support rollback"
        )

    async def can_run(self) -> bool:
        """
        Check if the migration can run (optional validation).

        Returns:
            bool: True if migration can run, False otherwise
        """
        return True
