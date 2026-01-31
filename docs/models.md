# Models and Fields

The heart of Redis OM's object mapping, validation, and persistence features is a
pair of declarative models: `HashModel` and `JsonModel`. Both models provide
roughly the same API, but they store data in Redis differently.

This page explains how to define Redis OM models. For querying models, see [Making Queries](querying.md).

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

### Optional Fields

Fields without default values are required. To make a field optional, use `Optional`:

```python
from typing import Optional
from redis_om import HashModel


class Customer(HashModel):
    first_name: str
    last_name: str
    bio: Optional[str] = None  # Optional with None default
```

## Validation

Redis OM uses [Pydantic](https://docs.pydantic.dev/) behind the scenes to validate data at runtime based on the model's type annotations.

Every Redis OM model is also a Pydantic model, so you can use Pydantic validators like `EmailStr`, `Pattern`, and many more for complex validation.

### Basic Type Validation

Validation works for basic type annotations like `str`:

```python
import datetime
from typing import Optional

from pydantic import EmailStr

from redis_om import HashModel


class Customer(HashModel):
    first_name: str
    last_name: str
    email: EmailStr
    join_date: datetime.date
    age: int
    bio: Optional[str]
```

Redis OM will ensure that `first_name` is always a string, `age` is always an integer, and so on.

### Complex Validation

Let's see what happens if we try to create a `Customer` object with an invalid email address:

```python
from pydantic import ValidationError

try:
    Customer(
        first_name="Andrew",
        last_name="Brookins",
        email="Not an email address!",
        join_date=datetime.date.today(),
        age=38,
        bio="Python developer, works at Redis, Inc."
    )
except ValidationError as e:
    print(e)
    """
    1 validation error for Customer
    email
      value is not a valid email address: An email address must have an @-sign.
    """
```

You'll also get a validation error if you change a field on a model instance to an invalid value and then try to save:

```python
andrew = Customer(
    first_name="Andrew",
    last_name="Brookins",
    email="andrew.brookins@example.com",
    join_date=datetime.date.today(),
    age=38,
    bio="Python developer"
)

andrew.email = "Not valid"

try:
    andrew.save()
except ValidationError as e:
    print(e)  # ValidationError: email is not a valid email address
```

### Constrained Values

Pydantic includes many type annotations to introduce constraints to your model field values:

* Strings that are always lowercase
* Strings that must match a regular expression
* Integers within a range
* Integers that are a specific multiple
* And many more...

All of these constraint types work with Redis OM models. Read the [Pydantic documentation on constrained types](https://docs.pydantic.dev/latest/concepts/fields/#constrained-types) to learn more.

## Saving and Loading Models

### Saving Models

Save a model to Redis by calling `save()`:

```python
andrew = Customer(
    first_name="Andrew",
    last_name="Brookins",
    email="andrew.brookins@example.com",
    join_date=datetime.date.today(),
    age=38)

await andrew.save()  # Async
# andrew.save()      # Sync
```

### Conditional Saves

Use `nx` (only if not exists) or `xx` (only if exists) for conditional saves:

```python
# Only save if the key does NOT exist (insert-only)
result = await andrew.save(nx=True)

# Only save if the key already exists (update-only)
result = await andrew.save(xx=True)
```

Returns `None` if the condition was not met, otherwise returns the model.

### Getting a Model by Primary Key

If you have the primary key of a model, you can call the `get()` method:

```python
customer = await Customer.get(andrew.pk)
```

### Automatic Primary Keys

Models generate a globally unique primary key automatically without needing to talk to Redis:

```python
andrew = Customer(
    first_name="Andrew",
    last_name="Brookins",
    email="andrew.brookins@example.com",
    join_date=datetime.date.today(),
    age=38)

print(andrew.pk)
# > '01FJM6PH661HCNNRC884H6K30C'
```

The ID is available *before* you save the model. The default ID generation function creates [ULIDs](https://github.com/ulid/spec).

### Updating Models

Update a model instance with specific field values:

```python
# Update specific fields on an instance
await andrew.update(age=39, bio="Updated bio")
```

### Deleting Models

Delete a model by primary key:

```python
await Customer.delete(andrew.pk)
```

Or delete multiple models:

```python
await Customer.delete_many([customer1, customer2, customer3])
```

### Expiring Models

Set a TTL (time to live) on a model instance:

```python
# Expire Andrew in 2 minutes (120 seconds)
andrew.expire(120)
```

### Listing All Primary Keys

Get all primary keys for a model:

```python
async for pk in Customer.all_pks():
    print(pk)
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

### All Settings Supported by the Meta Object

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

## Abstract Models

You can create abstract Redis OM models by subclassing `ABC` in addition to
either `HashModel` or `JsonModel`. Abstract models exist only to gather shared
configuration for subclasses -- you can't instantiate them.

One use of abstract models is to configure a Redis key prefix that all models in
your application will use:

```python
from abc import ABC
from redis_om import HashModel


class BaseModel(HashModel, ABC):
    class Meta:
        global_key_prefix = "your-application"
```

### Meta Object Inheritance

The Meta object has a special property: if you create a model subclass from a base class that has a Meta object, Redis OM copies the parent's fields into the Meta object in the child class.

A subclass can override a single field in its parent's Meta class without having to redefine all fields:

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
# > "customer-dashboard"  # Inherited from BaseModel
```

### Custom Primary Key Creators

By default, Redis OM uses ULID (Universally Unique Lexicographically Sortable Identifier) for primary keys. You can customize this:

```python
import uuid
from redis_om import HashModel


class UUIDv7PrimaryKey:
    @staticmethod
    def create_pk(*args, **kwargs) -> str:
        return str(uuid.uuid7())


class MyModel(HashModel):
    name: str

    class Meta:
        primary_key_creator_cls = UUIDv7PrimaryKey
```

**Note:** `uuid.uuid7()` requires Python 3.11+ or a backport library like `uuid6`.

## Configuring Pydantic

Every Redis OM model is also a Pydantic model, so you can control Pydantic configuration via `model_config`:

```python
from pydantic import ConfigDict
from redis_om import HashModel


class Customer(HashModel):
    # ... Fields ...

    model_config = ConfigDict(
        from_attributes=True,
        arbitrary_types_allowed=True,
        extra="allow",
    )
```

See the [Pydantic documentation](https://pydantic-docs.helpmanual.io/usage/model_config/) for available settings.

## Model-Level Indexing

If you're using Redis with the Search capability, you can make your model indexed by adding `index=True` to the model class declaration:

```python
from redis_om import HashModel


class Customer(HashModel, index=True):
    first_name: str
    last_name: str
    email: str
    age: int
```

In this example, all fields in the `Customer` model will be indexed automatically, enabling queries with `find()`.

### Excluding Fields from Indexing

You can exclude specific fields from indexing using `Field(index=False)`:

```python
from redis_om import HashModel, Field


class Customer(HashModel, index=True):
    first_name: str = Field(index=False)  # Not indexed
    last_name: str                        # Indexed (default)
    email: str                            # Indexed (default)
    age: int                              # Indexed (default)
```

### Field-Specific Index Options

Control indexing behavior with field-specific options:

```python
from redis_om import HashModel, Field


class Customer(HashModel, index=True):
    first_name: str = Field(index=False)           # Excluded from index
    last_name: str                                 # Indexed as TAG (default)
    bio: str = Field(full_text_search=True)        # Indexed as TEXT for full-text search
    age: int = Field(sortable=True)                # Indexed as NUMERIC, sortable
    category: str = Field(case_sensitive=False)    # Indexed as TAG, case-insensitive
```

### Field Index Types

Redis OM automatically chooses the appropriate RediSearch field type based on the Python field type:

| Python Type | RediSearch Field Type | Notes |
|-------------|----------------------|-------|
| `str` | TAG | Exact matching (default) |
| `str` with `full_text_search=True` | TEXT | Full-text search |
| `int`, `float` | NUMERIC | Range queries and sorting |
| `bool` | TAG | Boolean fields |
| `datetime` | NUMERIC | Stored as Unix timestamps |
| Geographic types | GEO | Location queries |

All field types support sorting when marked with `sortable=True`.

### Running Migrations

To create the indexes for indexed models, use the `om migrate` CLI command:

```bash
om migrate
```

Or run the `Migrator` programmatically:

```python
from redis_om import Migrator

Migrator().run()
```

For detailed migration instructions, see [Migrations](migrations.md).

## Vector Fields

Redis OM supports vector fields for similarity search, enabling AI and machine learning applications.

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

**FLAT** - Brute-force search, best for smaller datasets:

```python
vector_options = VectorFieldOptions.flat(
    type=VectorFieldOptions.TYPE.FLOAT32,
    dimension=768,
    distance_metric=VectorFieldOptions.DISTANCE_METRIC.COSINE,
    initial_cap=1000,  # Optional: pre-allocate space
)
```

**HNSW** - Approximate search, best for larger datasets:

```python
vector_options = VectorFieldOptions.hnsw(
    type=VectorFieldOptions.TYPE.FLOAT32,
    dimension=768,
    distance_metric=VectorFieldOptions.DISTANCE_METRIC.COSINE,
    m=16,                  # Optional: max outgoing edges per node
    ef_construction=200,   # Optional: construction-time search width
    ef_runtime=10,         # Optional: query-time search width
)
```

### Distance Metrics

- `COSINE` - Cosine similarity (most common for text embeddings)
- `L2` - Euclidean distance
- `IP` - Inner product

### Vector Data Types

- `FLOAT32` - 32-bit floating point (most common)
- `FLOAT64` - 64-bit floating point

For querying vector fields, see [Making Queries: Vector Search](querying.md#vector-similarity-search).

## Embedded Models (JsonModel Only)

`JsonModel` supports embedding models within other models:

```python
from redis_om import JsonModel, Field


class Address(JsonModel):
    street: str
    city: str = Field(index=True)
    zipcode: str
    country: str = "USA"

    class Meta:
        embedded = True


class Customer(JsonModel, index=True):
    name: str
    age: int
    address: Address
```

Embedded models:

- Must have `embedded = True` in their Meta class
- Are stored as nested JSON within the parent document
- Can have their own indexed fields (included in parent's index)
- Are not separately queryable -- query through the parent model

## Next Steps

- Learn how to query your models in [Making Queries](querying.md)
- Configure index migrations in [Migrations](migrations.md)
