# Flask3 - Flask API with SQLAlchemy, Pydantic, and Redis

A fully typed Flask REST API application with CRUD operations for Users and Persons, featuring SQLAlchemy ORM, Pydantic validation, Redis caching, and comprehensive pytest test coverage.

## Features

- ✅ **Fully Typed**: All functions, variables, and returns are typed
- 🔄 **CRUD Operations**: Complete Create, Read, Update, Delete for Users and Persons
- 📦 **SQLAlchemy**: Database ORM with migrations support
- ✨ **Pydantic**: Data validation and serialization
- 🚀 **Redis Cache**: Caching layer for improved performance
- 🧪 **Pytest**: Comprehensive test suite
- 📦 **UV**: Fast Python package manager

## Project Structure

```
flask3/
├── src/
│   ├── app.py          # Application factory
│   ├── config.py       # Configuration settings
│   ├── models.py       # SQLAlchemy models
│   ├── schemas.py      # Pydantic schemas
│   ├── dal.py          # Data Access Layer
│   ├── cache.py        # Redis cache implementation
│   └── routes.py       # API routes
├── tests/
│   ├── conftest.py     # Pytest fixtures
│   ├── test_app.py     # Application tests
│   ├── test_users.py   # User endpoint tests
│   └── test_persons.py # Person endpoint tests
├── pyproject.toml      # Project dependencies
└── README.md
```

## Installation

### Prerequisites

- Python 3.12+
- Redis server running on localhost:6379

### Setup

1. Install dependencies:
```bash
uv sync
```

2. Start Redis (if not already running):
```bash
redis-server
```

## Running the Application

### Development Mode

```bash
# Option 1: Using the run script
uv run python run.py

# Option 2: Direct module execution
uv run python -m src.app
```

The API will be available at `http://localhost:5000`

### Running Example Usage

In a separate terminal (with the server running):

```bash
uv run python example_usage.py
```

This will demonstrate all CRUD operations and search functionality.

### Testing

Run all tests:
```bash
uv run pytest
```

Run tests with coverage:
```bash
uv run pytest --cov=src --cov-report=html
```

Run specific test file:
```bash
uv run pytest tests/test_users.py
```

## API Endpoints

### Root & Health

- `GET /` - Root endpoint
- `GET /health` - Health check

### Users

- `GET /api/users` - Get all users
- `GET /api/users/<id>` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/<id>` - Update user
- `DELETE /api/users/<id>` - Delete user

### Persons

- `GET /api/persons` - Get all persons
- `GET /api/persons?first_name=John` - Search by first name
- `GET /api/persons?last_name=Doe` - Search by last name
- `GET /api/persons/<id>` - Get person by ID
- `POST /api/persons` - Create new person
- `PUT /api/persons/<id>` - Update person
- `DELETE /api/persons/<id>` - Delete person

## API Examples

### Create User

```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com"
  }'
```

### Create Person

```bash
curl -X POST http://localhost:5000/api/persons \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "age": 30,
    "email": "john@example.com",
    "phone": "1234567890"
  }'
```

### Get All Users

```bash
curl http://localhost:5000/api/users
```

### Update Person

```bash
curl -X PUT http://localhost:5000/api/persons/1 \
  -H "Content-Type: application/json" \
  -d '{
    "age": 31
  }'
```

### Delete User

```bash
curl -X DELETE http://localhost:5000/api/users/1
```

## Data Models

### User

- `id`: Integer (Primary Key)
- `username`: String (Unique, 3-80 chars)
- `email`: Email (Unique)
- `created_at`: DateTime
- `updated_at`: DateTime

### Person

- `id`: Integer (Primary Key)
- `first_name`: String (1-50 chars)
- `last_name`: String (1-50 chars)
- `age`: Integer (Optional, 0-150)
- `email`: Email (Optional)
- `phone`: String (Optional, max 20 chars)
- `created_at`: DateTime
- `updated_at`: DateTime

## Architecture

### Data Access Layer (DAL)

The DAL provides a clean abstraction over database operations with integrated Redis caching:

- Generic base class for common CRUD operations
- Automatic cache invalidation on updates/deletes
- Type-safe with generics
- Specialized methods for specific models (e.g., search by username)

### Caching Strategy

- Single items cached with key: `{prefix}:{id}`
- Lists cached with key: `{prefix}:all`
- Default TTL: 5 minutes (configurable)
- Automatic cache invalidation on modifications

## Configuration

Edit `src/config.py` to customize:

- Database URI
- Redis connection settings
- Cache TTL
- Environment-specific configs (development, testing, production)

## License

MIT
