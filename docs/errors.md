# Errors

This page lists errors that Redis OM might generate while you're using it, with more context about the error.

## E1

> In order to query on a list field, you must define the contents of the list with a type annotation, like: orders: List[Order].

You will see this error if you try to use an "IN" query, e.g., `await TarotWitch.find(TarotWitch.tarot_cards << "death").all()`, on a field that is not a list.

In this example, `TarotWitch.tarot_cards` is a list, so the query works:

```python
from typing import List

from redis_om import JsonModel, Field

class TarotWitch(JsonModel):
    tarot_cards: List[str] = Field(index=True)
```

But if `tarot_cards` was _not_ a list, trying to query with `<<` would have resulted in this error.

## E2

> You tried sort by {field_name}, but {self.model} does not define that field as sortable.

You tried to sort query results by a field that is not sortable. Here is how you mark a field as sortable:

```python
from typing import List

from redis_om import JsonModel, Field

class Member(JsonModel):
    age: int = Field(index=True, sortable=True)
```

**NOTE:** Only an indexed field can be sortable.

All indexed field types (TAG, TEXT, NUMERIC, and GEO) support sorting. For string fields, you can choose between:

- **TAG fields** (default): Exact matching with sorting support
- **TEXT fields**: Full-text search with sorting support (requires `full_text_search=True`)

```python
class Member(JsonModel):
    # TAG field - exact matching with sorting
    category: str = Field(index=True, sortable=True)

    # TEXT field - full-text search with sorting
    name: str = Field(index=True, sortable=True, full_text_search=True)
```

## E3

>You tried to do a full-text search on the field '{field.name}', but the field is not indexed for full-text search. Use the full_text_search=True option.

You can make a full-text search with the module (`%`) operator. Such a query looks like this:

```python
from redis_om import JsonModel, Field

class Member(JsonModel):
    bio: str = Field(index=True, full_text_search=True, default="")

Member.find(Member.bio % "beaches").all()
```

If you see this error, it means that the field you are querying (`bio` in the example) is not indexed for full-text search. Make sure you're marking the field both `index=True` and `full_text_search=True`, as in the example.

## E4

> Only lists and tuples are supported for multi-value fields.

This means that you marked a field as `index=True`, but the field is not a type that Redis OM can actually index.

Specifically, you probably used a _subscripted_ annotation, like `Dict[str, str]`. The only subscripted types that OM can index are `List` and `Tuple`.

## E5

> Only equals (=), not-equals (!=), and like() comparisons are supported for TEXT fields.

You are querying a field you marked as indexed for full-text search. You can only query such fields with the operators for equality (==), non-equality (!=), and like `(%)`.

```python
from redis_om import JsonModel, Field

class Member(JsonModel):
    bio: str = Field(index=True, full_text_search=True, default="")

# Equality
Member.find(Member.bio == "Programmer").all()

# Non-equality
Member.find(Member.bio != "Programmer").all()

# Like (full-text search). This stems "programming"
# to find any matching terms with the same stem,
# "program".
Member.find(Member.bio % "programming").all()
```

## E6

> You tried to query by a field ({field_name}) that isn't indexed.

You wrote a query using a model field that you did not make indexed. You can only query indexed fields. Here is example code that would generate this error:

```python
from redis_om import JsonModel, Field

class Member(JsonModel):
    first_name: str 
    bio: str = Field(index=True, full_text_search=True, default="")

# Raises a QueryNotSupportedError because we did not make
# `first_name` indexed!
Member.find(Member.first_name == "Andrew").all()
```

Fix this by making the field indexed:

```python
from redis_om import JsonModel, Field

class Member(JsonModel):
    first_name: str = Field(index=True)
    bio: str = Field(index=True, full_text_search=True, default="")

# Raises a QueryNotSupportedError because we did not make
# `first_name` indexed!
Member.find(Member.first_name == "Andrew").all()
```

## E7

> A query expression should start with either a field or an expression enclosed in parentheses.

We got confused trying to parse your query expression. It's not you, it's us! Some code examples might help...

