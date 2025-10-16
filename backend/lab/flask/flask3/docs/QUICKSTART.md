# Flask3 - Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### 1. Prerequisites

- **Python 3.12+** installed
- **Redis server** (optional for caching - app will work without it)

### 2. Install Dependencies

```bash
uv sync
```

### 3. Start the Server

```bash
uv run python run.py
```

Server will be available at: `http://localhost:5000`

### 4. Run Tests

```bash
uv run pytest -v
```

### 5. Try Example Usage

In a new terminal (with server running):

```bash
uv run python example_usage.py
```

## 📚 API Overview

### Users Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | List all users |
| GET | `/api/users/{id}` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/{id}` | Update user |
| DELETE | `/api/users/{id}` | Delete user |

**User Model:**
```json
{
  "username": "string (3-80 chars)",
  "email": "valid email"
}
```

### Persons Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/persons` | List all persons |
| GET | `/api/persons?first_name=X` | Search by first name |
| GET | `/api/persons?last_name=Y` | Search by last name |
| GET | `/api/persons/{id}` | Get person by ID |
| POST | `/api/persons` | Create new person |
| PUT | `/api/persons/{id}` | Update person |
| DELETE | `/api/persons/{id}` | Delete person |

**Person Model:**
```json
{
  "first_name": "string (required)",
  "last_name": "string (required)",
  "age": "integer 0-150 (optional)",
  "email": "valid email (optional)",
  "phone": "string max 20 chars (optional)"
}
```

## 🧪 Quick Test with curl

### Create a User
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "email": "test@example.com"}'
```

### Create a Person
```bash
curl -X POST http://localhost:5000/api/persons \
  -H "Content-Type: application/json" \
  -d '{"first_name": "John", "last_name": "Doe", "age": 30}'
```

### Get All Users
```bash
curl http://localhost:5000/api/users
```

### Get All Persons
```bash
curl http://localhost:5000/api/persons
```

### Search Persons
```bash
curl "http://localhost:5000/api/persons?first_name=John"
```

## 🏗️ Project Structure

```
flask3/
├── src/
│   ├── app.py          # Application factory
│   ├── config.py       # Configuration (DB, Redis, etc.)
│   ├── models.py       # SQLAlchemy models
│   ├── schemas.py      # Pydantic validation schemas
│   ├── dal.py          # Data Access Layer with caching
│   ├── cache.py        # Redis cache implementation
│   └── routes.py       # API routes/endpoints
├── tests/
│   ├── conftest.py     # Pytest fixtures
│   ├── test_app.py     # Application tests
│   ├── test_users.py   # User endpoint tests
│   └── test_persons.py # Person endpoint tests
├── run.py              # Development server script
├── example_usage.py    # API usage examples
└── README.md           # Full documentation
```

## 🎯 Key Features

✅ **Fully Typed** - Every function, parameter, and return value is type-annotated  
✅ **Pydantic Validation** - Automatic request/response validation  
✅ **SQLAlchemy ORM** - Type-safe database operations  
✅ **Redis Caching** - Automatic caching with TTL  
✅ **Comprehensive Tests** - 28 tests with 100% pass rate  
✅ **CRUD Operations** - Complete Create, Read, Update, Delete  
✅ **Search Functionality** - Query by name fields  
✅ **Data Access Layer** - Clean separation of concerns  

## 🔧 Configuration

Edit `src/config.py` to configure:

- Database URI (default: SQLite)
- Redis connection (host, port, db)
- Cache TTL (default: 5 minutes)
- Environment-specific settings

## 📝 Development Tips

### Type Checking
```bash
uv run mypy src/
```

### Test Coverage
```bash
uv run pytest --cov=src --cov-report=html
open htmlcov/index.html
```

### Run Specific Tests
```bash
uv run pytest tests/test_users.py -v
uv run pytest tests/test_persons.py::test_create_person -v
```

## 🐛 Troubleshooting

### Redis Connection Error
If Redis is not installed/running, the app will still work but without caching. To install Redis:

**Ubuntu/Debian:**
```bash
sudo apt-get install redis-server
sudo systemctl start redis
```

**macOS:**
```bash
brew install redis
brew services start redis
```

**Or use Docker:**
```bash
docker run -d -p 6379:6379 redis:alpine
```

### Port Already in Use
If port 5000 is busy, edit `run.py` and change the port number:
```python
app.run(debug=True, host="0.0.0.0", port=8000)
```

## 📖 Learn More

See [README.md](README.md) for complete documentation including:
- Detailed architecture
- Caching strategy
- API examples
- Data models
- Configuration options

## 🤝 Next Steps

1. Explore the code in `src/` directory
2. Run the tests to understand behavior
3. Modify `src/models.py` to add fields
4. Update `src/schemas.py` for validation
5. Extend `src/routes.py` with new endpoints
6. Add more tests in `tests/` directory

Happy coding! 🎉
