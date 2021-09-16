import abc
import dataclasses
import decimal
import operator
from copy import copy
from dataclasses import dataclass
from enum import Enum
from functools import reduce
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
from pydantic.main import ModelMetaclass
from pydantic.typing import NoArgAnyCallable
from pydantic.utils import Representation

from .encoders import jsonable_encoder


model_registry = {}

_T = TypeVar("_T")


class RedisModelError(Exception):
    pass


class NotFoundError(Exception):
    pass


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
    GTE = 12
    LTE = 13
    LIKE = 14


@dataclass
class NegatedExpression:
    expression: 'Expression'

    def __invert__(self):
        return self.expression


@dataclass
class Expression:
    op: Operators
    left: Any
    right: Any

    def __invert__(self):
        return NegatedExpression(self)

    def __and__(self, other):
        return Expression(left=self, op=Operators.AND, right=other)

    def __or__(self, other):
        return Expression(left=self, op=Operators.OR, right=other)


ExpressionOrNegated = Union[Expression, NegatedExpression]


class QueryNotSupportedError(Exception):
    """The attempted query is not supported."""


class RediSearchFieldTypes(Enum):
    TEXT = 'TEXT'
    TAG = 'TAG'
    NUMERIC = 'NUMERIC'
    GEO = 'GEO'


# TODO: How to handle Geo fields?
NUMERIC_TYPES = (float, int, decimal.Decimal)


@dataclass
class FindQuery:
    expressions: Sequence[Expression]
    expression: Expression = dataclasses.field(init=False)
    query: str = dataclasses.field(init=False)
    pagination: List[str] = dataclasses.field(init=False)
    model: Type['RedisModel']
    limit: Optional[int] = None
    offset: Optional[int] = None

    def __post_init__(self):
        self.expression = reduce(operator.and_, self.expressions)
        self.query = self.resolve_redisearch_query(self.expression)
        self.pagination = self.resolve_redisearch_pagination()

    def resolve_field_type(self, field: ModelField) -> RediSearchFieldTypes:
        if getattr(field.field_info, 'primary_key', None):
            return RediSearchFieldTypes.TAG
        field_type = field.outer_type_

        # TODO: GEO
        # TODO: TAG (other than PK)
        if any(isinstance(field_type, t) for t in NUMERIC_TYPES):
            return RediSearchFieldTypes.NUMERIC
        else:
            return RediSearchFieldTypes.TEXT

    def resolve_value(self, field_name: str, field_type: RediSearchFieldTypes,
                      op: Operators, value: Any) -> str:
        result = ""
        if field_type is RediSearchFieldTypes.TEXT:
            result = f"@{field_name}:"
            if op is Operators.EQ:
                result += f'"{value}"'
            elif op is Operators.NE:
                result = f'-({result}"{value}")'
            elif op is Operators.LIKE:
                result += value
            else:
                # TODO: Handling TAG, TEXT switch-offs, etc.
                raise QueryNotSupportedError("Only equals (=) and not-equals (!=) comparisons are "
                                             "currently supported for TEXT fields. See docs: TODO")
        elif field_type is RediSearchFieldTypes.NUMERIC:
            if op is Operators.EQ:
                result += f"@{field_name}:[{value} {value}]"
            elif op is Operators.NE:
                # TODO: Is this enough or do we also need a clause for all values ([-inf +inf])?
                result += f"~(@{field_name}:[{value} {value}])"
            elif op is Operators.GT:
                result += f"@{field_name}:[({value} +inf]"
            elif op is Operators.LT:
                result += f"@{field_name}:[-inf ({value}]"
            elif op is Operators.GTE:
                result += f"@{field_name}:[{value} +inf]"
            elif op is Operators.LTE:
                result += f"@{field_name}:[-inf {value}]"

        return result

    def resolve_redisearch_pagination(self):
        """Resolve pagination options for a query."""
        if not self.limit and not self.offset:
            return []
        offset = self.offset or 0
        limit = self.limit or 10
        return ["LIMIT", offset, limit]

    def resolve_redisearch_query(self, expression: ExpressionOrNegated):
        """Resolve an expression to a string RediSearch query."""
        field_type = None
        field_name = None
        is_negated = False
        result = ""

        if isinstance(expression, NegatedExpression):
            is_negated = True
            expression = expression.expression
        if isinstance(expression.left, Expression):
            result += f"({self.resolve_redisearch_query(expression.left)})"
        elif isinstance(expression.left, ModelField):
            field_type = self.resolve_field_type(expression.left)
            field_name = expression.left.name
        else:
            raise QueryNotSupportedError(f"A query expression should start with either a field"
                                         f"or an expression enclosed in parenthesis. See docs: "
                                         f"TODO")

        right = expression.right
        right_is_negated = isinstance(right, NegatedExpression)

        if isinstance(right, Expression) or right_is_negated:
            if expression.op == Operators.AND:
                result += " "
            elif expression.op == Operators.OR:
                result += "| "
            else:
                raise QueryNotSupportedError("You can only combine two query expressions with"
                                             "AND (&) or OR (|). See docs: TODO")

            if right_is_negated:
                result += "-"
                # We're handling the RediSearch operator in this call ("-"), so resolve the
                # inner expression instead of the NegatedExpression.
                right = right.expression

            result += f"({self.resolve_redisearch_query(right)})"
        else:
            if isinstance(right, ModelField):
                raise QueryNotSupportedError("Comparing fields is not supported. See docs: TODO")
            else:
                result += self.resolve_value(field_name, field_type, expression.op, right)

        if is_negated:
            result = f"-({result})"

        return result

    def find(self):
        args = ["ft.search", self.model.Meta.index_name, self.query]
        # TODO: Do we need self.pagination if we're just appending to query anyway?
        if self.pagination:
            args.extend(self.pagination)
        return self.model.db().execute_command(*args)


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
        return Expression(left=self.field, op=Operators.EQ, right=other)

    def __ne__(self, other: Any) -> Expression:
        return Expression(left=self.field, op=Operators.NE, right=other)

    def __lt__(self, other: Any) -> Expression:
        return Expression(left=self.field, op=Operators.LT, right=other)

    def __le__(self, other: Any) -> Expression:
        return Expression(left=self.field, op=Operators.LE, right=other)

    def __gt__(self, other: Any) -> Expression:
        return Expression(left=self.field, op=Operators.GT, right=other)

    def __ge__(self, other: Any) -> Expression:
        return Expression(left=self.field, op=Operators.GE, right=other)

    def __invert__(self):
        import ipdb; ipdb.set_trace()
        pass


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
        sortable = kwargs.pop("sortable", Undefined)
        foreign_key = kwargs.pop("foreign_key", Undefined)
        index = kwargs.pop("index", Undefined)
        unique = kwargs.pop("unique", Undefined)
        super().__init__(default=default, **kwargs)
        self.primary_key = primary_key
        self.sortable = sortable
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
    sortable: Union[bool, UndefinedType] = Undefined,
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
        sortable=sortable,
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
    index_name: str = None
    abstract: bool = False


