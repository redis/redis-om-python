import datetime
from dataclasses import dataclass
from enum import Enum
from typing import (
    AbstractSet,
    Any,
    Callable,
    Dict,
    Mapping,
    Optional,
    Set,
    Tuple,
    Type,
    TypeVar,
    Union,
    Sequence, ClassVar, TYPE_CHECKING, no_type_check,
)

import redis
from pydantic import BaseModel
from pydantic.fields import FieldInfo as PydanticFieldInfo
from pydantic.fields import ModelField, Undefined, UndefinedType
from pydantic.main import BaseConfig, ModelMetaclass, validate_model
from pydantic.typing import NoArgAnyCallable, resolve_annotations
from pydantic.utils import Representation

from .encoders import jsonable_encoder
from .util import uuid_from_time

_T = TypeVar("_T")


class RedisModelError(Exception):
    pass


class NotFoundError(Exception):
    pass


class Operations(Enum):
    EQ = 1
    LT = 2
    GT = 3


@dataclass
class Expression:
    field: ModelField
    op: Operations
    right_value: Any


class ExpressionProxy:
    def __init__(self, field: ModelField):
        self.field = field

    def __eq__(self, other: Any) -> Expression:
        return Expression(field=self.field, op=Operations.EQ, right_value=other)

    def __lt__(self, other: Any) -> Expression:
        return Expression(field=self.field, op=Operations.LT, right_value=other)

    def __gt__(self, other: Any) -> Expression:
        return Expression(field=self.field, op=Operations.GT, right_value=other)


def __dataclass_transform__(
    *,
    eq_default: bool = True,
    order_default: bool = False,
    kw_only_default: bool = False,
    field_descriptors: Tuple[Union[type, Callable[..., Any]], ...] = (()),
) -> Callable[[_T], _T]:
    return lambda a: a


class FieldInfo(PydanticFieldInfo):
    def __init__(self, default: Any = Undefined, **kwargs: Any) -> None:
        primary_key = kwargs.pop("primary_key", False)
        nullable = kwargs.pop("nullable", Undefined)
        foreign_key = kwargs.pop("foreign_key", Undefined)
        index = kwargs.pop("index", Undefined)
        unique = kwargs.pop("unique", Undefined)
        super().__init__(default=default, **kwargs)
        self.primary_key = primary_key
        self.nullable = nullable
        self.foreign_key = foreign_key
        self.index = index
        self.unique = unique


class RelationshipInfo(Representation):
    def __init__(
        self,
        *,
        back_populates: Optional[str] = None,
        link_model: Optional[Any] = None,
    ) -> None:
        self.back_populates = back_populates
        self.link_model = link_model


def Field(
    default: Any = Undefined,
    *,
    default_factory: Optional[NoArgAnyCallable] = None,
    alias: str = None,
    title: str = None,
    description: str = None,
    exclude: Union[
        AbstractSet[Union[int, str]], Mapping[Union[int, str], Any], Any
    ] = None,
    include: Union[
        AbstractSet[Union[int, str]], Mapping[Union[int, str], Any], Any
    ] = None,
    const: bool = None,
    gt: float = None,
    ge: float = None,
    lt: float = None,
    le: float = None,
    multiple_of: float = None,
    min_items: int = None,
    max_items: int = None,
    min_length: int = None,
    max_length: int = None,
    allow_mutation: bool = True,
    regex: str = None,
    primary_key: bool = False,
    unique: bool = False,
    foreign_key: Optional[Any] = None,
    nullable: Union[bool, UndefinedType] = Undefined,
    index: Union[bool, UndefinedType] = Undefined,
    schema_extra: Optional[Dict[str, Any]] = None,
) -> Any:
    current_schema_extra = schema_extra or {}
    field_info = FieldInfo(
        default,
        default_factory=default_factory,
        alias=alias,
        title=title,
        description=description,
        exclude=exclude,
        include=include,
        const=const,
        gt=gt,
        ge=ge,
        lt=lt,
        le=le,
        multiple_of=multiple_of,
        min_items=min_items,
        max_items=max_items,
        min_length=min_length,
        max_length=max_length,
        allow_mutation=allow_mutation,
        regex=regex,
        primary_key=primary_key,
        unique=unique,
        foreign_key=foreign_key,
        nullable=nullable,
        index=index,
        **current_schema_extra,
    )
    field_info._validate()
    return field_info


