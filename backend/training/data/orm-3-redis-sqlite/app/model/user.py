from typing import Any, List

from fastapi import HTTPException, status
from sqlalchemy import ForeignKey, select
from sqlalchemy.orm import Mapped, mapped_column, relationship, Session

from app.config.db import Base, b_uuid7, str_sm, str_uuid, uuid_fk, uuid_pk


class User(Base):
    __tablename__ = "users"

    name: Mapped[str_sm]
    id_role: Mapped[uuid_fk] = mapped_column(
        ForeignKey("user_roles.id"),
    )
    id: Mapped[uuid_pk] = mapped_column(
        default_factory=b_uuid7,
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

    role: Mapped["UserRole"] = relationship(
        back_populates="users",
        init=False,
    )

    def to_dict(self) -> dict[str, Any]:
        return {
            "name": self.name,
            "id_role": str(str_uuid(self.id_role)),
            "id": str(str_uuid(self.id)),
            "fullname": self.fullname,
            "money": self.money,
            "n_of_accounts": self.n_of_accounts,
            "is_active": self.is_active,
        }


class UserRole(Base):
    __tablename__ = "user_roles"

    role_name: Mapped[str_sm] = mapped_column(
        unique=True,
    )
    id: Mapped[uuid_pk] = mapped_column(
        default_factory=b_uuid7,
    )

    users: Mapped[List["User"] | None] = relationship(
        back_populates="role",
        repr=False,
        default_factory=list,
    )


def add_user(db: Session, _name: str, _role_name: str):
    role = db.scalars(select(UserRole).where(UserRole.role_name == _role_name)).first()
    if not role:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Role not found"
        )
    db.add(User(name=_name, id_role=role.id))
    db.commit()


def get_users(db: Session):
    return db.scalars(select(User))


def add_role(db: Session, _role_name: str):
    db.add(UserRole(role_name=_role_name))
    db.commit()


def get_roles(db: Session):
    return db.scalars(select(UserRole))
