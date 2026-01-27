"""
Benchmarks for redis-om-python model instantiation and operations.

These benchmarks document the current performance characteristics of the library.
Run with: pytest tests/test_benchmarks.py -v --benchmark-only

Related to GitHub issue #640: HashModel instantiation performance.
"""

import asyncio
from datetime import datetime
from typing import List, Optional

import pytest
import pytest_asyncio
from pydantic import BaseModel as PydanticBaseModel

from aredis_om import EmbeddedJsonModel, Field, HashModel, JsonModel, Migrator

# Skip if pytest-benchmark is not installed
pytest.importorskip("pytest_benchmark")


# =============================================================================
# Test Models - Simple (Pydantic baseline)
# =============================================================================


class SimplePydanticModel(PydanticBaseModel):
    """Plain Pydantic model for baseline comparison."""

    name: str
    age: int


class ComplexPydanticModel(PydanticBaseModel):
    """Pydantic model with more fields for comparison."""

    name: str
    email: str
    age: int
    score: float
    active: bool
    tags: List[str] = []
    created_at: Optional[datetime] = None
    metadata: Optional[dict] = None


# =============================================================================
# Fixtures for Redis-connected models
# =============================================================================


@pytest_asyncio.fixture
async def redis_models(redis):
    """Create model classes with the test Redis connection."""
    loop = asyncio.get_event_loop()

    class SimpleHashModel(HashModel, index=True):
        """Simple HashModel with minimal fields."""

        name: str = Field(index=True)
        age: int = Field(index=True, sortable=True)

        class Meta:
            database = redis

    class SimpleJsonModel(JsonModel, index=True):
        """Simple JsonModel with minimal fields."""

        name: str = Field(index=True)
        age: int = Field(index=True, sortable=True)

        class Meta:
            database = redis

    class ComplexHashModel(HashModel, index=True):
        """HashModel with multiple indexed fields."""

        name: str = Field(index=True)
        email: str = Field(index=True)
        age: int = Field(index=True, sortable=True)
        score: float = Field(index=True, sortable=True)
        active: bool = Field(index=True)

        class Meta:
            database = redis

    class EmbeddedAddress(EmbeddedJsonModel, index=True):
        """Embedded model for nested JsonModel testing."""

        street: str
        city: str = Field(index=True)
        zip_code: str

    class ComplexJsonModel(JsonModel, index=True):
        """JsonModel with nested embedded model."""

        name: str = Field(index=True)
        email: str = Field(index=True)
        age: int = Field(index=True, sortable=True)
        address: EmbeddedAddress
        tags: List[str] = []

        class Meta:
            database = redis

    return {
        "SimpleHashModel": SimpleHashModel,
        "SimpleJsonModel": SimpleJsonModel,
        "ComplexHashModel": ComplexHashModel,
        "ComplexJsonModel": ComplexJsonModel,
        "EmbeddedAddress": EmbeddedAddress,
        "loop": loop,
    }


# =============================================================================
# Instantiation Benchmarks
# =============================================================================


class TestInstantiationBenchmarks:
    """Benchmark model instantiation performance."""

    def test_pydantic_simple_instantiation(self, benchmark):
        """Baseline: Plain Pydantic model instantiation."""
        benchmark(SimplePydanticModel, name="Alice", age=30)

    def test_pydantic_complex_instantiation(self, benchmark):
        """Baseline: Complex Pydantic model instantiation."""
        benchmark(
            ComplexPydanticModel,
            name="Alice",
            email="alice@example.com",
            age=30,
            score=95.5,
            active=True,
            tags=["admin", "user"],
        )

    def test_hashmodel_simple_instantiation(self, benchmark, redis_models):
        """HashModel with minimal fields."""
        SimpleHashModel = redis_models["SimpleHashModel"]
        benchmark(SimpleHashModel, name="Alice", age=30)

    def test_hashmodel_complex_instantiation(self, benchmark, redis_models):
        """HashModel with multiple indexed fields."""
        ComplexHashModel = redis_models["ComplexHashModel"]
        benchmark(
            ComplexHashModel,
            name="Alice",
            email="alice@example.com",
            age=30,
            score=95.5,
            active=True,
        )

    def test_jsonmodel_simple_instantiation(self, benchmark, redis_models):
        """JsonModel with minimal fields."""
        SimpleJsonModel = redis_models["SimpleJsonModel"]
        benchmark(SimpleJsonModel, name="Alice", age=30)

    def test_jsonmodel_complex_instantiation(self, benchmark, redis_models):
        """JsonModel with nested embedded model."""
        ComplexJsonModel = redis_models["ComplexJsonModel"]
        EmbeddedAddress = redis_models["EmbeddedAddress"]
        address = EmbeddedAddress(
            street="123 Main St", city="Springfield", zip_code="12345"
        )
        benchmark(
            ComplexJsonModel,
            name="Alice",
            email="alice@example.com",
            age=30,
            address=address,
            tags=["admin", "user"],
        )


