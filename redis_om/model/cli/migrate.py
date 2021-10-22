import click

from redis_om.model.migrations.migrator import Migrator


@click.command()
@click.option("--module", default="redis_om")
def migrate(module):
    migrator = Migrator(module)

    if migrator.migrations:
        print("Pending migrations:")
        for migration in migrator.migrations:
            print(migration)

        if input("Run migrations? (y/n) ") == "y":
            migrator.run()
