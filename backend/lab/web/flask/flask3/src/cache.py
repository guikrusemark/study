"""Redis cache implementation."""

import json
from typing import Optional, Any, TypeVar, Generic

import redis
from pydantic import BaseModel

from src.config import Config

T = TypeVar("T", bound=BaseModel)


class RedisCache(Generic[T]):
    """Redis cache wrapper with Pydantic support."""

    def __init__(self, host: str, port: int, db: int, ttl: int) -> None:
        """Initialize Redis cache.

        Args:
            host: Redis host.
            port: Redis port.
            db: Redis database number.
            ttl: Time to live for cache entries in seconds.
        """
        self.client: redis.Redis[bytes] = redis.Redis(
            host=host, port=port, db=db, decode_responses=False
        )
        self.ttl: int = ttl

    def get(self, key: str, model_class: type[T]) -> Optional[T]:
        """Get value from cache.

        Args:
            key: Cache key.
            model_class: Pydantic model class for deserialization.

        Returns:
            Cached value or None if not found.
        """
        value: Optional[bytes] = self.client.get(key)
        if value is None:
            return None

        try:
            data: dict[str, Any] = json.loads(value.decode("utf-8"))
            return model_class.model_validate(data)
        except (json.JSONDecodeError, ValueError):
            return None

    def get_list(self, key: str, model_class: type[T]) -> Optional[list[T]]:
        """Get list of values from cache.

        Args:
            key: Cache key.
            model_class: Pydantic model class for deserialization.

        Returns:
            List of cached values or None if not found.
        """
        value: Optional[bytes] = self.client.get(key)
        if value is None:
            return None

        try:
            data: list[dict[str, Any]] = json.loads(value.decode("utf-8"))
            return [model_class.model_validate(item) for item in data]
        except (json.JSONDecodeError, ValueError):
            return None

    def set(self, key: str, value: BaseModel, ttl: Optional[int] = None) -> bool:
        """Set value in cache.

        Args:
            key: Cache key.
            value: Pydantic model instance to cache.
            ttl: Time to live in seconds (uses default if not provided).

        Returns:
            True if successful, False otherwise.
        """
        ttl_value: int = ttl if ttl is not None else self.ttl
        json_str: str = value.model_dump_json()
        return bool(self.client.setex(key, ttl_value, json_str))

    def set_list(
        self, key: str, values: list[BaseModel] | list[T], ttl: Optional[int] = None
    ) -> bool:
        """Set list of values in cache.

        Args:
            key: Cache key.
            values: List of Pydantic model instances to cache.
            ttl: Time to live in seconds (uses default if not provided).

        Returns:
            True if successful, False otherwise.
        """
        ttl_value: int = ttl if ttl is not None else self.ttl
        data: list[dict[str, Any]] = [item.model_dump(mode="json") for item in values]
        json_str: str = json.dumps(data)
        return bool(self.client.setex(key, ttl_value, json_str))

    def delete(self, key: str) -> int:
        """Delete value from cache.

        Args:
            key: Cache key.

        Returns:
            Number of keys deleted.
        """
        return int(self.client.delete(key))

    def delete_pattern(self, pattern: str) -> int:
        """Delete all keys matching pattern.

        Args:
            pattern: Key pattern (e.g., "user:*").

        Returns:
            Number of keys deleted.
        """
        keys: list[bytes] = list(self.client.keys(pattern))
        if not keys:
            return 0
        return int(self.client.delete(*keys))

    def clear_all(self) -> bool:
        """Clear all cache entries.

        Returns:
            True if successful.
        """
        self.client.flushdb()
        return True


def create_cache(config: Config) -> RedisCache[Any]:
    """Create Redis cache instance from config.

    Args:
        config: Application configuration.

    Returns:
        Configured Redis cache instance.
    """
    return RedisCache(
        host=config.REDIS_HOST,
        port=config.REDIS_PORT,
        db=config.REDIS_DB,
        ttl=config.CACHE_TTL,
    )
