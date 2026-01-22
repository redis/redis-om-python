import asyncio
import os
from typing import Optional

import click
from redis.exceptions import ConnectionError as RedisConnectionError
from redis.exceptions import TimeoutError as RedisTimeoutError

from ...settings import get_root_migrations_dir
from ..migrations.schema import SchemaMigrator


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
def migrate():
    """Manage schema migrations for Redis OM models."""
    pass


@migrate.command()
@click.option("--migrations-dir", help="Directory containing schema migration files")
@handle_redis_errors
def status(migrations_dir: Optional[str]):
    """Show current schema migration status from files."""
    dir_path = migrations_dir or os.path.join(
        get_root_migrations_dir(), "schema-migrations"
    )
    migrator = SchemaMigrator(migrations_dir=dir_path)
    status_info = run_async(migrator.status())

    click.echo("Schema Migration Status:")
    click.echo(f"  Total migrations: {status_info['total_migrations']}")
    click.echo(f"  Applied: {status_info['applied_count']}")
    click.echo(f"  Pending: {status_info['pending_count']}")

    if status_info["pending_migrations"]:
        click.echo("\nPending migrations:")
        for migration_id in status_info["pending_migrations"]:
            click.echo(f"- {migration_id}")

    if status_info["applied_migrations"]:
        click.echo("\nApplied migrations:")
        for migration_id in status_info["applied_migrations"]:
            click.echo(f"- {migration_id}")


@migrate.command()
@click.option("--migrations-dir", help="Directory containing schema migration files")
@click.option(
    "--dry-run", is_flag=True, help="Show what would be done without applying changes"
)
@click.option("--verbose", "-v", is_flag=True, help="Enable verbose output")
@click.option("--limit", type=int, help="Limit number of migrations to run")
@click.option(
    "--yes",
    "-y",
    is_flag=True,
    help="Skip confirmation prompt to create directory or run",
)
@handle_redis_errors
def run(
    migrations_dir: Optional[str],
    dry_run: bool,
    verbose: bool,
    limit: Optional[int],
    yes: bool,
):
    """Run pending schema migrations from files."""
    dir_path = migrations_dir or os.path.join(
        get_root_migrations_dir(), "schema-migrations"
    )

    if not os.path.exists(dir_path):
        if yes or click.confirm(f"Create schema migrations directory at '{dir_path}'?"):
            os.makedirs(dir_path, exist_ok=True)
        else:
            click.echo("Aborted.")
            return

    migrator = SchemaMigrator(migrations_dir=dir_path)

    # Show list for confirmation
    if not dry_run and not yes:
        status_info = run_async(migrator.status())
        if status_info["pending_migrations"]:
            listing = "\n".join(
                f"- {m}"
                for m in status_info["pending_migrations"][
                    : (limit or len(status_info["pending_migrations"]))
                ]
            )
            if not click.confirm(
                f"Run {min(limit or len(status_info['pending_migrations']), len(status_info['pending_migrations']))} migration(s)?\n{listing}"
            ):
                click.echo("Aborted.")
                return

    count = run_async(migrator.run(dry_run=dry_run, limit=limit, verbose=verbose))
    if verbose and not dry_run:
        click.echo(f"Successfully applied {count} migration(s).")


@migrate.command()
@click.argument("name")
@click.option("--migrations-dir", help="Directory to create migration in")
@click.option(
    "--yes", "-y", is_flag=True, help="Skip confirmation prompt to create directory"
)
@handle_redis_errors
def create(name: str, migrations_dir: Optional[str], yes: bool):
    """Create a new schema migration snapshot file from current pending operations."""
    dir_path = migrations_dir or os.path.join(
        get_root_migrations_dir(), "schema-migrations"
    )

    if not os.path.exists(dir_path):
        if yes or click.confirm(f"Create schema migrations directory at '{dir_path}'?"):
            os.makedirs(dir_path, exist_ok=True)
        else:
            click.echo("Aborted.")
            return

    migrator = SchemaMigrator(migrations_dir=dir_path)
    filepath = run_async(migrator.create_migration_file(name))
    if filepath:
        click.echo(f"Created migration: {filepath}")
    else:
        click.echo("No pending schema changes detected. Nothing to snapshot.")


