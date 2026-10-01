"""Normalize RediSearch replies across redis-py 6/7 (RESP2 lists) and 8 (dicts)."""

from typing import Any, Dict, Iterable, List, Mapping, Sequence, Tuple


def to_string(value: Any) -> Any:
    if isinstance(value, bytes):
        return value.decode(errors="ignore")
    return value


def string_keyed(value: Any) -> Dict[str, Any]:
    """Copy a Redis map to string keys.

    redis-py 8 returns RESP3 maps with ``bytes`` keys when
    ``decode_responses`` is false.
    """
    if not isinstance(value, Mapping):
        return {}
    return {str(to_string(key)): item for key, item in value.items()}


def pairs_to_dict(pairs: Sequence[Any]) -> Dict[str, Any]:
    return dict(
        zip(
            map(to_string, pairs[::2]),
            map(to_string, pairs[1::2]),
        )
    )


def search_total(res: Any) -> int:
    """Return the match count from an FT.SEARCH reply."""
    if isinstance(res, Mapping):
        return int(string_keyed(res).get("total_results") or 0)
    if not res:
        return 0
    return int(res[0])


def search_document_keys(res: Any) -> List[str]:
    """Return document ids from an FT.SEARCH reply that includes content.

    RESP2 list replies look like ``[count, key, fields, ...]``.
    redis-py 8 dict replies look like
    ``{"results": [{"id": key, ...}], ...}``.
    """
    if isinstance(res, Mapping):
        keys: List[str] = []
        for item in string_keyed(res).get("results") or []:
            if not isinstance(item, Mapping):
                continue
            key = to_string(string_keyed(item).get("id"))
            if isinstance(key, str) and key:
                keys.append(key)
        return keys
    if not res:
        return []
    keys = []
    for index in range(1, len(res), 2):
        key = to_string(res[index])
        if isinstance(key, str) and key:
            keys.append(key)
    return keys


def search_documents(res: Any) -> List[Dict[str, Any]]:
    """Return per-document field maps from an FT.SEARCH reply.

    RESP2 list replies look like ``[count, key, [field, value, ...], ...]``.
    redis-py 8 dict replies look like
    ``{"total_results": N, "results": [{"extra_attributes": {...}}, ...]}``.
    """
    if isinstance(res, Mapping):
        docs: List[Dict[str, Any]] = []
        for item in string_keyed(res).get("results") or []:
            if not isinstance(item, Mapping):
                continue
            fields = string_keyed(item).get("extra_attributes")
            # Missing or null payloads match the RESP2 parser, which skips them.
            if not isinstance(fields, Mapping):
                continue
            docs.append({to_string(key): to_string(val) for key, val in fields.items()})
        return docs

    docs = []
    if not res:
        return docs
    for i in range(1, len(res), 2):
        payload_index = i + 1
        if payload_index >= len(res):
            break
        payload = res[payload_index]
        if payload is None:
            continue
        if isinstance(payload, (str, bytes)):
            # NOCONTENT replies are [count, key, key, ...].
            break
        docs.append(pairs_to_dict(payload))
    return docs


def index_info_as_dict(index_info: Any) -> Dict[str, Any]:
    """Return FT.INFO as a string-keyed dict."""
    if isinstance(index_info, Mapping):
        return string_keyed(index_info)
    info: Dict[str, Any] = {}
    if not index_info:
        return info
    for i in range(0, len(index_info), 2):
        if i + 1 >= len(index_info):
            break
        info[str(to_string(index_info[i]))] = index_info[i + 1]
    return info


def _attribute_name_and_type(attr: Any) -> Tuple[Any, Any]:
    if isinstance(attr, Mapping):
        parsed = string_keyed(attr)
        name = parsed.get("attribute") or parsed.get("identifier")
        return to_string(name), to_string(parsed.get("type"))
    if isinstance(attr, Sequence) and not isinstance(attr, (str, bytes)):
        if attr and str(to_string(attr[0])) in {"identifier", "attribute"}:
            parsed = pairs_to_dict(attr)
            name = parsed.get("attribute") or parsed.get("identifier")
            return to_string(name), to_string(parsed.get("type"))
        if len(attr) >= 3:
            return to_string(attr[0]), to_string(attr[2])
    return None, None


def index_field_schema(index_info: Any) -> Dict[str, Dict[str, Any]]:
    """Map field name -> {type, raw_attr} from FT.INFO."""
    info = index_info_as_dict(index_info)
    schema: Dict[str, Dict[str, Any]] = {}
    attributes: Iterable[Any] = info.get("attributes") or []
    for attr in attributes:
        name, field_type = _attribute_name_and_type(attr)
        if not name:
            continue
        schema[str(name)] = {"type": field_type, "raw_attr": attr}
    return schema
