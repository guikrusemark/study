from typing import Annotated
from uuid import UUID, uuid4

from pydantic import dataclasses
from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase, MappedAsDataclass, mapped_column, registry

str_sm = Annotated[str, 50]
uuid_pk = Annotated[
    UUID, mapped_column(primary_key=True, init=False, default_factory=uuid4)
]
uuid_fk = Annotated[UUID, mapped_column(default_factory=uuid4)]


class Base(
    DeclarativeBase,
    MappedAsDataclass,
    dataclass_callable=dataclasses.dataclass,
):
    registry = registry(
        type_annotation_map={
            str_sm: String(50),
            str: String(255),
            uuid_pk: String(36),
            uuid_fk: String(36),
        },
    )
