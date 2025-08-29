"""
Async CLI for Redis OM data migrations.

This module provides command-line interface for managing data migrations 
in Redis OM Python applications.
"""

import asyncio
from typing import Optional

import click

from ..migrations.data_migrator import DataMigrationError, DataMigrator


def run_async(coro):
    """Run an async coroutine in an isolated event loop to avoid interfering with pytest loops."""
    import concurrent.futures

    with concurrent.futures.ThreadPoolExecutor() as executor:
        future = executor.submit(asyncio.run, coro)
        return future.result()


@click.group()
def migrate_data():
    """Manage data migrations for Redis OMmodels."""
    pass


@migrate_data.command()
@click.option(
    "--migrations-dir",
    help="Directory containing migration files (default: <root>/data-migrations)",
)
@click.option("--module", help="Python module containing migrations")
def status(migrations_dir: str, module: str):
    """Show current migration status."""

    async def _status():
        try:
            # Default directory to <root>/data-migrations when not provided
            from ...settings import get_root_migrations_dir

            resolved_dir = migrations_dir or (
                __import__("os").path.join(get_root_migrations_dir(), "data-migrations")
            )
            migrator = DataMigrator(
                migrations_dir=resolved_dir if not module else None,
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
    help="Directory containing migration files (default: <root>/data-migrations)",
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
    help="Directory to create migration in (default: <root>/data-migrations)",
)
@click.option(
    "--yes", "-y", is_flag=True, help="Skip confirmation prompt to create directory"
)
def create(name: str, migrations_dir: Optional[str], yes: bool):
    """Create a new migration file."""

    async def _create():
        try:
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
            filepath = await migrator.create_migration_file(name, resolved_dir)
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
