# Making Queries

Redis OM provides a powerful query language that allows you to query Redis with Python expressions. This page covers everything you need to know about querying models.

## Prerequisites

Before you can query models, you need:

1. **An indexed model**: Add `index=True` to your model class
2. **Run migrations**: Execute `om migrate` to create the RediSearch index

```python
from redis_om import HashModel, Field


class Customer(HashModel, index=True):
    first_name: str
    last_name: str = Field(index=True)
    email: str
    age: int = Field(index=True, sortable=True)
```

```bash
om migrate
```

## The `find()` Method

The `find()` method is the entry point for all queries. It returns a `FindQuery` object that you can chain with other methods:

```python
# Find all customers
customers = await Customer.find().all()

# Find with a filter expression
customers = await Customer.find(Customer.last_name == "Brookins").all()

# Find with multiple expressions (AND)
customers = await Customer.find(
    Customer.last_name == "Brookins",
    Customer.age > 30
).all()
```

## Expression Operators

Redis OM supports a variety of operators for building query expressions.

### Comparison Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `==` | Equal | `Customer.name == "John"` |
| `!=` | Not equal | `Customer.name != "John"` |
| `<` | Less than | `Customer.age < 30` |
| `<=` | Less than or equal | `Customer.age <= 30` |
| `>` | Greater than | `Customer.age > 30` |
| `>=` | Greater than or equal | `Customer.age >= 30` |

```python
# Numeric comparisons
young_customers = await Customer.find(Customer.age < 30).all()
seniors = await Customer.find(Customer.age >= 65).all()

# String equality
johns = await Customer.find(Customer.first_name == "John").all()
```

### String Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `%` | LIKE (pattern matching) | `Customer.name % "John*"` |
| `.startswith()` | Starts with | `Customer.name.startswith("Jo")` |
| `.endswith()` | Ends with | `Customer.name.endswith("son")` |
| `.contains()` | Contains substring | `Customer.email.contains("@gmail")` |

```python
# Pattern matching with % (LIKE)
customers = await Customer.find(Customer.last_name % "Brook*").all()

# String methods
customers = await Customer.find(Customer.email.startswith("andrew")).all()
customers = await Customer.find(Customer.email.contains("@example.com")).all()
```

### Collection Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `<<` | IN (value in list) | `Customer.status << ["active", "pending"]` |
| `>>` | NOT IN | `Customer.status >> ["banned", "deleted"]` |

```python
# Find customers with specific statuses
active_customers = await Customer.find(
    Customer.status << ["active", "pending"]
).all()

# Exclude certain statuses
good_standing = await Customer.find(
    Customer.status >> ["banned", "suspended"]
).all()
```

## Combining Expressions

Use logical operators to combine multiple expressions:

### AND Operator (`&`)

```python
# Find young customers named John
customers = await Customer.find(
    (Customer.first_name == "John") & (Customer.age < 30)
).all()
```

### OR Operator (`|`)

```python
# Find customers who are either young or named John
customers = await Customer.find(
    (Customer.age < 30) | (Customer.first_name == "John")
).all()
```

### NOT Operator (`~`)

```python
# Find customers who are NOT named John
customers = await Customer.find(
    ~(Customer.first_name == "John")
).all()
```

### Complex Expressions

Use parentheses to build complex queries:

```python
# Find customers who are:
# - NOT named Andrew AND
# - (have last name Brookins OR Smith)
customers = await Customer.find(
    ~(Customer.first_name == "Andrew") &
    ((Customer.last_name == "Brookins") | (Customer.last_name == "Smith"))
).all()
```

### Visualizing Expression Trees

Use the `tree` property to visualize how Redis OM interprets your query:

```python
query = Customer.find(
    ~(Customer.first_name == "Andrew") &
    ((Customer.last_name == "Brookins") | (Customer.last_name == "Smith"))
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

## Terminal Methods

Terminal methods execute the query and return results:

### `.all()` - Get All Results

Returns all matching models:

```python
customers = await Customer.find(Customer.age > 30).all()
```

### `.first()` - Get First Result

Returns the first matching model or raises `NotFoundError`:

```python
from redis_om import NotFoundError

try:
    customer = await Customer.find(Customer.email == "john@example.com").first()
except NotFoundError:
    print("No customer found")
```

### `.count()` - Count Results

Returns the number of matching models without loading them:

```python
count = await Customer.find(Customer.age > 30).count()
print(f"Found {count} customers over 30")
```

### `.page()` - Paginated Results

Returns a specific page of results:

```python
# Get first 10 results (page 0)
first_page = await Customer.find().sort_by("age").page(offset=0, limit=10)

# Get next 10 results
second_page = await Customer.find().sort_by("age").page(offset=10, limit=10)
```

**Important**: Always use `.sort_by()` before `.page()` for stable pagination. Without explicit sorting, Redis doesn't guarantee consistent ordering between pages, which can cause results to shift or duplicate across pages.

## Sorting Results

Use `.sort_by()` to order results. Prefix field names with `-` for descending order:

```python
# Sort by age ascending
customers = await Customer.find().sort_by("age").all()

# Sort by age descending
customers = await Customer.find().sort_by("-age").all()

# Sort by multiple fields
customers = await Customer.find().sort_by("last_name", "-age").all()
```

**Note**: Fields must be marked as `sortable=True` in the model definition:

```python
class Customer(HashModel, index=True):
    name: str
    age: int = Field(sortable=True)  # Can be sorted
```

## Field Projection

Field projection allows you to retrieve only specific fields, improving performance for models with many fields.

### `.values()` - Dictionary Results

Returns query results as dictionaries instead of model instances:

```python
# Get all fields as dictionaries
customers = await Customer.find().values().all()
# Returns: [{"first_name": "John", "last_name": "Doe", ...}]

