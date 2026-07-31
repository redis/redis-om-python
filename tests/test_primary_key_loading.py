from unittest import mock

from aredis_om import Field, HashModel, JsonModel

from .conftest import py_test_mark_asyncio


@py_test_mark_asyncio
async def test_hash_model_get_uses_requested_pk_when_document_pk_is_missing():
    fake_db = mock.AsyncMock()
    fake_db.hgetall.return_value = {"name": "legacy"}

    class LegacyModel(HashModel, index=True):
        name: str

        class Meta:
            database = fake_db

    model = await LegacyModel.get("existing-pk")

    assert model.pk == "existing-pk"


@py_test_mark_asyncio
async def test_hash_model_get_decodes_bytes_before_adding_requested_pk():
    fake_db = mock.AsyncMock()
    fake_db.hgetall.return_value = {b"name": b"legacy"}

    class LegacyModel(HashModel, index=True):
        name: str

        class Meta:
            database = fake_db

    model = await LegacyModel.get("existing-pk")

    assert model.pk == "existing-pk"
    assert model.name == "legacy"


@py_test_mark_asyncio
async def test_json_model_get_uses_requested_pk_when_document_pk_is_missing():
    json_client = mock.Mock()
    json_client.get = mock.AsyncMock(return_value={"name": "legacy"})
    fake_db = mock.Mock()
    fake_db.json.return_value = json_client
    fake_db.execute_command.return_value = [object()]

    class LegacyModel(JsonModel, index=True):
        name: str

        class Meta:
            database = fake_db

    model = await LegacyModel.get("existing-pk")

    assert model.pk == "existing-pk"


@py_test_mark_asyncio
async def test_get_uses_configured_custom_primary_key():
    fake_db = mock.AsyncMock()
    fake_db.hgetall.return_value = {"name": "legacy"}

    class LegacyModel(HashModel, index=True):
        external_id: int = Field(primary_key=True)
        name: str

        class Meta:
            database = fake_db

    model = await LegacyModel.get(42)

    assert model.pk == 42
    assert model.external_id == 42
