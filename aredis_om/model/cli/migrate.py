import click

from aredis_om.model.migrations.migrator import Migrator


@click.command()
@click.option("--module", default="aredis_om")
def migrate(module):
    migrator = Migrator(module)
    migrator.detect_migrations()

    if migrator.migrations:
        print("Pending migrations:")
        for migration in migrator.migrations:
            print(migration)

        if input("Run migrations? (y/n) ") == "y":
            migrator.run()
