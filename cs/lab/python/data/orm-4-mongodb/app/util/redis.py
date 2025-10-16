# app/util/redis.py
import os
import json
from redis.asyncio import Redis
from typing import Any, Optional

# Initialize Redis client using environment variables or defaults
REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
REDIS_DB = int(os.getenv("REDIS_DB", 0))

redis_client = Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB)


async def set_cache(key: str, data: Any, expire: Optional[int] = None):
    """Cache data under the given key. Data can be any JSON-serializable object. Optionally set an expiration time in seconds."""
    try:
        json_data = json.dumps(data)
        # If expire is provided, use setex; otherwise just set
        if expire is not None:
            await redis_client.setex(key, expire, json_data)
        else:
            await redis_client.set(key, json_data)
    except Exception as e:
        raise e


async def get_cache(key: str) -> Any | None:
    """Retrieve cached data for the given key. Returns the deserialized JSON object or None if key doesn't exist or error occurs."""
    try:
        cached = await redis_client.get(key)
        if cached is None:
            return None
        data = json.loads(cached.decode("utf-8"))
        return data
    except Exception as e:
        raise e


async def clear_cache(key: str) -> int:
    """Clear the cache for the given key. Returns the number of keys that were removed."""
    try:
        return int(await redis_client.delete(key))
    except Exception as e:
        raise e