```python
from redis_om import JsonModel, Field

class Member(JsonModel):
    first_name: str = Field(index=True)
    last_name: str = Field(index=True)

    
# Queries with a single operator are usually simple:
Member.find(Member.first_name == "Andrew").all()

# If you want to add multiple conditions, you can AND
# them together by including the conditions one after
# another as arguments.
Member.find(Member.first_name=="Andrew",
            Member.last_name=="Brookins").all()

# Alternatively, you can separate the conditions with
# parenthesis and use an explicit AND.
Member.find(
    (Member.first_name == "Andrew") & ~(Member.last_name == "Brookins")
).all()

# You can't use `!` to say NOT. Instead, use `~`.
Member.find(
    (Member.first_name == "Andrew") & 
    ~(Member.last_name == "Brookins")  # <- Notice, this one is NOT now!
).all()

# Parenthesis are key to building more complex queries,
# like this one.
Member.find(
    ~(Member.first_name == "Andrew")
    & ((Member.last_name == "Brookins") | (Member.last_name == "Smith"))
).all()

# If you're confused about how Redis OM interprets a query,
# use the `tree()` method to visualize the expression tree
# for a `FindQuery`.
query = Member.find(
    ~(Member.first_name == "Andrew")
    & ((Member.last_name == "Brookins") | (Member.last_name == "Smith"))
)
print(query.expression.tree)
"""
           ┌first_name
    ┌NOT EQ┤
    |      └Andrew
 AND┤
    |     ┌last_name
    |  ┌EQ┤
    |  |  └Brookins
    └OR┤
       |  ┌last_name
       └EQ┤
          └Smith
"""
```

## E8

> You can only combine two query expressions with AND (&) or OR (|).

The only two operators you can use to combine expressions in a query
are `&` and `|`. You may have accidentally used another operator,
or Redis OM might be confused. Make sure you are using parentheses
to organize your query expressions.

If you are trying to use "NOT," you can do that by prefixing a query
with the `~` operator, like this:

```python
from redis_om import JsonModel, Field

class Member(JsonModel):
    first_name: str = Field(index=True)
    last_name: str = Field(index=True)

    
# Find people who are not named Andrew.
Member.find(~(Member.first_name == "Andrew")).all()
```

Note that this form requires parenthesis around the expression
that you are "negating." Of course, this example makes more sense
with `!=`:

```python
from redis_om import JsonModel, Field

class Member(JsonModel):
    first_name: str = Field(index=True)
    last_name: str = Field(index=True)

    
# Find people who are not named Andrew.
Member.find(Member.first_name != "Andrew").all()
```

Still, `~` is useful to negate groups of expressions
surrounded by parentheses.

## E9

> Could not resolve field name.

Redis OM encountered a query expression where it could not determine the field name. This usually indicates a malformed query. Make sure your query starts with a model field, like `Model.field_name == value`.

## E10

> Could not resolve field type.

Redis OM could not determine the type of a field in your query. This might happen if the field annotation is missing or invalid. Ensure your model fields have proper type annotations.

## E11

> Could not resolve field info.

Redis OM could not find field metadata for a field in your query. This is an internal error that shouldn't normally occur. If you see this, please file an issue on GitHub.

## E12

> List and tuple fields can only contain strings.

When indexing a `List` or `Tuple` field in a JsonModel, the elements must be strings. For example:

```python
from typing import List
from redis_om import JsonModel, Field

# This works - list of strings
class Article(JsonModel):
    tags: List[str] = Field(index=True)

# This does NOT work - list of integers
class Article(JsonModel):
    scores: List[int] = Field(index=True)  # Raises E12
```

If you need to store lists of other types, you can still do so without indexing them.

## E13

> List and tuple fields cannot be indexed for full-text search.

You cannot use `full_text_search=True` on a `List` or `Tuple` field. List fields are indexed as TAG fields, which support exact matching but not full-text search.

```python
from typing import List
from redis_om import JsonModel, Field

# This works - list with regular indexing
class Article(JsonModel):
    tags: List[str] = Field(index=True)

# This does NOT work - list with full-text search
class Article(JsonModel):
    tags: List[str] = Field(index=True, full_text_search=True)  # Raises E13
```

If you need full-text search, use a regular string field instead.
