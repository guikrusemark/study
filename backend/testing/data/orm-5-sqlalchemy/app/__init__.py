import os
from typing import Dict, List

from fastapi import (
    Body,
    Depends,
    FastAPI,
    HTTPException,
    Path,
    Query,
    status,
)
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.crud.person import (
    create_person,
    delete_person,
    get_person,
    get_persons,
    update_person,
)
from app.model.person import Person
from app.model.user import User
from app.util.redis import get_cache, set_cache

ENV = os.getenv("ENV", "production").lower()
IS_DEV_ENV = ENV == "development"

app = FastAPI(debug=IS_DEV_ENV)


@app.get("/")
async def root():
    return {"msg": "It works!"}


@app.get("/users/", response_model=list[User])
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


# MongoDB Person endpoints


@app.post("/persons/", response_model=Person, status_code=status.HTTP_201_CREATED)
async def create_new_person(person: Person = Body(...)):
    """Create a new person in MongoDB"""
    try:
        result = await create_person(person.to_dict())
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create person: {str(e)}",
        )


@app.get("/persons/", response_model=List[Person])
async def read_persons(
    skip: int = Query(0, ge=0), limit: int = Query(100, ge=1, le=1000)
):
    """Get a list of all persons with pagination"""
    try:
        # Try to get persons from cache first
        cache_key = f"persons:skip={skip}:limit={limit}"
        cached_persons = await get_cache(cache_key)

        if cached_persons is None:
            persons = await get_persons(skip, limit)
            # Cache the results for future requests
            await set_cache(
                cache_key, [person.to_dict() for person in persons], expire=300
            )  # Cache for 5 minutes
        else:
            persons = [Person.from_mongo(person) for person in cached_persons]

        return persons
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve persons: {str(e)}",
        )


@app.get("/persons/{person_id}", response_model=Person)
async def read_person(
    person_id: str = Path(..., title="The ID of the person to retrieve"),
):
    """
    Get a person by ID

    This endpoint retrieves a person by their ID. It first attempts to fetch the person
    from the cache. If the person is not found in the cache, it retrieves the person
    from the database and caches the result for future requests.

    Args:
        person_id (str): The ID of the person to retrieve.

    Returns:
        Person: The person object if found.

    Raises:
        HTTPException: If the person is not found (404) or if there is an internal server error (500).
    """
    try:
        # Try to get from cache first
        cache_key = f"person:{person_id}"
        cached_person = await get_cache(cache_key)

        if cached_person is None:
            person = await get_person(person_id)
            if person is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Person with ID {person_id} not found",
                )
            # Cache the result for future requests
            await set_cache(
                cache_key, person.to_dict(), expire=300
            )  # Cache for 5 minutes
        else:
            person = Person.from_mongo(cached_person)

        return person
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve person: {str(e)}",
        )


@app.put("/persons/{person_id}", response_model=Person)
async def update_existing_person(
    person_id: str = Path(..., title="The ID of the person to update"),
    person_data: Dict = Body(...),  # type: ignore
):
    """Update a person by ID"""
    try:
        updated_person = await update_person(person_id, person_data)  # type: ignore
        if not updated_person:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Person with ID {person_id} not found",
            )

        # Update the cache
        cache_key = f"person:{person_id}"
        await set_cache(cache_key, updated_person.to_dict(), expire=300)

        return updated_person
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update person: {str(e)}",
        )


@app.delete("/persons/{person_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_existing_person(
    person_id: str = Path(..., title="The ID of the person to delete"),
):
    """Delete a person by ID"""
    try:
        deleted = await delete_person(person_id)
        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Person with ID {person_id} not found",
            )

        # Clear the cache for this person
        cache_key = f"person:{person_id}"
        await get_cache(cache_key)

        return None
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete person: {str(e)}",
        )
