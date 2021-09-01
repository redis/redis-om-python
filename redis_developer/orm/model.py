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
    TypeVar,
    Union,
    Sequence,
    no_type_check,
    Protocol,
    List, Type
)
import uuid

import redis
from pydantic import BaseModel, validator
from pydantic.fields import FieldInfo as PydanticFieldInfo
from pydantic.fields import ModelField, Undefined, UndefinedType
from pydantic.typing import NoArgAnyCallable
from pydantic.utils import Representation

from .encoders import jsonable_encoder

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


class PrimaryKeyCreator(Protocol):
    def create_pk(self, *args, **kwargs) -> str:
        """Create a new primary key"""


class Uuid4PrimaryKey:
    def create_pk(self) -> str:
        return str(uuid.uuid4())


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
    primary_key_creator_cls: Type[PrimaryKeyCreator] = None


class RedisModel(BaseModel):
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
                # TODO: Raise exception here, global key prefix required?
                if not getattr(cls.Meta, 'global_key_prefix'):
                    cls.Meta.global_key_prefix = ""
                if not getattr(cls.Meta, 'model_key_prefix'):
                    cls.Meta.model_key_prefix = f"{cls.__name__.lower()}"
                if not getattr(cls.Meta, 'primary_key_pattern'):
                    cls.Meta.primary_key_pattern = "{pk}"
                if not getattr(cls.Meta, 'database'):
                    cls.Meta.database = redis.Redis(decode_responses=True)
                if not getattr(cls.Meta, 'primary_key_creator_cls'):
                    cls.Meta.primary_key_creator_cls = Uuid4PrimaryKey

    def __init__(__pydantic_self__, **data: Any) -> None:
        super().__init__(**data)
        __pydantic_self__.validate_primary_key()

    @validator("pk", always=True)
    def validate_pk(cls, v):
        if not v:
            v = cls.Meta.primary_key_creator_cls().create_pk()
        return v

    @classmethod
    def validate_primary_key(cls):
        """Check for a primary key. We need one (and only one)."""
        primary_keys = 0
        for name, field in cls.__fields__.items():
            if getattr(field.field_info, 'primary_key', None):
                primary_keys += 1
        if primary_keys == 0:
            raise RedisModelError("You must define a primary key for the model")
        elif primary_keys > 1:
            raise RedisModelError("You must define only one primary key for a model")

    @classmethod
    def make_key(cls, part: str):
        global_prefix = getattr(cls.Meta, 'global_key_prefix', '').strip(":")
        model_prefix = getattr(cls.Meta, 'model_key_prefix', '').strip(":")
        return f"{global_prefix}:{model_prefix}:{part}"

    @classmethod
    def make_primary_key(cls, pk: Any):
        """Return the Redis key for this model."""
        return cls.make_key(cls.Meta.primary_key_pattern.format(pk=pk))

    def key(self):
        """Return the Redis key for this model."""
        pk = getattr(self, self.Meta.primary_key.field.name)
        return self.make_primary_key(pk)

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

    def delete(self):
        return self.db().delete(self.key())

    # TODO: Protocol
    @classmethod
    def get(cls, pk: Any):
        raise NotImplementedError

    def save(self, *args, **kwargs) -> 'RedisModel':
        raise NotImplementedError


class HashModel(RedisModel):
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)

        for name, field in cls.__fields__.items():
            if issubclass(field.outer_type_, RedisModel):
                raise RedisModelError(f"HashModels cannot have embedded model "
                                      f"fields. Field: {name}")

            for typ in (Set, Mapping, List):
                if issubclass(field.outer_type_, typ):
                    raise RedisModelError(f"HashModels cannot have set, list,"
                                          f" or mapping fields. Field: {name}")

    def save(self, *args, **kwargs) -> 'HashModel':
        document = jsonable_encoder(self.dict())
        success = self.db().hset(self.key(), mapping=document)

        return success

    @classmethod
    def get(cls, pk: Any) -> 'HashModel':
        document = cls.db().hgetall(cls.make_primary_key(pk))
        if not document:
            raise NotFoundError
        return cls.parse_obj(document)

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


class JsonModel(RedisModel):
    def save(self, *args, **kwargs) -> 'JsonModel':
        success = self.db().execute_command('JSON.SET', self.key(), ".", self.json())
        return success

    @classmethod
    def get(cls, pk: Any) -> 'JsonModel':
        document = cls.db().execute_command("JSON.GET", cls.make_primary_key(pk))
        if not document:
            raise NotFoundError
        return cls.parse_raw(document)
