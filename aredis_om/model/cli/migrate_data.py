"""
Async CLI for Redis OM data migrations.

This module provides command-line interface for managing data migrations
in Redis OM Python applications.
"""

import asyncio
from typing import Optional

import click
from redis.exceptions import ConnectionError as RedisConnectionError
from redis.exceptions import TimeoutError as RedisTimeoutError

from ..migrations.data import DataMigrationError, DataMigrator
from ..migrations.data.builtin.datetime_migration import ConversionFailureMode


def run_async(coro):
    """Run an async coroutine in an isolated event loop to avoid interfering with pytest loops."""
    import concurrent.futures

    with concurrent.futures.ThreadPoolExecutor() as executor:
        future = executor.submit(asyncio.run, coro)
        return future.result()


def handle_redis_errors(func):
    """Decorator to handle Redis connection and timeout errors with user-friendly messages."""
    import functools

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except RedisConnectionError as e:
            click.echo("Error: Could not connect to Redis.", err=True)
            click.echo("Please ensure Redis is running and accessible.", err=True)
            if "localhost:6379" in str(e):
                click.echo("Trying to connect to: localhost:6379 (default)", err=True)
            click.echo(
                f"Connection details: {str(e).split('connecting to')[-1].strip() if 'connecting to' in str(e) else 'N/A'}",
                err=True,
            )
            raise SystemExit(1)
        except RedisTimeoutError:
            click.echo("Error: Redis connection timed out.", err=True)
            click.echo(
                "Please check your Redis server status and network connectivity.",
                err=True,
            )
            raise SystemExit(1)
        except Exception as e:
            # Re-raise other exceptions unchanged
            raise e

    return wrapper


@click.group()
def migrate_data():
    """Manage data migrations for Redis OM models."""
    pass


@migrate_data.command()
@click.option(
    "--migrations-dir",
    help="Directory containing migration files (default: <root>/data-migrations)",
)
@click.option("--module", help="Python module containing migrations")
@click.option("--detailed", is_flag=True, help="Show detailed migration information")
@click.option("--verbose", "-v", is_flag=True, help="Enable verbose output")
@handle_redis_errors
def status(migrations_dir: str, module: str, detailed: bool, verbose: bool):
    """Show current migration status."""
    # Default directory to <root>/data-migrations when not provided
    from ...settings import get_root_migrations_dir

    resolved_dir = migrations_dir or (
        __import__("os").path.join(get_root_migrations_dir(), "data-migrations")
    )
    migrator = DataMigrator(
        migrations_dir=resolved_dir if not module else None,
        migration_module=module,
    )

    status_info = run_async(migrator.status())

    click.echo("Migration Status:")
    click.echo(f"  Total migrations: {status_info['total_migrations']}")
    click.echo(f"  Applied: {status_info['applied_count']}")
    click.echo(f"  Pending: {status_info['pending_count']}")

    if status_info["pending_migrations"]:
        click.echo("\n⚠️  Pending migrations:")
        for migration_id in status_info["pending_migrations"]:
            click.echo(f"- {migration_id}")

    if status_info["applied_migrations"]:
        click.echo("\n✅ Applied migrations:")
        for migration_id in status_info["applied_migrations"]:
            click.echo(f"  ✓ {migration_id}")

    # Show detailed information if requested
    if detailed:
        click.echo("\nDetailed Migration Information:")

        # Get all discovered migrations for detailed info
        all_migrations = run_async(migrator.discover_migrations())

        for migration_id, migration in all_migrations.items():
            is_applied = migration_id in status_info["applied_migrations"]
            status_icon = "✓" if is_applied else "○"
            status_text = "Applied" if is_applied else "Pending"

            click.echo(f"\n  {status_icon} {migration_id} ({status_text})")
            click.echo(f"    Description: {migration.description}")

            if hasattr(migration, "dependencies") and migration.dependencies:
                click.echo(f"    Dependencies: {', '.join(migration.dependencies)}")
            else:
                click.echo("    Dependencies: None")

            # Check if migration can run
            try:
                can_run = run_async(migration.can_run())
                can_run_text = "Yes" if can_run else "No"
                click.echo(f"    Can run: {can_run_text}")
            except Exception as e:
                click.echo(f"    Can run: Error checking ({e})")

            # Show rollback support
            try:
                # Try to call down() in dry-run mode to see if it's supported
                supports_rollback = hasattr(migration, "down") and callable(
                    migration.down
                )
                rollback_text = "Yes" if supports_rollback else "No"
                click.echo(f"    Supports rollback: {rollback_text}")
            except Exception:
                click.echo("    Supports rollback: Unknown")

    if verbose:
        click.echo(f"\nRaw status data: {status_info}")


