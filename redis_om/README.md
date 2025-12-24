# redis_om - Sync Version (Auto-Generated)

This directory contains the **synchronous version** of redis-om-python.

## Important Notes

1. **Do not edit files in this directory directly** - they are auto-generated from `aredis_om/` using [unasync](https://github.com/python-trio/unasync).

2. **To regenerate**: Run `make sync` from the project root.

3. **Why this README exists**: This placeholder file allows the `redis_om` package to be declared in `pyproject.toml` for Poetry 2.0+ compatibility, which requires package directories to exist at install time.

4. **All other files are gitignored**: Only this README is tracked in git. The actual Python files are generated and ignored.

## Development Workflow

1. Make changes in `aredis_om/` (the async version)
2. Run `make sync` to generate the sync version
3. Run tests for both versions

