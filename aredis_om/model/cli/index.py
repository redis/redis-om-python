"""
CLI for managing Redis OM indexes.

Provides commands for creating, dropping, and rebuilding RediSearch indexes
during development. For production migrations, use `om migrate` instead.
"""

import asyncio
from typing import Optional

import click


def run_async(coro):
    """Run an async coroutine in an isolated event loop."""
    import concurrent.futures

    with concurrent.futures.ThreadPoolExecutor() as executor:
        future = executor.submit(asyncio.run, coro)
        return future.result()


@click.group()
def index():
    """Manage RediSearch indexes for Redis OM models.

    These commands are intended for development workflows. For production
    deployments, use `om migrate` for tracked, reversible migrations.
    """
    pass


@index.command()
@click.option("--module", "-m", help="Python module containing models to import")
@click.option(
    "--force", "-f", is_flag=True, help="Force recreation of existing indexes"
)
def create(module: Optional[str], force: bool):
    """Create indexes for all registered models.

    This will create RediSearch indexes for all models that don't have
    an existing index (unless --force is used to recreate).
    """
    from ..migrations.schema.legacy_migrator import SchemaDetector

    async def _create():
        from ...connections import get_redis_connection

        conn = get_redis_connection()
        detector = SchemaDetector(module=module, conn=conn)
        await detector.detect_migrations()

        if not detector.migrations:
            click.echo("✅ All indexes are up to date.")
            return

        created = 0
        for migration in detector.migrations:
            if migration.action.name == "CREATE":
                click.echo(f"Creating index: {migration.index_name}")
                await migration.run()
                created += 1
            elif force and migration.action.name == "DROP":
                click.echo(f"Dropping index: {migration.index_name}")
                await migration.run()

        click.echo(f"\n✅ Created {created} index(es).")

    run_async(_create())


@index.command()
@click.option("--module", "-m", help="Python module containing models to import")
@click.option("--yes", "-y", is_flag=True, help="Skip confirmation prompt")
def drop(module: Optional[str], yes: bool):
    """Drop all indexes for registered models.

    Warning: This is destructive and will remove all indexes. Data remains
    but will not be searchable until indexes are recreated.
    """
    from ..migrations.schema.legacy_migrator import import_submodules

    async def _drop():
        from ...connections import get_redis_connection
        from ...model.model import model_registry

        if module:
            import_submodules(module)

        conn = get_redis_connection()

        if not model_registry:
            click.echo("No models found in registry.")
            return

        indexes = [cls.Meta.index_name for cls in model_registry.values()]

        if not yes:
            click.echo(f"This will drop {len(indexes)} index(es):")
            for idx in indexes:
                click.echo(f"- {idx}")
            if not click.confirm("\nContinue?"):
                click.echo("Aborted.")
                return

        dropped = 0
        for idx in indexes:
            try:
                await conn.ft(idx).dropindex()
                click.echo(f"Dropped: {idx}")
                dropped += 1
            except Exception:
                click.echo(f"Skipped (not found): {idx}")

        click.echo(f"\n✅ Dropped {dropped} index(es).")

    run_async(_drop())


@index.command()
@click.option("--module", "-m", help="Python module containing models to import")
@click.option("--yes", "-y", is_flag=True, help="Skip confirmation prompt")
def rebuild(module: Optional[str], yes: bool):
    """Drop and recreate all indexes.

    This is a convenience command for development that combines `drop` and
    `create`. All indexes will be dropped and recreated from current model
    definitions.
    """
    from ..migrations.schema.legacy_migrator import SchemaDetector, import_submodules

    async def _rebuild():
        from ...connections import get_redis_connection
        from ...model.model import model_registry

        if module:
            import_submodules(module)

        conn = get_redis_connection()

        if not model_registry:
            click.echo("No models found in registry.")
            return

        indexes = [(name, cls) for name, cls in model_registry.items()]

        if not yes:
            click.echo(f"This will rebuild {len(indexes)} index(es):")
            for name, cls in indexes:
                click.echo(f"- {cls.Meta.index_name}")
            if not click.confirm("\nContinue?"):
                click.echo("Aborted.")
                return

        # Drop all indexes
        for name, cls in indexes:
            try:
                await conn.ft(cls.Meta.index_name).dropindex()
                click.echo(f"Dropped: {cls.Meta.index_name}")
            except Exception:  # nosec B110
                pass  # Index didn't exist, ignore

        # Create all indexes
        detector = SchemaDetector(module=module, conn=conn)
        await detector.detect_migrations()

        for migration in detector.migrations:
            if migration.action.name == "CREATE":
                click.echo(f"Creating: {migration.index_name}")
                await migration.run()

        click.echo(f"\n✅ Rebuilt {len(indexes)} index(es).")

    run_async(_rebuild())
