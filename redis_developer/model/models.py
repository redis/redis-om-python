import abc
from typing import Optional

from redis_developer.model.model import JsonModel, HashModel


class BaseJsonModel(JsonModel, abc.ABC):
    class Meta:
        global_key_prefix = "redis-developer"


class BaseHashModel(HashModel, abc.ABC):
    class Meta:
        global_key_prefix = "redis-developer"


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
