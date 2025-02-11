import os

from sqlalchemy import (
    create_engine,
    select,
)
from sqlalchemy.orm import Session

# from app.config.db import Base
from app.model.user import (
    User,
    UserRole,
)

engine = create_engine(
    os.environ["DB_URI"],
    echo=False,
)
# Base.metadata.create_all(engine)


def test():
    with Session(engine) as session:
        user_role: UserRole = session.scalars(
            select(UserRole).filter(UserRole.role_name == "user")
        ).one()

        user = User(
            name="Foo2",
            id_role=user_role.id,
        )

        session.add(user)
        # session.add_all(users)
        session.commit()

        # users = session.scalars(select(User).filter(User.name == "Foo2")).all()
        users = session.scalars(select(User)).all()
        print(users)


if __name__ == "__main__":
    test()