@migrate_data.command()
@click.option(
    "--migrations-dir",
    help="Directory containing migration files (default: <root>/data-migrations)",
)
@click.option("--module", help="Python module containing migrations")
@click.option(
    "--dry-run", is_flag=True, help="Show what would be done without applying changes"
)
@click.option("--verbose", "-v", is_flag=True, help="Enable verbose output")
@click.option("--limit", type=int, help="Limit number of migrations to run")
@click.option("--yes", "-y", is_flag=True, help="Skip confirmation prompt")
@click.option(
    "--failure-mode",
    type=click.Choice(["skip", "fail", "default", "log_and_skip"]),
    default="log_and_skip",
    help="How to handle conversion failures (default: log_and_skip)",
)
@click.option(
    "--batch-size",
    type=int,
    default=1000,
    help="Batch size for processing (default: 1000)",
)
@click.option("--max-errors", type=int, help="Maximum errors before stopping migration")
@handle_redis_errors
def run(
    migrations_dir: str,
    module: str,
    dry_run: bool,
    verbose: bool,
    limit: int,
    yes: bool,
    failure_mode: str,
    batch_size: int,
    max_errors: int,
):
    """Run pending migrations."""
    import os

    from ...settings import get_root_migrations_dir

    resolved_dir = migrations_dir or os.path.join(
        get_root_migrations_dir(), "data-migrations"
    )

    # Offer to create directory if needed
    if not module and not os.path.exists(resolved_dir):
        if yes or click.confirm(
            f"Create data migrations directory at '{resolved_dir}'?"
        ):
            os.makedirs(resolved_dir, exist_ok=True)
        else:
            click.echo("Aborted.")
            return

    migrator = DataMigrator(
        migrations_dir=resolved_dir if not module else None,
        migration_module=module,
    )

    # Get pending migrations for confirmation
    pending = run_async(migrator.get_pending_migrations())

    if not pending:
        if verbose:
            click.echo("No pending migrations found.")
        return

    count_to_run = len(pending)
    if limit:
        count_to_run = min(count_to_run, limit)
        pending = pending[:limit]

    if dry_run:
        click.echo(f"Would run {count_to_run} migration(s):")
        for migration in pending:
            click.echo(f"- {migration.migration_id}: {migration.description}")
        return

    # Confirm unless --yes is specified
    if not yes:
        migration_list = "\n".join(f"- {m.migration_id}" for m in pending)
        if not click.confirm(f"Run {count_to_run} migration(s)?\n{migration_list}"):
            click.echo("Aborted.")
            return

    # Run migrations
    count = run_async(
        migrator.run_migrations(dry_run=False, limit=limit, verbose=verbose)
    )

    if verbose:
        click.echo(f"Successfully applied {count} migration(s).")


@migrate_data.command()
@click.argument("name")
@click.option(
    "--migrations-dir",
    help="Directory to create migration in (default: <root>/data-migrations)",
)
@click.option(
    "--yes", "-y", is_flag=True, help="Skip confirmation prompt to create directory"
)
@handle_redis_errors
def create(name: str, migrations_dir: Optional[str], yes: bool):
    """Create a new migration file."""
    import os

    from ...settings import get_root_migrations_dir

    resolved_dir = migrations_dir or os.path.join(
        get_root_migrations_dir(), "data-migrations"
    )

    if not os.path.exists(resolved_dir):
        if yes or click.confirm(
            f"Create data migrations directory at '{resolved_dir}'?"
        ):
            os.makedirs(resolved_dir, exist_ok=True)
        else:
            click.echo("Aborted.")
            raise click.Abort()

    migrator = DataMigrator(migrations_dir=resolved_dir)
    filepath = run_async(migrator.create_migration_file(name, resolved_dir))
    click.echo(f"Created migration: {filepath}")


