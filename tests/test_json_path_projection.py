import pytest

from aredis_om.model.model import FindQuery, _FindQueryState


class DummyJsonClient:
    def __init__(self, responses):
        self.responses = responses

    def json(self):
        return self

    async def get(self, doc_key, *json_paths):
        return self.responses.get(doc_key)


class DummyModel:
    def __init__(self, client):
        self._client = client

    def db(self):
        return self._client


def build_query(projected_fields, client):
    query = FindQuery.__new__(FindQuery)
    query._state = _FindQueryState(expressions=[], model=DummyModel(client))
    query.projected_fields = projected_fields
    return query


@pytest.mark.asyncio
async def test_parse_json_path_projection_as_dict_handles_dict_results():
    client = DummyJsonClient(
        {
            "doc:1": {
                "$.name": ["Alice"],
                "$.address.city": ["Lisbon"],
            },
            "doc:2": None,
        }
    )
    query = build_query(["name", "address__city"], client)

    result = await query._parse_json_path_projection_as_dict(
        [2, b"doc:1", None, "doc:2", None]
    )

    assert result == [{"name": "Alice", "address__city": "Lisbon"}]


@pytest.mark.asyncio
async def test_parse_json_path_projection_as_dict_handles_single_path_results():
    client = DummyJsonClient({"doc:1": ["Bob"]})
    query = build_query(["name"], client)

    result = await query._parse_json_path_projection_as_dict([1, "doc:1", None])

    assert result == [{"name": "Bob"}]
