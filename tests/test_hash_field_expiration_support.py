from unittest import mock

import pytest

from aredis_om.model.model import supports_hash_field_expiration

from .conftest import py_test_mark_asyncio


@py_test_mark_asyncio
@pytest.mark.parametrize(
    ("server_version", "expected"),
    [("7.2.14", False), ("7.4.0", True), ("8.0.0", True)],
)
async def test_supports_hash_field_expiration_checks_server_version(
    server_version, expected
):
    conn = mock.AsyncMock()
    conn.info.return_value = {"redis_version": server_version}

    assert await supports_hash_field_expiration(conn) is expected
