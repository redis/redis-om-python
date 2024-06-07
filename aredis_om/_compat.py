from dataclasses import dataclass, is_dataclass
from typing import (
    Any,
    Callable,
    Deque,
    Dict,
    FrozenSet,
    List,
    Mapping,
    Sequence,
    Set,
    Tuple,
    Type,
    Union,
)

from pydantic.version import VERSION as PYDANTIC_VERSION
from typing_extensions import Annotated, Literal, get_args, get_origin


PYDANTIC_V2 = PYDANTIC_VERSION.startswith("2.")

if PYDANTIC_V2:

    def use_pydantic_2_plus():
        return True

    from pydantic import BaseModel, TypeAdapter
    from pydantic import ValidationError as ValidationError
    from pydantic import validator
    from pydantic._internal._model_construction import ModelMetaclass
    from pydantic._internal._repr import Representation
    from pydantic.deprecated.json import ENCODERS_BY_TYPE
    from pydantic.fields import FieldInfo
    from pydantic.v1.main import validate_model
    from pydantic.v1.typing import NoArgAnyCallable
    from pydantic_core import PydanticUndefined as Undefined
    from pydantic_core import PydanticUndefinedType as UndefinedType

    @dataclass
    class ModelField:
        field_info: FieldInfo
        name: str
        mode: Literal["validation", "serialization"] = "validation"

        @property
        def alias(self) -> str:
            a = self.field_info.alias
            return a if a is not None else self.name

        @property
        def required(self) -> bool:
            return self.field_info.is_required()

        @property
        def default(self) -> Any:
            return self.get_default()

        @property
        def type_(self) -> Any:
            return self.field_info.annotation

        def __post_init__(self) -> None:
            self._type_adapter: TypeAdapter[Any] = TypeAdapter(
                Annotated[self.field_info.annotation, self.field_info]
            )

        def get_default(self) -> Any:
            if self.field_info.is_required():
                return Undefined
            return self.field_info.get_default(call_default_factory=True)

        def validate(
            self,
            value: Any,
            values: Dict[str, Any] = {},  # noqa: B006
            *,
            loc: Tuple[Union[int, str], ...] = (),
        ) -> Tuple[Any, Union[List[Dict[str, Any]], None]]:
            return (
                self._type_adapter.validate_python(value, from_attributes=True),
                None,
            )

        def __hash__(self) -> int:
            # Each ModelField is unique for our purposes, to allow making a dict from
            # ModelField to its JSON Schema.
            return id(self)

else:
    from pydantic import BaseModel, validator
    from pydantic.fields import FieldInfo, ModelField, Undefined, UndefinedType
    from pydantic.json import ENCODERS_BY_TYPE
    from pydantic.main import ModelMetaclass, validate_model
    from pydantic.typing import NoArgAnyCallable
    from pydantic.utils import Representation

    def use_pydantic_2_plus():
        return False
