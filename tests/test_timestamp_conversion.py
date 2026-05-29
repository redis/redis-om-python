import datetime
from typing import List, Optional

from aredis_om.model.model import convert_timestamp_to_datetime


class DummyField:
    def __init__(self, annotation):
        self.annotation = annotation


class ChildModel:
    model_fields = {
        "created_at": DummyField(datetime.datetime),
    }


class ParentModel:
    model_fields = {
        "child": DummyField(ChildModel),
        "children": DummyField(List[ChildModel]),
        "published_on": DummyField(Optional[datetime.date]),
    }


def test_convert_timestamp_to_datetime_handles_nested_models():
    timestamp = datetime.datetime(2024, 1, 1, 12, 30, tzinfo=datetime.timezone.utc).timestamp()

    result = convert_timestamp_to_datetime(
        {
            "child": {"created_at": timestamp},
            "children": [{"created_at": timestamp}],
            "published_on": timestamp,
        },
        ParentModel.model_fields,
    )

    assert result["child"]["created_at"] == datetime.datetime(
        2024, 1, 1, 12, 30, tzinfo=datetime.timezone.utc
    )
    assert result["children"][0]["created_at"] == datetime.datetime(
        2024, 1, 1, 12, 30, tzinfo=datetime.timezone.utc
    )
    assert result["published_on"] == datetime.date(2024, 1, 1)
