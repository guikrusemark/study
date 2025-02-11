from typing import List
from uuid import uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.config.db import Base, str_sm, uuid_fk, uuid_pk


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid_pk] = mapped_column(
        default_factory=uuid4,
        init=False,
    )
    name: Mapped[str_sm]
    id_role: Mapped[uuid_fk] = mapped_column(
        ForeignKey("user_roles.id"),
    )
    role: Mapped["UserRole"] = relationship(
        back_populates="users",
        repr=False,
        init=False,
    )
    fullname: Mapped[str | None] = mapped_column(
        default=None,
    )
    money: Mapped[float] = mapped_column(
        default=0,
    )
    n_of_accounts: Mapped[int] = mapped_column(
        default=0,
    )
    is_active: Mapped[bool] = mapped_column(
        default=True,
    )


# class UserCreate(TypedDict):
#     name: str
#     id_role: UUID
#     fullname: str | None
#     money: float
#     n_of_accounts: int
#     is_active: bool


class UserRole(Base):
    __tablename__ = "user_roles"

    id: Mapped[uuid_pk] = mapped_column(
        default_factory=uuid4,
        init=False,
    )
    role_name: Mapped[str_sm] = mapped_column(
        unique=True,
    )

    users: Mapped[List["User"] | None] = relationship(
        back_populates="role",
        repr=False,
        default=None,
    )