# =============================================================================
# Redis I/O Benchmarks (Save, Get, Query, Update, Batch)
# =============================================================================
# These benchmarks are in the sync version only (tests_sync/test_benchmarks.py)
# because pytest-benchmark doesn't support async functions and we can't use
# run_until_complete() inside an already-running event loop.
#
# To run Redis I/O benchmarks:
#   1. make sync
#   2. pytest tests_sync/test_benchmarks.py -v --benchmark-only
# =============================================================================


class TestSaveBenchmarks:
    """Benchmark model save operations."""

    @pytest.fixture(autouse=True)
    async def setup_migrator(self, redis_models):
        """Run migrator to create indexes."""
        await Migrator().run()

    def test_hashmodel_save(self, benchmark, redis_models):
        """Save a single HashModel instance."""
        SimpleHashModel = redis_models["SimpleHashModel"]
        loop = redis_models["loop"]

        async def save_model():
            model = SimpleHashModel(name="Alice", age=30)
            await model.save()
            return model

        benchmark.pedantic(
            lambda: loop.run_until_complete(save_model()), rounds=100, iterations=1
        )

    def test_jsonmodel_save(self, benchmark, redis_models):
        """Save a single JsonModel instance."""
        SimpleJsonModel = redis_models["SimpleJsonModel"]
        loop = redis_models["loop"]

        async def save_model():
            model = SimpleJsonModel(name="Alice", age=30)
            await model.save()
            return model

        benchmark.pedantic(
            lambda: loop.run_until_complete(save_model()), rounds=100, iterations=1
        )

    def test_jsonmodel_with_embedded_save(self, benchmark, redis_models):
        """Save JsonModel with embedded document."""
        ComplexJsonModel = redis_models["ComplexJsonModel"]
        EmbeddedAddress = redis_models["EmbeddedAddress"]
        loop = redis_models["loop"]

        async def save_model():
            address = EmbeddedAddress(
                street="123 Main St", city="Springfield", zip_code="12345"
            )
            model = ComplexJsonModel(
                name="Alice",
                email="alice@example.com",
                age=30,
                address=address,
                tags=["admin", "user"],
            )
            await model.save()
            return model

        benchmark.pedantic(
            lambda: loop.run_until_complete(save_model()), rounds=100, iterations=1
        )


# =============================================================================
# Get/Retrieve Benchmarks
# =============================================================================


class TestGetBenchmarks:
    """Benchmark model retrieval operations."""

    @pytest.fixture(autouse=True)
    async def setup_migrator(self, redis_models):
        """Run migrator to create indexes."""
        await Migrator().run()

    def test_hashmodel_get(self, benchmark, redis_models):
        """Get a HashModel by primary key."""
        SimpleHashModel = redis_models["SimpleHashModel"]
        loop = redis_models["loop"]

        # Setup: create and save model
        async def setup():
            model = SimpleHashModel(name="Alice", age=30)
            await model.save()
            return model.pk

        pk = loop.run_until_complete(setup())

        async def get_model():
            return await SimpleHashModel.get(pk)

        benchmark.pedantic(
            lambda: loop.run_until_complete(get_model()), rounds=100, iterations=1
        )

    def test_jsonmodel_get(self, benchmark, redis_models):
        """Get a JsonModel by primary key."""
        SimpleJsonModel = redis_models["SimpleJsonModel"]
        loop = redis_models["loop"]

        async def setup():
            model = SimpleJsonModel(name="Alice", age=30)
            await model.save()
            return model.pk

        pk = loop.run_until_complete(setup())

        async def get_model():
            return await SimpleJsonModel.get(pk)

        benchmark.pedantic(
            lambda: loop.run_until_complete(get_model()), rounds=100, iterations=1
        )

    def test_jsonmodel_with_embedded_get(self, benchmark, redis_models):
        """Get JsonModel with embedded document."""
        ComplexJsonModel = redis_models["ComplexJsonModel"]
        EmbeddedAddress = redis_models["EmbeddedAddress"]
        loop = redis_models["loop"]

        async def setup():
            address = EmbeddedAddress(
                street="123 Main St", city="Springfield", zip_code="12345"
            )
            model = ComplexJsonModel(
                name="Alice",
                email="alice@example.com",
                age=30,
                address=address,
                tags=["admin", "user"],
            )
            await model.save()
            return model.pk

        pk = loop.run_until_complete(setup())

        async def get_model():
            return await ComplexJsonModel.get(pk)

        benchmark.pedantic(
            lambda: loop.run_until_complete(get_model()), rounds=100, iterations=1
        )


