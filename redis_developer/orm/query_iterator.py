from redis_developer.orm.model import Expression


class QueryIterator:
    """
    A lazy iterator that yields results from a RediSearch query.

    Examples:

        results = Model.filter(email == "a@example.com")

        # Consume all results.
        for r in results:
            print(r)

        # Consume an item at an index.
        print(results[100])

        # Consume a slice.
        print(results[0:100])

        # Alternative notation to consume all items.
        print(results[0:-1])

        # Specify the batch size:
        results = Model.filter(email == "a@example.com", batch_size=1000)
        ...
    """
    def __init__(self, client, query, batch_size=100):
        self.client = client
        self.query = query
        self.batch_size = batch_size

    def __iter__(self):
        pass

    def __getattr__(self, item):
        """Support getting a single value or a slice."""

    # TODO: Query mixin?

    def filter(self, *expressions: Expression):
        pass

    def exclude(self, *expressions: Expression):
        pass

    def and_(self, *expressions: Expression):
        pass

    def or_(self, *expressions: Expression):
        pass

    def not_(self, *expressions: Expression):
        pass
