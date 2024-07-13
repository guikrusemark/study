from config.db import Base

from typing import Optional

from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    fullname: Mapped[Optional[str]] = mapped_column(String(255))

    @property
    def __repr__(self):
        return f"<User(name={self.name}{f', fullname={self.fullname}' if self.fullname else ''})>"