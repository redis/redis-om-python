from typing import List, Mapping

from aredis_om.model.model import Expression


class LogicalOperatorForListOfExpressions(Expression):
    operator: str = ""

    def __init__(self, *expressions: Expression):
        self.expressions = list(expressions)

    @property
    def query(self) -> Mapping[str, List[Expression]]:
        if not self.expressions:
            raise AttributeError("At least one expression must be provided")
        # TODO: This needs to return a RediSearch string.
        # Use the values in each expression object to build the string.
        # Determine the type of query based on the field (numeric range,
        # tag field, etc.).
        return {self.operator: self.expressions}


class Or(LogicalOperatorForListOfExpressions):
    """
    Logical OR query operator

    Example:

    ```python
    class Product(JsonModel):
        price: float
        category: str

    Or(Product.price < 10, Product.category == "Sweets")
    ```

    Will return RediSearch query string like:

    ```
    (@price:[-inf 10]) | (@category:{Sweets})
    ```
    """

    operator = "|"


class And(LogicalOperatorForListOfExpressions):
    """
    Logical AND query operator

    Example:

    ```python
    class Product(Document):
        price: float
        category: str

    And(Product.price < 10, Product.category == "Sweets")
    ```

    Will return a query string like:

    ```
    (@price:[-inf 10]) (@category:{Sweets})
    ```

    Note that in RediSearch, AND is implied with multiple terms.
    """

    operator = " "


class Not(LogicalOperatorForListOfExpressions):
    """
    Logical NOT query operator

    Example:

    ```python
    class Product(Document):
        price: float
        category: str

    Not(Product.price<10, Product.category=="Sweets")
    ```

    Will return a query string like:

    ```
    -(@price:[-inf 10]) -(@category:{Sweets})
    ```
    """

    @property
    def query(self):
        return "-(expression1) -(expression2)"


class QueryResolver:
    def __init__(self, *expressions: Expression):
        self.expressions = expressions

    def resolve(self) -> str:
        """Resolve expressions to a RediSearch query string."""
