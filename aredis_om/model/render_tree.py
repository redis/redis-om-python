"""
This code adapted from the library "pptree," Copyright (c) 2017 Clément Michard
and released under the MIT license: https://github.com/clemtoy/pptree
"""
import io


def render_tree(
    current_node,
    nameattr="name",
    left_child="left",
    right_child="right",
    indent="",
    last="updown",
    buffer=None,
):
    """Print a tree-like structure, `current_node`.

    This is a mostly-direct-copy of the print_tree() function from the ppbtree
    module of the pptree library, but instead of printing to standard out, we
    write to a StringIO buffer, then use that buffer to accumulate written lines
    during recursive calls to render_tree().
    """
    if not buffer:
        buffer = io.StringIO()
    if hasattr(current_node, nameattr):
        name = lambda node: getattr(node, nameattr)  # noqa: E731
    else:
        name = lambda node: str(node)  # noqa: E731

    up = getattr(current_node, left_child, None)
    down = getattr(current_node, right_child, None)

    if up:
        next_last = "up"
        next_indent = f'{indent}{" " if "up" in last else "|"}{" " * len(str(name(current_node)))}'
        render_tree(
            up, nameattr, left_child, right_child, next_indent, next_last, buffer
        )

    if last == "up":
        start_shape = "┌"
    elif last == "down":
        start_shape = "└"
    elif last == "updown":
        start_shape = " "
    else:
        start_shape = "├"

    if up and down:
        end_shape = "┤"
    elif up:
        end_shape = "┘"
    elif down:
        end_shape = "┐"
    else:
        end_shape = ""

    print(
        f"{indent}{start_shape}{name(current_node)}{end_shape}",
        file=buffer,
    )

    if down:
        next_last = "down"
        next_indent = (
            f'{indent}{" " if "down" in last else "|"}{len(str(name(current_node)))}'
        )
        render_tree(
            down, nameattr, left_child, right_child, next_indent, next_last, buffer
        )

    return f"\n{buffer.getvalue()}"
