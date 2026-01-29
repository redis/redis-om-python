import abc
import dataclasses
import datetime
import json
import logging
import operator
import struct
from copy import copy
from enum import Enum
from functools import reduce
from typing import (Any, Callable, Dict, List, Literal, Mapping, Optional,
                    Sequence, Set, Tuple, Type, TypeVar, Union)
from typing import get_args as typing_get_args
from typing import no_type_check

from more_itertools import ichunked
from pydantic import BaseModel

try:
    from pydantic import ConfigDict, TypeAdapter, field_validator

    PYDANTIC_V2 = True
except ImportError:
    # Pydantic v1 compatibility
    from pydantic import validator as field_validator

    ConfigDict = None
    TypeAdapter = None
    PYDANTIC_V2 = False
if PYDANTIC_V2:
    from pydantic._internal._model_construction import ModelMetaclass
    from pydantic._internal._repr import Representation
    from pydantic.fields import FieldInfo as PydanticFieldInfo
    from pydantic.fields import _FromFieldInfoInputs
    from pydantic_core import PydanticUndefined as Undefined
    from pydantic_core import PydanticUndefinedType as UndefinedType
else:
    # Pydantic v1 compatibility
    from pydantic.fields import FieldInfo as PydanticFieldInfo
    from pydantic.main import ModelMetaclass

    Representation = object
    _FromFieldInfoInputs = dict
    Undefined = ...
    UndefinedType = type(...)
from redis.commands.json.path import Path
from redis.exceptions import ResponseError
from typing_extensions import Protocol, Unpack, get_args, get_origin
from ulid import ULID

from .. import redis
from ..checks import has_redis_json, has_redisearch
from ..connections import get_redis_connection
from ..util import ASYNC_MODE, has_numeric_inner_type, is_numeric_type
from .encoders import jsonable_encoder
from .render_tree import render_tree
from .token_escaper import TokenEscaper
from .types import Coordinates, CoordinateType, GeoFilter

model_registry = {}
_T = TypeVar("_T")
Model = TypeVar("Model", bound="RedisModel")
log = logging.getLogger(__name__)
escaper = TokenEscaper()

# Minimum redis-py version for hash field expiration support
_HASH_FIELD_EXPIRATION_MIN_VERSION = (5, 1, 0)


def supports_hash_field_expiration() -> bool:
    """
    Check if the installed redis-py version supports hash field expiration commands.

    Hash field expiration (HEXPIRE, HTTL, HPERSIST, etc.) was added in redis-py 5.1.0
    and requires Redis server 7.4+.

    Returns:
        True if redis-py >= 5.1.0 and has the hexpire method, False otherwise.
    """
    try:
        import redis as redis_lib

        version_str = getattr(redis_lib, "__version__", "0.0.0")
        version_parts = tuple(int(x) for x in version_str.split(".")[:3])
        if version_parts >= _HASH_FIELD_EXPIRATION_MIN_VERSION:
            # Also check that the method actually exists
            return hasattr(redis_lib.asyncio.Redis, "hexpire")
        return False
    except (ValueError, AttributeError):
        return False