class ModelMeta(ModelMetaclass):
    def __new__(cls, name, bases, attrs, **kwargs):  # noqa C901
        meta = attrs.pop('Meta', None)
        new_class = super().__new__(cls, name, bases, attrs, **kwargs)

        meta = meta or getattr(new_class, 'Meta', None)
        base_meta = getattr(new_class, '_meta', None)

        if meta and meta is not DefaultMeta:
            new_class.Meta = meta
            new_class._meta = meta
        elif base_meta:
            new_class._meta = copy(base_meta)
            new_class.Meta = new_class._meta
            # Unset inherited values we don't want to reuse (typically based on the model name).
            new_class._meta.abstract = False
            new_class._meta.model_key_prefix = None
            new_class._meta.index_name = None
        else:
            new_class._meta = copy(DefaultMeta)
            new_class.Meta = new_class._meta

        # Not an abstract model class
        if abc.ABC not in bases:
            key = f"{new_class.__module__}.{new_class.__qualname__}"
            model_registry[key] = new_class

        # Create proxies for each model field so that we can use the field
        # in queries, like Model.get(Model.field_name == 1)
        for name, field in new_class.__fields__.items():
            setattr(new_class, name, ExpressionProxy(field))
            # Check if this is our FieldInfo version with extended ORM metadata.
            if isinstance(field.field_info, FieldInfo):
                if field.field_info.primary_key:
                    new_class._meta.primary_key = PrimaryKey(name=name, field=field)

        if not getattr(new_class._meta, 'global_key_prefix', None):
            new_class._meta.global_key_prefix = getattr(base_meta, "global_key_prefix", "")
        if not getattr(new_class._meta, 'model_key_prefix', None):
            # Don't look at the base class for this.
            new_class._meta.model_key_prefix = f"{new_class.__name__.lower()}"
        if not getattr(new_class._meta, 'primary_key_pattern', None):
            new_class._meta.primary_key_pattern = getattr(base_meta, "primary_key_pattern",
                                                          "{pk}")
        if not getattr(new_class._meta, 'database', None):
            new_class._meta.database = getattr(base_meta, "database",
                                               redis.Redis(decode_responses=True))
        if not getattr(new_class._meta, 'primary_key_creator_cls', None):
            new_class._meta.primary_key_creator_cls = getattr(base_meta, "primary_key_creator_cls",
                                                              Uuid4PrimaryKey)
        if not getattr(new_class._meta, 'index_name', None):
            new_class._meta.index_name = f"{new_class._meta.global_key_prefix}:" \
                                         f"{new_class._meta.model_key_prefix}:index"

        return new_class


