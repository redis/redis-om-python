"""
This code adapted from the library "pptree," Copyright (c) 2017 Clément Michard
and released under the MIT license: https://github.com/clemtoy/pptree
"""

import io
from typing import Any, Optional


def _name_resolver(current_node: Any, nameattr: str):
    if hasattr(current_node, nameattr):
        return lambda node: getattr(node, nameattr)  # noqa: E731
    return lambda node: str(node)  # noqa: E731


def _next_indent(indent: str, last: str, direction: str, name_width: int) -> str:
    return "{0}{1}{2}".format(
        indent, " " if direction in last else "|", " " * name_width
    )


def _start_shape(last: str) -> str:
    if last == "up":
        return "┌"
    if last == "down":
        return "└"
    if last == "updown":
        return " "
    return "├"


def _end_shape(up: Any, down: Any) -> str:
    if up is not None and down is not None:
        return "┤"
    if up:
        return "┘"
    if down:
        return "┐"
    return ""


def render_tree(
    current_node: Any,
    nameattr: str = "name",
    left_child: str = "left",
    right_child: str = "right",
    indent: str = "",
    last: str = "updown",
    buffer: Optional[io.StringIO] = None,
) -> str:
    """Print a tree-like structure, `current_node`.

    This is a mostly-direct-copy of the print_tree() function from the ppbtree
    module of the pptree library, but instead of printing to standard out, we
    write to a StringIO buffer, then use that buffer to accumulate written lines
    during recursive calls to render_tree().
    """
    if buffer is None:
        buffer = io.StringIO()
    name = _name_resolver(current_node, nameattr)

    up = getattr(current_node, left_child, None)
    down = getattr(current_node, right_child, None)

    if up is not None:
        next_last = "up"
        next_indent = _next_indent(indent, last, "up", len(str(name(current_node))))
        render_tree(
            up, nameattr, left_child, right_child, next_indent, next_last, buffer
        )

    start_shape = _start_shape(last)
    end_shape = _end_shape(up, down)

    print(
        "{0}{1}{2}{3}".format(indent, start_shape, name(current_node), end_shape),
        file=buffer,
    )

    if down is not None:
        next_last = "down"
        next_indent = _next_indent(
            indent, last, "down", len(str(name(current_node)))
        )
        render_tree(
            down, nameattr, left_child, right_child, next_indent, next_last, buffer
        )

    return f"\n{buffer.getvalue()}"
