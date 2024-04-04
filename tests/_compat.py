from aredis_om._compat import use_pydantic_2_plus, PYDANTIC_V2

if not use_pydantic_2_plus() and PYDANTIC_V2:
    from pydantic.v1 import ValidationError, EmailStr
elif PYDANTIC_V2:
    from pydantic import ValidationError
    from pydantic import EmailStr, PositiveInt

else:
    from pydantic import EmailStr, ValidationError
