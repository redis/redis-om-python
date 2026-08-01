import abc
from types import SimpleNamespace
from typing import Any, Dict, List

import pytest
from pydantic import ValidationError

from aredis_om import EmbeddedJsonModel, Field, HashModel, JsonModel
from aredis_om.model import model as model_module

from .conftest import py_test_mark_asyncio


class FakePipeline:
    def __init__(self):
        self.hash_updates: List[tuple[str, Dict[str, Any]]] = []
        self.json_updates: List[tuple[str, str, Any]] = []
        self.execute_count = 0

    def hset(self, key: str, mapping: Dict[str, Any]):
        self.hash_updates.append((key, mapping))
        return self

    def json(self):
        return self

    def set(self, key: str, path: str, value: Any):
        self.json_updates.append((key, path, value))
        return self

    async def execute(self):
        self.execute_count += 1
        return []


class FakeDatabase:
    def __init__(self, search_results: Dict[int, List[Any]]):
        self.search_results = search_results
        self.search_calls: List[tuple[Any, ...]] = []
        self.pipelines: List[FakePipeline] = []
        self.pipeline_transactions: List[bool] = []

    async def execute_command(self, *args):
        self.search_calls.append(args)
        limit_index = args.index("LIMIT")
        offset = args[limit_index + 1]
        return self.search_results[offset]

    def pipeline(self, transaction: bool = True):
        self.pipeline_transactions.append(transaction)
        pipeline = FakePipeline()
        self.pipelines.append(pipeline)
        return pipeline


def enable_search(monkeypatch):
    monkeypatch.setattr(model_module, "has_redisearch", lambda db: True)
    monkeypatch.setattr(model_module, "supports_hash_field_expiration", lambda: False)


def hash_model(database):
    class User(HashModel, abc.ABC, index=True):
        status: str
        age: int = Field(ge=0)
        payload: str

    User.Meta.database = database
    return User


def json_model(database):
    class Address(EmbeddedJsonModel):
        city: str

    class Document(JsonModel, abc.ABC, index=True):
        address: Address
        status: str
        payload: Dict[str, str]

    Document.Meta.database = database
    return Document


def test_query_update_resolves_pydantic_v1_nested_models():
    class LegacyNestedModel:
        __fields__ = {"city": object()}

    class RootModel:
        model_fields = {"address": SimpleNamespace(annotation=LegacyNestedModel)}

    query = object.__new__(model_module.FindQuery)
    query.model = RootModel

    assert (
        query._get_update_field("address__city") is LegacyNestedModel.__fields__["city"]
    )


def test_query_update_resolves_pydantic_v1_field_types(monkeypatch):
    class LegacyNestedModel:
        __fields__ = {"city": object()}

    class LegacyField:
        outer_type_ = LegacyNestedModel

    class RootModel:
        __fields__ = {"address": LegacyField()}

    monkeypatch.setattr(model_module, "PYDANTIC_V2", False)
    query = object.__new__(model_module.FindQuery)
    query.model = RootModel

    assert (
        query._get_update_field("address__city") is LegacyNestedModel.__fields__["city"]
    )


@py_test_mark_asyncio
async def test_query_update_uses_key_only_search_and_partial_hset(monkeypatch):
    enable_search(monkeypatch)
    database = FakeDatabase({0: [2, "user:1", "user:2"]})
    User = hash_model(database)

    updated = await User.find().only("status").update(status="active", age="42")

    assert updated == 2
    assert database.search_calls[0][-1] == "NOCONTENT"
    assert all("RETURN" not in call for call in database.search_calls)
    assert database.pipeline_transactions == [True]
    assert database.pipelines[0].hash_updates == [
        ("user:1", {"status": "active", "age": 42}),
        ("user:2", {"status": "active", "age": 42}),
    ]
    assert database.pipelines[0].execute_count == 1


@py_test_mark_asyncio
async def test_query_update_validates_values_before_search(monkeypatch):
    enable_search(monkeypatch)
    database = FakeDatabase({0: [1, "user:1"]})
    User = hash_model(database)

    with pytest.raises(ValidationError):
        await User.find().update(age=-1)

    assert database.search_calls == []
    assert database.pipelines == []


@py_test_mark_asyncio
async def test_query_update_paginates_key_only_results(monkeypatch):
    enable_search(monkeypatch)
    database = FakeDatabase(
        {
            0: [3, "user:1"],
            1: [3, "user:2"],
            2: [3, "user:3"],
        }
    )
    User = hash_model(database)

    query = User.find()
    query.page_size = 1
    query.limit = 1
    updated = await query.update(status="active")

    assert updated == 3
    assert [call[call.index("LIMIT") + 1] for call in database.search_calls] == [
        0,
        1,
        2,
    ]
    assert len(database.pipelines[0].hash_updates) == 3


@py_test_mark_asyncio
async def test_query_update_uses_json_paths_and_non_transactional_pipeline(monkeypatch):
    enable_search(monkeypatch)
    database = FakeDatabase({0: [1, "document:1"]})
    Document = json_model(database)

    updated = await Document.find().update(use_transaction=False, status="active")

    assert updated == 1
    assert database.pipeline_transactions == [False]
    assert database.pipelines[0].json_updates == [("document:1", "$.status", "active")]
    assert database.pipelines[0].execute_count == 1


@py_test_mark_asyncio
async def test_query_update_uses_nested_json_path(monkeypatch):
    enable_search(monkeypatch)
    database = FakeDatabase({0: [1, "document:1"]})
    Document = json_model(database)

    updated = await Document.find().update(address__city="Seoul")

    assert updated == 1
    assert database.pipelines[0].json_updates == [
        ("document:1", "$.address.city", "Seoul")
    ]
