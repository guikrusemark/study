import os

from fastapi import FastAPI, HTTPException, status, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.config.db import get_db
from app.model.user import User
from app.util.redis import get_cache, set_cache

ENV = os.getenv("ENV", "production").lower()
IS_DEV_ENV = ENV == "development"

app = FastAPI(debug=IS_DEV_ENV)


@app.get("/", response_model=list[User])
async def read_users(db: Session = Depends(get_db)):
    try:
        data_list = await get_cache("users")
        if data_list is None:
            users = db.scalars(select(User)).all()
            await set_cache("users", [user.to_dict() for user in users])
        else:
            users = [User(**user) for user in data_list]  # type: ignore

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )

    if not users:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No users found",
        )

    return users
