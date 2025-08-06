from typing import Annotated, Any, Literal

from pydantic import BeforeValidator, PlainSerializer
from pydantic_extra_types.coordinate import Coordinate


RadiusUnit = Literal["m", "km", "mi", "ft"]


class GeoFilter:
    def __init__(self, longitude: float, latitude: float, radius: float, unit: RadiusUnit):
        self.longitude = longitude
        self.latitude = latitude
        self.radius = radius
        self.unit = unit

    def __str__(self):
        return f"{self.longitude} {self.latitude} {self.radius} {self.unit}"


CoordinateType = Coordinate


def parse_redis(v: Any):
    """
    The pydantic coordinate type expects a string in the format 'latitude,longitude'.
    Redis expects a string in the format 'longitude,latitude'.

    This validator transforms the input from Redis into the expected format for pydantic.
    """
    if isinstance(v, str):
        parts = v.split(",")

        if len(parts) != 2:
            raise ValueError("Invalid coordinate format")

        return (parts[1], parts[0])

    return v


Coordinates = Annotated[
    CoordinateType,
    PlainSerializer(
        lambda v: f"{v.longitude},{v.latitude}",
        return_type=str,
        when_used="unless-none",
    ),
    BeforeValidator(parse_redis),
]