def Relationship(
    *,
    back_populates: Optional[str] = None,
    link_model: Optional[Any] = None
) -> Any:
    relationship_info = RelationshipInfo(
        back_populates=back_populates,
        link_model=link_model,
    )
    return relationship_info


@__dataclass_transform__(kw_only_default=True, field_descriptors=(Field, FieldInfo))
class RedisModelMetaclass(ModelMetaclass):
    __redismodel_relationships__: Dict[str, RelationshipInfo]
    __config__: Type[BaseConfig]
    __fields__: Dict[str, ModelField]

    # From Pydantic
    def __new__(cls, name, bases, class_dict: dict, **kwargs) -> Any:
        relationships: Dict[str, RelationshipInfo] = {}
        dict_for_pydantic = {}
        original_annotations = resolve_annotations(
            class_dict.get("__annotations__", {}), class_dict.get("__module__", None)
        )
        pydantic_annotations = {}
        relationship_annotations = {}
        for k, v in class_dict.items():
            if isinstance(v, RelationshipInfo):
                relationships[k] = v
            else:
                dict_for_pydantic[k] = v
        for k, v in original_annotations.items():
            if k in relationships:
                relationship_annotations[k] = v
            else:
                pydantic_annotations[k] = v
        dict_used = {
            **dict_for_pydantic,
            "__weakref__": None,
            "__redismodel_relationships__": relationships,
            "__annotations__": pydantic_annotations,
        }
        # Duplicate logic from Pydantic to filter config kwargs because if they are
        # passed directly including the registry Pydantic will pass them over to the
        # superclass causing an error
        allowed_config_kwargs: Set[str] = {
            key
            for key in dir(BaseConfig)
            if not (
                key.startswith("__") and key.endswith("__")
            )  # skip dunder methods and attributes
        }
        pydantic_kwargs = kwargs.copy()
        config_kwargs = {
            key: pydantic_kwargs.pop(key)
            for key in pydantic_kwargs.keys() & allowed_config_kwargs
        }
        new_cls = super().__new__(cls, name, bases, dict_used, **config_kwargs)
        new_cls.__annotations__ = {
            **relationship_annotations,
            **pydantic_annotations,
            **new_cls.__annotations__,
        }
        return new_cls


@dataclass
class PrimaryKey:
    name: str
    field: ModelField


class DefaultMeta:
    global_key_prefix: Optional[str] = None
    model_key_prefix: Optional[str] = None
    primary_key_pattern: Optional[str] = None
    database: Optional[redis.Redis] = None
    primary_key: Optional[PrimaryKey] = None


