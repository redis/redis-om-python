import datetime
from dataclasses import dataclass
from enum import Enum
from pathlib import PurePosixPath

from aredis_om.model.encoders import jsonable_encoder


@dataclass
class Address:
    city: str
    tags: list[str]


class Status(Enum):
    ACTIVE = "active"


def test_jsonable_encoder_handles_nested_standard_types():
    payload = {
        "status": Status.ACTIVE,
        "path": PurePosixPath("foo/bar"),
        "items": [Address("Porto", ["a"]), (1, 2)],
        "keep": "value",
        "skip_none": None,
        "_sa_instance_state": "ignored",
    }

    encoded = jsonable_encoder(payload, exclude_none=True)

    assert encoded == {
        "status": "active",
        "path": "foo/bar",
        "items": [{"city": "Porto", "tags": ["a"]}, [1, 2]],
        "keep": "value",
    }


def test_jsonable_encoder_custom_encoder_takes_precedence():
    value = datetime.datetime(2024, 1, 2, 3, 4, 5)

    encoded = jsonable_encoder(
        value,
        custom_encoder={datetime.date: lambda _: "custom"},
    )

    assert encoded == "custom"


def test_jsonable_encoder_falls_back_to_vars():
    class Payload:
        def __init__(self):
            self.value = 42

    assert jsonable_encoder(Payload()) == {"value": 42}
