from unittest import mock

import pytest

from aredis_om import FindQuery, HashModel
from aredis_om.model import model as model_module
from aredis_om.util import ASYNC_MODE

from .conftest import py_test_mark_asyncio


@pytest.fixture
def query(monkeypatch):
    fake_db = mock.AsyncMock()

    async def search(*args):
        offset = args[4]
        if offset >= 2:
            return [2]
        return [2, f"doc:{offset}", ["pk", str(offset), "name", str(offset)]]

    fake_db.execute_command.side_effect = search
    monkeypatch.setattr(model_module, "has_redisearch", lambda conn: True)

    class Item(HashModel, index=True):
        name: str

        class Meta:
            database = fake_db

    return FindQuery(expressions=[], model=Item, limit=1)


@pytest.mark.parametrize("item", [-1, 0, 1, 2])
@py_test_mark_asyncio
async def test_get_item_with_partial_cache(query, item):
    cached = await query.execute(exhaust_results=False)
    assert [model.name for model in cached] == ["0"]

    if item == 2:
        with pytest.raises(IndexError):
            await query.get_item(item)
    else:
        result = await query.get_item(item)
        assert result.name == ("0" if item <= 0 else "1")
        if item <= 0:
            assert result is cached[0]
            assert query.model.db().execute_command.call_count == 1


@pytest.mark.skipif(ASYNC_MODE, reason="[] notation requires sync queries")
@pytest.mark.parametrize("item", [-1, 0, 1, 2])
def test_getitem_with_partial_cache(query, item):
    cached = query.execute(exhaust_results=False)
    assert [model.name for model in cached] == ["0"]

    if item == 2:
        with pytest.raises(IndexError):
            query[item]
    else:
        result = query[item]
        assert result.name == ("0" if item <= 0 else "1")
        if item <= 0:
            assert result is cached[0]
            assert query.model.db().execute_command.call_count == 1