class RedisModel(BaseModel, metaclass=RedisModelMetaclass):
    """
    TODO: Convert expressions to Redis commands, execute
    TODO: Key prefix vs. "key pattern" (that's actually the primary key pattern)
    TODO: Default key prefix is model name lowercase
    TODO: Build primary key pattern from PK field name, model prefix
    TODO: Default PK pattern is model name:pk field
    """
    pk: Optional[str] = Field(default=None, primary_key=True)

    class Config:
        orm_mode = True
        arbitrary_types_allowed = True
        extra = 'allow'

    Meta = DefaultMeta

    def __init_subclass__(cls, **kwargs):
        # Create proxies for each model field so that we can use the field
        # in queries, like Model.get(Model.field_name == 1)
        super().__init_subclass__(**kwargs)

        for name, field in cls.__fields__.items():
            setattr(cls, name, ExpressionProxy(field))
            # Check if this is our FieldInfo version with extended ORM metadata.
            if isinstance(field.field_info, FieldInfo):
                if field.field_info.primary_key:
                    cls.Meta.primary_key = PrimaryKey(name=name, field=field)
                if not hasattr(cls.Meta, 'primary_key_pattern'):
                    cls.Meta.primary_key_pattern = f"{cls.Meta.primary_key.name}:{{pk}}"

    def __init__(__pydantic_self__, **data: Any) -> None:
        # Uses something other than `self` the first arg to allow "self" as a
        # settable attribute
        if TYPE_CHECKING:
            __pydantic_self__.__dict__: Dict[str, Any] = {}
            __pydantic_self__.__fields_set__: Set[str] = set()

        values, fields_set, validation_error = validate_model(
            __pydantic_self__.__class__, data
        )

        if validation_error:
            raise validation_error

        __pydantic_self__.validate_primary_key()

        object.__setattr__(__pydantic_self__, '__dict__', values)

    @classmethod
    @no_type_check
    def _get_value(cls, *args, **kwargs) -> Any:
        """
        Always send None as an empty string.

        TODO: How broken is this?
        """
        val = super()._get_value(*args, **kwargs)
        if val is None:
            return ""
        return val

    @classmethod
    def validate_primary_key(cls):
        """Check for a primary key. We need one (and only one)."""
        primary_keys = 0
        for name, field in cls.__fields__.items():
            if field.field_info.primary_key:
                primary_keys += 1

        # TODO: Automatically create a primary key field instead?
        if primary_keys == 0:
            raise RedisModelError("You must define a primary key for the model")
        elif primary_keys > 1:
            raise RedisModelError("You must define only one primary key for a model")

    @classmethod
    def key(cls, part: str):
        global_prefix = getattr(cls.Meta, 'global_key_prefix', '')
        model_prefix = getattr(cls.Meta, 'model_key_prefix', '')
        return f"{global_prefix}{model_prefix}{part}"

    @classmethod
    def get(cls, pk: Any):
        # TODO: Getting related objects
        pk_pattern = cls.Meta.primary_key_pattern.format(pk=str(pk))
        print("GET ", cls.key(pk_pattern))
        document = cls.db().hgetall(cls.key(pk_pattern))
        if not document:
            raise NotFoundError
        return cls.parse_obj(document)

    def delete(self):
        # TODO: deleting relationships
        pk = self.__fields__[self.Meta.primary_key.field.name]
        pk_pattern = self.Meta.primary_key_pattern.format(pk=pk)
        return self.db().delete(self.key(pk_pattern))

    @classmethod
    def db(cls):
        return cls.Meta.database

    @classmethod
    def filter(cls, *expressions: Sequence[Expression]):
        return cls

    @classmethod
    def exclude(cls, *expressions: Sequence[Expression]):
        return cls

    @classmethod
    def add(cls, models: Sequence['RedisModel']) -> Sequence['RedisModel']:
        return [model.save() for model in models]

    @classmethod
    def update(cls, **field_values):
        return cls

    @classmethod
    def values(cls):
        """Return raw values from Redis instead of model instances."""
        return cls

    def save(self) -> 'RedisModel':
        pk_field = self.Meta.primary_key.field
        document = jsonable_encoder(self.dict())
        pk = document[pk_field.name]

        if not pk:
            pk = str(uuid_from_time(datetime.datetime.now()))
            setattr(self, pk_field.name, pk)
            document[pk_field.name] = pk

        pk_pattern = self.Meta.primary_key_pattern.format(pk=pk)
        success = self.db().hset(self.key(pk_pattern), mapping=document)
        return success

    Meta = DefaultMeta

    def __init__(self, **data: Any) -> None:
        """Validate that a model instance has a primary key."""
        super().__init__(**data)
