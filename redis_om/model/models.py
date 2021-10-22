import abc
from typing import Optional

from redis_om.model.model import HashModel, JsonModel


class BaseJsonModel(JsonModel, abc.ABC):
    class Meta:
        global_key_prefix = "redis-om"


class BaseHashModel(HashModel, abc.ABC):
    class Meta:
        global_key_prefix = "redis-om"


# class AddressJson(BaseJsonModel):
#     address_line_1: str
#     address_line_2: Optional[str]
#     city: str
#     country: str
#     postal_code: str
#


class AddressHash(BaseHashModel):
    address_line_1: str
    address_line_2: Optional[str]
    city: str
    country: str
    postal_code: str
