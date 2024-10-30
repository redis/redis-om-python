import abc
import dataclasses
import decimal
import json
import logging
import operator
from copy import copy
from enum import Enum
from functools import reduce
from typing import (
    AbstractSet,
    Any,
    Callable,
    ClassVar,
    Dict,
    List,
    Literal,
    Mapping,
    Optional,
    Sequence,
    Set,
    Tuple,
    Type,
    TypeVar,
    Union,
)
from typing import get_args as typing_get_args
from typing import no_type_check

from more_itertools import ichunked
from redis.commands.json.path import Path
from redis.exceptions import ResponseError
from typing_extensions import Protocol, get_args, get_origin
from ulid import ULID

from .. import redis
from .._compat import PYDANTIC_V2, BaseModel
from .._compat import FieldInfo as PydanticFieldInfo
from .._compat import (
    ModelField,
    ModelMetaclass,
    NoArgAnyCallable,
    Representation,
    Undefined,
    UndefinedType,
    validate_model,
    validator,
)
from ..checks import has_redis_json, has_redisearch
from ..connections import get_redis_connection
from ..util import ASYNC_MODE
from .encoders import jsonable_encoder
from .render_tree import render_tree
from .token_escaper import TokenEscaper


model_registry = {}
_T = TypeVar("_T")
Model = TypeVar("Model", bound="RedisModel")
log = logging.getLogger(__name__)
escaper = TokenEscaper()

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


def get_outer_type(field):
    if hasattr(field, "outer_type_"):
        return field.outer_type_
    elif isinstance(field.annotation, type) or is_supported_container_type(
        field.annotation
    ):
        return field.annotation
    elif not hasattr(field.annotation, "__args__"):
        return None
    else:
        return field.annotation.__args__[0]


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


ExpressionOrModelField = Union[
    "Expression", "NegatedExpression", ModelField, PydanticFieldInfo
]


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

        if field_name not in model.__fields__:  # type: ignore
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
    vector_field: ModelField
    reference_vector: bytes

    def __str__(self):
        return f"KNN $K @{self.vector_field.name} $knn_ref_vector"

    @property
    def query_params(self) -> Dict[str, Union[str, bytes]]:
        return {"K": str(self.k), "knn_ref_vector": self.reference_vector}

    @property
    def score_field(self) -> str:
        return f"__{self.vector_field.name}_score"


ExpressionOrNegated = Union[Expression, NegatedExpression]


class ExpressionProxy:
    def __init__(self, field: ModelField, parents: List[Tuple[str, "RedisModel"]]):
        self.field = field
        self.parents = parents

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
            new_parent = (self.field.alias, outer_type)
            if new_parent not in attr.parents:
                attr.parents.append(new_parent)
            new_parents = list(set(self.parents) - set(attr.parents))
            if new_parents:
                attr.parents = new_parents + attr.parents
        return attr


class QueryNotSupportedError(Exception):
    """The attempted query is not supported."""


class RediSearchFieldTypes(Enum):
    TEXT = "TEXT"
    TAG = "TAG"
    NUMERIC = "NUMERIC"
    GEO = "GEO"


