# Models and Fields

The heart of Redis OM's object mapping, validation, and querying features is a
pair of declarative models: `HashModel` and `JsonModel`. Both models work
provide roughly the same API, but they store data in Redis differently.

This page will explain how to create your Redis OM model by subclassing one of
these classes.

## HashModel vs. JsonModel

First, which should you use?

The choice is relatively simple. If you want to embed a model inside another
model, like giving a `Customer` model a list of `Order` models, then you need to
use `JsonModel`. Only `JsonModel` supports embedded models.

Otherwise, use `HashModel`.

## Creating Your Model

You create a Redis OM model by subclassing `HashModel` or `JsonModel`. For
example:

```python
from redis_om import HashModel


class Customer(HashModel):
    first_name: str
    last_name: str
```

## Configuring Models

There are several Redis OM-specific settings you can configure in models. You
configure these settings using a special object called the _Meta object_.

Here is an example of using the Meta object to set a global key prefix:

```python
from redis_om import HashModel


class Customer(HashModel):
    first_name: str
    last_name: str

    class Meta:
        global_key_prefix = "customer-dashboard"
```

## Abstract Models

You can create abstract Redis OM models by subclassing `ABC` in addition to
either `HashModel` or `JsonModel`. Abstract models exist only to gather shared
configuration for subclasses -- you can't instantiate them.

One use of abstract models is to configure a Redis key prefix that all models in
your application will use. This is a good best practice with Redis. Here's how
you'd do it with an abstract model:

```python
from abc import ABC

from redis_om import HashModel


class BaseModel(HashModel, ABC):
    class Meta:
        global_key_prefix = "your-application"
```

### The Meta Object Is "Special"

The Meta object has a special property: if you create a model subclass from a base class that has a Meta object, Redis OM copies the parent's fields into the Meta object in the child class.

Because of this, a subclass can override a single field in its parent's Meta class without having to redefine all fields.

An example will make this clearer:

```python
from abc import ABC

from redis_om import HashModel, get_redis_connection


redis = get_redis_connection(port=6380)
other_redis = get_redis_connection(port=6381)


class BaseModel(HashModel, ABC):
    class Meta:
        global_key_prefix = "customer-dashboard"
        database = redis


class Customer(BaseModel):
    first_name: str
    last_name: str

    class Meta:
        database = other_redis


print(Customer.global_key_prefix)
# > "customer-dashboard"
```

In this example, we created an abstract base model called `BaseModel` and gave it a Meta object containing a database connection and a global key prefix.

Then we created a subclass `BaseModel` called `Customer` and gave it a second Meta object, but only defined `database`. `Customer` _also gets the global key prefix_ that `BaseModel` defined ("customer-dashboard").

While this is not how object inheritance usually works in Python, we think it is helpful to make abstract models more useful, especially as a way to group shared model settings.

### All Settings Supported by the Meta Object

Here is a table of the settings available in the Meta object and what they control.

| Setting                 | Description                                                                                                                                                                                                                                                 | Default                                                         |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| global_key_prefix       | A string prefix applied to every Redis key that the model manages. This could be something like your application's name.                                                                                                                                    | ""                                                              |
| model_key_prefix        | A string prefix applied to the Redis key representing every model. For example, the Redis Hash key for a HashModel. This prefix is also added to the redisearch index created for every model with indexed fields.                                          | f"{new_class.__module__}.{new_class.__name__}"                                                              |
| primary_key_pattern     | A format string producing the base string for a Redis key representing this model. This string should accept a "pk" format argument. **Note:** This is a "new style" format string, which will be called with `.format()`.                                  | "{pk}"                                                           |
| database                | A redis.asyncio.Redis or redis.Redis client instance that the model will use to communicate with Redis.                                                                                                                                                         | A new instance created with connections.get_redis_connection(). |
| primary_key_creator_cls | A class that adheres to the PrimaryKeyCreator protocol, which Redis OM will use to create a primary key for a new model instance.                                                                                                                           | UlidPrimaryKey                                                  |
| index_name              | The RediSearch index name to use for this model. Only used if the model is indexed (`index=True` on the model class).                                                                                                                    | "{global_key_prefix}:{model_key_prefix}:index"                  |
| embedded                | Whether or not this model is "embedded." Embedded models are not included in migrations that create and destroy indexes. Instead, their indexed fields are included in the index for the parent model. **Note**: Only `JsonModel` can have embedded models. | False                                                           |
| encoding                | The default encoding to use for strings. This encoding is given to redis-py at the connection level. In both cases, Redis OM will decode binary strings from Redis using your chosen encoding.                                                  | "utf-8"                                                         |
## Configuring Pydantic

