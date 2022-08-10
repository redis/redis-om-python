import os
from pathlib import Path

import unasync

ADDITIONAL_REPLACEMENTS = {
    "aredis_om": "redis_om",
    "async_redis": "sync_redis",
    ":tests.": ":tests_sync.",
    "pytest_asyncio": "pytest",
    "py_test_mark_asyncio": "py_test_mark_sync",
}


def main():
    rules = [
        unasync.Rule(
            fromdir="/aredis_om/",
            todir="/redis_om/",
            additional_replacements=ADDITIONAL_REPLACEMENTS,
        ),
        unasync.Rule(
            fromdir="/tests/",
            todir="/tests_sync/",
            additional_replacements=ADDITIONAL_REPLACEMENTS,
        ),
    ]
    filepaths = []
    for root, _, filenames in os.walk(Path(__file__).absolute().parent):
        for filename in filenames:
            if filename.rpartition(".")[-1] in (
                "py",
                "pyi",
            ):
                filepaths.append(os.path.join(root, filename))

    unasync.unasync_files(filepaths, rules)


if __name__ == "__main__":
    main()
