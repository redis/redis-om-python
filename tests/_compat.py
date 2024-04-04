from aredis_om._compat import PYDANTIC_V2, use_pydantic_2_plus


if not use_pydantic_2_plus() and PYDANTIC_V2:
    from pydantic.v1 import EmailStr, ValidationError
elif PYDANTIC_V2:
    from pydantic import EmailStr, PositiveInt, ValidationError

else:
    from pydantic import EmailStr, ValidationError
