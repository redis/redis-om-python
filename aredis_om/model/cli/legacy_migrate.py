import asyncio
import os
import warnings
from typing import Optional

import click

from ...settings import get_root_migrations_dir
from ..migrations.schema.legacy_migrator import Migrator


def run_async(coro):
    """Run an async coroutine in an isolated event loop to avoid interfering with pytest loops."""
    import concurrent.futures

    with concurrent.futures.ThreadPoolExecutor() as executor:
        future = executor.submit(asyncio.run, coro)
        return future.result()


def show_deprecation_warning():
    """Show deprecation warning for the legacy migrate command."""
    warnings.warn(
        "The 'migrate' command is deprecated. Please use 'om migrate' for the new file-based migration system with rollback support.",
        DeprecationWarning,
        stacklevel=3,
    )
    click.echo(
        click.style(
            "⚠️  DEPRECATED: The 'migrate' command uses automatic migrations. "
            "Use 'om migrate' for the new file-based system with rollback support.",
            fg="yellow",
        ),
        err=True,
    )


@click.group()
def migrate():
    """[DEPRECATED] Automatic schema migrations for Redis OM models. Use 'om migrate' instead."""
    show_deprecation_warning()


@migrate.command()
@click.option("--module", help="Python module to scan for models")
def status(module: Optional[str]):
    """Show pending automatic migrations (no file-based tracking)."""
    migrator = Migrator(module=module)

    async def _status():
        await migrator.detect_migrations()
        return migrator.migrations

    migrations = run_async(_status())

    if not migrations:
        click.echo("No pending automatic migrations detected.")
        return

    click.echo("Pending Automatic Migrations:")
    for migration in migrations:
        action = "CREATE" if migration.action.name == "CREATE" else "DROP"
        click.echo(
            f"  {action}: {migration.index_name} (model: {migration.model_name})"
        )


@migrate.command()
@click.option("--module", help="Python module to scan for models")
@click.option(
    "--dry-run", is_flag=True, help="Show what would be done without applying changes"
)
@click.option("--verbose", "-v", is_flag=True, help="Enable verbose output")
@click.option(
    "--yes",
    "-y",
    is_flag=True,
    help="Skip confirmation prompt to run automatic migrations",
)
def run(
    module: Optional[str],
    dry_run: bool,
    verbose: bool,
    yes: bool,
):
    """Run automatic schema migrations (immediate DROP+CREATE)."""
    migrator = Migrator(module=module)

    async def _run():
        await migrator.detect_migrations()
        if not migrator.migrations:
            if verbose:
                click.echo("No pending automatic migrations found.")
            return 0

        if dry_run:
            click.echo(f"Would run {len(migrator.migrations)} automatic migration(s):")
            for migration in migrator.migrations:
                action = "CREATE" if migration.action.name == "CREATE" else "DROP"
                click.echo(f"  {action}: {migration.index_name}")
            return len(migrator.migrations)

        if not yes:
            operations = []
            for migration in migrator.migrations:
                action = "CREATE" if migration.action.name == "CREATE" else "DROP"
                operations.append(f"  {action}: {migration.index_name}")

            if not click.confirm(
                f"Run {len(migrator.migrations)} automatic migration(s)?\n"
                + "\n".join(operations)
            ):
                click.echo("Aborted.")
                return 0

        await migrator.run()
        if verbose:
            click.echo(
                f"Successfully applied {len(migrator.migrations)} automatic migration(s)."
            )
        return len(migrator.migrations)

    run_async(_run())
