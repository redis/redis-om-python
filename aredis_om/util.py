import inspect


def is_async_mode() -> bool:
    async def f() -> None:
        """Unasync transforms async functions in sync functions"""
        return None

    return inspect.iscoroutinefunction(f)


ASYNC_MODE = is_async_mode()
