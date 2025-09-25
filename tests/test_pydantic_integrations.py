import abc
import datetime
from collections import namedtuple
from typing import Optional

import pytest
import pytest_asyncio
from pydantic import field_validator

from aredis_om import Field, HashModel, Migrator
from tests._compat import EmailStr, ValidationError


today = datetime.date.today()


@pytest_asyncio.fixture
async def m(key_prefix, redis):
    class BaseHashModel(HashModel, abc.ABC):
        class Meta:
            global_key_prefix = key_prefix
            database = redis

    class Member(BaseHashModel):
        first_name: str
        last_name: str
        email: EmailStr = Field(index=True)
        join_date: datetime.date
        age: int

    await Migrator(conn=redis).run()

    return namedtuple("Models", ["Member"])(Member)


def test_email_str(m):
    with pytest.raises(ValidationError):
        m.Member(
            first_name="Andrew",
            last_name="Brookins",
            email="not an email!",
            age=38,
            join_date=today,
        )

    with pytest.raises(ValidationError):
        m.Member(
            first_name="Andrew",
            last_name="Brookins",
            email="andrew@bad-domain",
            age=38,
            join_date=today,
        )


def test_validator_sets_value_on_init():
    value = "bar"

    class ModelWithValidator(HashModel):
        field: Optional[str] = Field(default=None, index=True)

        @field_validator("field", mode="after")
        def set_field(cls, v):
            return value

    m = ModelWithValidator(field="foo")

    assert m.field == value
