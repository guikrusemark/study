from datetime import datetime
from typing import (
    Any,
    Dict,
    List,
    Optional,
)

from fastapi import HTTPException, status
from pymongo import ReturnDocument

from app.core.mongodb import get_collection  # type: ignore
from app.model.person import Person

COLLECTION_NAME = "persons"


async def create_person(person_data: Dict[str, Any]) -> Person:
    """
    Create a new person in MongoDB.

    Args:
        person_data (Dict[str, Any]): A dictionary containing the data for the new person.

    Returns:
        Person: The created Person object.

    Raises:
        HTTPException: If the person could not be created in the database.
    """
    """Create a new person in MongoDB."""
    collection = get_collection(COLLECTION_NAME)  # type: ignore

    # Create a Person model to validate data
    person = Person(**person_data)
    person_dict = person.to_dict()

    # Insert the document into MongoDB
    result = collection.insert_one(person_dict)  # type: ignore

    # Verify insertion was successful
    if not result.acknowledged:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create person",
        )

    return person


async def get_person(person_id: str) -> Optional[Person]:
    """Get a person by ID."""
    collection = get_collection(COLLECTION_NAME)  # type: ignore
    person_dict = collection.find_one({"id": person_id})  # type: ignore

    if not person_dict:
        return None

    return Person.from_mongo(person_dict)  # type: ignore


async def get_persons(skip: int = 0, limit: int = 100) -> List[Person]:
    """Get a list of persons with pagination."""
    collection = get_collection(COLLECTION_NAME)  # type: ignore
    cursor = collection.find({}).skip(skip).limit(limit)  # type: ignore

    persons = []
    for doc in cursor:  # type: ignore
        persons.append(Person.from_mongo(doc))  # type: ignore

    return persons  # type: ignore


async def update_person(
    person_id: str, person_data: Dict[str, Any]
) -> Optional[Person]:
    """Update a person by ID."""
    collection = get_collection(COLLECTION_NAME)  # type: ignore

    # Update the 'updated_at' field
    person_data["updated_at"] = datetime.now()

    # Update the document in MongoDB
    updated_doc = collection.find_one_and_update(  # type: ignore
        {"id": person_id}, {"$set": person_data}, return_document=ReturnDocument.AFTER
    )

    if not updated_doc:
        return None

    return Person.from_mongo(updated_doc)  # type: ignore


async def delete_person(person_id: str) -> bool:
    """Delete a person by ID."""
    collection = get_collection(COLLECTION_NAME)  # type: ignore
    result = collection.delete_one({"id": person_id})

    # Return True if a document was deleted, False otherwise
    return result.deleted_count > 0


async def search_persons(
    query: Dict[str, Any], skip: int = 0, limit: int = 100
) -> List[Person]:
    """Search for persons based on query parameters."""
    collection = get_collection(COLLECTION_NAME)  # type: ignore
    cursor = collection.find(query).skip(skip).limit(limit)  # type: ignore

    persons = []
    for doc in cursor:  # type: ignore
        persons.append(Person.from_mongo(doc))  # type: ignore

    return persons  # type: ignore
