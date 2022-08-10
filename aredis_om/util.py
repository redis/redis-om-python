import inspect


def is_async_mode():
    async def f():
        """Unasync transforms async functions in sync functions"""
        return None

    return inspect.iscoroutinefunction(f)


ASYNC_MODE = is_async_mode()
