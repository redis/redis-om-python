from email.policy import default
from textwrap import indent
from venv import EnvBuilder
import datetime
from redis_om import (EmbeddedJsonModel, Field, JsonModel)
from pydantic import PositiveInt
from typing import Optional, List

class Event(JsonModel):
    assignedVendors: PositiveInt = Field(index=True)
    startTime: datetime.datetime = Field(index=True)
    endTime: datetime.datetime = Field(index=True)
    locationId: str = Field(index=True)
    locationName: str = Field(index=True)
    name: str = Field(index=True)


class Info(EmbeddedJsonModel):
    address: str = Field(index=True)
    city: str = Field(index=True)
    coordinates: str = Field(index=True)
    region: str = Field(index=True)
    state: str = Field(index=True)
    zipcode: str = Field(index=True)

class Location(JsonModel):
    id: str = Field(index=False)
    about: str = Field(index=True, full_text_search=True)
    imageUrl: str = Field(index=True)
    info: Info
    locationType: str = Field(index=True)
    name: str = Field(index=True, full_text_search=True)


class Vendor_Info(EmbeddedJsonModel):
    address: str = Field(index=True, full_text_search=True)
    city: str = Field(index=True, full_text_search=True)
    state: str = Field(index=True, full_text_search=True)
    
class Vendor(JsonModel):
    bannerUrl: Optional[str] = Field(index=False)
    cuisines: List[str] = Field(index=True)
    events: List[str] = Field(index=True)
    id: str = Field(index=False)
    logoUrl: Optional[str] = Field(index=False)
    name: str = Field(index=True, full_text_search=True)
    primary_cuisine: str = Field(index=True)
    vendor_info = Vendor_Info
