"""
RedisVL integration for Redis OM.

This module provides utilities to convert Redis OM models to RedisVL schemas,
enabling advanced vector search capabilities through RedisVL.

Example:
    from redis_om import JsonModel, Field, VectorFieldOptions
    from aredis_om.redisvl import to_redisvl_schema, get_redisvl_index

    class Document(JsonModel, index=True):
        title: str = Field(index=True)
        embedding: list[float] = Field(
            vector_options=VectorFieldOptions.flat(
                type=VectorFieldOptions.TYPE.FLOAT32,
                dimension=384,
                distance_metric=VectorFieldOptions.DISTANCE_METRIC.COSINE,
            )
        )

    # Get a RedisVL IndexSchema for advanced operations
    schema = to_redisvl_schema(Document)

    # Or get a ready-to-use SearchIndex
    index = get_redisvl_index(Document)
    results = await index.query(VectorQuery(...))
"""

from typing import Any, Dict, List, Optional, Type, Union

from redisvl.index import AsyncSearchIndex, SearchIndex
from redisvl.schema import IndexSchema

from .model.model import (
    FieldInfo,
    JsonModel,
    RedisModel,
    VectorFieldOptions,
    get_outer_type,
    is_numeric_type,
    is_supported_container_type,
    should_index_field,
)


def _get_field_type(
    field_name: str,
    field_type: Any,
    field_info: FieldInfo,
    is_json: bool,
) -> Optional[Dict[str, Any]]:
    """Convert an OM field to a RedisVL field definition."""
    if not should_index_field(field_info):
        return None

    vector_options: Optional[VectorFieldOptions] = getattr(
        field_info, "vector_options", None
    )
    sortable = getattr(field_info, "sortable", False) is True
    full_text_search = getattr(field_info, "full_text_search", False) is True
    case_sensitive = getattr(field_info, "case_sensitive", False) is True

    # Vector field
    if vector_options:
        attrs = {
            "dims": vector_options.dimension,
            "distance_metric": vector_options.distance_metric.name.lower(),
            "algorithm": vector_options.algorithm.name.lower(),
            "datatype": vector_options.type.name.lower(),
        }
        if vector_options.initial_cap:
            attrs["initial_cap"] = vector_options.initial_cap
        is_flat = vector_options.algorithm.name == "FLAT"
        if is_flat and vector_options.block_size:
            attrs["block_size"] = vector_options.block_size
        if vector_options.algorithm.name == "HNSW":
            if vector_options.m:
                attrs["m"] = vector_options.m
            if vector_options.ef_construction:
                attrs["ef_construction"] = vector_options.ef_construction
            if vector_options.ef_runtime:
                attrs["ef_runtime"] = vector_options.ef_runtime
            if vector_options.epsilon:
                attrs["epsilon"] = vector_options.epsilon
        return {"name": field_name, "type": "vector", "attrs": attrs}

    # Numeric field
    if is_numeric_type(field_type):
        attrs = {"sortable": sortable}
        return {"name": field_name, "type": "numeric", "attrs": attrs}

    # Boolean - stored as TAG
    if field_type is bool:
        return {"name": field_name, "type": "tag"}

    # String field
    if isinstance(field_type, type) and issubclass(field_type, str):
        if full_text_search:
            attrs = {"sortable": sortable}
            return {"name": field_name, "type": "text", "attrs": attrs}
        else:
            attrs = {"sortable": sortable, "case_sensitive": case_sensitive}
            return {"name": field_name, "type": "tag", "attrs": attrs}

    # List of strings -> TAG
    if is_supported_container_type(field_type):
        from typing import get_args

        inner_types = get_args(field_type)
        if inner_types and inner_types[0] is str:
            attrs = {"sortable": sortable}
            return {"name": field_name, "type": "tag", "attrs": attrs}

    # Default to tag for unknown types
    return {"name": field_name, "type": "tag"}


def to_redisvl_schema(model_cls: Type[RedisModel]) -> "IndexSchema":
    """
    Convert a Redis OM model to a RedisVL IndexSchema.

    This allows you to use RedisVL's advanced query capabilities with your
    Redis OM models, including:
    - VectorQuery with hybrid policies (BATCHES, ADHOC_BF)
    - VectorRangeQuery for epsilon-based searches
    - Advanced filter expressions
    - EF_RUNTIME tuning for HNSW indexes

    Args:
        model_cls: A HashModel or JsonModel class with index=True

    Returns:
        A RedisVL IndexSchema that can be used with SearchIndex

    Raises:
        ValueError: If the model is not indexed

    Example:
        schema = to_redisvl_schema(MyModel)
        index = SearchIndex(schema=schema, redis_client=redis)
        results = await index.query(VectorQuery(...))
    """
    # Check if model is indexed
    # model_config is a dict in Pydantic v2
    model_config = getattr(model_cls, "model_config", {})
    if isinstance(model_config, dict):
        is_indexed = model_config.get("index", False)
    else:
        is_indexed = False
    if not is_indexed:
        raise ValueError(
            f"Model {model_cls.__name__} is not indexed. "
            "Use 'class MyModel(JsonModel, index=True):' to enable indexing."
        )

    # Determine storage type
    is_json = issubclass(model_cls, JsonModel)
    storage_type = "json" if is_json else "hash"

    # Get index name and prefix
    index_name = model_cls.Meta.index_name
    key_prefix = model_cls.make_key("")

    # Build field definitions
    fields: List[Dict[str, Any]] = []

    for name, field in model_cls.model_fields.items():
        field_type = get_outer_type(field)
        if field_type is None:
            continue

        # Get FieldInfo (may be wrapped in metadata)
        if (
            not isinstance(field, FieldInfo)
            and hasattr(field, "metadata")
            and len(field.metadata) > 0
            and isinstance(field.metadata[0], FieldInfo)
        ):
            field_info = field.metadata[0]
        elif isinstance(field, FieldInfo):
            field_info = field
        else:
            continue

        field_def = _get_field_type(name, field_type, field_info, is_json)
        if field_def:
            fields.append(field_def)

    # Build schema dict
    schema_dict = {
        "index": {
            "name": index_name,
            "prefix": key_prefix,
            "storage_type": storage_type,
        },
        "fields": fields,
    }

    return IndexSchema.from_dict(schema_dict)


def get_redisvl_index(
    model_cls: Type[RedisModel],
    async_client: bool = True,
) -> Union["AsyncSearchIndex", "SearchIndex"]:
    """
    Get a RedisVL SearchIndex for a Redis OM model.

    This provides a ready-to-use SearchIndex connected to the model's
    Redis database, enabling advanced vector search operations.

    Args:
        model_cls: A HashModel or JsonModel class with index=True
        async_client: If True (default), return AsyncSearchIndex.
                     If False, return sync SearchIndex.

    Returns:
        A RedisVL SearchIndex (async or sync) connected to Redis

    Raises:
        ValueError: If the model is not indexed

    Example:
        index = get_redisvl_index(MyModel)
        results = await index.query(VectorQuery(
            vector=query_embedding,
            vector_field_name="embedding",
            num_results=10,
        ))
    """
    schema = to_redisvl_schema(model_cls)
    redis_client = model_cls.db()

    if async_client:
        return AsyncSearchIndex(schema=schema, redis_client=redis_client)
    else:
        return SearchIndex(schema=schema, redis_client=redis_client)
