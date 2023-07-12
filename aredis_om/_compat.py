from pydantic.version import VERSION as PYDANTIC_VERSION


PYDANTIC_V2 = PYDANTIC_VERSION.startswith("2.")

if PYDANTIC_V2:
    from pydantic.v1 import BaseModel, validator
    from pydantic.v1.fields import FieldInfo, ModelField, Undefined, UndefinedType
    from pydantic.v1.json import ENCODERS_BY_TYPE
    from pydantic.v1.main import ModelMetaclass, validate_model
    from pydantic.v1.typing import NoArgAnyCallable
    from pydantic.v1.utils import Representation
else:
    from pydantic import BaseModel, validator
    from pydantic.fields import FieldInfo, ModelField, Undefined, UndefinedType
    from pydantic.json import ENCODERS_BY_TYPE
    from pydantic.main import ModelMetaclass, validate_model
    from pydantic.typing import NoArgAnyCallable
    from pydantic.utils import Representation
