import os
from typing import Any, Sequence

from fastapi import FastAPI, HTTPException, status
from sqlalchemy import (
    create_engine,
    select,
)
from sqlalchemy.orm import Session

from app.model.user import User

ENV = os.getenv("ENV", "production").lower()
IS_DEV_ENV = ENV == "development"
DB_URI = os.getenv("DB_URI", "sqlite:///db.sqlite")

engine = create_engine(
    url=DB_URI,
    echo=IS_DEV_ENV,
)
app = FastAPI(debug=IS_DEV_ENV)


@app.get("/")
async def read_users() -> dict[str, Any]:
    with Session(engine) as session:
        users: Sequence[User] = session.scalars(select(User)).all()

        if not users:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="No users found"
            )

        return {
            "msg": "Success!",
            "users": [user.to_dict() for user in users],
        }
