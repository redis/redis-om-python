import os
from pathlib import Path
from typing import Iterable, Optional, Union

import unasync

ADDITIONAL_REPLACEMENTS = {
    "aredis_om": "redis_om",
    "aioredis": "redis",
    ":tests.": ":tests_sync.",
    "pytest_asyncio": "pytest",
}

STRINGS_TO_REMOVE_FROM_SYNC_TESTS = {
    "@pytest.mark.asyncio",
}


def remove_strings_from_files(
    filepaths: Iterable[Union[bytes, str, os.PathLike]],
    strings_to_remove: Iterable[str],
):
    for filepath in filepaths:
        tmp_filepath = f"{filepath}.tmp"
        with open(filepath, "r") as read_file, open(tmp_filepath, "w") as write_file:
            for line in read_file:
                if line.strip() in strings_to_remove:
                    continue
                print(line, end="", file=write_file)
        os.replace(tmp_filepath, filepath)


def get_source_filepaths(directory: Optional[Union[bytes, str, os.PathLike]] = None):
    walk_path = (
        Path(__file__).absolute().parent
        if directory is None
        else os.path.join(Path(__file__).absolute().parent, directory)
    )

    filepaths = []
    for root, _, filenames in os.walk(walk_path):
        for filename in filenames:
            if filename.rpartition(".")[-1] in (
                "py",
                "pyi",
            ):
                filepaths.append(os.path.join(root, filename))
    return filepaths


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

    unasync.unasync_files(get_source_filepaths(), rules)
    remove_strings_from_files(
        get_source_filepaths("tests_sync"), STRINGS_TO_REMOVE_FROM_SYNC_TESTS
    )


if __name__ == "__main__":
    main()
