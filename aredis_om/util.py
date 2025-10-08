import datetime
import decimal
import inspect
from typing import Any, Type, get_args


def is_async_mode() -> bool:
    async def f() -> None:
        """Unasync transforms async functions in sync functions"""
        return None

    return inspect.iscoroutinefunction(f)


ASYNC_MODE = is_async_mode()

NUMERIC_TYPES = (float, int, decimal.Decimal, datetime.datetime, datetime.date)


def is_numeric_type(type_: Type[Any]) -> bool:
    try:
        return issubclass(type_, NUMERIC_TYPES)
    except TypeError:
        return False


def has_numeric_inner_type(type_: Type[Any]) -> bool:
    """
    Check if the type has a numeric inner type.
    """
    args = get_args(type_)

    if not args:
        return False

    try:
        return issubclass(args[0], NUMERIC_TYPES)
    except TypeError:
        return False
