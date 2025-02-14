import os

from sqlalchemy import (
    create_engine,
    select,
)
from sqlalchemy.orm import Session

from app.config.db import Base
from app.model.user import (
    User,
    # UserRole,
)

engine = create_engine(
    os.getenv("DB_URI", "sqlite:///db.sqlite"),
    echo=False,
)


def create_db():
    Base.metadata.create_all(engine)


def test():
    with Session(engine) as session:
        # role = UserRole(
        #     role_name="user",
        # )
        # session.add(role)

        # user_role: UserRole = session.scalars(
        #     select(UserRole).filter(UserRole.role_name == "user")
        # ).one()

        # users = [
        #     User(name="Foo", id_role=user_role.id),
        #     User(name="Fou", id_role=user_role.id),
        # ]
        # session.add_all(users)

        # session.commit()

        # Retrieve and print all users
        users = session.scalars(select(User)).all()
        if not users:
            print("No users found.")
        else:
            for user in users:
                print(user)

    return users


if __name__ == "__main__":
    # create_db()
    test()
