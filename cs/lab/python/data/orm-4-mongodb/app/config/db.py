import os
from typing import Annotated
from uuid import UUID

from pydantic import dataclasses
from sqlalchemy import BINARY, String, create_engine
from sqlalchemy.orm import (
    DeclarativeBase,
    MappedAsDataclass,
    mapped_column,
    registry,
    sessionmaker,
)
from uuid_utils import uuid7

ENV = os.getenv("ENV", "production").lower()
IS_DEV_ENV = ENV == "development"
DB_URI = os.getenv("DB_URI", "sqlite:///db.sqlite")

engine = create_engine(
    url=DB_URI,
    echo=IS_DEV_ENV,
    connect_args={"check_same_thread": False},  # Needed for SQLite
)
# Base.metadata.create_all(engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def b_uuid7() -> bytes:
    return uuid7().bytes


def str_uuid(b: bytes) -> UUID:
    return UUID(bytes=b)


str_sm = Annotated[str, 50]
uuid_pk = Annotated[
    bytes,
    mapped_column(
        primary_key=True,
        init=False,
        default_factory=b_uuid7,
        type_=BINARY(16),
    ),
]
uuid_fk = Annotated[bytes, mapped_column(type_=BINARY(16))]


class Base(
    DeclarativeBase,
    MappedAsDataclass,
    dataclass_callable=dataclasses.dataclass,
):
    registry = registry(
        type_annotation_map={
            str_sm: String(50),
            str: String(255),
            uuid_pk: BINARY(16),
            uuid_fk: BINARY(16),
        },
    )

    ...
