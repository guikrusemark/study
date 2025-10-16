from typing import Any, List

from sqlalchemy import ForeignKey
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.config.db import Base, b_uuid7, str_sm, str_uuid, uuid_fk, uuid_pk


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid_pk] = mapped_column(
        default_factory=b_uuid7,
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

    def __repr__(self):
        return (
            f"User(id={str_uuid(self.id)}, name={self.name}, id_role={str_uuid(self.id_role)}, "
            f"fullname={self.fullname}, money={self.money}, n_of_accounts={self.n_of_accounts}, "
            f"is_active={self.is_active})"
        )

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": str_uuid(self.id),
            "name": self.name,
            "id_role": str_uuid(self.id_role),
            "fullname": self.fullname,
            "money": self.money,
            "n_of_accounts": self.n_of_accounts,
            "is_active": self.is_active,
        }


class UserRole(Base):
    __tablename__ = "user_roles"

    id: Mapped[uuid_pk] = mapped_column(
        default_factory=b_uuid7,
        init=False,
    )
    role_name: Mapped[str_sm] = mapped_column(
        unique=True,
    )

    users: Mapped[List["User"] | None] = relationship(
        back_populates="role",
        repr=False,
        default_factory=list,
    )

    def __repr__(self):
        return f"UserRole(id={str_uuid(self.id)}, role_name={self.role_name})"

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": str_uuid(self.id),
            "role_name": self.role_name,
        }
