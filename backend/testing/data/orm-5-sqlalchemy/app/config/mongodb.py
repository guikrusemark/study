import os

from pymongo import MongoClient
from pymongo.collection import Collection
from pymongo.database import Database

# MongoDB connection settings from environment variables with defaults
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "fastapi_db")

# Create a MongoDB client
client = MongoClient(MONGO_URI)  # type: ignore
db = client[MONGO_DB_NAME]  # type: ignore


def get_collection(collection_name: str) -> Collection:  # type: ignore
    """Get a MongoDB collection by name."""
    return db[collection_name]  # type: ignore


def get_db() -> Database:  # type: ignore
    """Get the MongoDB database instance."""
    try:
        yield db  # type: ignore
    finally:
        # No explicit close needed for PyMongo's client in this context
        pass
