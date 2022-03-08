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
| model_key_prefix        | A string prefix applied to the Redis key representing every model. For example, the Redis Hash key for a HashModel. This prefix is also added to the redisearch index created for every model with indexed fields.                                          | ""                                                              |
| primary_key_pattern     | A format string producing the base string for a Redis key representing this model. This string should accept a "pk" format argument. **Note:** This is a "new style" format string, which will be called with `.format()`.                                  | "{pk}"                                                           |
| database                | An aioredis.Redis or redis.Redis client instance that the model will use to communicate with Redis.                                                                                                                                                         | A new instance created with connections.get_redis_connection(). |
| primary_key_creator_cls | A class that adheres to the PrimaryKeyCreator protocol, which Redis OM will use to create a primary key for a new model instance.                                                                                                                           | UlidPrimaryKey                                                  |
| index_name              | The RediSearch index name to use for this model. Only used if at least one of the model's fields are marked as indexable (`index=True`).                                                                                                                    | "{global_key_prefix}:{model_key_prefix}:index"                  |
| embedded                | Whether or not this model is "embedded." Embedded models are not included in migrations that create and destroy indexes. Instead, their indexed fields are included in the index for the parent model. **Note**: Only `JsonModel` can have embedded models. | False                                                           |
| encoding                | The default encoding to use for strings. This encoding is given to redis-py or aioredis at the connection level. In both cases, Redis OM will decode binary strings from Redis using your chosen encoding.                                                  | "utf-8"                                                         |
## Configuring Pydantic

Every Redis OM model is also a Pydantic model, so in addition to configuring Redis OM behavior with the Meta object, you can control Pydantic configuration via the Config object within a model class.

See the [Pydantic documentation for details](https://pydantic-docs.helpmanual.io/usage/model_config/) on how this object works and the settings that are available.

The default Pydantic configuration for models, which Redis OM sets for you, is equivalent to the following (demonstrated on an actual model):

```python
from redis_om import HashModel


class Customer(HashModel):
    # ... Fields ...
 
    class Config:
        orm_mode = True
        arbitrary_types_allowed = True
        extra = "allow"
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

## Marking a Field as Indexed

If you're using the RediSearch module in your Redis instance, you can mark a field as "indexed." As soon as you mark any field in a model as indexed, Redis OM will automatically create and manage an secondary index for the model for you, allowing you to query on any indexed field.

To mark a field as indexed, you need to use the Redis OM `Field()` helper, like this:

```python
from redis_om import (
    Field,
    HashModel,
)


class Customer(HashModel):
    first_name: str
    last_name: str = Field(index=True)
```

In this example, we marked `Customer.last_name` as indexed.

To create the indexes for any models that have indexed fields, use the `migrate` CLI command that Redis OM installs in your Python environment.

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
