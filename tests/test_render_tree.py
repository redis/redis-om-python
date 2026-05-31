from aredis_om.model.render_tree import render_tree


class Node:
    def __init__(self, name, left=None, right=None):
        self.name = name
        self.left = left
        self.right = right


def test_render_tree_matches_documented_layout():
    root = Node(
        "AND",
        Node("NOT EQ", Node("first_name"), Node("Andrew")),
        Node(
            "OR",
            Node("EQ", Node("last_name"), Node("Brookins")),
            Node("EQ", Node("last_name"), Node("Smith")),
        ),
    )

    assert render_tree(root) == (
        "\n"
        "           ┌first_name\n"
        "    ┌NOT EQ┤\n"
        "    |      └Andrew\n"
        " AND┤\n"
        "    |     ┌last_name\n"
        "    |  ┌EQ┤\n"
        "    |  |  └Brookins\n"
        "    └OR┤\n"
        "       |  ┌last_name\n"
        "       └EQ┤\n"
        "          └Smith\n"
    )
