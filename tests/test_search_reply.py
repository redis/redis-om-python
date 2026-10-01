from aredis_om.search_reply import (
    index_field_schema,
    search_document_keys,
    search_documents,
    search_total,
)


RESP2_HASH_SEARCH = [1, "probe-hash:1", ["first_name", "Andrew", "age", "38"]]
RESP2_JSON_SEARCH = [1, "probe-json:1", ["$", '{"first_name":"Andrew","age":38}']]
RESP2_NOCONTENT = [2, "probe-hash:1", "probe-hash:2"]
RESP2_EMPTY = [0]

RESP3_HASH_SEARCH = {
    "attributes": [],
    "format": "STRING",
    "results": [
        {
            "id": "probe-hash:1",
            "extra_attributes": {"first_name": "Andrew", "age": "38"},
            "values": [],
        }
    ],
    "total_results": 1,
    "warning": [],
}
RESP3_JSON_SEARCH = {
    "attributes": [],
    "format": "STRING",
    "results": [
        {
            "id": "probe-json:1",
            "extra_attributes": {"$": '{"first_name":"Andrew","age":38}'},
            "values": [],
        }
    ],
    "total_results": 1,
    "warning": [],
}
RESP3_NOCONTENT = {
    "attributes": [],
    "format": "STRING",
    "results": [{"id": "probe-hash:1", "values": []}],
    "total_results": 2,
    "warning": [],
}
RESP3_EMPTY = {
    "attributes": [],
    "format": "STRING",
    "results": [],
    "total_results": 0,
    "warning": [],
}

RESP2_INFO = [
    "index_name",
    "compat-probe",
    "attributes",
    [
        [
            "identifier",
            "first_name",
            "attribute",
            "first_name",
            "type",
            "TAG",
            "SEPARATOR",
            ",",
        ],
        ["identifier", "age", "attribute", "age", "type", "NUMERIC"],
    ],
]
RESP3_INFO = {
    "index_name": "compat-probe",
    "attributes": [
        {
            "identifier": "first_name",
            "attribute": "first_name",
            "type": "TAG",
            "SEPARATOR": ",",
            "flags": [],
        },
        {
            "identifier": "age",
            "attribute": "age",
            "type": "NUMERIC",
        },
    ],
}


def test_search_total_resp2_and_resp3():
    assert search_total(RESP2_HASH_SEARCH) == 1
    assert search_total(RESP3_HASH_SEARCH) == 1
    assert search_total(RESP2_EMPTY) == 0
    assert search_total(RESP3_EMPTY) == 0
    assert search_total(RESP2_NOCONTENT) == 2
    assert search_total(RESP3_NOCONTENT) == 2


def test_search_document_keys_resp2_and_resp3():
    assert search_document_keys(RESP2_HASH_SEARCH) == ["probe-hash:1"]
    assert search_document_keys(RESP3_HASH_SEARCH) == ["probe-hash:1"]
    assert search_document_keys(RESP2_JSON_SEARCH) == ["probe-json:1"]
    assert search_document_keys(RESP3_JSON_SEARCH) == ["probe-json:1"]
    assert search_document_keys(RESP2_EMPTY) == []
    assert search_document_keys(RESP3_EMPTY) == []
    assert search_document_keys(
        [2, b"probe-hash:1", ["first_name", "Andrew"], "probe-hash:2", []]
    ) == ["probe-hash:1", "probe-hash:2"]


def test_search_documents_hash_fields():
    assert search_documents(RESP2_HASH_SEARCH) == [
        {"first_name": "Andrew", "age": "38"}
    ]
    assert search_documents(RESP3_HASH_SEARCH) == [
        {"first_name": "Andrew", "age": "38"}
    ]


def test_search_documents_json_payload():
    assert search_documents(RESP2_JSON_SEARCH) == [
        {"$": '{"first_name":"Andrew","age":38}'}
    ]
    assert search_documents(RESP3_JSON_SEARCH) == [
        {"$": '{"first_name":"Andrew","age":38}'}
    ]


def test_search_documents_empty_and_nocontent():
    assert search_documents(RESP2_EMPTY) == []
    assert search_documents(RESP3_EMPTY) == []
    assert search_documents(RESP2_NOCONTENT) == []
    assert search_documents(RESP3_NOCONTENT) == []


def test_search_reply_bytes_keys_and_null_payload():
    raw = {
        b"total_results": 1,
        b"results": [
            {
                b"id": b"probe-json:1",
                b"extra_attributes": {b"$": b'{"first_name":"Andrew","age":38}'},
            },
            {b"id": b"probe-json:2", b"extra_attributes": None},
        ],
    }
    assert search_total(raw) == 1
    assert search_document_keys(raw) == ["probe-json:1", "probe-json:2"]
    assert search_documents(raw) == [{"$": '{"first_name":"Andrew","age":38}'}]
    assert (
        index_field_schema(
            {b"attributes": [{b"attribute": b"age", b"type": b"NUMERIC"}]}
        )["age"]["type"]
        == "NUMERIC"
    )


def test_index_field_schema_resp2_and_resp3():
    for info in (RESP2_INFO, RESP3_INFO):
        schema = index_field_schema(info)
        assert schema["first_name"]["type"] == "TAG"
        assert schema["age"]["type"] == "NUMERIC"


def test_from_redis_hash_and_json_shapes():
    from aredis_om import Field, HashModel, JsonModel

    class Person(HashModel):
        first_name: str = Field(index=True)
        age: int = Field(index=True)

    for raw in (RESP2_HASH_SEARCH, RESP3_HASH_SEARCH):
        docs = Person.from_redis(raw)
        assert docs[0].first_name == "Andrew"
        assert docs[0].age == 38

    class Document(JsonModel):
        first_name: str = Field(index=True)
        age: int = Field(index=True)

    for raw in (RESP2_JSON_SEARCH, RESP3_JSON_SEARCH):
        docs = Document.from_redis(raw)
        assert docs[0].first_name == "Andrew"
        assert docs[0].age == 38
