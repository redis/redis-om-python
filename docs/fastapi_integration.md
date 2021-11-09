# FastAPI Integration

## Introduction

This section includes a complete example showing how to integrate Redis OM with FastAPI.

Good news: Redis OM was **specifically designed to integrate with FastAPI**!

## Concepts

### Every Redis OM Model is also a Pydantic model

Every Redis OM model is also a Pydantic model, so you can define a model and then use the model class anywhere that FastAPI expects a Pydantic model.

This means a couple of things:

1. A Redis OM model can be used for request body validation
2. Redis OM models show up in the auto-generated API documentation

### Cache vs. Data

Redis works well as either a durable data store or a cache, but the optimal Redis configuration is often different between these two use cases.

You almost always want to use a Redis instance tuned for caching when you're caching and a separate Redis instance tuned for data durability for storing application state.

This example shows how to manage these two uses of Redis within the same application. The app uses a FastAPI caching framework and dedicated caching instance of Redis for caching, and a separate Redis instance tuned for durability for Redis OM models.


## Example app code

This is a complete example that you can run as-is:

```python
import datetime
from typing import Optional

import aioredis

from fastapi import FastAPI, HTTPException
from starlette.requests import Request
from starlette.responses import Response

from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.decorator import cache

from pydantic import EmailStr

from redis_om import HashModel, NotFoundError
from redis_om import get_redis_connection

# This Redis instance is tuned for durability.
REDIS_DATA_URL = "redis://localhost:6380"

# This Redis instance is tuned for cache performance.
REDIS_CACHE_URL = "redis://localhost:6381"


class Customer(HashModel):
    first_name: str
    last_name: str
    email: EmailStr
    join_date: datetime.date
    age: int
    bio: Optional[str]


app = FastAPI()


@app.post("/customer")
async def save_customer(customer: Customer):
    # We can save the model to Redis by calling `save()`:
    return customer.save()


@app.get("/customers")
async def list_customers(request: Request, response: Response):
    # To retrieve this customer with its primary key, we use `Customer.get()`:
    return {"customers": Customer.all_pks()}


@app.get("/customer/{pk}")
@cache(expire=10)
async def get_customer(pk: str, request: Request, response: Response):
    # To retrieve this customer with its primary key, we use `Customer.get()`:
    try:
        return Customer.get(pk)
    except NotFoundError:
        raise HTTPException(status_code=404, detail="Customer not found")


@app.on_event("startup")
async def startup():
    r = aioredis.from_url(REDIS_CACHE_URL, encoding="utf8",
                          decode_responses=True)
    FastAPICache.init(RedisBackend(r), prefix="fastapi-cache")

    # You can set the Redis OM URL using the REDIS_OM_URL environment
    # variable, or by manually creating the connection using your model's
    # Meta object.
    Customer.Meta.database = get_redis_connection(url=REDIS_DATA_URL,
                                                  decode_responses=True)
```

## Testing the app

You should install the app's dependencies first. This app uses Poetry, so you'll want to make sure you have that installed first:

    $ pip install poetry

Then install the dependencies:

    $ poetry install

Next, start the server:

    $ poetry run uvicorn --reload main:test

Then, in another shell, create a customer:

    $ curl -X POST  "http://localhost:8000/customer" -H 'Content-Type: application/json' -d '{"first_name":"Andrew","last_name":"Brookins","email":"a@example.com","age":"38","join_date":"2020
-01-02"}'
    {"pk":"01FM2G8EP38AVMH7PMTAJ123TA","first_name":"Andrew","last_name":"Brookins","email":"a@example.com","join_date":"2020-01-02","age":38,"bio":""}

Get a copy of the value for "pk" and make another request to get that customer:

    $ curl "http://localhost:8000/customer/01FM2G8EP38AVMH7PMTAJ123TA"
    {"pk":"01FM2G8EP38AVMH7PMTAJ123TA","first_name":"Andrew","last_name":"Brookins","email":"a@example.com","join_date":"2020-01-02","age":38,"bio":""}

You can also get a list of all customer PKs:

    $ curl "http://localhost:8000/customers"
    {"customers":["01FM2G8EP38AVMH7PMTAJ123TA"]}