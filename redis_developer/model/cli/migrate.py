import click
from redis_developer.om.migrations.migrator import Migrator


@click.command()
@click.option("--module", default="redis_developer")
def migrate(module):
    migrator = Migrator(module)    
    
    if migrator.migrations:
        print("Pending migrations:")
        for migration in migrator.migrations:
            print(migration)
    
        if input(f"Run migrations? (y/n) ") == "y":
            migrator.run()
