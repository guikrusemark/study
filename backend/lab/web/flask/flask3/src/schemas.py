"""Pydantic schemas for validation and serialization."""
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field, ConfigDict


# User Schemas
class UserBase(BaseModel):
    """Base User schema."""
    
    username: str = Field(..., min_length=3, max_length=80)
    email: EmailStr


class UserCreate(UserBase):
    """Schema for creating a user."""
    pass


class UserUpdate(BaseModel):
    """Schema for updating a user."""
    
    username: Optional[str] = Field(None, min_length=3, max_length=80)
    email: Optional[EmailStr] = None


class UserResponse(UserBase):
    """Schema for user response."""
    
    id: int
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


# Person Schemas
class PersonBase(BaseModel):
    """Base Person schema."""
    
    first_name: str = Field(..., min_length=1, max_length=50)
    last_name: str = Field(..., min_length=1, max_length=50)
    age: Optional[int] = Field(None, ge=0, le=150)
    email: Optional[EmailStr] = None
    phone: Optional[str] = Field(None, max_length=20)


class PersonCreate(PersonBase):
    """Schema for creating a person."""
    pass


class PersonUpdate(BaseModel):
    """Schema for updating a person."""
    
    first_name: Optional[str] = Field(None, min_length=1, max_length=50)
    last_name: Optional[str] = Field(None, min_length=1, max_length=50)
    age: Optional[int] = Field(None, ge=0, le=150)
    email: Optional[EmailStr] = None
    phone: Optional[str] = Field(None, max_length=20)


class PersonResponse(PersonBase):
    """Schema for person response."""
    
    id: int
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
