"""
Async CLI for Redis-OM data migrations.

This module provides command-line interface for managing data migrations
in Redis-OM Python applications.
"""

import asyncio
import os
from pathlib import Path

import click

from ..migrations.data_migrator import DataMigrationError, DataMigrator


def run_async(coro):
    """Helper to run async functions in Click commands."""
    try:
        loop = asyncio.get_event_loop()
        if loop.is_running():
            # We're in an async context, create a new loop
            import concurrent.futures

            with concurrent.futures.ThreadPoolExecutor() as executor:
                future = executor.submit(asyncio.run, coro)
                return future.result()
        else:
            return loop.run_until_complete(coro)
    except RuntimeError:
        # No event loop exists, create one
        return asyncio.run(coro)


@click.group()
def migrate_data():
    """Manage data migrations for Redis-OM models."""
    pass


@migrate_data.command()
@click.option(
    "--migrations-dir",
    default="migrations",
    help="Directory containing migration files (default: migrations)",
)
@click.option("--module", help="Python module containing migrations")
def status(migrations_dir: str, module: str):
    """Show current migration status."""

    async def _status():
        try:
            migrator = DataMigrator(
                migrations_dir=migrations_dir if not module else None,
                migration_module=module,
            )

            status_info = await migrator.status()

            click.echo("Migration Status:")
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

        except Exception as e:
            click.echo(f"Error: {e}", err=True)
            raise click.Abort()

    run_async(_status())


@migrate_data.command()
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
@click.option("--limit", type=int, help="Limit number of migrations to run")
@click.option("--yes", "-y", is_flag=True, help="Skip confirmation prompt")
def run(
    migrations_dir: str,
    module: str,
    dry_run: bool,
    verbose: bool,
    limit: int,
    yes: bool,
):
    """Run pending migrations."""

    async def _run():
        try:
            migrator = DataMigrator(
                migrations_dir=migrations_dir if not module else None,
                migration_module=module,
            )

            # Get pending migrations for confirmation
            pending = await migrator.get_pending_migrations()

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
                if not click.confirm(
                    f"Run {count_to_run} migration(s)?\n{migration_list}"
                ):
                    click.echo("Aborted.")
                    return

            # Run migrations
            count = await migrator.run_migrations(
                dry_run=False, limit=limit, verbose=verbose
            )

            if verbose:
                click.echo(f"Successfully applied {count} migration(s).")

        except DataMigrationError as e:
            click.echo(f"Migration error: {e}", err=True)
            raise click.Abort()
        except Exception as e:
            click.echo(f"Error: {e}", err=True)
            raise click.Abort()

    run_async(_run())


@migrate_data.command()
@click.argument("name")
@click.option(
    "--migrations-dir",
    default="migrations",
    help="Directory to create migration in (default: migrations)",
)
def create(name: str, migrations_dir: str):
    """Create a new migration file."""

    async def _create():
        try:
            migrator = DataMigrator(migrations_dir=migrations_dir)
            filepath = await migrator.create_migration_file(name, migrations_dir)
            click.echo(f"Created migration: {filepath}")

        except Exception as e:
            click.echo(f"Error creating migration: {e}", err=True)
            raise click.Abort()

    run_async(_create())


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
def rollback(
    migration_id: str,
    migrations_dir: str,
    module: str,
    dry_run: bool,
    verbose: bool,
    yes: bool,
):
    """Rollback a specific migration."""

    async def _rollback():
        try:
            migrator = DataMigrator(
                migrations_dir=migrations_dir if not module else None,
                migration_module=module,
            )

            # Check if migration exists and is applied
            all_migrations = await migrator.discover_migrations()
            applied_migrations = await migrator.get_applied_migrations()

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
            success = await migrator.rollback_migration(
                migration_id, dry_run=False, verbose=verbose
            )

            if success:
                if verbose:
                    click.echo(f"Successfully rolled back migration: {migration_id}")
            else:
                click.echo(
                    f"Migration '{migration_id}' does not support rollback.", err=True
                )

        except DataMigrationError as e:
            click.echo(f"Migration error: {e}", err=True)
            raise click.Abort()
        except Exception as e:
            click.echo(f"Error: {e}", err=True)
            raise click.Abort()

    run_async(_rollback())


if __name__ == "__main__":
    migrate_data()
