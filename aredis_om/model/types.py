from typing import Annotated, Any, Literal, Tuple, Union

try:
    from pydantic import BeforeValidator, PlainSerializer
    from pydantic_extra_types.coordinate import Coordinate

    PYDANTIC_V2 = True
except ImportError:
    # Pydantic v1 compatibility - these don't exist in v1
    BeforeValidator = None
    PlainSerializer = None
    Coordinate = None
    PYDANTIC_V2 = False


RadiusUnit = Literal["m", "km", "mi", "ft"]


class GeoFilter:
    """
    A geographic filter for searching within a radius of a coordinate point.

    This filter is used with GEO fields to find models within a specified
    distance from a given location.

    Args:
        longitude: The longitude of the center point (-180 to 180)
        latitude: The latitude of the center point (-90 to 90)
        radius: The search radius (must be positive)
        unit: The unit of measurement ('m', 'km', 'mi', or 'ft')

    Example:
        >>> # Find all locations within 10 miles of Portland, OR
        >>> filter = GeoFilter(
        ...     longitude=-122.6765,
        ...     latitude=45.5231,
        ...     radius=10,
        ...     unit="mi"
        ... )
        >>> results = await Location.find(
        ...     Location.coordinates == filter
        ... ).all()
    """

    def __init__(
        self, longitude: float, latitude: float, radius: float, unit: RadiusUnit
    ):
        # Validate coordinates
        if not -180 <= longitude <= 180:
            raise ValueError(f"Longitude must be between -180 and 180, got {longitude}")
        if not -90 <= latitude <= 90:
            raise ValueError(f"Latitude must be between -90 and 90, got {latitude}")
        if radius <= 0:
            raise ValueError(f"Radius must be positive, got {radius}")

        self.longitude = longitude
        self.latitude = latitude
        self.radius = radius
        self.unit = unit

    def __str__(self) -> str:
        return f"{self.longitude} {self.latitude} {self.radius} {self.unit}"

    @classmethod
    def from_coordinates(cls, coords, radius: float, unit: RadiusUnit) -> "GeoFilter":
        """
        Create a GeoFilter from a Coordinates object.

        Args:
            coords: A Coordinate object with latitude and longitude (or tuple for v1)
            radius: The search radius
            unit: The unit of measurement

        Returns:
            A new GeoFilter instance
        """
        if PYDANTIC_V2 and hasattr(coords, "longitude") and hasattr(coords, "latitude"):
            return cls(coords.longitude, coords.latitude, radius, unit)
        elif isinstance(coords, (tuple, list)) and len(coords) == 2:
            # Handle tuple format (longitude, latitude)
            return cls(coords[0], coords[1], radius, unit)
        else:
            raise ValueError(f"Invalid coordinates format: {coords}")


if PYDANTIC_V2:
    CoordinateType = Coordinate
else:
    # Pydantic v1 compatibility - use a simple tuple type
    CoordinateType = Tuple[float, float]


def parse_redis(v: Any) -> Union[Tuple[str, str], Any]:
    """
    Transform Redis coordinate format to Pydantic coordinate format.

    The pydantic coordinate type expects a string in the format 'latitude,longitude'.
    Redis stores coordinates in the format 'longitude,latitude'.

    This validator transforms the input from Redis into the expected format for pydantic.

    Args:
        v: The value from Redis (typically a string like "longitude,latitude")

    Returns:
        A tuple of (latitude, longitude) strings if input is a coordinate string,
        otherwise returns the input unchanged.

    Raises:
        ValueError: If the coordinate string format is invalid
    """
    if isinstance(v, str):
        parts = v.split(",")

        if len(parts) != 2:
            raise ValueError(
                f"Invalid coordinate format. Expected 'longitude,latitude' but got: {v}"
            )

        return (parts[1], parts[0])  # Swap to (latitude, longitude)

    return v


if PYDANTIC_V2:
    Coordinates = Annotated[
        CoordinateType,
        PlainSerializer(
            lambda v: f"{v.longitude},{v.latitude}",
            return_type=str,
            when_used="unless-none",
        ),
        BeforeValidator(parse_redis),
    ]
else:
    # Pydantic v1 compatibility - just use the base type
    Coordinates = CoordinateType