@migrate.command()
@click.argument("migration_id")
@click.option("--migrations-dir", help="Directory containing schema migration files")
@click.option(
    "--dry-run", is_flag=True, help="Show what would be done without applying changes"
)
@click.option("--verbose", "-v", is_flag=True, help="Enable verbose output")
@click.option(
    "--yes",
    "-y",
    is_flag=True,
    help="Skip confirmation prompt to create directory or run",
)
@handle_redis_errors
def rollback(
    migration_id: str,
    migrations_dir: Optional[str],
    dry_run: bool,
    verbose: bool,
    yes: bool,
):
    """Rollback a specific schema migration by ID."""
    dir_path = migrations_dir or os.path.join(
        get_root_migrations_dir(), "schema-migrations"
    )

    if not os.path.exists(dir_path):
        if yes or click.confirm(f"Create schema migrations directory at '{dir_path}'?"):
            os.makedirs(dir_path, exist_ok=True)
        else:
            click.echo("Aborted.")
            return

    migrator = SchemaMigrator(migrations_dir=dir_path)

    if not yes and not dry_run:
        if not click.confirm(f"Rollback migration '{migration_id}'?"):
            click.echo("Aborted.")
            return

    success = run_async(
        migrator.rollback(migration_id, dry_run=dry_run, verbose=verbose)
    )
    if success:
        if verbose:
            click.echo(f"Successfully rolled back migration: {migration_id}")
    else:
        click.echo(
            f"Migration '{migration_id}' does not support rollback or is not applied.",
            err=True,
        )


@migrate.command()
@click.option("--migrations-dir", help="Directory containing schema migration files")
@click.option("--yes", "-y", is_flag=True, help="Skip confirmation prompt")
@handle_redis_errors
def reset(migrations_dir: Optional[str], yes: bool):
    """Reset migration history and optionally clear all applied migrations.

    This clears the migration tracking in Redis, allowing you to re-run all
    migrations from scratch. Useful for development when you want to start fresh.
    """
    dir_path = migrations_dir or os.path.join(
        get_root_migrations_dir(), "schema-migrations"
    )

    migrator = SchemaMigrator(migrations_dir=dir_path)

    async def _reset():
        status_info = await migrator.status()
        applied = status_info["applied_migrations"]

        if not applied:
            click.echo("No migrations have been applied. Nothing to reset.")
            return

        click.echo(f"This will clear {len(applied)} applied migration(s) from history:")
        for mid in applied:
            click.echo(f"- {mid}")

        if not yes:
            if not click.confirm("\nClear migration history?"):
                click.echo("Aborted.")
                return

        # Clear each applied migration from tracking
        for mid in applied:
            await migrator.mark_unapplied(mid)
            click.echo(f"Cleared: {mid}")

        click.echo(
            f"\n✅ Reset {len(applied)} migration(s). Run 'om migrate run' to re-apply."
        )

    run_async(_reset())


@migrate.command()
@click.option(
    "--steps",
    "-n",
    default=1,
    type=int,
    help="Number of migrations to rollback (default: 1)",
)
@click.option("--migrations-dir", help="Directory containing schema migration files")
@click.option(
    "--dry-run", is_flag=True, help="Show what would be done without applying changes"
)
@click.option("--verbose", "-v", is_flag=True, help="Enable verbose output")
@click.option("--yes", "-y", is_flag=True, help="Skip confirmation prompt")
@handle_redis_errors
def downgrade(
    steps: int,
    migrations_dir: Optional[str],
    dry_run: bool,
    verbose: bool,
    yes: bool,
):
    """Rollback the last N applied migrations.

    By default, rolls back the most recently applied migration.
    Use --steps/-n to rollback multiple migrations at once.
    """
    dir_path = migrations_dir or os.path.join(
        get_root_migrations_dir(), "schema-migrations"
    )

    if not os.path.exists(dir_path):
        click.echo(f"Migrations directory does not exist: {dir_path}", err=True)
        return

    migrator = SchemaMigrator(migrations_dir=dir_path)

    async def _downgrade():
        status_info = await migrator.status()
        applied = status_info["applied_migrations"]

        if not applied:
            click.echo("No migrations have been applied. Nothing to rollback.")
            return 0

        # Show what will be rolled back
        sorted_applied = sorted(applied, reverse=True)
        to_rollback = sorted_applied[:steps]

        click.echo(f"Will rollback {len(to_rollback)} migration(s):")
        for mid in to_rollback:
            click.echo(f"- {mid}")

        if not dry_run and not yes:
            if not click.confirm("\nProceed with rollback?"):
                click.echo("Aborted.")
                return 0

        count = await migrator.downgrade(steps=steps, dry_run=dry_run, verbose=verbose)

        if dry_run:
            click.echo(f"\nDry run: would rollback {count} migration(s).")
        else:
            click.echo(f"\n✅ Rolled back {count} migration(s).")

        return count

    run_async(_downgrade())
