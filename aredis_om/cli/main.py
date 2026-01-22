"""
Redis OM CLI - Main entry point for the async 'om' command.
"""

import click

from ..model.cli.index import index
from ..model.cli.migrate import migrate
from ..model.cli.migrate_data import migrate_data


@click.group()
@click.version_option()
def om():
    """Redis OM Python CLI - Object mapping and migrations for Redis."""
    pass


# Add subcommands
om.add_command(index)
om.add_command(migrate)
om.add_command(migrate_data, name="migrate-data")


if __name__ == "__main__":
    om()
