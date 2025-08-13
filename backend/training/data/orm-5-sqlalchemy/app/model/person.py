from datetime import datetime
from typing import (
    Any,
    Dict,
    Optional,
)

from pydantic import BaseModel, Field
from uuid_utils import uuid7


class Address(BaseModel):
    street: str | None
    city: str | None
    state: str | None
    zip_code: str
    country: str = "BRA"


class Person(BaseModel):
    """
    Person model representing an individual with personal details.

    Attributes:
        id (str): Unique identifier for the person, generated using uuid7.
        first_name (str): First name of the person.
        last_name (str): Last name of the person.
        email (Optional[str]): Email address of the person. Defaults to None.
        birth_date (Optional[datetime]): Birth date of the person. Defaults to None.
        address (Optional[Address]): Address of the person. Defaults to None.
        phone_numbers (List[str]): List of phone numbers associated with the person. Defaults to an empty list.
        is_active (bool): Indicates if the person is active. Defaults to True.
        created_at (datetime): Timestamp when the person was created. Defaults to the current datetime.
        updated_at (datetime): Timestamp when the person was last updated. Defaults to the current datetime.

    Methods:
        to_dict() -> Dict[str, Any]:
            Convert the model to a dictionary suitable for MongoDB.
        from_mongo(data: Dict[str, Any]) -> "Person":
            Create a Person instance from MongoDB document.
    """

    id: str = Field(default_factory=lambda: str(uuid7()))
    first_name: str
    email: Optional[str] = None
    address: Optional[Address] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.now)

    class Config:
        populate_by_name = True
        json_schema_extra = {  # type: ignore
            "example": {
                "first_name": "John",
                "email": "john.doe@example.com",
                "birth_date": "1990-01-01T00:00:00",
                "address": {
                    "street": "123 Main St",
                    "city": "Anytown",
                    "state": "CA",
                    "zip_code": "12345",
                    "country": "USA",
                },
                "is_active": True,
            }
        }

    def to_dict(self) -> Dict[str, Any]:
        """Convert the model to a dictionary suitable for MongoDB."""
        return self.model_dump(by_alias=True)

    @classmethod
    def from_mongo(cls, data: Dict[str, Any]) -> "Person":
        """Create a Person instance from MongoDB document."""
        return cls(**data)
