from typing import Annotated
from uuid import UUID

from pydantic import dataclasses
from sqlalchemy import BINARY, String
from sqlalchemy.orm import DeclarativeBase, MappedAsDataclass, mapped_column, registry
from uuid_utils import uuid7


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