@migrate_data.command()
@click.argument("migration_id")
@click.option(
    "--migrations-dir",
    default="migrations",
    help="Directory containing migration files (default: migrations)",
)
@click.option("--module", help="Python module containing migrations")
@click.option(
    "--dry-run", is_flag=True, help="Show what would be done without applying changes"
)
@click.option("--verbose", "-v", is_flag=True, help="Enable verbose output")
@click.option("--yes", "-y", is_flag=True, help="Skip confirmation prompt")
@handle_redis_errors
def rollback(
    migration_id: str,
    migrations_dir: str,
    module: str,
    dry_run: bool,
    verbose: bool,
    yes: bool,
):
    """Rollback a specific migration."""
    migrator = DataMigrator(
        migrations_dir=migrations_dir if not module else None,
        migration_module=module,
    )

    # Check if migration exists and is applied
    all_migrations = run_async(migrator.discover_migrations())
    applied_migrations = run_async(migrator.get_applied_migrations())

    if migration_id not in all_migrations:
        click.echo(f"Migration '{migration_id}' not found.", err=True)
        raise click.Abort()

    if migration_id not in applied_migrations:
        click.echo(f"Migration '{migration_id}' is not applied.", err=True)
        return

    migration = all_migrations[migration_id]

    if dry_run:
        click.echo(f"Would rollback migration: {migration_id}")
        click.echo(f"Description: {migration.description}")
        return

    # Confirm unless --yes is specified
    if not yes:
        if not click.confirm(f"Rollback migration '{migration_id}'?"):
            click.echo("Aborted.")
            return

    # Attempt rollback
    success = run_async(
        migrator.rollback_migration(migration_id, dry_run=False, verbose=verbose)
    )

    if success:
        if verbose:
            click.echo(f"Successfully rolled back migration: {migration_id}")
    else:
        click.echo(f"Migration '{migration_id}' does not support rollback.", err=True)


@migrate_data.command()
@click.option(
    "--migrations-dir",
    help="Directory containing migration files (default: <root>/data-migrations)",
)
@click.option("--module", help="Python module containing migrations")
@click.option("--verbose", "-v", is_flag=True, help="Enable verbose output")
@click.option("--check-data", is_flag=True, help="Perform data integrity checks")
@handle_redis_errors
def verify(migrations_dir: str, module: str, verbose: bool, check_data: bool):
    """Verify migration status and optionally check data integrity."""
    import os

    from ...settings import get_root_migrations_dir

    resolved_dir = migrations_dir or os.path.join(
        get_root_migrations_dir(), "data-migrations"
    )
    migrator = DataMigrator(
        migrations_dir=resolved_dir if not module else None,
        migration_module=module,
    )

    # Get migration status
    status_info = run_async(migrator.status())

    click.echo("Migration Verification Report:")
    click.echo(f"  Total migrations: {status_info['total_migrations']}")
    click.echo(f"  Applied: {status_info['applied_count']}")
    click.echo(f"  Pending: {status_info['pending_count']}")

    if status_info["pending_migrations"]:
        click.echo("\n⚠️  Pending migrations found:")
        for migration_id in status_info["pending_migrations"]:
            click.echo(f"- {migration_id}")
        click.echo("\nRun 'om migrate-data run' to apply pending migrations.")
    else:
        click.echo("\n✅ All migrations are applied.")

    if status_info["applied_migrations"]:
        click.echo("\nApplied migrations:")
        for migration_id in status_info["applied_migrations"]:
            click.echo(f"✓ {migration_id}")

    # Perform data integrity checks if requested
    if check_data:
        click.echo("\nPerforming data integrity checks...")
        verification_result = run_async(migrator.verify_data_integrity(verbose=verbose))

        if verification_result["success"]:
            click.echo("✅ Data integrity checks passed.")
        else:
            click.echo("❌ Data integrity issues found:")
            for issue in verification_result.get("issues", []):
                click.echo(f"- {issue}")

    if verbose:
        click.echo(f"\nDetailed status: {status_info}")


@migrate_data.command()
@click.option(
    "--migrations-dir",
    help="Directory containing migration files (default: <root>/data-migrations)",
)
@click.option("--module", help="Python module containing migrations")
@click.option("--verbose", "-v", is_flag=True, help="Enable verbose output")
@handle_redis_errors
def progress(migrations_dir: str, module: str, verbose: bool):
    """Show progress of any running or interrupted migrations."""
    import os

    from ...settings import get_root_migrations_dir
    from ..migrations.data.builtin.datetime_migration import MigrationState

    resolved_dir = migrations_dir or os.path.join(
        get_root_migrations_dir(), "data-migrations"
    )
    migrator = DataMigrator(
        migrations_dir=resolved_dir if not module else None,
        migration_module=module,
    )

    # Check for saved progress
    click.echo("Checking for migration progress...")

    # Check the built-in datetime migration
    datetime_migration_id = "001_datetime_fields_to_timestamps"
    state = MigrationState(migrator.redis, datetime_migration_id)  # type: ignore

    has_progress = run_async(state.has_saved_progress())

    if has_progress:
        progress_data = run_async(state.load_progress())

        click.echo(f"\n📊 Found saved progress for migration: {datetime_migration_id}")
        click.echo(f"  Timestamp: {progress_data.get('timestamp', 'Unknown')}")
        click.echo(f"  Current model: {progress_data.get('current_model', 'Unknown')}")
        click.echo(f"  Processed keys: {len(progress_data.get('processed_keys', []))}")
        click.echo(f"  Total keys: {progress_data.get('total_keys', 'Unknown')}")

        if progress_data.get("stats"):
            stats = progress_data["stats"]
            click.echo(f"  Converted fields: {stats.get('converted_fields', 0)}")
            click.echo(f"  Failed conversions: {stats.get('failed_conversions', 0)}")
            click.echo(f"  Success rate: {stats.get('success_rate', 0):.1f}%")

        click.echo("\nTo resume the migration, run: om migrate-data run")
        click.echo("To clear saved progress, run: om migrate-data clear-progress")

    else:
        click.echo("✅ No saved migration progress found.")

    if verbose:
        click.echo(f"\nChecked migration: {datetime_migration_id}")