# TODO: How to handle Geo fields?
NUMERIC_TYPES = (float, int, decimal.Decimal)
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
        nocontent: bool = False,
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
            self.sort_fields = [self.knn.score_field]
        else:
            self.sort_fields = []

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
            nocontent=self.nocontent,
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
        self._query = self.resolve_redisearch_query(self.expression)
        if self.knn:
            self._query = (
                self._query
                if self._query.startswith("(") or self._query == "*"
                else f"({self._query})"
            ) + f"=>[{self.knn}]"
        return self._query

    @property
    def query_params(self):
        params: List[Union[str, bytes]] = []
        if self.knn:
            params += [attr for kv in self.knn.query_params.items() for attr in kv]
        return params

    def validate_sort_fields(self, sort_fields: List[str]):
        for sort_field in sort_fields:
            field_name = sort_field.lstrip("-")
            if self.knn and field_name == self.knn.score_field:
                continue
            if field_name not in self.model.__fields__:  # type: ignore
                raise QueryNotSupportedError(
                    f"You tried sort by {field_name}, but that field "
                    f"does not exist on the model {self.model}"
                )
            field_proxy = getattr(self.model, field_name)
            if isinstance(field_proxy.field, FieldInfo) or isinstance(
                field_proxy.field, PydanticFieldInfo
            ):
                field_info = field_proxy.field
            else:
                field_info = field_proxy.field.field_info

            if not getattr(field_info, "sortable", False):
                raise QueryNotSupportedError(
                    f"You tried sort by {field_name}, but {self.model} does "
                    f"not define that field as sortable. Docs: {ERRORS_URL}#E2"
                )
        return sort_fields

    @staticmethod
    def resolve_field_type(
        field: Union[ModelField, PydanticFieldInfo], op: Operators
    ) -> RediSearchFieldTypes:
        field_info: Union[FieldInfo, ModelField, PydanticFieldInfo]

        if not hasattr(field, "field_info"):
            field_info = field
        else:
            field_info = field.field_info
        if getattr(field_info, "primary_key", None) is True:
            return RediSearchFieldTypes.TAG
        elif op is Operators.LIKE:
            fts = getattr(field_info, "full_text_search", None)
            if fts is not True:  # Could be PydanticUndefined
                raise QuerySyntaxError(
                    f"You tried to do a full-text search on the field '{field.alias}', "
                    f"but the field is not indexed for full-text search. Use the "
                    f"full_text_search=True option. Docs: {ERRORS_URL}#E3"
                )
            return RediSearchFieldTypes.TEXT

        field_type = outer_type_or_annotation(field)

        if not isinstance(field_type, type):
            field_type = field_type.__origin__

        # TODO: GEO fields
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
        elif any(issubclass(field_type, t) for t in NUMERIC_TYPES):
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
    ) -> str:
        if parents:
            prefix = "_".join([p[0] for p in parents])
            field_name = f"{prefix}_{field_name}"
        result = ""
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
                        "that is used internally by redis-om-python. We must ignore "
                        "this portion of the query. Please review your query to find "
                        "an alternative query that uses a string containing more than "
                        "just the character %s.",
                        field_name,
                        separator_char,
                        separator_char,
                    )
                    return ""
                if isinstance(value, bool):
                    result = "@{field_name}:{{{value}}}".format(
                        field_name=field_name, value=value
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

    @classmethod
    def resolve_redisearch_query(cls, expression: ExpressionOrNegated) -> str:
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
                # TODO: Is there a use case for this, perhaps for dynamic
                #  scoring purposes with full-text search?
                raise QueryNotSupportedError(
                    "You cannot negate a query for all results."
                )
            return "*"

        if isinstance(expression.left, Expression) or isinstance(
            expression.left, NegatedExpression
        ):
            result += f"({cls.resolve_redisearch_query(expression.left)})"
        elif isinstance(expression.left, ModelField):
            field_type = cls.resolve_field_type(expression.left, expression.op)
            field_name = expression.left.name
            field_info = expression.left.field_info
            if not field_info or not getattr(field_info, "index", None):
                raise QueryNotSupportedError(
                    f"You tried to query by a field ({field_name}) "
                    f"that isn't indexed. Docs: {ERRORS_URL}#E6"
                )
        elif isinstance(expression.left, FieldInfo):
            field_type = cls.resolve_field_type(expression.left, expression.op)
            field_name = expression.left.alias
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
                # We're handling the RediSearch operator in this call ("-"), so resolve the
                # inner expression instead of the NegatedExpression.
                right = right.expression

            result += f"({cls.resolve_redisearch_query(right)})"
        else:
            if not field_name:
                raise QuerySyntaxError("Could not resolve field name. See docs: TODO")
            elif not field_type:
                raise QuerySyntaxError("Could not resolve field type. See docs: TODO")
            elif not field_info:
                raise QuerySyntaxError("Could not resolve field info. See docs: TODO")
            elif isinstance(right, ModelField):
                raise QueryNotSupportedError(
                    "Comparing fields is not supported. See docs: TODO"
                )
            else:
                result += cls.resolve_value(
                    field_name,
                    field_type,
                    field_info,
                    expression.op,
                    right,
                    expression.parents,
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

        if return_query_args:
            return self.model.Meta.index_name, args

        # Reset the cache if we're executing from offset 0.
        if self.offset == 0:
            self._model_cache.clear()

        # If the offset is greater than 0, we're paginating through a result set,
        # so append the new results to results already in the cache.
        raw_result = await self.model.db().execute_command(*args)
        if return_raw_result:
            return raw_result
        count = raw_result[0]
        results = self.model.from_redis(raw_result)
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
    def __init__(self, default: Any = Undefined, **kwargs: Any) -> None:
        primary_key = kwargs.pop("primary_key", False)
        sortable = kwargs.pop("sortable", Undefined)
        case_sensitive = kwargs.pop("case_sensitive", Undefined)
        index = kwargs.pop("index", Undefined)
        full_text_search = kwargs.pop("full_text_search", Undefined)
        vector_options = kwargs.pop("vector_options", None)
        super().__init__(default=default, **kwargs)
        self.primary_key = primary_key
        self.sortable = sortable
        self.case_sensitive = case_sensitive
        self.index = index
        self.full_text_search = full_text_search
        self.vector_options = vector_options


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
    default: Any = Undefined,
    *,
    default_factory: Optional[NoArgAnyCallable] = None,
    alias: Optional[str] = None,
    title: Optional[str] = None,
    description: Optional[str] = None,
    exclude: Union[
        AbstractSet[Union[int, str]], Mapping[Union[int, str], Any], Any
    ] = None,
    include: Union[
        AbstractSet[Union[int, str]], Mapping[Union[int, str], Any], Any
    ] = None,
    const: Optional[bool] = None,
    gt: Optional[float] = None,
    ge: Optional[float] = None,
    lt: Optional[float] = None,
    le: Optional[float] = None,
    multiple_of: Optional[float] = None,
    min_items: Optional[int] = None,
    max_items: Optional[int] = None,
    min_length: Optional[int] = None,
    max_length: Optional[int] = None,
    allow_mutation: bool = True,
    regex: Optional[str] = None,
    primary_key: bool = False,
    sortable: Union[bool, UndefinedType] = Undefined,
    case_sensitive: Union[bool, UndefinedType] = Undefined,
    index: Union[bool, UndefinedType] = Undefined,
    full_text_search: Union[bool, UndefinedType] = Undefined,
    vector_options: Optional[VectorFieldOptions] = None,
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
        sortable=sortable,
        case_sensitive=case_sensitive,
        index=index,
        full_text_search=full_text_search,
        vector_options=vector_options,
        **current_schema_extra,
    )
    return field_info


@dataclasses.dataclass
class PrimaryKey:
    name: str
    field: ModelField


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

    def __new__(cls, name, bases, attrs, **kwargs):  # noqa C901
        meta = attrs.pop("Meta", None)
        new_class = super().__new__(cls, name, bases, attrs, **kwargs)

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

        # Create proxies for each model field so that we can use the field
        # in queries, like Model.get(Model.field_name == 1)
        for field_name, field in new_class.__fields__.items():
            if not isinstance(field, FieldInfo):
                for base_candidate in bases:
                    if hasattr(base_candidate, field_name):
                        inner_field = getattr(base_candidate, field_name)
                        if hasattr(inner_field, "field") and isinstance(
                            getattr(inner_field, "field"), FieldInfo
                        ):
                            field.metadata.append(getattr(inner_field, "field"))
                            field = getattr(inner_field, "field")

            if not field.alias:
                field.alias = field_name
            setattr(new_class, field_name, ExpressionProxy(field, []))
            annotation = new_class.get_annotations().get(field_name)
            if annotation:
                new_class.__annotations__[field_name] = Union[
                    annotation, ExpressionProxy
                ]
            else:
                new_class.__annotations__[field_name] = ExpressionProxy
            # Check if this is our FieldInfo version with extended ORM metadata.
            field_info = None
            if hasattr(field, "field_info") and isinstance(field.field_info, FieldInfo):
                field_info = field.field_info
            elif field_name in attrs and isinstance(
                attrs.__getitem__(field_name), FieldInfo
            ):
                field_info = attrs.__getitem__(field_name)
                field.field_info = field_info

            if field_info is not None:
                if field_info.primary_key:
                    new_class._meta.primary_key = PrimaryKey(
                        name=field_name, field=field
                    )
                if field_info.vector_options:
                    score_attr = f"_{field_name}_score"
                    setattr(new_class, score_attr, None)
                    new_class.__annotations__[score_attr] = Union[float, None]

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

        # Not an abstract model class or embedded model, so we should let the
        # Migrator create indexes for it.
        if abc.ABC not in bases and not getattr(new_class._meta, "embedded", False):
            key = f"{new_class.__module__}.{new_class.__qualname__}"
            model_registry[key] = new_class

        return new_class


def outer_type_or_annotation(field):
    if hasattr(field, "outer_type_"):
        return field.outer_type_
    elif not hasattr(field.annotation, "__args__"):
        if not isinstance(field.annotation, type):
            raise AttributeError(f"could not extract outer type from field {field}")
        return field.annotation
    elif get_origin(field.annotation) == Literal:
        return str
    else:
        return field.annotation.__args__[0]


class RedisModel(BaseModel, abc.ABC, metaclass=ModelMeta):
    pk: Optional[str] = Field(default=None, primary_key=True)
    if PYDANTIC_V2:
        ConfigDict: ClassVar

    Meta = DefaultMeta

    if PYDANTIC_V2:
        from pydantic import ConfigDict

        model_config = ConfigDict(
            from_attributes=True, arbitrary_types_allowed=True, extra="allow"
        )
    else:

        class Config:
            orm_mode = True
            arbitrary_types_allowed = True
            extra = "allow"

    def __init__(__pydantic_self__, **data: Any) -> None:
        __pydantic_self__.validate_primary_key()
        super().__init__(**data)

    def __lt__(self, other):
        """Default sort: compare primary key of models."""
        return self.key() < other.key()

    def key(self):
        """Return the Redis key for this model."""
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
        self: "Model", pipeline: Optional[redis.client.Pipeline] = None
    ) -> "Model":
        raise NotImplementedError

    async def expire(
        self, num_seconds: int, pipeline: Optional[redis.client.Pipeline] = None
    ):
        db = self._get_db(pipeline)

        # TODO: Wrap any Redis response errors in a custom exception?
        await db.expire(self.key(), num_seconds)

    @validator("pk", always=True, allow_reuse=True)
    def validate_pk(cls, v):
        if not v or isinstance(v, ExpressionProxy):
            v = cls._meta.primary_key_creator_cls().create_pk()
        return v

    @classmethod
    def validate_primary_key(cls):
        """Check for a primary key. We need one (and only one)."""
        primary_keys = 0
        for name, field in cls.__fields__.items():
            if not hasattr(field, "field_info"):
                if (
                    not isinstance(field, FieldInfo)
                    and hasattr(field, "metadata")
                    and len(field.metadata) > 0
                    and isinstance(field.metadata[0], FieldInfo)
                ):
                    field_info = field.metadata[0]
                else:
                    field_info = field
            else:
                field_info = field.field_info

            if getattr(field_info, "primary_key", None):
                primary_keys += 1
        if primary_keys == 0:
            raise RedisModelError("You must define a primary key for the model")
        elif primary_keys == 2:
            cls.__fields__.pop("pk")
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
    def from_redis(cls, res: Any):
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
                doc = cls(**json_fields)
                for k, v in fields.items():
                    if k.startswith("__") and k.endswith("_score"):
                        setattr(doc, k[1:], float(v))
            else:
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
        """Run all validations."""
        if not PYDANTIC_V2:
            *_, validation_error = validate_model(self.__class__, self.__dict__)
            if validation_error:
                raise validation_error
        else:
            from pydantic import TypeAdapter

            adapter = TypeAdapter(self.__class__)
            adapter.validate_python(self.__dict__)


