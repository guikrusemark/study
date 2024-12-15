from sqlalchemy import (
    create_engine,
    select,
)
from sqlalchemy.orm import Session

# from app.config.db import Base
from app.model.user import (
    User,
    # UserRole,
)

engine = create_engine(
    "mysql+pymysql://root:REMOVED@localhost/test_orm",
    echo=False,
)
# Base.metadata.create_all(engine)


def test():
    with Session(engine) as session:
        # role = UserRole(
        #     role_name="user",
        # )
        # session.add(role)
        # role = session.scalars(
        #     select(UserRole).filter(UserRole.role_name == "user")
        # ).one()

        # user = User(
        #     name="Foo",
        #     id_role=role.id,
        # )

        user = session.scalars(select(User).filter(User.name == "Foo")).one_or_none()

        # session.add_all([user])
        # session.commit()

        print(user)
        # print(role)


if __name__ == "__main__":
    test()