# =============================================================================
# Query/Find Benchmarks
# =============================================================================


class TestQueryBenchmarks:
    """Benchmark query operations."""

    @pytest.fixture(autouse=True)
    def setup_data(self, redis_models):
        """Create test data for queries."""
        loop = redis_models["loop"]

        async def create_data():
            await Migrator().run()

            SimpleHashModel = redis_models["SimpleHashModel"]
            ComplexJsonModel = redis_models["ComplexJsonModel"]
            EmbeddedAddress = redis_models["EmbeddedAddress"]

            # Create 50 hash models
            for i in range(50):
                model = SimpleHashModel(name=f"User{i}", age=20 + i)
                await model.save()

            # Create 50 json models with embedded addresses
            for i in range(50):
                address = EmbeddedAddress(
                    street=f"{i} Main St", city=f"City{i % 10}", zip_code=f"{10000 + i}"
                )
                model = ComplexJsonModel(
                    name=f"User{i}",
                    email=f"user{i}@example.com",
                    age=20 + i,
                    address=address,
                    tags=["tag1", "tag2"] if i % 2 == 0 else ["tag3"],
                )
                await model.save()

        loop.run_until_complete(create_data())

    def test_hashmodel_find_all(self, benchmark, redis_models):
        """Find all HashModel instances."""
        SimpleHashModel = redis_models["SimpleHashModel"]
        loop = redis_models["loop"]

        async def find_all():
            return await SimpleHashModel.find().all()

        benchmark.pedantic(
            lambda: loop.run_until_complete(find_all()), rounds=50, iterations=1
        )

    def test_hashmodel_find_by_field(self, benchmark, redis_models):
        """Find HashModel by indexed field."""
        SimpleHashModel = redis_models["SimpleHashModel"]
        loop = redis_models["loop"]

        async def find_by_name():
            return await SimpleHashModel.find(SimpleHashModel.name == "User25").all()

        benchmark.pedantic(
            lambda: loop.run_until_complete(find_by_name()), rounds=100, iterations=1
        )

    def test_jsonmodel_find_all(self, benchmark, redis_models):
        """Find all JsonModel instances."""
        ComplexJsonModel = redis_models["ComplexJsonModel"]
        loop = redis_models["loop"]

        async def find_all():
            return await ComplexJsonModel.find().all()

        benchmark.pedantic(
            lambda: loop.run_until_complete(find_all()), rounds=50, iterations=1
        )

    def test_jsonmodel_find_by_field(self, benchmark, redis_models):
        """Find JsonModel by indexed field."""
        ComplexJsonModel = redis_models["ComplexJsonModel"]
        loop = redis_models["loop"]

        async def find_by_name():
            return await ComplexJsonModel.find(ComplexJsonModel.name == "User25").all()

        benchmark.pedantic(
            lambda: loop.run_until_complete(find_by_name()), rounds=100, iterations=1
        )

    def test_jsonmodel_find_by_embedded_field(self, benchmark, redis_models):
        """Find JsonModel by embedded document field."""
        ComplexJsonModel = redis_models["ComplexJsonModel"]
        loop = redis_models["loop"]

        async def find_by_city():
            return await ComplexJsonModel.find(
                ComplexJsonModel.address.city == "City5"
            ).all()

        benchmark.pedantic(
            lambda: loop.run_until_complete(find_by_city()), rounds=100, iterations=1
        )

    def test_jsonmodel_find_with_sort(self, benchmark, redis_models):
        """Find JsonModel with sorting."""
        ComplexJsonModel = redis_models["ComplexJsonModel"]
        loop = redis_models["loop"]

        async def find_sorted():
            return await ComplexJsonModel.find().sort_by("age").all()

        benchmark.pedantic(
            lambda: loop.run_until_complete(find_sorted()), rounds=50, iterations=1
        )

    def test_jsonmodel_find_with_pagination(self, benchmark, redis_models):
        """Find JsonModel with pagination."""
        ComplexJsonModel = redis_models["ComplexJsonModel"]
        loop = redis_models["loop"]

        async def find_paginated():
            return await ComplexJsonModel.find().page(offset=10, limit=10)

        benchmark.pedantic(
            lambda: loop.run_until_complete(find_paginated()), rounds=100, iterations=1
        )