class RedisModel(BaseModel, abc.ABC, metaclass=ModelMeta):
    pk: Optional[str] = Field(default=None, primary_key=True)

    Meta = DefaultMeta

    class Config:
        orm_mode = True
        arbitrary_types_allowed = True
        extra = 'allow'

    def __init__(__pydantic_self__, **data: Any) -> None:
        super().__init__(**data)
        __pydantic_self__.validate_primary_key()

    @validator("pk", always=True)
    def validate_pk(cls, v):
        if not v:
            v = cls._meta.primary_key_creator_cls().create_pk()
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
        global_prefix = getattr(cls._meta, 'global_key_prefix', '').strip(":")
        model_prefix = getattr(cls._meta, 'model_key_prefix', '').strip(":")
        return f"{global_prefix}:{model_prefix}:{part}"

    @classmethod
    def make_primary_key(cls, pk: Any):
        """Return the Redis key for this model."""
        return cls.make_key(cls._meta.primary_key_pattern.format(pk=pk))

    def key(self):
        """Return the Redis key for this model."""
        pk = getattr(self, self._meta.primary_key.field.name)
        return self.make_primary_key(pk)

    @classmethod
    def db(cls):
        return cls._meta.database

    @classmethod
    def from_redis(cls, res: Any):
        import six
        from six.moves import xrange, zip as izip

        def to_string(s):
            if isinstance(s, six.string_types):
                return s
            elif isinstance(s, six.binary_type):
                return s.decode('utf-8','ignore')
            else:
                return s  # Not a string we care about

        docs = []
        step = 2  # Because the result has content
        offset = 1

        for i in xrange(1, len(res), step):
            fields_offset = offset

            fields = dict(
                dict(izip(map(to_string, res[i + fields_offset][::2]),
                            map(to_string, res[i + fields_offset][1::2])))
            )

            try:
                del fields['id']
            except KeyError:
                pass

            doc = cls(**fields)
            docs.append(doc)
        return docs

    @classmethod
    def find(cls, *expressions: Expression):
        query = FindQuery(expressions=expressions, model=cls)
        raw_result = query.find()
        return cls.from_redis(raw_result)

    @classmethod
    def find_one(cls, *expressions: Expression):
        query = FindQuery(expressions=expressions, model=cls, limit=1, offset=0)
        raw_result = query.find()
        return cls.from_redis(raw_result)[0]

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

    def save(self, *args, **kwargs) -> 'RedisModel':
        raise NotImplementedError

    @classmethod
    def schema(cls):
        raise NotImplementedError


class HashModel(RedisModel, abc.ABC):
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

    @classmethod
    def schema_for_type(cls, name, typ: Type):
        if any(issubclass(typ, t) for t in NUMERIC_TYPES):
            return f"{name} NUMERIC"
        else:
            return f"{name} TEXT"

    @classmethod
    def schema(cls):
        hash_prefix = cls.make_key(cls._meta.primary_key_pattern.format(pk=""))
        schema_prefix = f"ON HASH PREFIX 1 {hash_prefix} SCHEMA"
        schema_parts = [schema_prefix]
        for name, field in cls.__fields__.items():
            _type = field.outer_type_
            if getattr(field.field_info, 'primary_key', None):
                if issubclass(_type, str):
                    redisearch_field = f"{name} TAG"
                else:
                    redisearch_field = cls.schema_for_type(name, _type)
                schema_parts.append(redisearch_field)
            else:
                schema_parts.append(cls.schema_for_type(name, _type))
            if getattr(field.field_info, 'sortable', False):
                schema_parts.append("SORTABLE")
        return " ".join(schema_parts)


class JsonModel(RedisModel, abc.ABC):
    def save(self, *args, **kwargs) -> 'JsonModel':
        success = self.db().execute_command('JSON.SET', self.key(), ".", self.json())
        return success

    @classmethod
    def get(cls, pk: Any) -> 'JsonModel':
        document = cls.db().execute_command("JSON.GET", cls.make_primary_key(pk))
        if not document:
            raise NotFoundError
        return cls.parse_raw(document)
