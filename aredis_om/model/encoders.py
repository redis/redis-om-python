"""
This file adapted from FastAPI's encoders.

Licensed under the MIT License (MIT).

Copyright (c) 2018 Sebastián Ramírez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
"""

import dataclasses
from collections import defaultdict
from enum import Enum
from pathlib import PurePath
from types import GeneratorType
from typing import Any, Callable, Dict, List, Optional, Set, Tuple, Union

from pydantic import BaseModel
from pydantic.deprecated.json import ENCODERS_BY_TYPE
from pydantic_core import PydanticUndefined


SetIntStr = Set[Union[int, str]]
DictIntStrAny = Dict[Union[int, str], Any]


def generate_encoders_by_class_tuples(
    type_encoder_map: Dict[Any, Callable[[Any], Any]]
) -> Dict[Callable[[Any], Any], Tuple[Any, ...]]:
    encoders_by_class_tuples: Dict[Callable[[Any], Any], Tuple[Any, ...]] = defaultdict(
        tuple
    )
    for type_, encoder in type_encoder_map.items():
        encoders_by_class_tuples[encoder] += (type_,)
    return encoders_by_class_tuples


encoders_by_class_tuples = generate_encoders_by_class_tuples(ENCODERS_BY_TYPE)


def jsonable_encoder(
    obj: Any,
    include: Optional[Union[SetIntStr, DictIntStrAny]] = None,
    exclude: Optional[Union[SetIntStr, DictIntStrAny]] = None,
    by_alias: bool = True,
    exclude_unset: bool = False,
    exclude_defaults: bool = False,
    exclude_none: bool = False,
    custom_encoder: Dict[Any, Callable[[Any], Any]] = {},
    sqlalchemy_safe: bool = True,
) -> Any:
    if include is not None and not isinstance(include, (set, dict)):
        include = set(include)
    if exclude is not None and not isinstance(exclude, (set, dict)):
        exclude = set(exclude)

    if isinstance(obj, BaseModel) and hasattr(obj, "__config__"):
        encoder = getattr(obj.__config__, "json_encoders", {})
        if custom_encoder:
            encoder.update(custom_encoder)
        obj_dict = obj.model_dump(
            include=include,  # type: ignore # in Pydantic
            exclude=exclude,  # type: ignore # in Pydantic
            by_alias=by_alias,
            exclude_unset=exclude_unset,
            exclude_none=exclude_none,
            exclude_defaults=exclude_defaults,
        )
        if "__root__" in obj_dict:
            obj_dict = obj_dict["__root__"]
        return jsonable_encoder(
            obj_dict,
            exclude_none=exclude_none,
            exclude_defaults=exclude_defaults,
            custom_encoder=encoder,
            sqlalchemy_safe=sqlalchemy_safe,
        )
    if dataclasses.is_dataclass(obj):
        return dataclasses.asdict(obj)  # type: ignore
    if isinstance(obj, Enum):
        return obj.value
    if isinstance(obj, PurePath):
        return str(obj)
    if isinstance(obj, (str, int, float, type(None))):
        return obj
    if isinstance(obj, dict):
        encoded_dict = {}
        for key, value in obj.items():
            if (
                (
                    not sqlalchemy_safe
                    or (not isinstance(key, str))
                    or (not key.startswith("_sa"))
                )
                and value is not PydanticUndefined
                and (value is not None or not exclude_none)
                and ((include and key in include) or not exclude or key not in exclude)
            ):
                encoded_key = jsonable_encoder(
                    key,
                    by_alias=by_alias,
                    exclude_unset=exclude_unset,
                    exclude_none=exclude_none,
                    custom_encoder=custom_encoder,
                    sqlalchemy_safe=sqlalchemy_safe,
                )
                encoded_value = jsonable_encoder(
                    value,
                    by_alias=by_alias,
                    exclude_unset=exclude_unset,
                    exclude_none=exclude_none,
                    custom_encoder=custom_encoder,
                    sqlalchemy_safe=sqlalchemy_safe,
                )
                encoded_dict[encoded_key] = encoded_value
        return encoded_dict
    if isinstance(obj, (list, set, frozenset, GeneratorType, tuple)):
        encoded_list = []
        for item in obj:
            encoded_list.append(
                jsonable_encoder(
                    item,
                    include=include,
                    exclude=exclude,
                    by_alias=by_alias,
                    exclude_unset=exclude_unset,
                    exclude_defaults=exclude_defaults,
                    exclude_none=exclude_none,
                    custom_encoder=custom_encoder,
                    sqlalchemy_safe=sqlalchemy_safe,
                )
            )
        return encoded_list

    if custom_encoder:
        if type(obj) in custom_encoder:
            return custom_encoder[type(obj)](obj)
        else:
            for encoder_type, encoder in custom_encoder.items():
                if isinstance(obj, encoder_type):
                    return encoder(obj)

    if type(obj) in ENCODERS_BY_TYPE:
        return ENCODERS_BY_TYPE[type(obj)](obj)
    for encoder, classes_tuple in encoders_by_class_tuples.items():
        if isinstance(obj, classes_tuple):
            return encoder(obj)

    errors: List[Exception] = []
    try:
        data = dict(obj)
    except Exception as e:
        errors.append(e)
        try:
            data = vars(obj)
        except Exception as e:
            errors.append(e)
            raise ValueError(errors)
    return jsonable_encoder(
        data,
        by_alias=by_alias,
        exclude_unset=exclude_unset,
        exclude_defaults=exclude_defaults,
        exclude_none=exclude_none,
        custom_encoder=custom_encoder,
        sqlalchemy_safe=sqlalchemy_safe,
    )
