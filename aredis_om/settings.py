import os


def get_root_migrations_dir() -> str:
    # Read dynamically to allow tests/CLI to override via env after import
    return os.environ.get("REDIS_OM_MIGRATIONS_DIR", "migrations")
