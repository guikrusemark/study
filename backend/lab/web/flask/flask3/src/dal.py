"""Data Access Layer for database operations."""
from typing import Optional, List, Type, TypeVar, Generic

from sqlalchemy import select

from src.models import db, User, Person
from src.schemas import (
    UserCreate, UserUpdate, UserResponse,
    PersonCreate, PersonUpdate, PersonResponse
)
from src.cache import RedisCache

ModelType = TypeVar('ModelType', User, Person)
CreateSchemaType = TypeVar('CreateSchemaType', UserCreate, PersonCreate)
UpdateSchemaType = TypeVar('UpdateSchemaType', UserUpdate, PersonUpdate)
ResponseSchemaType = TypeVar('ResponseSchemaType', UserResponse, PersonResponse)


class BaseDAL(Generic[ModelType, CreateSchemaType, UpdateSchemaType, ResponseSchemaType]):
    """Base Data Access Layer."""
    
    def __init__(
        self,
        model: Type[ModelType],
        cache: RedisCache[ResponseSchemaType],
        cache_prefix: str
    ) -> None:
        """Initialize DAL.
        
        Args:
            model: SQLAlchemy model class.
            cache: Redis cache instance.
            cache_prefix: Prefix for cache keys.
        """
        self.model: Type[ModelType] = model
        self.cache: RedisCache[ResponseSchemaType] = cache
        self.cache_prefix: str = cache_prefix
    
    def _get_cache_key(self, id: int) -> str:
        """Generate cache key for single item.
        
        Args:
            id: Item ID.
            
        Returns:
            Cache key string.
        """
        return f"{self.cache_prefix}:{id}"
    
    def _get_list_cache_key(self) -> str:
        """Generate cache key for list of items.
        
        Returns:
            Cache key string.
        """
        return f"{self.cache_prefix}:all"
    
    def create(self, data: CreateSchemaType, response_model: Type[ResponseSchemaType]) -> ResponseSchemaType:
        """Create a new record.
        
        Args:
            data: Create schema with data.
            response_model: Response schema class.
            
        Returns:
            Created item as response schema.
        """
        obj: ModelType = self.model(**data.model_dump())
        db.session.add(obj)
        db.session.commit()
        db.session.refresh(obj)
        
        # Invalidate list cache
        self.cache.delete(self._get_list_cache_key())
        
        response: ResponseSchemaType = response_model.model_validate(obj)
        self.cache.set(self._get_cache_key(response.id), response)
        
        return response
    
    def get_by_id(self, id: int, response_model: Type[ResponseSchemaType]) -> Optional[ResponseSchemaType]:
        """Get record by ID.
        
        Args:
            id: Record ID.
            response_model: Response schema class.
            
        Returns:
            Record as response schema or None if not found.
        """
        # Try cache first
        cached: Optional[ResponseSchemaType] = self.cache.get(
            self._get_cache_key(id),
            response_model
        )
        if cached is not None:
            return cached
        
        # Query database
        obj: Optional[ModelType] = db.session.get(self.model, id)
        if obj is None:
            return None
        
        response: ResponseSchemaType = response_model.model_validate(obj)
        self.cache.set(self._get_cache_key(id), response)
        
        return response
    
    def get_all(self, response_model: Type[ResponseSchemaType]) -> List[ResponseSchemaType]:
        """Get all records.
        
        Args:
            response_model: Response schema class.
            
        Returns:
            List of all records as response schemas.
        """
        # Try cache first
        cached: Optional[List[ResponseSchemaType]] = self.cache.get_list(
            self._get_list_cache_key(),
            response_model
        )
        if cached is not None:
            return cached
        
        # Query database
        stmt = select(self.model)
        objs: List[ModelType] = list(db.session.execute(stmt).scalars().all())
        
        responses: List[ResponseSchemaType] = [
            response_model.model_validate(obj) for obj in objs
        ]
        self.cache.set_list(self._get_list_cache_key(), responses)
        
        return responses
    
    def update(
        self,
        id: int,
        data: UpdateSchemaType,
        response_model: Type[ResponseSchemaType]
    ) -> Optional[ResponseSchemaType]:
        """Update a record.
        
        Args:
            id: Record ID.
            data: Update schema with data.
            response_model: Response schema class.
            
        Returns:
            Updated record as response schema or None if not found.
        """
        obj: Optional[ModelType] = db.session.get(self.model, id)
        if obj is None:
            return None
        
        update_data: dict[str, Optional[str | int]] = data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(obj, key, value)
        
        db.session.commit()
        db.session.refresh(obj)
        
        # Invalidate caches
        self.cache.delete(self._get_cache_key(id))
        self.cache.delete(self._get_list_cache_key())
        
        response: ResponseSchemaType = response_model.model_validate(obj)
        self.cache.set(self._get_cache_key(id), response)
        
        return response
    
    def delete(self, id: int) -> bool:
        """Delete a record.
        
        Args:
            id: Record ID.
            
        Returns:
            True if deleted, False if not found.
        """
        obj: Optional[ModelType] = db.session.get(self.model, id)
        if obj is None:
            return False
        
        db.session.delete(obj)
        db.session.commit()
        
        # Invalidate caches
        self.cache.delete(self._get_cache_key(id))
        self.cache.delete(self._get_list_cache_key())
        
        return True


class UserDAL(BaseDAL[User, UserCreate, UserUpdate, UserResponse]):
    """Data Access Layer for Users."""
    
    def __init__(self, cache: RedisCache[UserResponse]) -> None:
        """Initialize User DAL.
        
        Args:
            cache: Redis cache instance.
        """
        super().__init__(User, cache, "user")
    
    def get_by_username(self, username: str) -> Optional[UserResponse]:
        """Get user by username.
        
        Args:
            username: Username to search for.
            
        Returns:
            User as response schema or None if not found.
        """
        stmt = select(User).where(User.username == username)
        obj: Optional[User] = db.session.execute(stmt).scalar_one_or_none()
        
        if obj is None:
            return None
        
        return UserResponse.model_validate(obj)
    
    def get_by_email(self, email: str) -> Optional[UserResponse]:
        """Get user by email.
        
        Args:
            email: Email to search for.
            
        Returns:
            User as response schema or None if not found.
        """
        stmt = select(User).where(User.email == email)
        obj: Optional[User] = db.session.execute(stmt).scalar_one_or_none()
        
        if obj is None:
            return None
        
        return UserResponse.model_validate(obj)


class PersonDAL(BaseDAL[Person, PersonCreate, PersonUpdate, PersonResponse]):
    """Data Access Layer for Persons."""
    
    def __init__(self, cache: RedisCache[PersonResponse]) -> None:
        """Initialize Person DAL.
        
        Args:
            cache: Redis cache instance.
        """
        super().__init__(Person, cache, "person")
    
    def search_by_name(self, first_name: Optional[str] = None, last_name: Optional[str] = None) -> List[PersonResponse]:
        """Search persons by name.
        
        Args:
            first_name: First name to search for (optional).
            last_name: Last name to search for (optional).
            
        Returns:
            List of matching persons as response schemas.
        """
        stmt = select(Person)
        
        if first_name is not None:
            stmt = stmt.where(Person.first_name.ilike(f"%{first_name}%"))
        
        if last_name is not None:
            stmt = stmt.where(Person.last_name.ilike(f"%{last_name}%"))
        
        objs: List[Person] = list(db.session.execute(stmt).scalars().all())
        
        return [PersonResponse.model_validate(obj) for obj in objs]