def convert_datetime_to_timestamp(obj):
    """Convert datetime objects to Unix timestamps for storage."""
    if isinstance(obj, dict):
        return {key: convert_datetime_to_timestamp(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [convert_datetime_to_timestamp(item) for item in obj]
    elif isinstance(obj, datetime.datetime):
        return obj.timestamp()
    elif isinstance(obj, datetime.date):
        # Convert date to datetime at midnight and get timestamp
        dt = datetime.datetime.combine(obj, datetime.time.min)
        return dt.timestamp()
    else:
        return obj


def convert_timestamp_to_datetime(obj, model_fields):
    """Convert Unix timestamps back to datetime objects based on model field types."""
    if isinstance(obj, dict):
        result = {}
        for key, value in obj.items():
            if key in model_fields:
                field_info = model_fields[key]
                field_type = (
                    field_info.annotation if hasattr(field_info, "annotation") else None
                )

                # Handle Optional types - extract the inner type
                if hasattr(field_type, "__origin__") and field_type.__origin__ is Union:
                    # For Optional[T] which is Union[T, None], get the non-None type
                    args = getattr(field_type, "__args__", ())
                    non_none_types = [
                        arg for arg in args if arg is not type(None)  # noqa: E721
                    ]
                    if len(non_none_types) == 1:
                        field_type = non_none_types[0]

                # Handle direct datetime/date fields
                if field_type in (datetime.datetime, datetime.date) and isinstance(
                    value, (int, float, str)
                ):
                    try:
                        if isinstance(value, str):
                            value = float(value)
                        # Use fromtimestamp to preserve local timezone behavior
                        dt = datetime.datetime.fromtimestamp(value)
                        # If the field is specifically a date, convert to date
                        if field_type is datetime.date:
                            result[key] = dt.date()
                        else:
                            result[key] = dt
                    except (ValueError, OSError):
                        result[key] = value  # Keep original value if conversion fails
                # Handle nested models - check if it's a RedisModel subclass
                elif isinstance(value, dict):
                    try:
                        # Check if field_type is a class and subclass of RedisModel
                        if (
                            isinstance(field_type, type)
                            and hasattr(field_type, "model_fields")
                            and field_type.model_fields
                        ):
                            result[key] = convert_timestamp_to_datetime(
                                value, field_type.model_fields
                            )
                        else:
                            result[key] = convert_timestamp_to_datetime(value, {})
                    except (TypeError, AttributeError):
                        result[key] = convert_timestamp_to_datetime(value, {})
                # Handle lists that might contain nested models
                elif isinstance(value, list):
                    # Try to extract the inner type from List[SomeModel]
                    inner_type = None
                    if (
                        hasattr(field_type, "__origin__")
                        and field_type.__origin__ in (list, List)
                        and hasattr(field_type, "__args__")
                        and field_type.__args__
                    ):
                        inner_type = field_type.__args__[0]

                        # Check if the inner type is a nested model
                        try:
                            if (
                                isinstance(inner_type, type)
                                and hasattr(inner_type, "model_fields")
                                and inner_type.model_fields
                            ):
                                result[key] = [
                                    convert_timestamp_to_datetime(
                                        item, inner_type.model_fields
                                    )
                                    for item in value
                                ]
                            else:
                                result[key] = convert_timestamp_to_datetime(value, {})
                        except (TypeError, AttributeError):
                            result[key] = convert_timestamp_to_datetime(value, {})
                    else:
                        result[key] = convert_timestamp_to_datetime(value, {})
                else:
                    result[key] = convert_timestamp_to_datetime(value, {})
            else:
                # For keys not in model_fields, still recurse but with empty field info
                result[key] = convert_timestamp_to_datetime(value, {})
        return result
    elif isinstance(obj, list):
        return [convert_timestamp_to_datetime(item, model_fields) for item in obj]
    else:
        return obj


def convert_bytes_to_base64(obj):
    """Convert bytes objects to base64-encoded strings for storage.

    This is necessary because Redis JSON and the jsonable_encoder cannot
    handle arbitrary binary data. Base64 encoding ensures all byte values
    (0-255) can be safely stored and retrieved.
    """
    import base64

    if isinstance(obj, dict):
        return {key: convert_bytes_to_base64(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [convert_bytes_to_base64(item) for item in obj]
    elif isinstance(obj, bytes):
        return base64.b64encode(obj).decode("ascii")
    else:
        return obj


def convert_base64_to_bytes(obj, model_fields):
    """Convert base64-encoded strings back to bytes based on model field types."""
    import base64

    if isinstance(obj, dict):
        result = {}
        for key, value in obj.items():
            if key in model_fields:
                field_info = model_fields[key]
                field_type = (
                    field_info.annotation if hasattr(field_info, "annotation") else None
                )

                # Handle Optional types - extract the inner type
                if hasattr(field_type, "__origin__") and field_type.__origin__ is Union:
                    # For Optional[T] which is Union[T, None], get the non-None type
                    args = getattr(field_type, "__args__", ())
                    non_none_types = [
                        arg for arg in args if arg is not type(None)  # noqa: E721
                    ]
                    if len(non_none_types) == 1:
                        field_type = non_none_types[0]

                # Handle bytes fields
                if field_type is bytes and isinstance(value, str):
                    try:
                        result[key] = base64.b64decode(value)
                    except (ValueError, TypeError):
                        # If it's not valid base64, keep original value
                        result[key] = value
                # Handle nested models - check if it's a model with fields
                elif isinstance(value, dict):
                    try:
                        if (
                            isinstance(field_type, type)
                            and hasattr(field_type, "model_fields")
                            and field_type.model_fields
                        ):
                            result[key] = convert_base64_to_bytes(
                                value, field_type.model_fields
                            )
                        else:
                            result[key] = convert_base64_to_bytes(value, {})
                    except (TypeError, AttributeError):
                        result[key] = convert_base64_to_bytes(value, {})
                # Handle lists that might contain nested models
                elif isinstance(value, list):
                    # Try to extract the inner type from List[SomeModel]
                    inner_type = None
                    if (
                        hasattr(field_type, "__origin__")
                        and field_type.__origin__ in (list, List)
                        and hasattr(field_type, "__args__")
                        and field_type.__args__
                    ):
                        inner_type = field_type.__args__[0]

                    if inner_type is not None:
                        try:
                            if (
                                isinstance(inner_type, type)
                                and hasattr(inner_type, "model_fields")
                                and inner_type.model_fields
                            ):
                                result[key] = [
                                    (
                                        convert_base64_to_bytes(
                                            item, inner_type.model_fields
                                        )
                                        if isinstance(item, dict)
                                        else item
                                    )
                                    for item in value
                                ]
                            else:
                                result[key] = convert_base64_to_bytes(value, {})
                        except (TypeError, AttributeError):
                            result[key] = convert_base64_to_bytes(value, {})
                    else:
                        result[key] = convert_base64_to_bytes(value, {})
                else:
                    result[key] = convert_base64_to_bytes(value, {})
            else:
                # For keys not in model_fields, still recurse but with empty field info
                result[key] = convert_base64_to_bytes(value, {})
        return result
    elif isinstance(obj, list):
        return [convert_base64_to_bytes(item, model_fields) for item in obj]
    else:
        return obj


def convert_vector_to_bytes(obj, model_fields):
    """Convert list[float] vector fields to packed bytes for HashModel storage.

    Redis Hash fields can only store scalar values (strings, bytes, numbers).
    Vector fields (list[float]) need to be serialized to bytes for storage.
    This uses little-endian float32 packing, matching the format expected by
    RediSearch for vector similarity queries.
    """
    if not isinstance(obj, dict):
        return obj

    result = {}
    for key, value in obj.items():
        if key in model_fields and isinstance(value, list):
            field_info = model_fields[key]
            vector_options = getattr(field_info, "vector_options", None)
            if vector_options is not None and value:
                # Pack floats as little-endian float32 bytes
                try:
                    result[key] = struct.pack(f"<{len(value)}f", *value)
                except struct.error:
                    # If packing fails, keep original value
                    result[key] = value
            else:
                result[key] = value
        else:
            result[key] = value
    return result


def convert_bytes_to_vector(obj, model_fields):
    """Convert packed bytes back to list[float] for vector fields.

    This reverses the conversion done by convert_vector_to_bytes.
    """
    if not isinstance(obj, dict):
        return obj

    result = {}
    for key, value in obj.items():
        if key in model_fields:
            field_info = model_fields[key]
            vector_options = getattr(field_info, "vector_options", None)
            if vector_options is not None and isinstance(value, (bytes, str)):
                # Handle bytes or string (Redis may return as string with decode_responses)
                try:
                    if isinstance(value, str):
                        # If decode_responses=True, we get a string - need to encode back
                        value = value.encode("latin-1")
                    # Unpack little-endian float32 bytes
                    num_floats = len(value) // 4
                    result[key] = list(struct.unpack(f"<{num_floats}f", value))
                except (struct.error, ValueError, UnicodeEncodeError):
                    # If unpacking fails, keep original value
                    result[key] = value
            else:
                result[key] = value
        else:
            result[key] = value
    return result


def convert_empty_strings_to_none(obj, model_fields):
    """Convert empty strings back to None for Optional fields in HashModel.

    HashModel stores None as empty string "" because Redis HSET requires non-null
    values. This function converts empty strings back to None for fields that are
    Optional (Union[T, None]) so Pydantic validation succeeds. (Fixes #254)
    """
    if not isinstance(obj, dict):
        return obj

    result = {}
    for key, value in obj.items():
        if key in model_fields and value == "":
            field_info = model_fields[key]
            field_type = (
                field_info.annotation if hasattr(field_info, "annotation") else None
            )

            # Check if the field is Optional (Union[T, None])
            is_optional = False
            if hasattr(field_type, "__origin__") and field_type.__origin__ is Union:
                args = getattr(field_type, "__args__", ())
                if type(None) in args:
                    is_optional = True

            if is_optional:
                result[key] = None
            else:
                result[key] = value
        else:
            result[key] = value
    return result


class PartialModel:
    """A partial model instance that only contains certain fields.

    Accessing fields that weren't loaded will raise AttributeError.
    This is used for .only() queries to provide partial model instances.
    """

    def __init__(self, model_class, data: dict, loaded_fields: set):
        self.__dict__["_model_class"] = model_class
        self.__dict__["_loaded_fields"] = loaded_fields
        self.__dict__["_data"] = data

        # Set the loaded field values, creating nested partial models where needed
        for field_name, value in data.items():
            if isinstance(value, dict) and field_name in model_class.model_fields:
                # Check if this should be a nested model
                field_info = model_class.model_fields[field_name]
                field_type = getattr(field_info, "annotation", None)

                try:
                    if isinstance(field_type, type) and issubclass(
                        field_type, RedisModel
                    ):
                        # Create a nested partial model
                        nested_loaded_fields = {
                            field.split("__", 1)[1]
                            for field in loaded_fields
                            if field.startswith(f"{field_name}__")
                        }
                        if nested_loaded_fields:
                            nested_partial = PartialModel(
                                model_class=field_type,
                                data=value,
                                loaded_fields=nested_loaded_fields,
                            )
                            self.__dict__[field_name] = nested_partial
                        else:
                            # No deep fields for this nested model, but it's still data
                            self.__dict__[field_name] = value
                    else:
                        # Regular dict field
                        self.__dict__[field_name] = value
                except TypeError:
                    # Not a model class, treat as regular dict
                    self.__dict__[field_name] = value
            else:
                # Regular field
                self.__dict__[field_name] = value

    def __getattribute__(self, name):
        # Allow access to internal attributes and methods
        if name.startswith("_") or name in (
            "model_fields",
            "model_config",
            "__class__",
            "__dict__",
        ):
            return super().__getattribute__(name)

        # Get model class to check if this is a model field
        model_class = super().__getattribute__("_model_class")
        loaded_fields = super().__getattribute__("_loaded_fields")

        # If it's a model field that wasn't loaded, raise an error
        if hasattr(model_class, "model_fields") and name in model_class.model_fields:
            # Check if this field or any deep fields starting with this field were loaded
            field_loaded = name in loaded_fields
            deep_fields_loaded = any(
                field.startswith(f"{name}__") for field in loaded_fields
            )

            if not field_loaded and not deep_fields_loaded:
                raise AttributeError(
                    f"Field '{name}' is missing from this query. "
                    f"Use .only('{name}') or .only({', '.join(repr(field) for field in sorted(loaded_fields.union({name})))}) to include it."
                )

        return super().__getattribute__(name)

    def __getattr__(self, name):
        """Fallback for attribute access - supports flat deep field syntax like 'address__city'."""
        loaded_fields = self._loaded_fields
        model_class = self._model_class

        # Check if this is a deep field that was loaded
        if "__" in name and name in loaded_fields:
            # Extract the value from the nested data structure
            return self._extract_nested_value(self._data, name)

        # Check if this is a model field that wasn't loaded - provide helpful error message
        if hasattr(model_class, "model_fields") and name in model_class.model_fields:
            raise AttributeError(
                f"Field '{name}' was not loaded from this query. "
                f"Use .only('{name}') or .only({', '.join(repr(field) for field in sorted(loaded_fields.union({name})))}) to include it."
            )

        # If not found, raise the standard AttributeError
        raise AttributeError(
            f"'{model_class.__name__}' object has no attribute '{name}'"
        )

    def _extract_nested_value(self, data: dict, field_path: str):
        """Extract nested value from dict using Django-like path syntax."""
        parts = field_path.split("__")
        current = data

        for part in parts:
            if isinstance(current, dict) and part in current:
                current = current[part]
            else:
                return None

        return current

    def __setattr__(self, name, value):
        # Allow setting internal attributes
        if name.startswith("_"):
            self.__dict__[name] = value
        else:
            # For regular fields, check if they were loaded
            if name not in self._loaded_fields:
                raise AttributeError(
                    f"Cannot set field '{name}' - it is missing from this query."
                )
            self.__dict__[name] = value

    def __repr__(self):
        loaded_data = {k: v for k, v in self._data.items() if k in self._loaded_fields}
        return f"Partial{self._model_class.__name__}({loaded_data})"


# For basic exact-match field types like an indexed string, we create a TAG
# field in the RediSearch index. TAG is designed for multi-value fields
# separated by a "separator" character. We're using the field for single values
# (multi-value TAGs will be exposed as a separate field type), and we use the
# pipe character (|) as the separator. There is no way to escape this character
# in hash fields or JSON objects, so if someone indexes a value that includes
# the pipe, we'll warn but allow, and then warn again if they try to query for
# values that contain this separator.
SINGLE_VALUE_TAG_FIELD_SEPARATOR = "|"

# This is the default field separator in RediSearch. We need it to determine if
# someone has accidentally passed in the field separator with string value of a
# multi-value field lookup, like a IN or NOT_IN.
DEFAULT_REDISEARCH_FIELD_SEPARATOR = ","

ERRORS_URL = "https://github.com/redis/redis-om-python/blob/main/docs/errors.md"


def get_outer_type(field: PydanticFieldInfo):
    if hasattr(field, "outer_type_"):
        return field.outer_type_
    elif isinstance(field.annotation, type) or is_supported_container_type(
        field.annotation
    ):
        return field.annotation
    elif not hasattr(field.annotation, "__args__"):
        return None
    else:
        return field.annotation.__args__[0]  # type: ignore


class RedisModelError(Exception):
    """Raised when a problem exists in the definition of a RedisModel."""


class QuerySyntaxError(Exception):
    """Raised when a query is constructed improperly."""


class NotFoundError(Exception):
    """Raised when a query found no results."""


class Operators(Enum):
    EQ = 1
    NE = 2
    LT = 3
    LE = 4
    GT = 5
    GE = 6
    OR = 7
    AND = 8
    NOT = 9
    IN = 10
    NOT_IN = 11
    LIKE = 12
    ALL = 13
    STARTSWITH = 14
    ENDSWITH = 15
    CONTAINS = 16
    TRUE = 17
    FALSE = 18

    def __str__(self):
        return str(self.name)


ExpressionOrModelField = Union["Expression", "NegatedExpression", PydanticFieldInfo]


def embedded(cls):
    """
    Mark a model as embedded to avoid creating multiple indexes if the model is
    only ever used embedded within other models.
    """
    setattr(cls.Meta, "embedded", True)


def is_supported_container_type(typ: Optional[type]) -> bool:
    # TODO: Wait, why don't we support indexing sets?
    if typ == list or typ == tuple or typ == Literal:
        return True
    unwrapped = get_origin(typ)
    return unwrapped == list or unwrapped == tuple or unwrapped == Literal


def validate_model_fields(model: Type["RedisModel"], field_values: Dict[str, Any]):
    for field_name in field_values.keys():
        if "__" in field_name:
            obj = model
            for sub_field in field_name.split("__"):
                if not isinstance(obj, ModelMeta) and hasattr(obj, "field"):
                    obj = getattr(obj, "field").annotation

                if not hasattr(obj, sub_field):
                    raise QuerySyntaxError(
                        f"The update path {field_name} contains a field that does not "
                        f"exist on {model.__name__}. The field is: {sub_field}"
                    )
                obj = getattr(obj, sub_field)
            return

        if field_name not in model.model_fields:  # type: ignore
            raise QuerySyntaxError(
                f"The field {field_name} does not exist on the model {model.__name__}"
            )


def decode_redis_value(
    obj: Union[List[bytes], Dict[bytes, bytes], bytes], encoding: str
) -> Union[List[str], Dict[str, str], str]:
    """Decode a binary-encoded Redis hash into the specified encoding."""
    if isinstance(obj, list):
        return [v.decode(encoding) for v in obj]
    if isinstance(obj, dict):
        return {
            key.decode(encoding): value.decode(encoding) for key, value in obj.items()
        }
    elif isinstance(obj, bytes):
        return obj.decode(encoding)


# TODO: replace with `str.removeprefix()` when only Python 3.9+ is supported
def remove_prefix(value: str, prefix: str) -> str:
    """Remove a prefix from a string."""
    if value.startswith(prefix):
        value = value[len(prefix) :]  # noqa: E203
    return value


class PipelineError(Exception):
    """A Redis pipeline error."""


def verify_pipeline_response(
    response: List[Union[bytes, str]], expected_responses: int = 0
):
    # TODO: More generic pipeline verification here (what else is possible?),
    #  plus hash and JSON-specific verifications in separate functions.
    actual_responses = len(response)
    if actual_responses != expected_responses:
        raise PipelineError(
            f"We expected {expected_responses}, but the Redis "
            f"pipeline returned {actual_responses} responses."
        )


@dataclasses.dataclass
class NegatedExpression:
    """A negated Expression object.

    For now, this is a separate dataclass from Expression that acts as a facade
    around an Expression, indicating to model code (specifically, code
    responsible for querying) to negate the logic in the wrapped Expression. A
    better design is probably possible, maybe at least an ExpressionProtocol?
    """

    expression: "Expression"

    def __invert__(self):
        return self.expression

    def __and__(self, other):
        return Expression(
            left=self, op=Operators.AND, right=other, parents=self.expression.parents
        )

    def __or__(self, other):
        return Expression(
            left=self, op=Operators.OR, right=other, parents=self.expression.parents
        )

    @property
    def left(self):
        return self.expression.left

    @property
    def right(self):
        return self.expression.right

    @property
    def op(self):
        return self.expression.op

    @property
    def name(self):
        if self.expression.op is Operators.EQ:
            return f"NOT {self.expression.name}"
        else:
            return f"{self.expression.name} NOT"

    @property
    def tree(self):
        return render_tree(self)


@dataclasses.dataclass
class Expression:
    op: Operators
    left: Optional[ExpressionOrModelField]
    right: Optional[ExpressionOrModelField]
    parents: List[Tuple[str, "RedisModel"]]

    def __invert__(self):
        return NegatedExpression(self)

    def __and__(self, other: ExpressionOrModelField):
        return Expression(
            left=self, op=Operators.AND, right=other, parents=self.parents
        )

    def __or__(self, other: ExpressionOrModelField):
        return Expression(left=self, op=Operators.OR, right=other, parents=self.parents)

    @property
    def name(self):
        return str(self.op)

    @property
    def tree(self):
        return render_tree(self)


@dataclasses.dataclass
class KNNExpression:
    k: int
    vector_field: "ExpressionProxy"
    score_field: "ExpressionProxy"
    reference_vector: bytes

    def __str__(self):
        return f"KNN $K @{self.vector_field_name} $knn_ref_vector AS {self.score_field_name}"

    @property
    def query_params(self) -> Dict[str, Union[str, bytes]]:
        return {"K": str(self.k), "knn_ref_vector": self.reference_vector}

    @property
    def score_field_name(self) -> str:
        return self.score_field.field.name

    @property
    def vector_field_name(self) -> str:
        return self.vector_field.field.name


ExpressionOrNegated = Union[Expression, NegatedExpression]


class ExpressionProxy:
    def __init__(self, field: "FieldInfo", parents: List[Tuple[str, "RedisModel"]]):
        self.field = field
        self.parents = parents.copy()  # Ensure a copy is stored

    def __eq__(self, other: Any) -> Expression:  # type: ignore[override]
        return Expression(
            left=self.field, op=Operators.EQ, right=other, parents=self.parents
        )

    def __ne__(self, other: Any) -> Expression:  # type: ignore[override]
        return Expression(
            left=self.field, op=Operators.NE, right=other, parents=self.parents
        )

    def __lt__(self, other: Any) -> Expression:
        return Expression(
            left=self.field, op=Operators.LT, right=other, parents=self.parents
        )

    def __le__(self, other: Any) -> Expression:
        return Expression(
            left=self.field, op=Operators.LE, right=other, parents=self.parents
        )

    def __gt__(self, other: Any) -> Expression:
        return Expression(
            left=self.field, op=Operators.GT, right=other, parents=self.parents
        )

    def __ge__(self, other: Any) -> Expression:
        return Expression(
            left=self.field, op=Operators.GE, right=other, parents=self.parents
        )

    def __mod__(self, other: Any) -> Expression:
        return Expression(
            left=self.field, op=Operators.LIKE, right=other, parents=self.parents
        )

    def __lshift__(self, other: Any) -> Expression:
        return Expression(
            left=self.field, op=Operators.IN, right=other, parents=self.parents
        )

    def __rshift__(self, other: Any) -> Expression:
        return Expression(
            left=self.field, op=Operators.NOT_IN, right=other, parents=self.parents
        )

    def startswith(self, other: Any) -> Expression:
        return Expression(
            left=self.field, op=Operators.STARTSWITH, right=other, parents=self.parents
        )

    def endswith(self, other: Any) -> Expression:
        return Expression(
            left=self.field, op=Operators.ENDSWITH, right=other, parents=self.parents
        )

    def contains(self, other: Any) -> Expression:
        return Expression(
            left=self.field, op=Operators.CONTAINS, right=other, parents=self.parents
        )

    def __getattr__(self, item):
        if item.startswith("__"):
            raise AttributeError("cannot invoke __getattr__ with reserved field")
        outer_type = outer_type_or_annotation(self.field)
        if is_supported_container_type(outer_type):
            embedded_cls = get_args(outer_type)
            if not embedded_cls:
                raise QuerySyntaxError(
                    "In order to query on a list field, you must define "
                    "the contents of the list with a type annotation, like: "
                    f"orders: List[Order]. Docs: {ERRORS_URL}#E1"
                )
            embedded_cls = embedded_cls[0]
            attr = getattr(embedded_cls, item)
        else:
            attr = getattr(outer_type, item)

        if isinstance(attr, self.__class__):
            # Clone the parents to ensure isolation
            new_parents = self.parents.copy()
            new_parent = (self.field.name, outer_type)
            if new_parent not in new_parents:
                new_parents.append(new_parent)
            attr.parents = new_parents
        return attr


class QueryNotSupportedError(Exception):
    """The attempted query is not supported."""


class RediSearchFieldTypes(Enum):
    TEXT = "TEXT"
    TAG = "TAG"
    NUMERIC = "NUMERIC"
    GEO = "GEO"


DEFAULT_PAGE_SIZE = 1000


class FindQuery:
    def __init__(
        self,
        expressions: Sequence[ExpressionOrNegated],
        model: Type["RedisModel"],
        knn: Optional[KNNExpression] = None,
        offset: int = 0,
        limit: Optional[int] = None,
        page_size: int = DEFAULT_PAGE_SIZE,
        sort_fields: Optional[List[str]] = None,
        projected_fields: Optional[List[str]] = None,
        nocontent: bool = False,
        return_as_dict: bool = False,
    ):
        if not has_redisearch(model.db()):
            raise RedisModelError(
                "Your Redis instance does not have either the RediSearch module "
                "or RedisJSON module installed. Querying requires that your Redis "
                "instance has one of these modules installed."
            )

        self.expressions = expressions
        self.model = model
        self.knn = knn
        self.offset = offset
        self.limit = limit or (self.knn.k if self.knn else DEFAULT_PAGE_SIZE)
        self.page_size = page_size
        self.nocontent = nocontent

        if sort_fields:
            self.sort_fields = self.validate_sort_fields(sort_fields)
        elif self.knn:
            self.sort_fields = [self.knn.score_field_name]
        else:
            self.sort_fields = []

        if projected_fields:
            self.projected_fields = self.validate_projected_fields(projected_fields)
        else:
            self.projected_fields = []

        self.return_as_dict = return_as_dict

        self._expression = None
        self._query: Optional[str] = None
        self._pagination: List[str] = []
        self._model_cache: List[RedisModel] = []

    def dict(self) -> Dict[str, Any]:
        return dict(
            model=self.model,
            offset=self.offset,
            page_size=self.page_size,
            limit=self.limit,
            expressions=copy(self.expressions),
            sort_fields=copy(self.sort_fields),
            projected_fields=copy(self.projected_fields),
            nocontent=self.nocontent,
            return_as_dict=self.return_as_dict,
        )

    def copy(self, **kwargs):
        original = self.dict()
        original.update(**kwargs)
        return FindQuery(**original)

    @property
    def pagination(self):
        if self._pagination:
            return self._pagination
        self._pagination = self.resolve_redisearch_pagination()
        return self._pagination

    @property
    def expression(self):
        if self._expression:
            return self._expression
        if self.expressions:
            self._expression = reduce(operator.and_, self.expressions)
        else:
            self._expression = Expression(
                left=None, right=None, op=Operators.ALL, parents=[]
            )
        return self._expression

    @property
    def query(self):
        """
        Resolve and return the RediSearch query for this FindQuery.

        NOTE: We cache the resolved query string after generating it. This should be OK
        because all mutations of FindQuery through public APIs return a new FindQuery instance.
        """
        if self._query:
            return self._query
        self._query = self._resolve_redisearch_query(self.expression)
        if self.knn:
            # Always wrap the filter expression in parentheses when combining with KNN,
            # unless it's the wildcard "*". This ensures OR expressions like
            # "(A)| (B)" become "((A)| (B))=>[KNN ...]" instead of the invalid
            # "(A)| (B)=>[KNN ...]" where KNN only applies to the second term.
            if self._query != "*":
                self._query = f"({self._query})"
            self._query += f"=>[{self.knn}]"
        # RETURN clause should be added to args, not to the query string
        return self._query

    def validate_projected_fields(self, projected_fields: List[str]):
        for field in projected_fields:
            if "__" in field:
                # Deep field syntax - validate the path exists
                self._validate_deep_field_path(field)
            elif field not in self.model.model_fields:  # type: ignore
                raise QueryNotSupportedError(
                    f"You tried to return the field {field}, but that field "
                    f"does not exist on the model {self.model}"
                )
        return projected_fields

    def _validate_deep_field_path(self, field_path: str):
        """Validate that a deep field path like 'address__city' exists in the model."""
        parts = field_path.split("__")
        current_model = self.model
        current_field_name = parts[0]

        # Check the first part exists in the model
        if current_field_name not in current_model.model_fields:
            raise QueryNotSupportedError(
                f"You tried to return the field {field_path}, but the root field "
                f"{current_field_name} does not exist on the model {current_model}"
            )

        # Walk through the nested field path
        for i, field_name in enumerate(parts):
            if i == 0:
                # First part - get the field info
                field_info = current_model.model_fields[field_name]
                field_type = getattr(field_info, "annotation", None)

                # Check if it's an embedded model
                try:
                    if isinstance(field_type, type) and issubclass(
                        field_type, RedisModel
                    ):
                        current_model = field_type
                    elif field_type == dict:
                        # Dict fields - we can't validate nested paths, just accept them
                        return
                    else:
                        raise QueryNotSupportedError(
                            f"Deep field path {field_path} requires {field_name} to be an "
                            f"embedded model or dict, but it is {field_type}"
                        )
                except TypeError:
                    raise QueryNotSupportedError(
                        f"Deep field path {field_path} requires {field_name} to be an "
                        f"embedded model or dict, but it is {field_type}"
                    )
            else:
                # Nested parts - check they exist in the embedded model
                if (
                    not hasattr(current_model, "model_fields")
                    or field_name not in current_model.model_fields
                ):
                    raise QueryNotSupportedError(
                        f"You tried to return the field {field_path}, but the nested field "
                        f"{field_name} does not exist on the embedded model {current_model}"
                    )

                # Update current_model for further nesting if needed
                if i < len(parts) - 1:  # Not the last part
                    field_info = current_model.model_fields[field_name]
                    field_type = getattr(field_info, "annotation", None)
                    try:
                        if isinstance(field_type, type) and issubclass(
                            field_type, RedisModel
                        ):
                            current_model = field_type
                        elif field_type == dict:
                            return  # Can't validate further into dict
                        else:
                            raise QueryNotSupportedError(
                                f"Deep field path {field_path} requires {field_name} to be an "
                                f"embedded model or dict for further nesting"
                            )
                    except TypeError:
                        raise QueryNotSupportedError(
                            f"Deep field path {field_path} requires {field_name} to be an "
                            f"embedded model or dict for further nesting"
                        )

    def _parse_projected_results(self, res: Any) -> List[Dict[str, Any]]:
        """Parse results when using RETURN clause with specific fields."""

        def to_string(s):
            if isinstance(s, (str,)):
                return s
            elif isinstance(s, bytes):
                return s.decode(errors="ignore")
            else:
                return s

        docs = []
        step = 2  # Because the result has content
        offset = 1  # The first item is the count of total matches.

        for i in range(1, len(res), step):
            if res[i + offset] is None:
                continue
            # When using RETURN, we get flat key-value pairs
            raw_fields: Dict[str, str] = dict(
                zip(
                    map(to_string, res[i + offset][::2]),
                    map(to_string, res[i + offset][1::2]),
                )
            )
            # Convert raw Redis strings to properly typed values
            converted_fields = self._convert_projected_fields(raw_fields)
            docs.append(converted_fields)
        return docs

    def _convert_projected_fields(self, raw_data: Dict[str, str]) -> Dict[str, Any]:
        """Convert raw Redis string values to properly typed values using model field info."""

        # Fast path: Try creating a single model instance with all projected fields
        # This is more efficient and handles field interdependencies
        try:
            # Use model_validate instead of model_construct to ensure type conversion
            temp_model = self.model.model_validate(raw_data, strict=False)

            # Use model_dump() to efficiently extract all converted values
            all_converted = temp_model.model_dump()

            # Filter to only the fields we actually projected
            converted_data = {
                k: all_converted[k] for k in raw_data.keys() if k in all_converted
            }

            return converted_data

        except Exception:  # nosec B110
            # If validation fails (due to missing required fields), fall back to individual conversion
            # This is expected for partial field sets
            pass

        # Fallback path: Convert each field individually using type information
        converted_data = {}
        for field_name, raw_value in raw_data.items():
            if field_name not in self.model.model_fields:
                # Unknown field, keep as string
                converted_data[field_name] = raw_value
                continue

            try:
                field_info = self.model.model_fields[field_name]

                # Get the field type annotation
                if hasattr(field_info, "annotation"):
                    field_type = field_info.annotation
                else:
                    field_type = getattr(field_info, "type_", str)

                # Handle common type conversions directly for efficiency
                if field_type == int:
                    converted_data[field_name] = int(raw_value)
                elif field_type == float:
                    converted_data[field_name] = float(raw_value)
                elif field_type == bool:
                    # Redis may store bool as "True"/"False" or "1"/"0"
                    converted_data[field_name] = raw_value.lower() in (
                        "true",
                        "1",
                        "yes",
                    )
                elif field_type == str:
                    converted_data[field_name] = raw_value
                else:
                    # For complex types, keep as string (could be enhanced later)
                    converted_data[field_name] = raw_value

            except (ValueError, TypeError):
                # If conversion fails, keep the raw string value
                converted_data[field_name] = raw_value

        return converted_data

    def _parse_projected_models(self, res: Any) -> List[PartialModel]:
        """Parse results when using RETURN clause to create partial model instances."""
        projected_dicts = self._parse_projected_results(res)

        # Create partial model instances that will raise errors for missing fields
        partial_models = []
        for data in projected_dicts:
            partial_model = PartialModel(
                model_class=self.model,
                data=data,
                loaded_fields=set(self.projected_fields),
            )
            partial_models.append(partial_model)

        return partial_models

    def _has_complex_projected_fields(self) -> bool:
        """Check if any projected fields are complex types that RediSearch RETURN can't handle."""
        # Only check for JsonModel - HashModel doesn't support complex fields anyway
        if not any(base.__name__ == "JsonModel" for base in self.model.__mro__):
            return False

        for field_name in self.projected_fields:
            # Deep field syntax always requires complex handling
            if "__" in field_name:
                return True

            if field_name not in self.model.model_fields:
                continue

            field_info = self.model.model_fields[field_name]
            field_type = getattr(field_info, "annotation", None)

            # Check for dict fields
            if field_type == dict:
                return True

            # Check for embedded models (subclasses of RedisModel)
            try:
                if isinstance(field_type, type) and issubclass(field_type, RedisModel):
                    return True
            except TypeError:
                pass

            # Check for List/Dict generic types
            origin = get_origin(field_type)
            if origin in (list, dict, tuple):
                return True

        return False

    async def _parse_full_document_projection_as_dict(
        self, res: Any
    ) -> List[Dict[str, Any]]:
        """Parse results using efficient JSON.GET with JSONPath for deep field projection."""
        # Check if this is a JsonModel - only JsonModels support JSON.GET
        is_json_model = any(base.__name__ == "JsonModel" for base in self.model.__mro__)

        if is_json_model:
            return await self._parse_json_path_projection_as_dict(res)
        else:
            # Fallback for HashModel (shouldn't happen since HashModel doesn't support deep fields)
            return await self._parse_fallback_projection_as_dict(res)

    async def _parse_json_path_projection_as_dict(
        self, res: Any
    ) -> List[Dict[str, Any]]:
        """Use JSON.GET with JSONPath to efficiently extract deep fields."""
        # Extract document keys from search results
        doc_keys = []
        step = 2  # Because the result has content

        for i in range(1, len(res), step):
            if i < len(res):
                doc_key = res[i]  # Document key
                if isinstance(doc_key, bytes):
                    doc_key = doc_key.decode("utf-8")
                doc_keys.append(doc_key)

        if not doc_keys:
            return []

        # Convert field names to JSONPath expressions
        json_paths = []
        for field_name in self.projected_fields:
            if "__" in field_name:
                # Deep field: address__city -> $.address.city
                json_path = "$." + field_name.replace("__", ".")
            else:
                # Regular field: name -> $.name
                json_path = f"$.{field_name}"
            json_paths.append(json_path)

        # Batch get all projected fields for all documents
        projected_results = []
        db = self.model.db()

        for doc_key in doc_keys:
            try:
                # Get multiple JSONPath expressions in one call
                result = await db.json().get(doc_key, *json_paths)

                if result is None:
                    continue

                # Convert JSONPath results back to field names
                projected_data = {}
                if isinstance(result, dict):
                    # Multiple paths returned as dict
                    for json_path, values in result.items():
                        # Convert $.address.city back to address__city
                        field_name = json_path[2:].replace(
                            ".", "__"
                        )  # Remove "$." and convert dots to __
                        # JSON.GET returns arrays, take first value
                        if values and len(values) > 0:
                            projected_data[field_name] = values[0]
                else:
                    # Single path - shouldn't happen with multiple paths, but handle it
                    if len(json_paths) == 1:
                        field_name = json_paths[0][2:].replace(".", "__")
                        if isinstance(result, list) and result:
                            projected_data[field_name] = result[0]

                projected_results.append(projected_data)

            except Exception:  # nosec B112
                # If JSON.GET fails (connection, parsing, etc.), skip this document
                continue

        return projected_results

    async def _parse_fallback_projection_as_dict(
        self, res: Any
    ) -> List[Dict[str, Any]]:
        """Fallback method using full document parsing (for HashModel or when JSON.GET fails)."""
        # Get full model instances first
        full_models = self.model.from_redis(res, self.knn)

        # Project only the requested fields
        projected_results = []
        for model in full_models:
            model_data = model.model_dump()
            projected_data = {}

            for field_name in self.projected_fields:
                if "__" in field_name:
                    # Deep field syntax - extract nested value
                    nested_value = self._extract_nested_value(model_data, field_name)
                    if nested_value is not None:
                        projected_data[field_name] = nested_value
                elif field_name in model_data:
                    projected_data[field_name] = model_data[field_name]

            projected_results.append(projected_data)

        return projected_results

    def _extract_nested_value(self, data: Dict[str, Any], field_path: str) -> Any:
        """Extract nested value from dict using Django-like path syntax."""
        parts = field_path.split("__")
        current = data

        for part in parts:
            if isinstance(current, dict) and part in current:
                current = current[part]
            else:
                return None

        return current

    async def _parse_full_document_projection_as_models(
        self, res: Any
    ) -> List[PartialModel]:
        """Parse full document results and project only requested fields as partial models."""
        # Get the projected data first
        projected_dicts = await self._parse_full_document_projection_as_dict(res)

        # Create partial model instances with nested structure
        partial_models = []
        for data in projected_dicts:
            # Construct nested partial model data
            nested_data = self._construct_nested_partial_data(data)
            partial_model = PartialModel(
                model_class=self.model,
                data=nested_data,
                loaded_fields=set(self.projected_fields),
            )
            partial_models.append(partial_model)

        return partial_models

    def _construct_nested_partial_data(
        self, flat_data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Construct nested data structure from flat deep field results."""
        nested_data: Dict[str, Any] = {}

        for field_name, value in flat_data.items():
            if "__" in field_name:
                # Deep field - construct nested structure
                self._set_nested_value(nested_data, field_name, value)
            else:
                # Regular field - set directly
                nested_data[field_name] = value

        return nested_data

    def _set_nested_value(self, data: Dict[str, Any], field_path: str, value: Any):
        """Set a nested value in data dict using Django-like path syntax."""
        parts = field_path.split("__")
        current = data

        # Navigate/create the nested structure
        for i, part in enumerate(parts[:-1]):
            if part not in current:
                # Create a nested dict for the next level
                current[part] = {}
            current = current[part]

        # Set the final value
        current[parts[-1]] = value

    @property
    def query_params(self):
        params: List[Union[str, bytes]] = []
        if self.knn:
            params += [attr for kv in self.knn.query_params.items() for attr in kv]
        return params

    def validate_sort_fields(self, sort_fields: List[str]):
        for sort_field in sort_fields:
            field_name = sort_field.lstrip("-")
            if self.knn and field_name == self.knn.score_field_name:
                continue
            if field_name not in self.model.model_fields:  # type: ignore
                raise QueryNotSupportedError(
                    f"You tried sort by {field_name}, but that field "
                    f"does not exist on the model {self.model}"
                )
            field_proxy: ExpressionProxy = getattr(self.model, field_name)

            if (
                field_proxy.field.sortable is not True
                and field_proxy.field.index is not True
            ):
                raise QueryNotSupportedError(
                    f"You tried sort by {field_name}, but {self.model} does "
                    f"not define that field as sortable or indexed. Docs: {ERRORS_URL}#E2"
                )
        return sort_fields

    @staticmethod
    def resolve_field_type(field: "FieldInfo", op: Operators) -> RediSearchFieldTypes:
        field_info: Union[FieldInfo, PydanticFieldInfo] = field

        typ = get_outer_type(field_info)

        if getattr(field_info, "primary_key", None) is True:
            return RediSearchFieldTypes.TAG
        elif typ in [CoordinateType, Coordinates]:
            return RediSearchFieldTypes.GEO
        elif op is Operators.LIKE:
            fts = getattr(field_info, "full_text_search", None)
            if fts is not True:  # Could be PydanticUndefined
                raise QuerySyntaxError(
                    f"You tried to do a full-text search on the field '{field.name}', "
                    f"but the field is not indexed for full-text search. Use the "
                    f"full_text_search=True option. Docs: {ERRORS_URL}#E3"
                )
            return RediSearchFieldTypes.TEXT

        field_type = outer_type_or_annotation(field)

        if not isinstance(field_type, type):
            field_type = field_type.__origin__

        container_type = get_origin(field_type)

        if is_supported_container_type(container_type):
            # NOTE: A list of strings, like:
            #
            #     tarot_cards: List[str] = field(index=True)
            #
            # becomes a TAG field, which means that users can run equality and
            # membership queries on values.
            #
            # Meanwhile, a list of RedisModels, like:
            #
            #     friends: List[Friend] = field(index=True)
            #
            # is not itself directly indexed, but instead, we index any fields
            # within the model inside the list marked as `index=True`.
            return RediSearchFieldTypes.TAG
        elif container_type is not None:
            raise QuerySyntaxError(
                "Only lists and tuples are supported for multi-value fields. "
                f"Docs: {ERRORS_URL}#E4"
            )
        elif field_type is bool:
            return RediSearchFieldTypes.TAG
        elif is_numeric_type(field_type):
            # Index numeric Python types as NUMERIC fields, so we can support
            # range queries.
            return RediSearchFieldTypes.NUMERIC
        else:
            # TAG fields are the default field type and support equality and
            # membership queries, though membership (and the multi-value nature
            # of the field) are hidden from users unless they explicitly index
            # multiple values, with either a list or tuple,
            # e.g.,
            #    favorite_foods: List[str] = field(index=True)
            return RediSearchFieldTypes.TAG

    @staticmethod
    def expand_tag_value(value):
        if isinstance(value, str):
            return escaper.escape(value)
        if isinstance(value, bytes):
            # TODO: We don't decode bytes objects passed as input. Should we?
            # TODO: TAG indexes fail on JSON arrays of numbers -- only strings
            #  are allowed -- what happens if we save an array of bytes?
            return value
        try:
            return "|".join([escaper.escape(str(v)) for v in value])
        except TypeError:
            log.debug(
                "Escaping single non-iterable value used for an IN or "
                "NOT_IN query: %s",
                value,
            )
        return escaper.escape(str(value))

    @classmethod
    def resolve_value(
        cls,
        field_name: str,
        field_type: RediSearchFieldTypes,
        field_info: PydanticFieldInfo,
        op: Operators,
        value: Any,
        parents: List[Tuple[str, "RedisModel"]],
        model_class: Optional[Type["RedisModel"]] = None,
    ) -> str:
        # The 'field_name' should already include the correct prefix
        result = ""
        if parents:
            prefix = "_".join([p[0] for p in parents])
            field_name = f"{prefix}_{field_name}"
        if field_type is RediSearchFieldTypes.TEXT:
            result = f"@{field_name}_fts:"
            if op is Operators.EQ:
                result += f'"{value}"'
            elif op is Operators.NE:
                result = f'-({result}"{value}")'
            elif op is Operators.LIKE:
                result += value
            else:
                raise QueryNotSupportedError(
                    "Only equals (=), not-equals (!=), and like() "
                    "comparisons are supported for TEXT fields. "
                    f"Docs: {ERRORS_URL}#E5"
                )
        elif field_type is RediSearchFieldTypes.NUMERIC:
            # Helper to convert a single value for NUMERIC queries
            def convert_numeric_value(v):
                # Convert Enum to its value (fixes #108)
                if isinstance(v, Enum):
                    v = v.value
                # Convert datetime objects to timestamps
                if isinstance(v, (datetime.datetime, datetime.date)):
                    if isinstance(v, datetime.date) and not isinstance(
                        v, datetime.datetime
                    ):
                        # Convert date to datetime at midnight
                        v = datetime.datetime.combine(v, datetime.time.min)
                    v = v.timestamp()
                return v

            if op is Operators.IN:
                # Handle IN operator for NUMERIC fields (fixes #499)
                # Convert each value and create OR of range queries
                converted_values = [convert_numeric_value(v) for v in value]
                parts = [f"(@{field_name}:[{v} {v}])" for v in converted_values]
                result += "|".join(parts)
            elif op is Operators.NOT_IN:
                # Handle NOT_IN operator for NUMERIC fields
                converted_values = [convert_numeric_value(v) for v in value]
                parts = [f"(@{field_name}:[{v} {v}])" for v in converted_values]
                result += f"-({' | '.join(parts)})"
            else:
                value = convert_numeric_value(value)

                if op is Operators.EQ:
                    result += f"@{field_name}:[{value} {value}]"
                elif op is Operators.NE:
                    result += f"-(@{field_name}:[{value} {value}])"
                elif op is Operators.GT:
                    result += f"@{field_name}:[({value} +inf]"
                elif op is Operators.LT:
                    result += f"@{field_name}:[-inf ({value}]"
                elif op is Operators.GE:
                    result += f"@{field_name}:[{value} +inf]"
                elif op is Operators.LE:
                    result += f"@{field_name}:[-inf {value}]"
        # TODO: How will we know the difference between a multi-value use of a TAG
        #  field and our hidden use of TAG for exact-match queries?
        elif field_type is RediSearchFieldTypes.TAG:
            if op is Operators.EQ:
                separator_char = getattr(
                    field_info, "separator", SINGLE_VALUE_TAG_FIELD_SEPARATOR
                )
                if value == separator_char:
                    # The value is ONLY the TAG field separator character --
                    # this is not going to work.
                    log.warning(
                        "Your query against the field %s is for a single character, %s, "
                        "that is used internally by Redis OM Python. We must ignore "
                        "this portion of the query. Please review your query to find "
                        "an alternative query that uses a string containing more than "
                        "just the character %s.",
                        field_name,
                        separator_char,
                        separator_char,
                    )
                    return ""
                if isinstance(value, bool):
                    # For HashModel, convert boolean to "1"/"0" to match storage format
                    # For JsonModel, keep as boolean since JSON supports native booleans
                    if model_class:
                        # Check if this is a HashModel by checking the class hierarchy
                        is_hash_model = any(
                            base.__name__ == "HashModel" for base in model_class.__mro__
                        )
                        bool_value = ("1" if value else "0") if is_hash_model else value
                    else:
                        bool_value = value
                    result = "@{field_name}:{{{value}}}".format(
                        field_name=field_name, value=bool_value
                    )
                elif isinstance(value, int):
                    # This if will hit only if the field is a primary key of type int
                    result = f"@{field_name}:[{value} {value}]"
                elif separator_char in value:
                    # The value contains the TAG field separator. We can work
                    # around this by breaking apart the values and unioning them
                    # with multiple field:{} queries.
                    values: filter = filter(None, value.split(separator_char))
                    for value in values:
                        value = escaper.escape(value)
                        result += "@{field_name}:{{{value}}}".format(
                            field_name=field_name, value=value
                        )
                else:
                    value = escaper.escape(value)
                    result += "@{field_name}:{{{value}}}".format(
                        field_name=field_name, value=value
                    )
            elif op is Operators.NE:
                value = escaper.escape(value)
                result += "-(@{field_name}:{{{value}}})".format(
                    field_name=field_name, value=value
                )
            elif op is Operators.IN:
                expanded_value = cls.expand_tag_value(value)
                result += "(@{field_name}:{{{expanded_value}}})".format(
                    field_name=field_name, expanded_value=expanded_value
                )
            elif op is Operators.NOT_IN:
                # TODO: Implement NOT_IN, test this...
                expanded_value = cls.expand_tag_value(value)
                result += "-(@{field_name}:{{{expanded_value}}})".format(
                    field_name=field_name, expanded_value=expanded_value
                )
            elif op is Operators.STARTSWITH:
                expanded_value = cls.expand_tag_value(value)
                result += "(@{field_name}:{{{expanded_value}*}})".format(
                    field_name=field_name, expanded_value=expanded_value
                )
            elif op is Operators.ENDSWITH:
                expanded_value = cls.expand_tag_value(value)
                result += "(@{field_name}:{{*{expanded_value}}})".format(
                    field_name=field_name, expanded_value=expanded_value
                )
            elif op is Operators.CONTAINS:
                expanded_value = cls.expand_tag_value(value)
                result += "(@{field_name}:{{*{expanded_value}*}})".format(
                    field_name=field_name, expanded_value=expanded_value
                )

        elif field_type is RediSearchFieldTypes.GEO:
            if not isinstance(value, GeoFilter):
                raise QuerySyntaxError(
                    "You can only use a GeoFilter object with a GEO field."
                )

            if op is Operators.EQ:
                result += f"@{field_name}:[{value}]"

        return result

    def resolve_redisearch_pagination(self):
        """Resolve pagination options for a query."""
        return ["LIMIT", self.offset, self.limit]

    def resolve_redisearch_sort_fields(self):
        """Resolve sort options for a query."""
        if not self.sort_fields:
            return
        fields = []
        for f in self.sort_fields:
            direction = "desc" if f.startswith("-") else "asc"
            fields.extend([f.lstrip("-"), direction])
        if self.sort_fields:
            return ["SORTBY", *fields]

    def _resolve_redisearch_query(self, expression: ExpressionOrNegated) -> str:
        """
        Resolve an arbitrarily deep expression into a single RediSearch query string.

        This method is complex. Note the following:

        1. This method makes a recursive call to itself when it finds that
           either the left or right operand contains another expression.

        2. An expression might be in a "negated" form, which means that the user
           gave us an expression like ~(Member.age == 30), or in other words,
           "Members whose age is NOT 30." Thus, a negated expression is one in
           which the meaning of an expression is inverted. If we find a negated
           expression, we need to add the appropriate "NOT" syntax but can
           otherwise use the resolved RediSearch query for the expression as-is.

        3. The final resolution of an expression should be a left operand that's
           a ModelField, an operator, and a right operand that's NOT a ModelField.
           With an IN or NOT_IN operator, the right operand can be a sequence
           type, but otherwise, sequence types are converted to strings.

        TODO: When the operator is not IN or NOT_IN, detect a sequence type (other
         than strings, which are allowed) and raise an exception.
        """
        field_type = None
        field_name = None
        field_info = None
        encompassing_expression_is_negated = False
        result = ""

        if isinstance(expression, NegatedExpression):
            encompassing_expression_is_negated = True
            expression = expression.expression

        if expression.op is Operators.ALL:
            if encompassing_expression_is_negated:
                raise QueryNotSupportedError(
                    "You cannot negate a query for all results."
                )
            return "*"

        if isinstance(expression.left, Expression) or isinstance(
            expression.left, NegatedExpression
        ):
            result += f"({self._resolve_redisearch_query(expression.left)})"
        elif isinstance(expression.left, FieldInfo):
            field_type = self.__class__.resolve_field_type(
                expression.left, expression.op
            )
            field_name = expression.left.name
            field_info = expression.left
            if not field_info or not getattr(field_info, "index", None):
                raise QueryNotSupportedError(
                    f"You tried to query by a field ({field_name}) "
                    f"that isn't indexed. Docs: {ERRORS_URL}#E6"
                )
        else:
            raise QueryNotSupportedError(
                "A query expression should start with either a field "
                f"or an expression enclosed in parentheses. Docs: {ERRORS_URL}#E7"
            )

        right = expression.right

        if isinstance(right, Expression) or isinstance(right, NegatedExpression):
            if expression.op == Operators.AND:
                result += " "
            elif expression.op == Operators.OR:
                result += "| "
            else:
                raise QueryNotSupportedError(
                    "You can only combine two query expressions with"
                    f"AND (&) or OR (|). Docs: {ERRORS_URL}#E8"
                )

            if isinstance(right, NegatedExpression):
                result += "-"
                right = right.expression

            result += f"({self._resolve_redisearch_query(right)})"
        else:
            if not field_name:
                raise QuerySyntaxError(
                    f"Could not resolve field name. Docs: {ERRORS_URL}#E9"
                )
            elif not field_type:
                raise QuerySyntaxError(
                    f"Could not resolve field type. Docs: {ERRORS_URL}#E10"
                )
            elif not field_info:
                raise QuerySyntaxError(
                    f"Could not resolve field info. Docs: {ERRORS_URL}#E11"
                )
            else:
                result += self.__class__.resolve_value(
                    field_name,
                    field_type,
                    field_info,
                    expression.op,
                    right,
                    expression.parents,
                    self.model,
                )

        if encompassing_expression_is_negated:
            result = f"-({result})"

        return result

    async def execute(
        self, exhaust_results=True, return_raw_result=False, return_query_args=False
    ):
        args: List[Union[str, bytes]] = [
            "FT.SEARCH",
            self.model.Meta.index_name,
            self.query,
            *self.pagination,
        ]
        if self.sort_fields:
            args += self.resolve_redisearch_sort_fields()

        if self.query_params:
            args += ["PARAMS", str(len(self.query_params))] + self.query_params

        if self.knn:
            # Ensure DIALECT is at least 2
            if "DIALECT" not in args:
                args += ["DIALECT", "2"]
            else:
                i_dialect = args.index("DIALECT") + 1
                if int(args[i_dialect]) < 2:
                    args[i_dialect] = "2"

        if self.nocontent:
            args.append("NOCONTENT")

        # Check if we have complex fields that RediSearch RETURN clause can't handle
        use_full_document_fallback = False
        if self.projected_fields:
            use_full_document_fallback = self._has_complex_projected_fields()

        # Add RETURN clause to the args list, not to the query string
        # Skip RETURN clause if we need full documents for complex field projection
        if self.projected_fields and not use_full_document_fallback:
            args.extend(
                ["RETURN", str(len(self.projected_fields))] + self.projected_fields
            )

        if return_query_args:
            return self.model.Meta.index_name, args

        # Reset the cache if we're executing from offset 0.
        if self.offset == 0:
            self._model_cache.clear()

        # If the offset is greater than 0, we're paginating through a result set,
        # so append the new results to results already in the cache.
        try:
            raw_result = await self.model.db().execute_command(*args)
        except Exception as e:
            error_msg = str(e).lower()

            # Check if this might be a datetime field schema mismatch
            if "syntax error" in error_msg and self._has_datetime_fields():
                log.warning(
                    "Query failed with syntax error on model with datetime fields. "
                    "This might indicate a schema mismatch where datetime fields are "
                    "indexed as TAG but code expects NUMERIC. "
                    "Run 'om migrate-data check-schema' to verify and "
                    "'om migrate-data datetime' to fix."
                )

            # Re-raise the original exception
            raise
        if return_raw_result:
            return raw_result
        count = raw_result[0]

        # Handle different result processing based on what was requested
        if self.projected_fields and use_full_document_fallback:
            # Complex field projection - use full document fallback
            if self.return_as_dict:
                results = await self._parse_full_document_projection_as_dict(raw_result)
            else:
                results = await self._parse_full_document_projection_as_models(
                    raw_result
                )
        elif self.projected_fields and self.return_as_dict:
            # .values('field1', 'field2') - specific fields as dicts
            results = self._parse_projected_results(raw_result)
        elif self.projected_fields and not self.return_as_dict:
            # .only('field1', 'field2') - partial model instances
            results = self._parse_projected_models(raw_result)
        elif self.return_as_dict and not self.projected_fields:
            # .values() - all fields as dicts
            model_results = self.model.from_redis(raw_result, self.knn)
            results = [model.model_dump() for model in model_results]
        else:
            # Normal query - full model instances
            results = self.model.from_redis(raw_result, self.knn)
        self._model_cache += results

        if not exhaust_results:
            return self._model_cache

        # The query returned all results, so we have no more work to do.
        if count <= len(results):
            return self._model_cache

        # Transparently (to the user) make subsequent requests to paginate
        # through the results and finally return them all.
        query = self
        while True:
            # Make a query for each pass of the loop, with a new offset equal to the
            # current offset plus `page_size`, until we stop getting results back.
            query = query.copy(offset=query.offset + query.page_size)
            _results = await query.execute(exhaust_results=False)
            if not _results:
                break
            self._model_cache += _results
        return self._model_cache

    async def get_query(self):
        query = self.copy()
        return await query.execute(return_query_args=True)

    async def first(self):
        query = self.copy(offset=0, limit=1, sort_fields=self.sort_fields)
        results = await query.execute(exhaust_results=False)
        if not results:
            raise NotFoundError()
        return results[0]

    async def count(self):
        query = self.copy(offset=0, limit=0, nocontent=True)
        result = await query.execute(exhaust_results=True, return_raw_result=True)
        return result[0]

    async def all(self, batch_size=DEFAULT_PAGE_SIZE):
        if batch_size != self.page_size:
            query = self.copy(page_size=batch_size, limit=batch_size)
            return await query.execute()
        return await self.execute()

    async def page(self, offset=0, limit=10):
        return await self.copy(offset=offset, limit=limit).execute(
            exhaust_results=False
        )

    def sort_by(self, *fields: str):
        if not fields:
            return self
        return self.copy(sort_fields=list(fields))

    def values(self, *fields: str):
        """
        Return query results as dictionaries instead of model instances.

        If no fields are specified, returns all fields.
        If fields are specified, returns only those fields.

        Usage:
            await Model.find().values()  # All fields as dicts
            await Model.find().values('name', 'email')  # Only specified fields
        """
        if not fields:
            # Return all fields as dicts
            return self.copy(return_as_dict=True)
        else:
            # Return specific fields as dicts
            return self.copy(return_as_dict=True, projected_fields=list(fields))

    def only(self, *fields: str):
        """
        Return query results as model instances with only the specified fields loaded.

        Accessing fields that weren't loaded will raise an AttributeError.
        Uses Redis RETURN clause for efficient field projection.

        Usage:
            await Model.find().only('name', 'email').all()  # Partial model instances
        """
        if not fields:
            raise ValueError("only() requires at least one field name")
        return self.copy(projected_fields=list(fields))

    async def update(self, use_transaction=True, **field_values):
        """
        Update models that match this query to the given field-value pairs.

        Keys and values given as keyword arguments are interpreted as fields
        on the target model and the values as the values to which to set the
        given fields.
        """
        validate_model_fields(self.model, field_values)
        pipeline = await self.model.db().pipeline() if use_transaction else None

        # TODO: async for here?
        for model in await self.all():
            for field, value in field_values.items():
                setattr(model, field, value)
            # TODO: In the non-transaction case, can we do more to detect
            #  failure responses from Redis?
            await model.save(pipeline=pipeline)

        if pipeline:
            # TODO: Response type?
            # TODO: Better error detection for transactions.
            await pipeline.execute()

    async def delete(self):
        """Delete all matching records in this query."""
        # TODO: Better response type, error detection
        try:
            return await self.model.db().delete(*[m.key() for m in await self.all()])
        except ResponseError:
            return 0

    async def __aiter__(self):
        if self._model_cache:
            for m in self._model_cache:
                yield m
        else:
            for m in await self.execute():
                yield m

    def __getitem__(self, item: int):
        """
        Given this code:
            Model.find()[1000]

        We should return only the 1000th result.

            1. If the result is loaded in the query cache for this query,
               we can return it directly from the cache.

            2. If the query cache does not have enough elements to return
               that result, then we should clone the current query and
               give it a new offset and limit: offset=n, limit=1.
        """
        if ASYNC_MODE:
            raise QuerySyntaxError(
                "Cannot use [] notation with async code. "
                "Use FindQuery.get_item() instead."
            )
        if self._model_cache and len(self._model_cache) >= item:
            return self._model_cache[item]

        query = self.copy(offset=item, limit=1)

        return query.execute()[0]  # noqa

    async def get_item(self, item: int):
        """
        Given this code:
            await Model.find().get_item(1000)

        We should return only the 1000th result.

            1. If the result is loaded in the query cache for this query,
               we can return it directly from the cache.

            2. If the query cache does not have enough elements to return
               that result, then we should clone the current query and
               give it a new offset and limit: offset=n, limit=1.

        NOTE: This method is included specifically for async users, who
        cannot use the notation Model.find()[1000].
        """
        if self._model_cache and len(self._model_cache) >= item:
            return self._model_cache[item]

        query = self.copy(offset=item, limit=1)
        result = await query.execute()
        return result[0]

    def _has_datetime_fields(self) -> bool:
        """Check if the model has any datetime fields."""
        try:
            import datetime

            model_fields = self.model._get_model_fields()

            for field_name, field_info in model_fields.items():
                field_type = getattr(field_info, "annotation", None)
                if field_type in (datetime.datetime, datetime.date):
                    return True

            return False
        except Exception:
            return False


class PrimaryKeyCreator(Protocol):
    def create_pk(self, *args, **kwargs) -> str:
        """Create a new primary key"""


class UlidPrimaryKey:
    """
    A client-side generated primary key that follows the ULID spec.
    https://github.com/ulid/javascript#specification
    """

    @staticmethod
    def create_pk(*args, **kwargs) -> str:
        return str(ULID())


def __dataclass_transform__(
    *,
    eq_default: bool = True,
    order_default: bool = False,
    kw_only_default: bool = False,
    field_descriptors: Tuple[Union[type, Callable[..., Any]], ...] = (()),
) -> Callable[[_T], _T]:
    return lambda a: a


class FieldInfo(PydanticFieldInfo):
    name: str

    def __init__(self, default: Any = ..., **kwargs: Any) -> None:
        primary_key = kwargs.pop("primary_key", False)
        sortable = kwargs.pop("sortable", None)
        case_sensitive = kwargs.pop("case_sensitive", None)
        index = kwargs.pop("index", None)
        full_text_search = kwargs.pop("full_text_search", None)
        vector_options = kwargs.pop("vector_options", None)
        expire = kwargs.pop("expire", None)
        separator = kwargs.pop("separator", SINGLE_VALUE_TAG_FIELD_SEPARATOR)
        super().__init__(default=default, **kwargs)
        self.primary_key = primary_key
        self.sortable = sortable
        self.case_sensitive = case_sensitive
        self.index = index
        self.full_text_search = full_text_search
        self.vector_options = vector_options
        self.expire = expire
        self.separator = separator


class RelationshipInfo(Representation):
    def __init__(
        self,
        *,
        back_populates: Optional[str] = None,
        link_model: Optional[Any] = None,
    ) -> None:
        self.back_populates = back_populates
        self.link_model = link_model


@dataclasses.dataclass
class VectorFieldOptions:
    class ALGORITHM(Enum):
        FLAT = "FLAT"
        HNSW = "HNSW"

    class TYPE(Enum):
        FLOAT32 = "FLOAT32"
        FLOAT64 = "FLOAT64"

    class DISTANCE_METRIC(Enum):
        L2 = "L2"
        IP = "IP"
        COSINE = "COSINE"

    algorithm: ALGORITHM
    type: TYPE
    dimension: int
    distance_metric: DISTANCE_METRIC

    # Common optional parameters
    initial_cap: Optional[int] = None

    # Optional parameters for FLAT
    block_size: Optional[int] = None

    # Optional parameters for HNSW
    m: Optional[int] = None
    ef_construction: Optional[int] = None
    ef_runtime: Optional[int] = None
    epsilon: Optional[float] = None

    @staticmethod
    def flat(
        type: TYPE,
        dimension: int,
        distance_metric: DISTANCE_METRIC,
        initial_cap: Optional[int] = None,
        block_size: Optional[int] = None,
    ):
        return VectorFieldOptions(
            algorithm=VectorFieldOptions.ALGORITHM.FLAT,
            type=type,
            dimension=dimension,
            distance_metric=distance_metric,
            initial_cap=initial_cap,
            block_size=block_size,
        )

    @staticmethod
    def hnsw(
        type: TYPE,
        dimension: int,
        distance_metric: DISTANCE_METRIC,
        initial_cap: Optional[int] = None,
        m: Optional[int] = None,
        ef_construction: Optional[int] = None,
        ef_runtime: Optional[int] = None,
        epsilon: Optional[float] = None,
    ):
        return VectorFieldOptions(
            algorithm=VectorFieldOptions.ALGORITHM.HNSW,
            type=type,
            dimension=dimension,
            distance_metric=distance_metric,
            initial_cap=initial_cap,
            m=m,
            ef_construction=ef_construction,
            ef_runtime=ef_runtime,
            epsilon=epsilon,
        )

    @property
    def schema(self):
        attr = []
        for k, v in vars(self).items():
            if k == "algorithm" or v is None:
                continue
            attr.extend(
                [
                    k.upper() if k != "dimension" else "DIM",
                    str(v) if not isinstance(v, Enum) else v.name,
                ]
            )

        return " ".join([f"VECTOR {self.algorithm.name} {len(attr)}"] + attr)


def Field(
    default: Any = ...,
    *,
    primary_key: bool = False,
    sortable: Union[bool, UndefinedType] = Undefined,
    case_sensitive: Union[bool, UndefinedType] = Undefined,
    index: Union[bool, UndefinedType] = Undefined,
    full_text_search: Union[bool, UndefinedType] = Undefined,
    vector_options: Optional[VectorFieldOptions] = None,
    expire: Optional[int] = None,
    separator: str = SINGLE_VALUE_TAG_FIELD_SEPARATOR,
    **kwargs: Unpack[_FromFieldInfoInputs],
) -> Any:
    """
    Create a field with Redis OM specific options.

    Args:
        default: Default value for the field.
        primary_key: Whether this field is the primary key.
        sortable: Whether this field should be sortable in queries.
        case_sensitive: Whether string matching should be case-sensitive.
        index: Whether this field should be indexed for searching.
        full_text_search: Whether to enable full-text search on this field.
        vector_options: Vector field configuration for similarity search.
        expire: TTL in seconds for this field (HashModel only, requires Redis 7.4+).
            When set, the field will automatically expire after save().
        separator: TAG field separator character for RediSearch indexing.
            Defaults to "|". Use "," for comma-separated multi-value fields.
        **kwargs: Additional Pydantic field options.

    Returns:
        FieldInfo instance with the configured options.
    """
    field_info = FieldInfo(
        **kwargs,
        default=default,
        primary_key=primary_key,
        sortable=sortable,
        case_sensitive=case_sensitive,
        index=index,
        full_text_search=full_text_search,
        vector_options=vector_options,
        expire=expire,
        separator=separator,
    )
    return field_info


@dataclasses.dataclass
class PrimaryKey:
    name: str
    field: PydanticFieldInfo


class PrimaryKeyAccessor:
    """Descriptor that provides access to the primary key value.

    When a model uses a custom primary key field (e.g., `x: int = Field(primary_key=True)`),
    this descriptor allows accessing the primary key value via `.pk` for consistency.

    This solves GitHub issue #570 where accessing `.pk` on a model with a custom
    primary key returned an ExpressionProxy instead of the actual value.
    """

    def __get__(self, obj, objtype=None):
        if obj is None:
            # Class-level access - return ExpressionProxy for query building
            # if the model is indexed, otherwise return the descriptor itself
            if hasattr(objtype, "_meta") and hasattr(objtype._meta, "primary_key"):
                pk_field = objtype._meta.primary_key.field
                pk_name = objtype._meta.primary_key.name
                # Return ExpressionProxy for query building (e.g., Model.pk == value)
                return ExpressionProxy(pk_field, [])
            return self

        # Instance-level access - return the actual primary key value
        if hasattr(obj._meta, "primary_key") and obj._meta.primary_key is not None:
            pk_name = obj._meta.primary_key.name
            # Use __dict__ to get the instance value directly, avoiding descriptor recursion
            if pk_name in obj.__dict__:
                return obj.__dict__[pk_name]
            # Fallback to getattr for computed/inherited attributes
            return getattr(obj, pk_name)
        return None

    def __set__(self, obj, value):
        # When setting pk, set the actual primary key field
        if hasattr(obj._meta, "primary_key") and obj._meta.primary_key is not None:
            pk_name = obj._meta.primary_key.name
            obj.__dict__[pk_name] = value
        else:
            obj.__dict__["pk"] = value


if PYDANTIC_V2:

    class RedisOmConfig(ConfigDict):
        index: Optional[bool]

else:
    # Pydantic v1 compatibility - use a simple class
    class RedisOmConfig:
        index: Optional[bool] = None


class BaseMeta(Protocol):
    global_key_prefix: str
    model_key_prefix: str
    primary_key_pattern: str
    database: redis.Redis
    primary_key: PrimaryKey
    primary_key_creator_cls: Type[PrimaryKeyCreator]
    index_name: str
    embedded: bool
    encoding: str


@dataclasses.dataclass
class DefaultMeta:
    """A default placeholder Meta object.

    TODO: Revisit whether this is really necessary, and whether making
     these all optional here is the right choice.
    """

    global_key_prefix: Optional[str] = None
    model_key_prefix: Optional[str] = None
    primary_key_pattern: Optional[str] = None
    database: Optional[redis.Redis] = None
    primary_key: Optional[PrimaryKey] = None
    primary_key_creator_cls: Optional[Type[PrimaryKeyCreator]] = None
    index_name: Optional[str] = None
    embedded: Optional[bool] = False
    encoding: str = "utf-8"


class ModelMeta(ModelMetaclass):
    _meta: BaseMeta

    model_config: RedisOmConfig
    model_fields: Dict[str, FieldInfo]  # type: ignore[assignment]

    def __new__(cls, name, bases, attrs, **kwargs):  # noqa C901
        meta = attrs.pop("Meta", None)

        # Capture original FieldInfo objects from attrs before Pydantic processes them.
        # Pydantic 2.12+ may convert custom FieldInfo subclasses to plain PydanticFieldInfo
        # for Annotated types, losing custom attributes like index, sortable, etc.
        original_field_infos: Dict[str, FieldInfo] = {}
        if PYDANTIC_V2:
            for attr_name, attr_value in attrs.items():
                if isinstance(attr_value, FieldInfo):
                    original_field_infos[attr_name] = attr_value

        # Duplicate logic from Pydantic to filter config kwargs because if they are
        # passed directly including the registry Pydantic will pass them over to the
        # superclass causing an error
        allowed_config_kwargs: Set[str] = {
            key
            for key in dir(ConfigDict)
            if not (
                key.startswith("__") and key.endswith("__")
            )  # skip dunder methods and attributes
        }

        config_kwargs = {
            key: kwargs[key] for key in kwargs.keys() & allowed_config_kwargs
        }

        new_class: RedisModel = super().__new__(
            cls, name, bases, attrs, **config_kwargs
        )

        # The fact that there is a Meta field and _meta field is important: a
        # user may have given us a Meta object with their configuration, while
        # we might have inherited _meta from a parent class, and should
        # therefore use some of the inherited fields.
        meta = meta or getattr(new_class, "Meta", None)
        base_meta = getattr(new_class, "_meta", None)

        if meta and meta != DefaultMeta and meta != base_meta:
            new_class.Meta = meta
            new_class._meta = meta
        elif base_meta:
            new_class._meta = type(
                f"{new_class.__name__}Meta", (base_meta,), dict(base_meta.__dict__)
            )
            new_class.Meta = new_class._meta
            # Unset inherited values we don't want to reuse (typically based on
            # the model name).
            new_class._meta.model_key_prefix = None
            new_class._meta.index_name = None
        else:
            new_class._meta = type(
                f"{new_class.__name__}Meta", (DefaultMeta,), dict(DefaultMeta.__dict__)
            )
            new_class.Meta = new_class._meta

        is_indexed = kwargs.get("index", None) is True

        if is_indexed and new_class.model_config.get("index", None) is True:
            raise RedisModelError(
                f"{new_class.__name__} cannot be indexed, only one model can be indexed in an inheritance tree"
            )

        if PYDANTIC_V2:
            new_class.model_config["index"] = is_indexed
        else:
            # Pydantic v1 - set on Config class
            if hasattr(new_class, "Config"):
                new_class.Config.index = is_indexed
            else:

                class Config:
                    index = is_indexed

                new_class.Config = Config

        # Create proxies for each model field so that we can use the field
        # in queries, like Model.get(Model.field_name == 1)
        # Only set if the model is has index=True
        if PYDANTIC_V2:
            model_fields = new_class.model_fields
        else:
            model_fields = new_class.__fields__

        for field_name, field in model_fields.items():
            pydantic_field = field  # Keep reference to Pydantic's processed field
            if type(field) is PydanticFieldInfo:
                # Pydantic converted our FieldInfo to a plain PydanticFieldInfo.
                # This happens with Annotated types in Pydantic 2.12+.
                # Use the original FieldInfo if we captured it, otherwise create a new one.
                if PYDANTIC_V2:
                    if field_name in original_field_infos:
                        # Use the original FieldInfo with custom attributes preserved
                        field = original_field_infos[field_name]
                        # Copy the annotation from Pydantic's processed field
                        # since it wasn't set on the original FieldInfo
                        if hasattr(pydantic_field, "annotation"):
                            field.annotation = pydantic_field.annotation
                        # Also copy metadata from Pydantic's field (validators, serializers, etc.)
                        if hasattr(pydantic_field, "metadata"):
                            field.metadata = pydantic_field.metadata
                    else:
                        field = FieldInfo(**field._attributes_set)
                else:
                    # Pydantic v1 compatibility
                    field = FieldInfo()
                setattr(new_class, field_name, field)
                # Also update model_fields so schema generation uses our fixed field
                if PYDANTIC_V2:
                    model_fields[field_name] = field

            if is_indexed:
                setattr(new_class, field_name, ExpressionProxy(field, []))

            # we need to set the field name for use in queries
            field.name = field_name

            # Check for primary key - different attribute names in v1 vs v2
            is_primary_key = False
            if PYDANTIC_V2:
                is_primary_key = getattr(field, "primary_key", False) is True
            else:
                # Pydantic v1 - check field_info for primary_key
                is_primary_key = getattr(field.field_info, "primary_key", False) is True

            if is_primary_key:
                new_class._meta.primary_key = PrimaryKey(name=field_name, field=field)

        # Count custom primary keys (not the default 'pk') to determine if we
        # should set up the PrimaryKeyAccessor. We only do this when there's
        # exactly one custom primary key. Multiple custom primary keys will be
        # caught by validate_primary_key() later.
        custom_pk_count = 0
        for field_name, field in model_fields.items():
            if field_name == "pk":
                continue
            # Check for primary key
            check_field = field
            if (
                not isinstance(field, FieldInfo)
                and hasattr(field, "metadata")
                and len(field.metadata) > 0
                and isinstance(field.metadata[0], FieldInfo)
            ):
                check_field = field.metadata[0]
            if getattr(check_field, "primary_key", None) is True:
                custom_pk_count += 1

        # If there's exactly one custom primary key (not the default 'pk'), set up
        # a PrimaryKeyAccessor so that .pk always returns the correct value.
        # This fixes GitHub issue #570.
        if (
            custom_pk_count == 1
            and hasattr(new_class._meta, "primary_key")
            and new_class._meta.primary_key is not None
            and new_class._meta.primary_key.name != "pk"
        ):
            # Remove 'pk' from model_fields since we have a custom primary key
            if "pk" in model_fields:
                model_fields.pop("pk")
            # Set up PrimaryKeyAccessor descriptor for .pk access
            setattr(new_class, "pk", PrimaryKeyAccessor())

        # For embedded models, clear the primary_key from meta since they don't
        # need primary keys - they're stored as part of their parent document,
        # not as separate Redis keys. This fixes GitHub issue #496.
        # Note: We keep the pk field in model_fields but the validator will
        # return None and model_dump will exclude it.
        if getattr(new_class._meta, "embedded", False):
            new_class._meta.primary_key = None

        if not getattr(new_class._meta, "global_key_prefix", None):
            new_class._meta.global_key_prefix = getattr(
                base_meta, "global_key_prefix", ""
            )
        if not getattr(new_class._meta, "model_key_prefix", None):
            # Don't look at the base class for this.
            new_class._meta.model_key_prefix = (
                f"{new_class.__module__}.{new_class.__name__}"
            )
        if not getattr(new_class._meta, "primary_key_pattern", None):
            new_class._meta.primary_key_pattern = getattr(
                base_meta, "primary_key_pattern", "{pk}"
            )
        if not getattr(new_class._meta, "database", None):
            new_class._meta.database = getattr(
                base_meta, "database", get_redis_connection()
            )
        if not getattr(new_class._meta, "encoding", None):
            new_class._meta.encoding = getattr(base_meta, "encoding")
        if not getattr(new_class._meta, "primary_key_creator_cls", None):
            new_class._meta.primary_key_creator_cls = getattr(
                base_meta, "primary_key_creator_cls", UlidPrimaryKey
            )
        # TODO: Configurable key separate, defaults to ":"
        if not getattr(new_class._meta, "index_name", None):
            new_class._meta.index_name = (
                f"{new_class._meta.global_key_prefix}:"
                f"{new_class._meta.model_key_prefix}:index"
            )

        # Model is indexed and not an abstract model class or embedded model, so we should let the
        # Migrator create indexes for it.
        if (
            abc.ABC not in bases
            and not getattr(new_class._meta, "embedded", False)
            and new_class.model_config.get("index") is True
        ):
            key = f"{new_class.__module__}.{new_class.__qualname__}"
            model_registry[key] = new_class

        return new_class


def outer_type_or_annotation(field: FieldInfo):
    if hasattr(field, "outer_type_"):
        return field.outer_type_
    elif not hasattr(field.annotation, "__args__"):
        if not isinstance(field.annotation, type):
            raise AttributeError(f"could not extract outer type from field {field}")
        return field.annotation
    elif get_origin(field.annotation) == Literal:
        return str
    else:
        return field.annotation.__args__[0]  # type: ignore


def should_index_field(field_info: Union[FieldInfo, PydanticFieldInfo]) -> bool:
    # for vector, full text search, and sortable fields, we always have to index
    # We could require the user to set index=True, but that would be a breaking change
    _index = getattr(field_info, "index", None)

    index = _index is True
    vector_options = getattr(field_info, "vector_options", None) is not None
    full_text_search = getattr(field_info, "full_text_search", None) is True
    sortable = getattr(field_info, "sortable", None) is True

    if _index is False and any([vector_options, full_text_search, sortable]):
        log.warning(
            "Field is marked as index=False, but it is a vector, full text search, or sortable field. "
            "This will be ignored and the field will be indexed.",
        )

    return index or vector_options or full_text_search or sortable


class RedisModel(BaseModel, abc.ABC, metaclass=ModelMeta):
    pk: Optional[str] = Field(
        # Indexing for backwards compatibility, we might not want this in the future
        default=None,
        primary_key=True,
        validate_default=True,
        index=True,
    )
    Meta = DefaultMeta

    if PYDANTIC_V2:
        model_config = ConfigDict(from_attributes=True)
    else:
        # Pydantic v1 compatibility
        class Config:
            from_attributes = True

    @classmethod
    def _get_model_fields(cls):
        """Get model fields in a version-compatible way."""
        if PYDANTIC_V2:
            return cls.model_fields
        else:
            return cls.__fields__

    @classmethod
    async def check_datetime_schema_compatibility(cls) -> Dict[str, Any]:
        """
        Check if this model's datetime fields have compatible schema in Redis.

        This detects if the model was deployed with new datetime indexing code
        but the migration hasn't been run yet.

        Returns:
            Dict with compatibility information and warnings
        """
        try:
            from .migrations.datetime_migration import DatetimeFieldDetector

            detector = DatetimeFieldDetector(cls.db())
            result = await detector.check_for_schema_mismatches([cls])

            if result["has_mismatches"]:
                log.warning(
                    f"Schema mismatch detected for {cls.__name__}: "
                    f"{result['recommendation']}"
                )

            return result

        except Exception as e:
            log.debug(
                f"Could not check datetime schema compatibility for {cls.__name__}: {e}"
            )
            return {
                "has_mismatches": False,
                "error": str(e),
                "recommendation": "Could not check schema compatibility",
            }

    def __init__(__pydantic_self__, **data: Any) -> None:
        if PYDANTIC_V2:
            is_indexed = __pydantic_self__.model_config.get("index") is True
        else:
            is_indexed = getattr(__pydantic_self__.Config, "index", False) is True

        if is_indexed:
            __pydantic_self__.validate_primary_key()
        super().__init__(**data)

    def __lt__(self, other):
        """Default sort: compare primary key of models."""
        return self.key() < other.key()

    def key(self):
        """Return the Redis key for this model."""
        if self.model_config.get("index", False) is not True:
            raise RedisModelError(
                "You cannot create a key on a model that is not indexed. "
                f"Update your class with index=True: class {self.__class__.__name__}(RedisModel, index=True):"
            )

        if hasattr(self._meta.primary_key.field, "name"):
            pk = getattr(self, self._meta.primary_key.field.name)
        else:
            pk = getattr(self, self._meta.primary_key.name)
        return self.make_primary_key(pk)

    @classmethod
    async def _delete(cls, db, *pks):
        return await db.delete(*pks)

    @classmethod
    async def delete(
        cls, pk: Any, pipeline: Optional[redis.client.Pipeline] = None
    ) -> int:
        """Delete data at this key."""
        db = cls._get_db(pipeline)

        return await cls._delete(db, cls.make_primary_key(pk))

    @classmethod
    async def get(cls: Type["Model"], pk: Any) -> "Model":
        raise NotImplementedError

    async def update(self, **field_values):
        """Update this model instance with the specified key-value pairs."""
        raise NotImplementedError

    async def save(
        self: "Model",
        pipeline: Optional[redis.client.Pipeline] = None,
        nx: bool = False,
        xx: bool = False,
    ) -> Optional["Model"]:
        """Save the model instance to Redis.

        Args:
            pipeline: Optional Redis pipeline for batching operations.
            nx: If True, only save if the key does NOT exist (insert-only).
            xx: If True, only save if the key already exists (update-only).

        Returns:
            The model instance if saved successfully, None if nx/xx condition
            was not met.

        Raises:
            ValueError: If both nx and xx are True.
        """
        raise NotImplementedError

    async def expire(
        self, num_seconds: int, pipeline: Optional[redis.client.Pipeline] = None
    ):
        db = self._get_db(pipeline)

        # TODO: Wrap any Redis response errors in a custom exception?
        await db.expire(self.key(), num_seconds)

    if PYDANTIC_V2:

        @field_validator("pk", mode="after")
        def validate_pk(cls, v):
            # Skip pk generation for embedded models - they don't need primary keys
            if getattr(cls._meta, "embedded", False):
                return None
            if not v or isinstance(v, ExpressionProxy):
                v = cls._meta.primary_key_creator_cls().create_pk()
            return v

    else:

        @field_validator("pk")
        def validate_pk(cls, v):
            # Skip pk generation for embedded models - they don't need primary keys
            if getattr(cls._meta, "embedded", False):
                return None
            if not v or isinstance(v, ExpressionProxy):
                v = cls._meta.primary_key_creator_cls().create_pk()
            return v

    @classmethod
    def validate_primary_key(cls):
        """Check for a primary key. We need one (and only one).

        Embedded models are exempt from this check since they don't need
        primary keys - they're stored as part of their parent document.
        """
        # Skip validation for embedded models - they don't need primary keys
        if getattr(cls._meta, "embedded", False):
            return

        primary_keys = 0
        for name, field in cls.model_fields.items():
            if (
                not isinstance(field, FieldInfo)
                and hasattr(field, "metadata")
                and len(field.metadata) > 0
                and isinstance(field.metadata[0], FieldInfo)
            ):
                field_info = field.metadata[0]
            else:
                field_info = field

            if getattr(field_info, "primary_key", None) is True:
                primary_keys += 1
        if primary_keys == 0:
            raise RedisModelError("You must define a primary key for the model")
        elif primary_keys == 2:
            # Remove 'pk' from model_fields if it exists (may already be removed by ModelMeta)
            cls.model_fields.pop("pk", None)
        elif primary_keys > 2:
            raise RedisModelError("You must define only one primary key for a model")

    @classmethod
    def make_key(cls, part: str):
        global_prefix = getattr(cls._meta, "global_key_prefix", "").strip(":")
        model_prefix = getattr(cls._meta, "model_key_prefix", "").strip(":")
        return f"{global_prefix}:{model_prefix}:{part}"

    @classmethod
    def make_primary_key(cls, pk: Any):
        """Return the Redis key for this model."""
        return cls.make_key(cls._meta.primary_key_pattern.format(pk=pk))

    @classmethod
    def db(cls):
        return cls._meta.database

    @classmethod
    def find(
        cls,
        *expressions: Union[Any, Expression],
        knn: Optional[KNNExpression] = None,
    ) -> FindQuery:
        return FindQuery(expressions=expressions, knn=knn, model=cls)

    @classmethod
    def from_redis(cls, res: Any, knn: Optional[KNNExpression] = None):
        # TODO: Parsing logic copied from redisearch-py. Evaluate.
        def to_string(s):
            if isinstance(s, (str,)):
                return s
            elif isinstance(s, bytes):
                return s.decode(errors="ignore")
            else:
                return s  # Not a string we care about

        docs = []
        step = 2  # Because the result has content
        offset = 1  # The first item is the count of total matches.

        for i in range(1, len(res), step):
            if res[i + offset] is None:
                continue
            fields: Dict[str, str] = dict(
                zip(
                    map(to_string, res[i + offset][::2]),
                    map(to_string, res[i + offset][1::2]),
                )
            )
            # $ means a json entry
            if fields.get("$"):
                json_fields = json.loads(fields.pop("$"))
                if knn:
                    score = fields.get(knn.score_field_name)
                    json_fields.update({knn.score_field_name: score})
                # Convert timestamps back to datetime objects
                json_fields = convert_timestamp_to_datetime(
                    json_fields, cls.model_fields
                )
                # Convert base64 strings back to bytes for bytes fields
                json_fields = convert_base64_to_bytes(json_fields, cls.model_fields)
                doc = cls(**json_fields)
            else:
                # Convert timestamps back to datetime objects
                fields = convert_timestamp_to_datetime(fields, cls.model_fields)
                # Convert base64 strings back to bytes for bytes fields
                fields = convert_base64_to_bytes(fields, cls.model_fields)
                doc = cls(**fields)

            docs.append(doc)
        return docs

    @classmethod
    def get_annotations(cls):
        d = {}
        for c in cls.mro():
            try:
                d.update(**c.__annotations__)
            except AttributeError:
                # object, at least, has no __annotations__ attribute.
                pass
        return d

    @classmethod
    async def add(
        cls: Type["Model"],
        models: Sequence["Model"],
        pipeline: Optional[redis.client.Pipeline] = None,
        pipeline_verifier: Callable[..., Any] = verify_pipeline_response,
    ) -> Sequence["Model"]:
        db = cls._get_db(pipeline, bulk=True)

        for model in models:
            # save() just returns the model, we don't need that here.
            await model.save(pipeline=db)

        # If the user didn't give us a pipeline, then we need to execute
        # the one we just created.
        if pipeline is None:
            result = await db.execute()
            pipeline_verifier(result, expected_responses=len(models))

        return models

    @classmethod
    def _get_db(
        self, pipeline: Optional[redis.client.Pipeline] = None, bulk: bool = False
    ):
        if pipeline is not None:
            return pipeline
        elif bulk:
            return self.db().pipeline(transaction=False)
        else:
            return self.db()

    @classmethod
    async def delete_many(
        cls,
        models: Sequence["RedisModel"],
        pipeline: Optional[redis.client.Pipeline] = None,
    ) -> int:
        db = cls._get_db(pipeline)

        for chunk in ichunked(models, 100):
            pks = [model.key() for model in chunk]
            await cls._delete(db, *pks)

        return len(models)

    @classmethod
    def redisearch_schema(cls):
        raise NotImplementedError

    def check(self):
        if TypeAdapter is not None:
            adapter = TypeAdapter(self.__class__)
            adapter.validate_python(self.__dict__)
        else:
            # Fallback for Pydantic v1 - use parse_obj for validation
            try:
                self.__class__.parse_obj(self.__dict__)
            except AttributeError:
                # If parse_obj doesn't exist, just pass - validation will happen elsewhere
                pass


class HashModel(RedisModel, abc.ABC):
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)

        # Helper to check if a field has vector_options (making it a vector field).
        # We check cls.__dict__ because model_fields may not be populated yet
        # when __init_subclass__ runs during class creation.
        def _has_vector_options(field_name: str) -> bool:
            """Check if a field has vector_options set, making it a vector field."""
            # First check cls.__dict__ for the original FieldInfo (before Pydantic processing)
            if field_name in cls.__dict__:
                field = cls.__dict__[field_name]
                if getattr(field, "vector_options", None) is not None:
                    return True
            # Also check model_fields in case it's populated
            if hasattr(cls, "model_fields") and field_name in cls.model_fields:
                field = cls.model_fields[field_name]
                if getattr(field, "vector_options", None) is not None:
                    return True
            return False

        if hasattr(cls, "__annotations__"):
            for name, field_type in cls.__annotations__.items():
                origin = get_origin(field_type)
                for typ in (Set, Mapping, List):
                    if isinstance(origin, type) and issubclass(origin, typ):
                        # Vector fields are allowed to be lists (list[float])
                        if _has_vector_options(name):
                            continue
                        raise RedisModelError(
                            f"HashModels cannot index set, list, "
                            f"or mapping fields. Field: {name}"
                        )
                if isinstance(field_type, type) and issubclass(field_type, RedisModel):
                    raise RedisModelError(
                        f"HashModels cannot index embedded model fields. Field: {name}"
                    )
                elif isinstance(field_type, type) and dataclasses.is_dataclass(
                    field_type
                ):
                    raise RedisModelError(
                        f"HashModels cannot index dataclass fields. Field: {name}"
                    )

        for name, field in cls.model_fields.items():
            outer_type = outer_type_or_annotation(field)
            origin = get_origin(outer_type)
            if origin:
                for typ in (Set, Mapping, List):
                    if issubclass(origin, typ):
                        # Vector fields are allowed to be lists (list[float])
                        if getattr(field, "vector_options", None) is not None:
                            continue
                        raise RedisModelError(
                            f"HashModels cannot index set, list, "
                            f"or mapping fields. Field: {name}"
                        )

            if issubclass(outer_type, RedisModel):
                raise RedisModelError(
                    f"HashModels cannot index embedded model fields. Field: {name}"
                )
            elif dataclasses.is_dataclass(outer_type):
                raise RedisModelError(
                    f"HashModels cannot index dataclass fields. Field: {name}"
                )

    def _get_field_expirations(
        self, field_expirations: Optional[Dict[str, int]] = None
    ) -> Dict[str, int]:
        """
        Collect field expirations from Field(expire=N) defaults and overrides.

        Args:
            field_expirations: Optional dict of {field_name: ttl_seconds} to override defaults.

        Returns:
            Dict of field names to TTL in seconds.
        """
        expirations: Dict[str, int] = {}

        # Collect default expirations from Field(expire=N)
        for name, field in self.__class__.model_fields.items():
            field_info = field
            # Handle metadata-wrapped FieldInfo
            if (
                not isinstance(field, FieldInfo)
                and hasattr(field, "metadata")
                and len(field.metadata) > 0
                and isinstance(field.metadata[0], FieldInfo)
            ):
                field_info = field.metadata[0]

            expire = getattr(field_info, "expire", None)
            if expire is not None:
                expirations[name] = expire

        # Override with explicit field_expirations
        if field_expirations:
            expirations.update(field_expirations)

        return expirations

    async def save(
        self: "Model",
        pipeline: Optional[redis.client.Pipeline] = None,
        nx: bool = False,
        xx: bool = False,
        field_expirations: Optional[Dict[str, int]] = None,
    ) -> Optional["Model"]:
        """
        Save the model to Redis.

        Args:
            pipeline: Optional Redis pipeline for batching commands.
            nx: Only save if the key doesn't exist.
            xx: Only save if the key already exists.
            field_expirations: Dict of {field_name: ttl_seconds} to set field expirations.
                Overrides any Field(expire=N) defaults. Requires Redis 7.4+.

        Returns:
            The saved model, or None if nx/xx conditions weren't met.
        """
        if nx and xx:
            raise ValueError("Cannot specify both nx and xx")
        if pipeline and (nx or xx):
            raise ValueError(
                "Cannot use nx or xx with pipeline for HashModel. "
                "Use JsonModel if you need conditional saves with pipelines."
            )

        self.check()
        db = self._get_db(pipeline)

        # Get model data and apply conversions in the correct order
        document = self.model_dump()
        document = convert_datetime_to_timestamp(document)
        # Convert vector fields (list[float]) to bytes before base64 encoding
        document = convert_vector_to_bytes(document, self.__class__.model_fields)
        document = convert_bytes_to_base64(document)

        # Then apply jsonable encoding for other types
        document = jsonable_encoder(document)

        # filter out values which are `None` because they are not valid in a HSET
        document = {k: v for k, v in document.items() if v is not None}

        # Convert boolean values to "1"/"0" for storage efficiency (Redis HSET doesn't support booleans)
        document = {
            k: ("1" if v else "0") if isinstance(v, bool) else v
            for k, v in document.items()
        }

        key = self.key()

        # Collect field expirations
        expirations = self._get_field_expirations(field_expirations)

        # Check if we're using a pipeline (pipelines don't support TTL preservation)
        is_pipeline = pipeline is not None

        async def _do_save(conn):
            # Check nx/xx conditions (HSET doesn't support these natively)
            if nx or xx:
                exists = await conn.exists(key)
                if nx and exists:
                    return None  # Key exists, nx means don't overwrite
                if xx and not exists:
                    return None  # Key doesn't exist, xx means only update existing

            # Preserve existing field TTLs before HSET (HSET removes field-level TTLs)
            # See issue #753: .save() conflicts with TTL on unrelated field
            # Note: TTL preservation is skipped when using pipelines because
            # pipeline commands return futures, not actual values
            preserved_ttls: Dict[str, int] = {}
            if supports_hash_field_expiration() and not is_pipeline:
                fields_to_check = [f for f in document.keys() if f != "pk"]
                if fields_to_check:
                    current_ttls = await conn.httl(key, *fields_to_check)
                    if current_ttls:
                        for i, field_name in enumerate(fields_to_check):
                            if current_ttls[i] > 0:  # Has a TTL
                                preserved_ttls[field_name] = current_ttls[i]

            await conn.hset(key, mapping=document)

            # Apply field expirations after HSET (requires Redis 7.4+)
            # When using pipelines, we can still apply default expirations but
            # can't preserve manually-set TTLs
            if supports_hash_field_expiration():
                for field_name in document.keys():
                    if field_name == "pk":
                        continue
                    # Priority: preserved TTL > explicit field_expirations > Field(expire=N) default
                    if field_name in preserved_ttls:
                        # Restore the TTL that was removed by HSET
                        await conn.hexpire(key, preserved_ttls[field_name], field_name)
                    elif field_name in expirations:
                        # Apply new expiration (from Field(expire=N) or field_expirations param)
                        await conn.hexpire(key, expirations[field_name], field_name)

            return self

        # TODO: Wrap any Redis response errors in a custom exception?
        try:
            return await _do_save(db)
        except RuntimeError as e:
            if "Event loop is closed" in str(e):
                # Connection is bound to closed event loop, refresh it and retry
                from ..connections import get_redis_connection

                self.__class__._meta.database = get_redis_connection()
                db = self._get_db(pipeline)
                return await _do_save(db)
            else:
                raise

    @classmethod
    async def all_pks(cls):  # type: ignore
        key_prefix = cls.make_key(cls._meta.primary_key_pattern.format(pk=""))
        # TODO: We need to decide how we want to handle the lack of
        #  decode_responses=True...
        return (
            (
                remove_prefix(key, key_prefix)
                if isinstance(key, str)
                else remove_prefix(key.decode(cls.Meta.encoding), key_prefix)
            )
            async for key in cls.db().scan_iter(f"{key_prefix}*", _type="HASH")
        )

    @classmethod
    async def get(cls: Type["Model"], pk: Any) -> "Model":
        document = await cls.db().hgetall(cls.make_primary_key(pk))
        if not document:
            raise NotFoundError
        try:
            # Convert empty strings back to None for Optional fields (fixes #254)
            document = convert_empty_strings_to_none(document, cls.model_fields)
            # Convert timestamps back to datetime objects before validation
            document = convert_timestamp_to_datetime(document, cls.model_fields)
            # Convert base64 strings back to bytes for bytes fields
            document = convert_base64_to_bytes(document, cls.model_fields)
            # Convert bytes back to list[float] for vector fields
            document = convert_bytes_to_vector(document, cls.model_fields)
            result = cls.model_validate(document)
        except TypeError as e:
            log.warning(
                f'Could not parse Redis response. Error was: "{e}". Probably, the '
                "connection is not set to decode responses from bytes. "
                "Attempting to decode response using the encoding set on "
                f"model class ({cls.__class__}. Encoding: {cls.Meta.encoding}."
            )
            document = decode_redis_value(document, cls.Meta.encoding)
            # Convert empty strings back to None for Optional fields (fixes #254)
            document = convert_empty_strings_to_none(document, cls.model_fields)
            # Convert timestamps back to datetime objects after decoding
            document = convert_timestamp_to_datetime(document, cls.model_fields)
            # Convert base64 strings back to bytes for bytes fields
            document = convert_base64_to_bytes(document, cls.model_fields)
            # Convert bytes back to list[float] for vector fields
            document = convert_bytes_to_vector(document, cls.model_fields)
            result = cls.model_validate(document)
        return result

    @classmethod
    @no_type_check
    def _get_value(cls, *args, **kwargs) -> Any:
        """
        Always send None as an empty string.

        TODO: We do this because redis-py's hset() method requires non-null
        values. Is there a better way?
        """
        val = super()._get_value(*args, **kwargs)
        if val is None:
            return ""
        return val

    @classmethod
    def redisearch_schema(cls):
        hash_prefix = cls.make_key(cls._meta.primary_key_pattern.format(pk=""))
        schema_prefix = f"ON HASH PREFIX 1 {hash_prefix} SCHEMA"
        schema_parts = [schema_prefix] + cls.schema_for_fields()
        return " ".join(schema_parts)

    async def update(self, **field_values):
        validate_model_fields(self.__class__, field_values)
        for field, value in field_values.items():
            setattr(self, field, value)
        await self.save()

    @classmethod
    def schema_for_fields(cls):
        schema_parts = []

        for name, field in cls.model_fields.items():
            # TODO: Merge this code with schema_for_type()?
            _type = outer_type_or_annotation(field)
            is_subscripted_type = get_origin(_type)

            if (
                not isinstance(field, FieldInfo)
                and hasattr(field, "metadata")
                and len(field.metadata) > 0
                and isinstance(field.metadata[0], FieldInfo)
            ):
                field = field.metadata[0]

            field_info = field

            if getattr(field_info, "primary_key", None) is True:
                if issubclass(_type, str):
                    separator = getattr(
                        field_info, "separator", SINGLE_VALUE_TAG_FIELD_SEPARATOR
                    )
                    redisearch_field = f"{name} TAG SEPARATOR {separator}"
                else:
                    redisearch_field = cls.schema_for_type(name, _type, field_info)
                schema_parts.append(redisearch_field)
            elif should_index_field(field_info):
                schema_parts.append(cls.schema_for_type(name, _type, field_info))
            elif is_subscripted_type:
                # Ignore subscripted types (usually containers!) that we don't
                # support, for the purposes of indexing.
                if not is_supported_container_type(_type):
                    continue

                embedded_cls = get_args(_type)
                if not embedded_cls:
                    # TODO: Test if this can really happen.
                    log.warning("Model %s defined an empty list field: %s", cls, name)
                    continue
                embedded_cls = embedded_cls[0]
                schema_parts.append(cls.schema_for_type(name, embedded_cls, field_info))
            elif issubclass(_type, RedisModel):
                schema_parts.append(cls.schema_for_type(name, _type, field_info))
        return schema_parts

    @classmethod
    def schema_for_type(cls, name, typ: Any, field_info: PydanticFieldInfo):
        # TODO: Import parent logic from JsonModel to deal with lists, so that
        #  a List[int] gets indexed as TAG instead of NUMERICAL.
        # TODO: Raise error if user embeds a model field or list and makes it
        #  sortable. Instead, the embedded model should mark individual fields
        #  as sortable.
        # TODO: Abstract string-building logic for each type (TAG, etc.) into
        #  classes that take a field name.
        sortable = getattr(field_info, "sortable", False)
        case_sensitive = getattr(field_info, "case_sensitive", False)

        if is_supported_container_type(typ):
            embedded_cls = get_args(typ)
            if not embedded_cls:
                # TODO: Test if this can really happen.
                log.warning(
                    "Model %s defined an empty list or tuple field: %s", cls, name
                )
                return ""
            embedded_cls = embedded_cls[0]
            schema = cls.schema_for_type(name, embedded_cls, field_info)
        elif typ is bool:
            schema = f"{name} TAG"
        elif typ in [CoordinateType, Coordinates]:
            schema = f"{name} GEO"
        elif is_numeric_type(typ):
            vector_options: Optional[VectorFieldOptions] = getattr(
                field_info, "vector_options", None
            )
            if vector_options:
                schema = f"{name} {vector_options.schema}"
            else:
                schema = f"{name} NUMERIC"
        elif issubclass(typ, str):
            separator = getattr(
                field_info, "separator", SINGLE_VALUE_TAG_FIELD_SEPARATOR
            )
            if getattr(field_info, "full_text_search", False) is True:
                schema = (
                    f"{name} TAG SEPARATOR {separator} " f"{name} AS {name}_fts TEXT"
                )
            else:
                schema = f"{name} TAG SEPARATOR {separator}"
        elif issubclass(typ, RedisModel):
            sub_fields = []
            for embedded_name, field in typ.model_fields.items():
                sub_fields.append(
                    cls.schema_for_type(
                        f"{name}_{embedded_name}", field.outer_type_, field.field_info
                    )
                )
            schema = " ".join(sub_fields)
        else:
            separator = getattr(
                field_info, "separator", SINGLE_VALUE_TAG_FIELD_SEPARATOR
            )
            schema = f"{name} TAG SEPARATOR {separator}"
        if schema and sortable is True:
            schema += " SORTABLE"
        if schema and case_sensitive is True:
            schema += " CASESENSITIVE"

        return schema

    # =========================================================================
    # Hash Field Expiration Methods (Redis 7.4+)
    # =========================================================================

    async def expire_field(
        self,
        field_name: str,
        seconds: int,
        nx: bool = False,
        xx: bool = False,
        gt: bool = False,
        lt: bool = False,
    ) -> int:
        """
        Set a TTL on a specific hash field.

        Requires Redis 7.4+ and redis-py >= 5.1.0.

        Args:
            field_name: The name of the field to expire.
            seconds: TTL in seconds.
            nx: Only set expiry if field has no expiry.
            xx: Only set expiry if field already has an expiry.
            gt: Only set expiry if new expiry is greater than current.
            lt: Only set expiry if new expiry is less than current.

        Returns:
            1 if expiry was set, -2 if field doesn't exist, 0 if conditions not met.

        Raises:
            NotImplementedError: If redis-py version doesn't support HEXPIRE.
        """
        if not supports_hash_field_expiration():
            raise NotImplementedError(
                "Hash field expiration requires redis-py >= 5.1.0 and Redis 7.4+"
            )

        db = self.db()
        key = self.key()
        result = await db.hexpire(key, seconds, field_name, nx=nx, xx=xx, gt=gt, lt=lt)
        # hexpire returns a list of results, one per field
        return result[0] if result else -2

    async def field_ttl(self, field_name: str) -> int:
        """
        Get the remaining TTL of a hash field in seconds.

        Requires Redis 7.4+ and redis-py >= 5.1.0.

        Args:
            field_name: The name of the field.

        Returns:
            TTL in seconds, -1 if no expiry, -2 if field doesn't exist.

        Raises:
            NotImplementedError: If redis-py version doesn't support HTTL.
        """
        if not supports_hash_field_expiration():
            raise NotImplementedError(
                "Hash field expiration requires redis-py >= 5.1.0 and Redis 7.4+"
            )

        db = self.db()
        key = self.key()
        result = await db.httl(key, field_name)
        # httl returns a list of results, one per field
        return result[0] if result else -2

    async def persist_field(self, field_name: str) -> int:
        """
        Remove the expiration from a hash field.

        Requires Redis 7.4+ and redis-py >= 5.1.0.

        Args:
            field_name: The name of the field.

        Returns:
            1 if expiry was removed, -1 if no expiry, -2 if field doesn't exist.

        Raises:
            NotImplementedError: If redis-py version doesn't support HPERSIST.
        """
        if not supports_hash_field_expiration():
            raise NotImplementedError(
                "Hash field expiration requires redis-py >= 5.1.0 and Redis 7.4+"
            )

        db = self.db()
        key = self.key()
        result = await db.hpersist(key, field_name)
        # hpersist returns a list of results, one per field
        return result[0] if result else -2


class JsonModel(RedisModel, abc.ABC):
    def __init_subclass__(cls, **kwargs):
        # Generate the RediSearch schema once to validate fields.
        cls.redisearch_schema()

    def __init__(self, *args, **kwargs):
        if not has_redis_json(self.db()):
            log.error(
                "Your Redis instance does not have the RedisJson module "
                "loaded. JsonModel depends on RedisJson."
            )
        super().__init__(*args, **kwargs)

    async def save(
        self: "Model",
        pipeline: Optional[redis.client.Pipeline] = None,
        nx: bool = False,
        xx: bool = False,
    ) -> Optional["Model"]:
        if nx and xx:
            raise ValueError("Cannot specify both nx and xx")

        self.check()
        db = self._get_db(pipeline)

        # Get model data and apply transformations in the correct order
        data = self.model_dump()
        # Convert datetime objects to timestamps for proper indexing
        data = convert_datetime_to_timestamp(data)
        # Convert bytes to base64 strings for safe JSON storage
        data = convert_bytes_to_base64(data)
        # Apply JSON encoding for complex types (Enums, UUIDs, Sets, etc.)
        data = jsonable_encoder(data)

        key = self.key()
        path = Path.root_path()

        async def _do_save(conn):
            # JSON.SET supports nx and xx natively
            result = await conn.json().set(key, path, data, nx=nx, xx=xx)
            # JSON.SET returns None if nx/xx condition not met, "OK" otherwise
            if result is None:
                return None
            return self

        # TODO: Wrap response errors in a custom exception?
        try:
            return await _do_save(db)
        except RuntimeError as e:
            if "Event loop is closed" in str(e):
                # Connection is bound to closed event loop, refresh it and retry
                from ..connections import get_redis_connection

                self.__class__._meta.database = get_redis_connection()
                db = self._get_db(pipeline)
                return await _do_save(db)
            else:
                raise

    @classmethod
    async def all_pks(cls):  # type: ignore
        key_prefix = cls.make_key(cls._meta.primary_key_pattern.format(pk=""))
        # TODO: We need to decide how we want to handle the lack of
        #  decode_responses=True...
        return (
            (
                remove_prefix(key, key_prefix)
                if isinstance(key, str)
                else remove_prefix(key.decode(cls.Meta.encoding), key_prefix)
            )
            async for key in cls.db().scan_iter(f"{key_prefix}*", _type="ReJSON-RL")
        )

    async def update(self, **field_values):
        validate_model_fields(self.__class__, field_values)
        for field, value in field_values.items():
            # Handle the simple update case first, e.g. city="Happy Valley"
            if "__" not in field:
                setattr(self, field, value)
                continue

            # Handle the nested update field name case, e.g. address__city="Happy Valley"
            obj = self
            parts = field.split("__")
            path_to_field = parts[:-1]
            target_field = parts[-1]

            # Get the final object in a nested update field name, e.g. for
            # the string address__city, we want to get self.address.city
            for sub_field in path_to_field:
                obj = getattr(obj, sub_field)

            # Set the target field (the last "part" of the nested update
            # field name) to the target value.
            setattr(obj, target_field, value)
        await self.save()

    @classmethod
    async def get(cls: Type["Model"], pk: Any) -> "Model":
        document_data = await cls.db().json().get(cls.make_key(pk))
        if document_data is None:
            raise NotFoundError
        # Convert timestamps back to datetime objects before validation
        document_data = convert_timestamp_to_datetime(document_data, cls.model_fields)
        # Convert base64 strings back to bytes for bytes fields
        document_data = convert_base64_to_bytes(document_data, cls.model_fields)
        return cls.model_validate(document_data)

    @classmethod
    def redisearch_schema(cls):
        key_prefix = cls.make_key(cls._meta.primary_key_pattern.format(pk=""))
        schema_prefix = f"ON JSON PREFIX 1 {key_prefix} SCHEMA"
        schema_parts = [schema_prefix] + cls.schema_for_fields()
        return " ".join(schema_parts)

    @classmethod
    def schema_for_fields(cls):
        schema_parts = []
        json_path = "$"
        fields = dict()
        if PYDANTIC_V2:
            model_fields = cls.model_fields
        else:
            model_fields = cls.__fields__

        for name, field in model_fields.items():
            fields[name] = field
        # Check for redis-om FieldInfo objects in __dict__ that may have extra
        # attributes (index, sortable, etc.) not captured in model_fields.
        # We iterate over annotation keys and look up in __dict__ rather than
        # iterating __dict__.items() directly to avoid Python 3.14+ errors
        # when the dict is modified during class construction. See #763.
        for name in cls.__annotations__:
            field = cls.__dict__.get(name)
            if isinstance(field, FieldInfo):
                if not field.annotation:
                    field.annotation = cls.__annotations__[name]
                fields[name] = field
        for name, field in cls.__annotations__.items():
            if name in fields:
                continue
            fields[name] = PydanticFieldInfo.from_annotation(field)

        for name, field in fields.items():
            _type = get_outer_type(field)
            if _type is None:
                continue

            if (
                not isinstance(field, FieldInfo)
                and hasattr(field, "metadata")
                and len(field.metadata) > 0
                and isinstance(field.metadata[0], FieldInfo)
            ):
                field = field.metadata[0]

            field_info = field

            if getattr(field_info, "primary_key", None) is True:
                if issubclass(_type, str):
                    separator = getattr(
                        field_info, "separator", SINGLE_VALUE_TAG_FIELD_SEPARATOR
                    )
                    redisearch_field = f"$.{name} AS {name} TAG SEPARATOR {separator}"
                else:
                    redisearch_field = cls.schema_for_type(
                        json_path, name, "", _type, field_info
                    )
                schema_parts.append(redisearch_field)
                continue
            schema_parts.append(
                cls.schema_for_type(json_path, name, "", _type, field_info)
            )
        return schema_parts

    @classmethod
    def schema_for_type(
        cls,
        json_path: str,
        name: str,
        name_prefix: str,
        typ: Union[Type[RedisModel], Any],
        field_info: PydanticFieldInfo,
        parent_type: Optional[Any] = None,
    ) -> str:
        should_index = should_index_field(field_info)
        is_container_type = is_supported_container_type(typ)
        parent_is_container_type = is_supported_container_type(parent_type)
        parent_is_model = False

        if parent_type:
            try:
                parent_is_model = issubclass(parent_type, RedisModel)
            except TypeError:
                pass

        # TODO: We need a better way to know that we're indexing a value
        #  discovered in a model within an array.
        #
        # E.g., say we have a field like `orders: List[Order]`, and we're
        # indexing the "name" field from the Order model (because it's marked
        # index=True in the Order model). The JSONPath for this field is
        # $.orders[*].name, but the "parent" type at this point is Order, not
        # List. For now, we'll discover that Orders are stored in a list by
        # checking if the JSONPath contains the expression for all items in
        # an array.
        parent_is_model_in_container = parent_is_model and json_path.endswith("[*]")

        try:
            field_is_model = issubclass(typ, RedisModel)
        except TypeError:
            # Not a class, probably a type annotation
            field_is_model = False

        vector_options: Optional[VectorFieldOptions] = getattr(
            field_info, "vector_options", None
        )
        try:
            is_vector = vector_options and has_numeric_inner_type(typ)
        except IndexError:
            raise RedisModelError(
                f"Vector field '{name}' must be annotated as a container type"
            )

        # When we encounter a list or model field, we need to descend
        # into the values of the list or the fields of the model to
        # find any values marked as indexed.
        if is_container_type and not is_vector:
            field_type = get_origin(typ)
            if field_type == Literal:
                path = f"{json_path}.{name}"
                return cls.schema_for_type(
                    path,
                    name,
                    name_prefix,
                    str,
                    field_info,
                    parent_type=field_type,
                )
            else:
                embedded_cls = get_args(typ)
                if not embedded_cls:
                    log.warning(
                        "Model %s defined an empty list or tuple field: %s", cls, name
                    )
                    return ""
                path = f"{json_path}.{name}[*]"
                embedded_cls = embedded_cls[0]
                return cls.schema_for_type(
                    path,
                    name,
                    name_prefix,
                    embedded_cls,
                    field_info,
                    parent_type=field_type,
                )
        elif field_is_model:
            name_prefix = f"{name_prefix}_{name}" if name_prefix else name
            sub_fields = []
            for embedded_name, field in typ.model_fields.items():
                if (
                    hasattr(field, "metadata")
                    and len(field.metadata) > 0
                    and isinstance(field.metadata[0], FieldInfo)
                ):
                    field_info = field.metadata[0]
                else:
                    field_info = field

                if parent_is_container_type:
                    # We'll store this value either as a JavaScript array, so
                    # the correct JSONPath expression is to refer directly to
                    # attribute names after the container notation, e.g.
                    # orders[*].created_date.
                    path = json_path
                else:
                    # All other fields should use dot notation with both the
                    # current field name and "embedded" field name, e.g.,
                    # order.address.street_line_1.
                    path = f"{json_path}.{name}"
                sub_fields.append(
                    cls.schema_for_type(
                        path,
                        embedded_name,
                        name_prefix,
                        # field.annotation,
                        get_outer_type(field),
                        field_info,
                        parent_type=typ,
                    )
                )
            return " ".join(filter(None, sub_fields))
        # NOTE: This is the termination point for recursion. We've descended
        # into models and lists until we found an actual value to index.
        elif should_index:
            index_field_name = f"{name_prefix}_{name}" if name_prefix else name
            if parent_is_container_type:
                # If we're indexing the this field as a JavaScript array, then
                # the currently built-up JSONPath expression will be
                # "field_name[*]", which is what we want to use.
                path = json_path
            else:
                path = f"{json_path}.{name}"
            sortable = getattr(field_info, "sortable", False)
            case_sensitive = getattr(field_info, "case_sensitive", False)
            full_text_search = getattr(field_info, "full_text_search", False)

            # For more complicated compound validators (e.g. PositiveInt), we might get a _GenericAlias rather than
            # a proper type, we can pull the type information from the origin of the first argument.
            if not isinstance(typ, type):
                type_args = typing_get_args(field_info.annotation)
                typ = (
                    getattr(type_args[0], "__origin__", type_args[0])
                    if type_args
                    else typ
                )

            # Get separator from field_info, defaulting to pipe
            separator = getattr(
                field_info, "separator", SINGLE_VALUE_TAG_FIELD_SEPARATOR
            )

            if is_vector and vector_options:
                schema = f"{path} AS {index_field_name} {vector_options.schema}"
            elif parent_is_container_type or parent_is_model_in_container:
                if typ is not str:
                    raise RedisModelError(
                        "List and tuple fields can only contain strings. "
                        f"Problem field: {name}. Docs: {ERRORS_URL}#E12"
                    )
                if full_text_search is True:
                    raise RedisModelError(
                        "List and tuple fields cannot be indexed for full-text "
                        f"search. Problem field: {name}. Docs: {ERRORS_URL}#E13"
                    )
                # List/tuple fields are indexed as TAG fields and can be sortable
                schema = f"{path} AS {index_field_name} TAG SEPARATOR {separator}"
                if sortable is True:
                    schema += " SORTABLE"
                if case_sensitive is True:
                    schema += " CASESENSITIVE"
            elif typ is bool:
                schema = f"{path} AS {index_field_name} TAG"
                if sortable is True:
                    schema += " SORTABLE"
            elif typ in [CoordinateType, Coordinates]:
                schema = f"{path} AS {index_field_name} GEO"
                if sortable is True:
                    schema += " SORTABLE"
            elif is_numeric_type(typ):
                schema = f"{path} AS {index_field_name} NUMERIC"
                if sortable is True:
                    schema += " SORTABLE"
            elif issubclass(typ, str):
                if full_text_search is True:
                    schema = (
                        f"{path} AS {index_field_name} TAG SEPARATOR {separator} "
                        f"{path} AS {index_field_name}_fts TEXT"
                    )
                    if sortable is True:
                        # NOTE: With the current preview release, making a field
                        # full-text searchable and sortable only makes the TEXT
                        # field sortable. This means that results for full-text
                        # search queries can be sorted, but not exact match
                        # queries.
                        schema += " SORTABLE"
                    if case_sensitive is True:
                        raise RedisModelError("Text fields cannot be case-sensitive.")
                else:
                    # String fields are indexed as TAG fields and can be sortable
                    schema = f"{path} AS {index_field_name} TAG SEPARATOR {separator}"
                    if sortable is True:
                        schema += " SORTABLE"
                    if case_sensitive is True:
                        schema += " CASESENSITIVE"
            else:
                # Default to TAG field, which can be sortable
                schema = f"{path} AS {index_field_name} TAG SEPARATOR {separator}"
                if sortable is True:
                    schema += " SORTABLE"

            return schema
        return ""


class EmbeddedJsonModel(JsonModel, abc.ABC):
    """
    A model intended to be embedded within a JsonModel.

    EmbeddedJsonModels are stored as part of their parent document, not as
    separate Redis keys, so they do not need or generate primary keys.

    The pk field is excluded from serialization by default.
    """

    # Override pk to exclude it from serialization - embedded models don't need pks
    pk: Optional[str] = Field(default=None, exclude=True)

    class Meta:
        embedded = True