# =============================================================================
# Update Benchmarks
# =============================================================================


class TestUpdateBenchmarks:
    """Benchmark update operations."""

    @pytest.fixture(autouse=True)
    async def setup_migrator(self, redis_models):
        """Run migrator to create indexes."""
        await Migrator().run()

    def test_hashmodel_update(self, benchmark, redis_models):
        """Update a HashModel instance."""
        SimpleHashModel = redis_models["SimpleHashModel"]
        loop = redis_models["loop"]

        async def setup():
            model = SimpleHashModel(name="Alice", age=30)
            await model.save()
            return model

        model = loop.run_until_complete(setup())
        counter = [0]

        async def update_model():
            counter[0] += 1
            return await model.update(age=30 + counter[0])

        benchmark.pedantic(
            lambda: loop.run_until_complete(update_model()), rounds=100, iterations=1
        )

    def test_jsonmodel_update(self, benchmark, redis_models):
        """Update a JsonModel instance."""
        SimpleJsonModel = redis_models["SimpleJsonModel"]
        loop = redis_models["loop"]

        async def setup():
            model = SimpleJsonModel(name="Alice", age=30)
            await model.save()
            return model

        model = loop.run_until_complete(setup())
        counter = [0]

        async def update_model():
            counter[0] += 1
            return await model.update(age=30 + counter[0])

        benchmark.pedantic(
            lambda: loop.run_until_complete(update_model()), rounds=100, iterations=1
        )

    def test_jsonmodel_update_embedded(self, benchmark, redis_models):
        """Update embedded field in JsonModel."""
        ComplexJsonModel = redis_models["ComplexJsonModel"]
        EmbeddedAddress = redis_models["EmbeddedAddress"]
        loop = redis_models["loop"]

        async def setup():
            address = EmbeddedAddress(
                street="123 Main St", city="Springfield", zip_code="12345"
            )
            model = ComplexJsonModel(
                name="Alice",
                email="alice@example.com",
                age=30,
                address=address,
                tags=["admin"],
            )
            await model.save()
            return model

        model = loop.run_until_complete(setup())
        counter = [0]

        async def update_embedded():
            counter[0] += 1
            return await model.update(address__city=f"City{counter[0]}")

        benchmark.pedantic(
            lambda: loop.run_until_complete(update_embedded()), rounds=100, iterations=1
        )


# =============================================================================
# Batch Operation Benchmarks
# =============================================================================


class TestBatchBenchmarks:
    """Benchmark batch operations."""

    @pytest.fixture(autouse=True)
    async def setup_migrator(self, redis_models):
        """Run migrator to create indexes."""
        await Migrator().run()

    def test_hashmodel_add_many(self, benchmark, redis_models):
        """Save multiple HashModel instances using add()."""
        SimpleHashModel = redis_models["SimpleHashModel"]
        loop = redis_models["loop"]

        async def add_many():
            models = [SimpleHashModel(name=f"User{i}", age=20 + i) for i in range(10)]
            await SimpleHashModel.add(models)
            return models

        benchmark.pedantic(
            lambda: loop.run_until_complete(add_many()), rounds=50, iterations=1
        )

    def test_jsonmodel_add_many(self, benchmark, redis_models):
        """Save multiple JsonModel instances using add()."""
        SimpleJsonModel = redis_models["SimpleJsonModel"]
        loop = redis_models["loop"]

        async def add_many():
            models = [SimpleJsonModel(name=f"User{i}", age=20 + i) for i in range(10)]
            await SimpleJsonModel.add(models)
            return models

        benchmark.pedantic(
            lambda: loop.run_until_complete(add_many()), rounds=50, iterations=1
        )

    def test_jsonmodel_with_embedded_add_many(self, benchmark, redis_models):
        """Save multiple JsonModels with embedded documents using add()."""
        ComplexJsonModel = redis_models["ComplexJsonModel"]
        EmbeddedAddress = redis_models["EmbeddedAddress"]
        loop = redis_models["loop"]

        async def add_many():
            models = []
            for i in range(10):
                address = EmbeddedAddress(
                    street=f"{i} Main St", city=f"City{i}", zip_code=f"{10000 + i}"
                )
                model = ComplexJsonModel(
                    name=f"User{i}",
                    email=f"user{i}@example.com",
                    age=20 + i,
                    address=address,
                    tags=["tag1", "tag2"],
                )
                models.append(model)
            await ComplexJsonModel.add(models)
            return models

        benchmark.pedantic(
            lambda: loop.run_until_complete(add_many()), rounds=50, iterations=1
        )
