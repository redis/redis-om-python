import os
from pathlib import Path

import unasync


def main():
    additional_replacements = {
        "aredis_om": "redis_om",
        "aioredis": "redis"
    }
    rules = [
        unasync.Rule(
            fromdir="/aredis_om/",
            todir="/redis_om/",
            additional_replacements=additional_replacements,
        ),
    ]

    filepaths = []
    for root, _, filenames in os.walk(
            Path(__file__).absolute().parent / "aredis_om"
    ):
        for filename in filenames:
            if filename.rpartition(".")[-1] in ("py", "pyi",):
                filepaths.append(os.path.join(root, filename))

    unasync.unasync_files(filepaths, rules)


if __name__ == "__main__":
    main()
