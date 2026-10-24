from unittest import mock

import pytest

from aredis_om import HashModel, JsonModel

from .conftest import py_test_mark_asyncio


async def _iterate(keys):
    for key in keys:
        yield key


@pytest.mark.parametrize(
    ("model_base", "redis_type"),
    [(HashModel, "HASH"), (JsonModel, "ReJSON-RL")],
    ids=["hash", "json"],
)
@py_test_mark_asyncio
async def test_all_pks_forwards_count_and_returns_all_decoded_keys(
    model_base, redis_type
):
    fake_db = mock.Mock()

    class SampleModel(model_base):
        name: str

        class Meta:
            database = fake_db
            global_key_prefix = "all-pks-count-tests"
            model_key_prefix = "sample"

    expected_pks = ["first", "second", "third"]
    keys = [
        SampleModel.make_primary_key(expected_pks[0]).encode(SampleModel.Meta.encoding),
        SampleModel.make_primary_key(expected_pks[1]),
        SampleModel.make_primary_key(expected_pks[2]).encode(SampleModel.Meta.encoding),
    ]
    fake_db.scan_iter = mock.Mock(side_effect=lambda *args, **kwargs: _iterate(keys))
    pattern = f"{SampleModel.make_key('')}*"

    default_pks = [pk async for pk in await SampleModel.all_pks()]
    counted_pks = [pk async for pk in await SampleModel.all_pks(count=2)]

    assert default_pks == expected_pks
    # SCAN COUNT is a hint, so all returned keys still need to be iterated.
    assert counted_pks == expected_pks
    assert fake_db.scan_iter.call_args_list == [
        mock.call(pattern, _type=redis_type, count=None),
        mock.call(pattern, _type=redis_type, count=2),
    ]