@migrate_data.command()
@click.option(
    "--migrations-dir",
    help="Directory containing migration files (default: <root>/data-migrations)",
)
@click.option("--module", help="Python module containing migrations")
@click.option("--yes", "-y", is_flag=True, help="Skip confirmation prompt")
@handle_redis_errors
def clear_progress(migrations_dir: str, module: str, yes: bool):
    """Clear saved migration progress."""
    import os

    from ...settings import get_root_migrations_dir
    from ..migrations.data.builtin.datetime_migration import MigrationState

    resolved_dir = migrations_dir or os.path.join(
        get_root_migrations_dir(), "data-migrations"
    )
    migrator = DataMigrator(
        migrations_dir=resolved_dir if not module else None,
        migration_module=module,
    )

    # Clear progress for datetime migration
    datetime_migration_id = "001_datetime_fields_to_timestamps"
    state = MigrationState(migrator.redis, datetime_migration_id)  # type: ignore

    has_progress = run_async(state.has_saved_progress())

    if not has_progress:
        click.echo("No saved migration progress found.")
        return

    if not yes:
        if not click.confirm("Clear saved migration progress? This cannot be undone."):
            click.echo("Aborted.")
            return

    run_async(state.clear_progress())
    click.echo("✅ Saved migration progress cleared.")


@migrate_data.command()
@click.option(
    "--migrations-dir",
    default="",
    help="Directory containing migration files (default: <root>/data-migrations)",
)
@click.option("--module", help="Python module containing migrations")
@handle_redis_errors
def check_schema(migrations_dir: str, module: str):
    """Check for datetime field schema mismatches between code and Redis."""
    import os

    from ...settings import get_root_migrations_dir
    from ..migrations.data.builtin.datetime_migration import DatetimeFieldDetector

    resolved_dir = migrations_dir or os.path.join(
        get_root_migrations_dir(), "data-migrations"
    )
    migrator = DataMigrator(
        migrations_dir=resolved_dir,
        migration_module=module,
    )

    async def check_schema_async():
        click.echo("🔍 Checking for datetime field schema mismatches...")

        from ...model.model import model_registry

        models = list(model_registry.values())
        detector = DatetimeFieldDetector(migrator.redis)
        result = await detector.check_for_schema_mismatches(models)

        if not result["has_mismatches"]:
            click.echo(
                "✅ No schema mismatches detected - all datetime fields are properly indexed"
            )
            return

        click.echo(
            f"⚠️  Found {len(result['mismatches'])} datetime field schema mismatch(es):"
        )
        click.echo()

        for mismatch in result["mismatches"]:
            click.echo(f"  Model: {mismatch['model']}")
            click.echo(f"  Field: {mismatch['field']}")
            click.echo(f"  Current Redis type: {mismatch['current_type']}")
            click.echo(f"  Expected type: {mismatch['expected_type']}")
            click.echo(f"  Index: {mismatch['index_name']}")
            click.echo()

        click.echo("🚨 CRITICAL ISSUE DETECTED:")
        click.echo(result["recommendation"])
        click.echo()
        click.echo("To fix this issue, run:")
        click.echo("  om migrate-data datetime")
        click.echo()
        click.echo(
            "This will convert your datetime fields from TAG to NUMERIC indexing,"
        )
        click.echo("enabling proper range queries and sorting.")

        raise click.ClickException("Schema mismatches detected")

    run_async(check_schema_async())


if __name__ == "__main__":
    migrate_data()