Every Redis OM model is also a Pydantic model, so in addition to configuring Redis OM behavior with the Meta object, you can control Pydantic configuration via the Config object within a model class.

See the [Pydantic documentation for details](https://pydantic-docs.helpmanual.io/usage/model_config/) on how this object works and the settings that are available.

The default Pydantic configuration for models, which Redis OM sets for you, is equivalent to the following (demonstrated on an actual model):

```python
from redis_om import HashModel


class Customer(HashModel):
    # ... Fields ...

    model_config = ConfigDict(
        from_attributes=True,
        arbitrary_types_allowed=True,
        extra="allow",
    )
```

Some features may not work correctly if you change these settings.

## Fields

You define fields on a Redis OM model using Python _type annotations_. If you
aren't familiar with type annotations, check out this
[tutorial](https://towardsdatascience.com/type-annotations-in-python-d90990b172dc).

This works exactly the same way as it does with Pydantic. Check out the [Pydantic documentation on field types](https://pydantic-docs.helpmanual.io/usage/types/) for guidance.

### With HashModel

`HashModel` stores data in Redis Hashes, which are flat. This means that a Redis Hash can't contain a Redis Set, List, or Hash. Because of this requirement, `HashModel` also does not currently support container types, such as:

* Sets
* Lists
* Dictionaries and other "mapping" types
* Other Redis OM models
* Pydantic models

**NOTE**: In the future, we may serialize these values as JSON strings, the same way we do for `JsonModel`. The difference would be that in the case of `HashModel`, you wouldn't be able to index these fields, just get and save them with the model. With `JsonModel`, you can index list fields and embedded `JsonModel`s.

So, in short, if you want to use container types, use `JsonModel`.

### With JsonModel

Good news! Container types _are_ supported with `JsonModel`.

We will use Pydantic's JSON serialization and encoding to serialize your `JsonModel` and save it in Redis.

### Default Values

Fields can have default values. You set them by assigning a value to a field.

```python
import datetime
from typing import Optional

from redis_om import HashModel


class Customer(HashModel):
    first_name: str
    last_name: str
    email: str
    join_date: datetime.date
    age: int
    bio: Optional[str] = "Super dope"  # <- We added a default here
```

Now, if we create a `Customer` object without a `bio` field, it will use the default value.

```python
import datetime
from typing import Optional

from redis_om import HashModel


class Customer(HashModel):
    first_name: str
    last_name: str
    email: str
    join_date: datetime.date
    age: int
    bio: Optional[str] = "Super dope"


andrew = Customer(
    first_name="Andrew",
    last_name="Brookins",
    email="andrew.brookins@example.com",
    join_date=datetime.date.today(),
    age=38)  # <- Notice, we didn't give a bio!

print(andrew.bio)  # <- So we got the default value.
# > 'Super Dope'
```

The model will then save this default value to Redis the next time you call `save()`.

## Model-Level Indexing

If you're using the RediSearch module in your Redis instance, you can make your entire model indexed by adding `index=True` to the model class declaration. This automatically creates and manages a secondary index for the model, allowing you to query on any field.

To make a model indexed, add `index=True` to your model class:

```python
from redis_om import HashModel


class Customer(HashModel, index=True):
    first_name: str
    last_name: str
    email: str
    age: int
```

In this example, all fields in the `Customer` model will be indexed automatically.

### Excluding Fields from Indexing

By default, all fields in an indexed model are indexed. You can exclude specific fields from indexing using `Field(index=False)`:

```python
from redis_om import HashModel, Field


class Customer(HashModel, index=True):
    first_name: str = Field(index=False)  # Not indexed
    last_name: str                        # Indexed (default)
    email: str                           # Indexed (default)
    age: int                             # Indexed (default)
```

### Field-Specific Index Options

While you no longer need to specify `index=True` on individual fields (since the model is indexed), you can still use field-specific options to control indexing behavior:

```python
from redis_om import HashModel, Field


class Customer(HashModel, index=True):
    first_name: str = Field(index=False)           # Excluded from index
    last_name: str                                 # Indexed as TAG (default)
    bio: str = Field(full_text_search=True)        # Indexed as TEXT for full-text search
    age: int = Field(sortable=True)                # Indexed as NUMERIC, sortable
    category: str = Field(case_sensitive=False)    # Indexed as TAG, case-insensitive
```

### Migration from Field-Level Indexing

**Redis OM 1.0+ uses model-level indexing.** If you're upgrading from an earlier version, you'll need to update your models:

```python
# Old way (0.x) - field-by-field indexing
class Customer(HashModel):
    first_name: str = Field(index=True)
    last_name: str = Field(index=True)
    email: str = Field(index=True)
    age: int = Field(index=True, sortable=True)

# New way (1.0+) - model-level indexing
class Customer(HashModel, index=True):
    first_name: str
    last_name: str
    email: str
    age: int = Field(sortable=True)
```

For detailed migration instructions, see the [0.x to 1.0 Migration Guide](migration_guide_0x_to_1x.md).

### Field Index Types

Redis OM automatically chooses the appropriate RediSearch field type based on the Python field type and options:

- **String fields** → **TAG fields** by default (exact matching), or **TEXT fields** if `full_text_search=True`
- **Numeric fields** (int, float) → **NUMERIC fields** (range queries and sorting)
- **Boolean fields** → **TAG fields**
- **Datetime fields** → **NUMERIC fields** (stored as Unix timestamps)
- **Geographic fields** → **GEO fields**

All field types (TAG, TEXT, NUMERIC, and GEO) support sorting when marked with `sortable=True`.

### Making String Fields Sortable

String fields can be made sortable as either TAG or TEXT fields:

```python
class Customer(HashModel, index=True):
    # TAG field - exact matching with sorting
    category: str = Field(sortable=True)

    # TEXT field - full-text search with sorting
    name: str = Field(sortable=True, full_text_search=True)
```

**TAG fields** are best for exact matching and categorical data, while **TEXT fields** support full-text search queries. Both can be sorted.

To create the indexes for any models that are indexed (have `index=True`), use the `om migrate` CLI command that Redis OM installs in your Python environment.

This command detects any `JsonModel` or `HashModel` instances in your project and does the following for each model that isn't abstract or embedded:

* If no index exists yet for the model:
  * The migrator creates an index
  * The migrator stores a hash of the index definition
* If an index exists for the model:
  * The migrator checks if the stored hash for the index is out of date
  * If the stored hash is out of date, the migrator drops the index (not your data!) and rebuilds it with the new index definition

You can also run the `Migrator` yourself with code:

```python
from redis_om import (
    get_redis_connection,
    Migrator
)

redis = get_redis_connection()
Migrator().run()
```

## Vector Fields

Redis OM supports vector fields for similarity search, enabling AI and machine learning applications. Vector fields store embeddings (arrays of floats) and can be searched using K-Nearest Neighbors (KNN) queries.

### Defining Vector Fields

Use `VectorFieldOptions` to configure vector fields:

```python
from redis_om import JsonModel, Field, VectorFieldOptions

class Document(JsonModel, index=True):
    title: str = Field(index=True)
    content: str = Field(full_text_search=True)
    embedding: list[float] = Field(
        vector_options=VectorFieldOptions.flat(
            type=VectorFieldOptions.TYPE.FLOAT32,
            dimension=384,  # Must match your embedding model's output
            distance_metric=VectorFieldOptions.DISTANCE_METRIC.COSINE,
        )
    )
```

### Vector Algorithm Options

Redis OM supports two vector indexing algorithms:

**FLAT** - Brute-force search, best for smaller datasets:

```python
vector_options = VectorFieldOptions.flat(
    type=VectorFieldOptions.TYPE.FLOAT32,
    dimension=768,
    distance_metric=VectorFieldOptions.DISTANCE_METRIC.COSINE,
    initial_cap=1000,  # Optional: pre-allocate space
    block_size=1000,   # Optional: memory block size
)
```

**HNSW** - Approximate search, best for larger datasets:

```python
vector_options = VectorFieldOptions.hnsw(
    type=VectorFieldOptions.TYPE.FLOAT32,
    dimension=768,
    distance_metric=VectorFieldOptions.DISTANCE_METRIC.COSINE,
    initial_cap=1000,      # Optional: pre-allocate space
    m=16,                  # Optional: max outgoing edges per node
    ef_construction=200,   # Optional: construction-time search width
    ef_runtime=10,         # Optional: query-time search width
    epsilon=0.01,          # Optional: relative factor for range queries
)
```

### Distance Metrics

- `COSINE` - Cosine similarity (most common for text embeddings)
- `L2` - Euclidean distance
- `IP` - Inner product

### Vector Data Types

- `FLOAT32` - 32-bit floating point (most common)
- `FLOAT64` - 64-bit floating point

### Querying Vector Fields

Use `KNNExpression` to perform similarity searches:

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

### Hybrid Queries

Combine vector search with filters:

```python
# Find similar documents within a category
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

For advanced vector search capabilities, Redis OM integrates with [RedisVL](https://github.com/redis/redis-vl-python). This gives you access to:

- VectorQuery with hybrid policies (BATCHES, ADHOC_BF)
- VectorRangeQuery for epsilon-based searches
- Advanced filter expressions
- EF_RUNTIME tuning for HNSW indexes

#### Converting Models to RedisVL Schema

Use `to_redisvl_schema()` to convert your Redis OM model to a RedisVL `IndexSchema`:

```python
from aredis_om.redisvl import to_redisvl_schema
from redisvl.index import SearchIndex

# Convert your model to a RedisVL schema
schema = to_redisvl_schema(Document)

# Use with RedisVL's SearchIndex
index = SearchIndex(schema=schema, redis_client=redis)
```

#### Getting a Ready-to-Use SearchIndex

Use `get_redisvl_index()` to get a RedisVL `SearchIndex` connected to your model's database:

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

#### When to Use RedisVL Integration

Use the RedisVL integration when you need:

- **Hybrid search policies**: Control how filters and vector search interact
- **Range queries**: Find all vectors within a distance threshold
- **Runtime tuning**: Adjust HNSW `ef_runtime` per query
- **Advanced filters**: Complex filter expressions beyond Redis OM's query DSL

For most use cases, Redis OM's built-in `KNNExpression` is sufficient. The RedisVL integration is an escape hatch for advanced scenarios.

## Field Projection

Redis OM supports field projection, which allows you to retrieve only specific fields from your models rather than loading all fields. This can improve performance and reduce memory usage, especially for models with many fields.

There are two main methods for field projection:

### `.values()` - Dictionary Results

The `.values()` method returns query results as dictionaries instead of model instances:

```python
from redis_om import HashModel, Field

class Customer(HashModel, index=True):
    first_name: str
    last_name: str
    email: str
    age: int
    bio: str

# Get all fields as dictionaries
customers = Customer.find().values()
# Returns: [{"first_name": "John", "last_name": "Doe", "email": "john@example.com", "age": 30, "bio": "..."}]

# Get only specific fields as dictionaries
customers = Customer.find().values("first_name", "email")
# Returns: [{"first_name": "John", "email": "john@example.com"}]
```

### `.only()` - Partial Model Instances

The `.only()` method returns partial model instances that contain only the specified fields. Accessing fields that weren't loaded will raise an `AttributeError`:

```python
# Get partial model instances with only specific fields
customers = Customer.find().only("first_name", "email")

for customer in customers:
    print(customer.first_name)  # ✓ Works - field was loaded
    print(customer.email)       # ✓ Works - field was loaded
    print(customer.age)         # ✗ Raises AttributeError - field not loaded
```

### Performance Benefits

Both methods use Redis's `RETURN` clause for efficient field projection at the database level, which means:
- Only requested fields are transferred over the network
- Less memory usage on both Redis and client side
- Faster query execution for large models
- Automatic type conversion for returned fields

### Type Conversion

Redis OM automatically converts field values to their proper Python types based on your model field definitions:

```python
class Product(HashModel, index=True):
    name: str
    price: float
    in_stock: bool
    created_at: datetime.datetime

# Values are automatically converted to correct types
products = Product.find().values("name", "price", "in_stock")
# Returns: [{"name": "Widget", "price": 19.99, "in_stock": True}]
#          Note: price is float, in_stock is bool (not strings)
```

### Combining with Other Query Methods

Field projection works seamlessly with other query methods:

```python
# Combine with filtering and sorting
expensive_products = Product.find(
    Product.price > 100
).sort_by("price").only("name", "price")

# Combine with pagination
first_page = Product.find().values("name", "price").page(0, 10)

# Use with async queries (for async models)
products = await AsyncProduct.find().values("name", "price").all()
```

### Deep Field Projection

Redis OM supports Django-like deep field projection using double underscore (`__`) syntax to access nested fields in embedded models and dictionaries. This allows you to extract specific values from complex nested structures without loading the entire object.

#### Embedded Model Fields

Extract fields from embedded models using the `field__subfield` syntax:

```python
from redis_om import JsonModel, Field

class Address(JsonModel):
    street: str
    city: str
    zipcode: str = Field(index=True)  # Specific field indexing for embedded model
    country: str = "USA"

    class Meta:
        embedded = True

class Customer(JsonModel, index=True):
    name: str
    age: int
    address: Address
    metadata: dict = Field(default_factory=dict)

# Extract nested fields from embedded models
customers = Customer.find().values("name", "address__city", "address__zipcode")
# Returns: [{"name": "John Doe", "address__city": "Anytown", "address__zipcode": "12345"}]

# Works with .only() method too
customer = Customer.find().only("name", "address__street").first()
print(customer.name)                    # ✓ Works
print(getattr(customer, "address__street"))  # ✓ Works - returns "123 Main St"
print(customer.age)                     # ✗ Raises AttributeError - not loaded
```

#### Dictionary Field Access

Access nested dictionary values using the same syntax:

```python
# Sample data with nested dictionary
customer_data = {
    "name": "John Doe",
    "metadata": {
        "role": "admin",
        "preferences": {
            "theme": "dark",
            "notifications": True,
            "settings": {
                "language": "en"
            }
        }
    }
}

# Extract values at any nesting level
result = Customer.find().values(
    "name", 
    "metadata__role",
    "metadata__preferences__theme",
    "metadata__preferences__settings__language"
)
# Returns: [{
#     "name": "John Doe",
#     "metadata__role": "admin", 
#     "metadata__preferences__theme": "dark",
#     "metadata__preferences__settings__language": "en"
# }]
```

#### Mixed Deep Fields

Combine regular fields, embedded model fields, and dictionary fields in a single query:

```python
# Mix all types of field projection
customers = Customer.find().values(
    "name",                           # Regular field
    "age",                           # Regular field  
    "address__city",                 # Embedded model field
    "address__country",              # Embedded model field
    "metadata__role",                # Dictionary field
    "metadata__preferences__theme"   # Nested dictionary field
)
```

#### Validation and Error Handling

Deep field paths are fully validated to ensure they exist in your model hierarchy:

```python
# ✓ Valid - address is an embedded model with a city field
Customer.find().values("name", "address__city")

# ✗ Invalid - nonexistent root field
Customer.find().values("name", "nonexistent__field")  
# Raises: QueryNotSupportedError

# ✗ Invalid - city is not a complex field
Customer.find().values("name", "address__city__invalid")  
# Raises: QueryNotSupportedError

# ✗ Invalid - address exists but zipcode_invalid doesn't
Customer.find().values("name", "address__zipcode_invalid")  
# Raises: QueryNotSupportedError
```

#### Performance Considerations

Deep field projection automatically uses the full document fallback strategy for optimal data access:

- **Simple fields only**: Uses efficient Redis `RETURN` clause
- **Deep fields present**: Queries full documents and extracts requested fields
- **Automatic detection**: No manual configuration needed
- **Type preservation**: All nested values maintain their proper Python types

```python
# This query uses RETURN clause (efficient)
Customer.find().values("name", "age")

# This query uses fallback (still efficient, but queries full documents)  
Customer.find().values("name", "address__city")
```

### Limitations

Field projection has some limitations to be aware of:

#### Complex Field Types (JsonModel only)

For `JsonModel`, complex field types (embedded models, dictionaries, lists) cannot be projected using Redis's `RETURN` clause. Redis OM automatically falls back to querying full documents and manually extracting the requested fields, but this means:

- **HashModel**: All simple field types work with efficient projection
- **JsonModel**: Simple fields use efficient projection, complex fields use fallback
- **Performance**: Fallback is still fast but transfers more data

#### Supported vs Unsupported Field Types

```python
# ✓ Supported for efficient projection (all model types)
class Product(HashModel, index=True):  # or JsonModel
    name: str        # ✓ String fields
    price: float     # ✓ Numeric fields
    active: bool     # ✓ Boolean fields
    created: datetime # ✓ DateTime fields

# JsonModel: These use fallback strategy (still supported)
class Customer(JsonModel):
    profile: UserProfile              # Uses fallback (embedded model)
    settings: dict                   # Uses fallback (dictionary)
    tags: List[str]                  # Uses fallback (list)
    
    # Deep field access works for all complex types
    result = Customer.find().values("name", "profile__email", "settings__theme")
```
