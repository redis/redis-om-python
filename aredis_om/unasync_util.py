"""Set of utility functions for unasync that transform into sync counterparts cleanly"""

import inspect


_original_next = next


def is_async_mode():
    """Tests if we're in the async part of the code or not"""

    async def f():
        """Unasync transforms async functions in sync functions"""
        return None

    obj = f()
    if obj is None:
        return False
    else:
        obj.close()  # prevent unawaited coroutine warning
        return True


ASYNC_MODE = is_async_mode()


async def anext(x):
    return await x.__anext__()


async def await_if_coro(x):
    if inspect.iscoroutine(x):
        return await x
    return x


next = _original_next


def return_non_coro(x):
    return x
