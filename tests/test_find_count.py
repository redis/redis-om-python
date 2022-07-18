import datetime
from typing import Optional

from pydantic import EmailStr

from aredis_om import Field, HashModel, Migrator


class Customer(HashModel):
    first_name: str
    last_name: str = Field(index=True)
    email: EmailStr
    join_date: datetime.date
    age: int = Field(index=True)
    bio: Optional[str]


andrew = Customer(
    first_name="Andrew",
    last_name="Brookins",
    email="andrew.brookins@example.com",
    join_date=datetime.date.today(),
    age=38,
)

await Migrator().run()

await Customer.find().delete()

andy = await andrew.save()

customers = await Customer.find(Customer.last_name == "Brookins").all()
assert len(customers) == 1

await Migrator().run()

customers_count = await Customer.find().count()
assert customers_count == 1

brookins_count = await Customer.find(Customer.last_name == "Brookins").count()
assert brookins_count == 1
