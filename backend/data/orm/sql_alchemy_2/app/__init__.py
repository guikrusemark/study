import os
from typing import Any, Sequence

from fastapi import FastAPI, HTTPException
from sqlalchemy import (
    create_engine,
    select,
)
from sqlalchemy.orm import Session

from app.model.user import User

engine = create_engine(
    os.getenv("DB_URI", "sqlite:///db.sqlite"),
    echo=False,
)

app = FastAPI()


@app.get("/")
async def read_users() -> dict[str, Any]:
    with Session(engine) as session:
        users: Sequence[User] = session.scalars(select(User)).all()

        if not users:
            raise HTTPException(status_code=404, detail="No users found")

        return {
            "msg": "Success!",
            "users": [user.to_dict() for user in users],
        }