class HashModel(RedisModel, abc.ABC):
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)

        if hasattr(cls, "__annotations__"):
            for name, field_type in cls.__annotations__.items():
                origin = get_origin(field_type)
                for typ in (Set, Mapping, List):
                    if isinstance(origin, type) and issubclass(origin, typ):
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

        for name, field in cls.__fields__.items():
            outer_type = outer_type_or_annotation(field)
            origin = get_origin(outer_type)
            if origin:
                for typ in (Set, Mapping, List):
                    if issubclass(origin, typ):
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

    async def save(
        self: "Model", pipeline: Optional[redis.client.Pipeline] = None
    ) -> "Model":
        self.check()
        db = self._get_db(pipeline)
        document = jsonable_encoder(self.dict())

        # filter out values which are `None` because they are not valid in a HSET
        document = {k: v for k, v in document.items() if v is not None}
        # TODO: Wrap any Redis response errors in a custom exception?
        await db.hset(self.key(), mapping=document)
        return self

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
            result = cls.parse_obj(document)
        except TypeError as e:
            log.warning(
                f'Could not parse Redis response. Error was: "{e}". Probably, the '
                "connection is not set to decode responses from bytes. "
                "Attempting to decode response using the encoding set on "
                f"model class ({cls.__class__}. Encoding: {cls.Meta.encoding}."
            )
            document = decode_redis_value(document, cls.Meta.encoding)
            result = cls.parse_obj(document)
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

        for name, field in cls.__fields__.items():
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

            if not hasattr(field, "field_info"):
                field_info = field
            else:
                field_info = field.field_info

            if getattr(field_info, "primary_key", None):
                if issubclass(_type, str):
                    redisearch_field = (
                        f"{name} TAG SEPARATOR {SINGLE_VALUE_TAG_FIELD_SEPARATOR}"
                    )
                else:
                    redisearch_field = cls.schema_for_type(name, _type, field_info)
                schema_parts.append(redisearch_field)
            elif getattr(field_info, "index", None) is True:
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
        elif any(issubclass(typ, t) for t in NUMERIC_TYPES):
            vector_options: Optional[VectorFieldOptions] = getattr(
                field_info, "vector_options", None
            )
            if vector_options:
                schema = f"{name} {vector_options.schema}"
            else:
                schema = f"{name} NUMERIC"
        elif issubclass(typ, str):
            if getattr(field_info, "full_text_search", False) is True:
                schema = (
                    f"{name} TAG SEPARATOR {SINGLE_VALUE_TAG_FIELD_SEPARATOR} "
                    f"{name} AS {name}_fts TEXT"
                )
            else:
                schema = f"{name} TAG SEPARATOR {SINGLE_VALUE_TAG_FIELD_SEPARATOR}"
        elif issubclass(typ, RedisModel):
            sub_fields = []
            for embedded_name, field in typ.__fields__.items():
                sub_fields.append(
                    cls.schema_for_type(
                        f"{name}_{embedded_name}", field.outer_type_, field.field_info
                    )
                )
            schema = " ".join(sub_fields)
        else:
            schema = f"{name} TAG SEPARATOR {SINGLE_VALUE_TAG_FIELD_SEPARATOR}"
        if schema and sortable is True:
            schema += " SORTABLE"
        if schema and case_sensitive is True:
            schema += " CASESENSITIVE"

        return schema


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
        self: "Model", pipeline: Optional[redis.client.Pipeline] = None
    ) -> "Model":
        self.check()
        db = self._get_db(pipeline)

        # TODO: Wrap response errors in a custom exception?
        await db.json().set(self.key(), Path.root_path(), json.loads(self.json()))
        return self

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
        document = json.dumps(await cls.db().json().get(cls.make_key(pk)))
        if document == "null":
            raise NotFoundError
        return cls.parse_raw(document)

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
        for name, field in cls.__fields__.items():
            fields[name] = field
        for name, field in cls.__dict__.items():
            if isinstance(field, FieldInfo):
                if not field.annotation:
                    field.annotation = cls.__annotations__.get(name)
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

            if hasattr(field, "field_info"):
                field_info = field.field_info
            else:
                field_info = field
            if getattr(field_info, "primary_key", None):
                if issubclass(_type, str):
                    redisearch_field = f"$.{name} AS {name} TAG SEPARATOR {SINGLE_VALUE_TAG_FIELD_SEPARATOR}"
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
        typ: Any,
        field_info: PydanticFieldInfo,
        parent_type: Optional[Any] = None,
    ) -> str:
        should_index = getattr(field_info, "index", False)
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
            is_vector = vector_options and any(
                issubclass(get_args(typ)[0], t) for t in NUMERIC_TYPES
            )
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
            for embedded_name, field in typ.__fields__.items():
                if hasattr(field, "field_info"):
                    field_info = field.field_info
                elif (
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
            sortable_tag_error = RedisModelError(
                "In this Preview release, TAG fields cannot "
                f"be marked as sortable. Problem field: {name}. "
                "See docs: TODO"
            )

            # For more complicated compound validators (e.g. PositiveInt), we might get a _GenericAlias rather than
            # a proper type, we can pull the type information from the origin of the first argument.
            if not isinstance(typ, type):
                type_args = typing_get_args(field_info.annotation)
                typ = type_args[0].__origin__

            # TODO: GEO field
            if is_vector and vector_options:
                schema = f"{path} AS {index_field_name} {vector_options.schema}"
            elif parent_is_container_type or parent_is_model_in_container:
                if typ is not str:
                    raise RedisModelError(
                        "In this Preview release, list and tuple fields can only "
                        f"contain strings. Problem field: {name}. See docs: TODO"
                    )
                if full_text_search is True:
                    raise RedisModelError(
                        "List and tuple fields cannot be indexed for full-text "
                        f"search. Problem field: {name}. See docs: TODO"
                    )
                schema = f"{path} AS {index_field_name} TAG SEPARATOR {SINGLE_VALUE_TAG_FIELD_SEPARATOR}"
                if sortable is True:
                    raise sortable_tag_error
                if case_sensitive is True:
                    schema += " CASESENSITIVE"
            elif typ is bool:
                schema = f"{path} AS {index_field_name} TAG"
            elif any(issubclass(typ, t) for t in NUMERIC_TYPES):
                schema = f"{path} AS {index_field_name} NUMERIC"
            elif issubclass(typ, str):
                if full_text_search is True:
                    schema = (
                        f"{path} AS {index_field_name} TAG SEPARATOR {SINGLE_VALUE_TAG_FIELD_SEPARATOR} "
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
                    schema = f"{path} AS {index_field_name} TAG SEPARATOR {SINGLE_VALUE_TAG_FIELD_SEPARATOR}"
                    if sortable is True:
                        raise sortable_tag_error
                    if case_sensitive is True:
                        schema += " CASESENSITIVE"
            else:
                schema = f"{path} AS {index_field_name} TAG SEPARATOR {SINGLE_VALUE_TAG_FIELD_SEPARATOR}"
                if sortable is True:
                    raise sortable_tag_error

            return schema
        return ""


class EmbeddedJsonModel(JsonModel, abc.ABC):
    class Meta:
        embedded = True