# Get only specific fields
customers = await Customer.find().values("first_name", "email").all()
# Returns: [{"first_name": "John", "email": "john@example.com"}]
```

### `.only()` - Partial Model Instances

Returns partial model instances with only the specified fields. Accessing unloaded fields raises `AttributeError`:

```python
customers = await Customer.find().only("first_name", "email").all()

for customer in customers:
    print(customer.first_name)  # ✓ Works
    print(customer.email)       # ✓ Works
    print(customer.age)         # ✗ Raises AttributeError
```

### Deep Field Projection (JsonModel)

Access nested fields in embedded models using double underscore syntax:

```python
class Address(JsonModel):
    street: str
    city: str

    class Meta:
        embedded = True


class Customer(JsonModel, index=True):
    name: str
    address: Address


# Extract nested fields
customers = await Customer.find().values("name", "address__city").all()
# Returns: [{"name": "John", "address__city": "New York"}]
```

## Bulk Operations

### `.update()` - Update Multiple Records

Update all matching records with new field values:

```python
# Give everyone in the "premium" tier a discount
await Customer.find(
    Customer.tier == "premium"
).update(discount_percent=20)
```

### `.delete()` - Delete Multiple Records

Delete all matching records:

```python
# Delete all inactive customers
deleted_count = await Customer.find(
    Customer.status == "inactive"
).delete()
```

## Vector Similarity Search

Redis OM supports vector similarity search using `KNNExpression`:

```python
from redis_om import KNNExpression

# Create a query vector (from your embedding model)
query_embedding = get_embedding("search query")

# Find the 10 most similar documents
results = await Document.find(
    KNNExpression(
        k=10,
        vector_field_name="embedding",
        reference_vector=query_embedding,
    )
).all()
```

### Hybrid Vector + Filter Queries

Combine vector search with traditional filters:

```python
# Find similar documents within a specific category
results = await Document.find(
    (Document.category == "technology") &
    KNNExpression(
        k=10,
        vector_field_name="embedding",
        reference_vector=query_embedding,
    )
).all()
```

### Advanced Vector Search with RedisVL

For advanced vector search capabilities, Redis OM integrates with [RedisVL](https://github.com/redis/redis-vl-python):

```python
from aredis_om.redisvl import get_redisvl_index
from redisvl.query import VectorQuery

# Get a RedisVL index for your model
index = get_redisvl_index(Document)

# Use RedisVL's advanced query features
results = await index.query(VectorQuery(
    vector=query_embedding,
    vector_field_name="embedding",
    num_results=10,
    return_fields=["title", "content"],
))
```

RedisVL provides:

- VectorQuery with hybrid policies (BATCHES, ADHOC_BF)
- VectorRangeQuery for epsilon-based searches
- EF_RUNTIME tuning for HNSW indexes
- Advanced filter expressions

## Async Iteration

`FindQuery` objects support async iteration:

```python
async for customer in Customer.find(Customer.age > 30):
    print(customer.name)
```

## Index Access

Access specific results by index:

```python
query = Customer.find(Customer.age > 30)

# Get the 5th result (0-indexed)
fifth_customer = await query[4]
```

## Boolean Queries (JsonModel Only)

`JsonModel` supports querying on boolean fields:

```python
class Product(JsonModel, index=True):
    name: str
    active: bool = Field(index=True)


# Find all active products
active_products = await Product.find(Product.active == True).all()
```

**Note**: Boolean queries are not supported with `HashModel` due to how Redis Hashes store data.

## Calling Raw Redis Commands

Sometimes you'll need to run a Redis command directly. Use the `db()` method to get a connected Redis client:

```python
from redis_om import HashModel


class Demo(HashModel):
    some_field: str


redis_conn = Demo.db()

# Run any Redis command
redis_conn.sadd("myset", "a", "b", "c", "d")
redis_conn.sismember("myset", "b")  # Returns True
```

Or use `get_redis_connection()`:

```python
from redis_om import get_redis_connection

redis_conn = get_redis_connection()
redis_conn.set("hello", "world")
```

## Query Debugging

### Getting the Raw Query

Get the RediSearch query string that will be executed:

```python
query = Customer.find(Customer.age > 30)
print(query.query)  # Shows the RediSearch query string
```

### Getting Query Arguments

Get the full FT.SEARCH arguments:

```python
args = await query.execute(return_query_args=True)
print(args)  # Shows all FT.SEARCH arguments
```

## Performance Tips

1. **Use field projection** when you don't need all fields:
   ```python
   await Customer.find().values("name", "email").all()
   ```

2. **Use `.count()` instead of `.all()` for counting**:
   ```python
   count = await Customer.find(Customer.active == True).count()
   ```

3. **Use pagination for large result sets**:
   ```python
   page = await Customer.find().page(offset=0, limit=100)
   ```

4. **Mark fields as `sortable=True`** only when needed, as it increases memory usage.

5. **Use appropriate indexes**: TEXT fields for full-text search, TAG fields for exact matching.

## Error Handling

### NotFoundError

Raised when `.first()` finds no results:

```python
from redis_om import NotFoundError

try:
    customer = await Customer.find(Customer.pk == "nonexistent").first()
except NotFoundError:
    print("Customer not found")
```

### QueryNotSupportedError

Raised when a query is not supported:

```python
from redis_om import QueryNotSupportedError

try:
    # Invalid: trying to access non-existent nested field
    await Customer.find().values("nonexistent__field").all()
except QueryNotSupportedError as e:
    print(f"Query error: {e}")
```

## Next Steps

- Learn about [Models and Fields](models.md) for defining your data structures
- Check [Errors](errors.md) for a complete list of error codes

