import asyncio

from app.crud.person import create_person, get_persons
from app.model.person import Person


async def create():
    person = Person(
        first_name="Maria",
        email="maria@gmail.com",
    )

    await create_person(person.to_dict())

    await create_person(
        {
            "first_name": "John",
            "email": "john@gmail.com",
        }
    )


async def main():
    persons = await get_persons()

    for person in persons:
        print(person.to_dict())


if __name__ == "__main__":
    asyncio.run(main())
