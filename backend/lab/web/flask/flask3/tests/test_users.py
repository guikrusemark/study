"""Tests for User API endpoints."""
from typing import Any, Dict

from flask.testing import FlaskClient


def test_create_user(client: FlaskClient) -> None:
    """Test creating a user."""
    data: Dict[str, str] = {
        "username": "testuser",
        "email": "test@example.com"
    }
    
    response: Any = client.post('/api/users', json=data)
    assert response.status_code == 201
    
    json_data: Dict[str, Any] = response.get_json()
    assert json_data["username"] == "testuser"
    assert json_data["email"] == "test@example.com"
    assert "id" in json_data
    assert "created_at" in json_data
    assert "updated_at" in json_data


def test_create_user_duplicate_username(client: FlaskClient) -> None:
    """Test creating a user with duplicate username."""
    data: Dict[str, str] = {
        "username": "testuser",
        "email": "test1@example.com"
    }
    client.post('/api/users', json=data)
    
    data2: Dict[str, str] = {
        "username": "testuser",
        "email": "test2@example.com"
    }
    response: Any = client.post('/api/users', json=data2)
    assert response.status_code == 400
    assert "Username already exists" in response.get_json()["error"]


def test_create_user_duplicate_email(client: FlaskClient) -> None:
    """Test creating a user with duplicate email."""
    data: Dict[str, str] = {
        "username": "testuser1",
        "email": "test@example.com"
    }
    client.post('/api/users', json=data)
    
    data2: Dict[str, str] = {
        "username": "testuser2",
        "email": "test@example.com"
    }
    response: Any = client.post('/api/users', json=data2)
    assert response.status_code == 400
    assert "Email already exists" in response.get_json()["error"]


def test_get_user(client: FlaskClient) -> None:
    """Test getting a user by ID."""
    data: Dict[str, str] = {
        "username": "testuser",
        "email": "test@example.com"
    }
    create_response: Any = client.post('/api/users', json=data)
    user_id: int = create_response.get_json()["id"]
    
    response: Any = client.get(f'/api/users/{user_id}')
    assert response.status_code == 200
    
    json_data: Dict[str, Any] = response.get_json()
    assert json_data["id"] == user_id
    assert json_data["username"] == "testuser"


def test_get_user_not_found(client: FlaskClient) -> None:
    """Test getting a non-existent user."""
    response: Any = client.get('/api/users/999')
    assert response.status_code == 404


def test_get_all_users(client: FlaskClient) -> None:
    """Test getting all users."""
    data1: Dict[str, str] = {
        "username": "user1",
        "email": "user1@example.com"
    }
    data2: Dict[str, str] = {
        "username": "user2",
        "email": "user2@example.com"
    }
    
    client.post('/api/users', json=data1)
    client.post('/api/users', json=data2)
    
    response: Any = client.get('/api/users')
    assert response.status_code == 200
    
    users: list[Dict[str, Any]] = response.get_json()
    assert len(users) == 2
    assert users[0]["username"] == "user1"
    assert users[1]["username"] == "user2"


def test_update_user(client: FlaskClient) -> None:
    """Test updating a user."""
    data: Dict[str, str] = {
        "username": "testuser",
        "email": "test@example.com"
    }
    create_response: Any = client.post('/api/users', json=data)
    user_id: int = create_response.get_json()["id"]
    
    update_data: Dict[str, str] = {
        "username": "updateduser"
    }
    response: Any = client.put(f'/api/users/{user_id}', json=update_data)
    assert response.status_code == 200
    
    json_data: Dict[str, Any] = response.get_json()
    assert json_data["username"] == "updateduser"
    assert json_data["email"] == "test@example.com"


def test_update_user_not_found(client: FlaskClient) -> None:
    """Test updating a non-existent user."""
    update_data: Dict[str, str] = {
        "username": "updateduser"
    }
    response: Any = client.put('/api/users/999', json=update_data)
    assert response.status_code == 404


def test_delete_user(client: FlaskClient) -> None:
    """Test deleting a user."""
    data: Dict[str, str] = {
        "username": "testuser",
        "email": "test@example.com"
    }
    create_response: Any = client.post('/api/users', json=data)
    user_id: int = create_response.get_json()["id"]
    
    response: Any = client.delete(f'/api/users/{user_id}')
    assert response.status_code == 200
    
    # Verify user is deleted
    get_response: Any = client.get(f'/api/users/{user_id}')
    assert get_response.status_code == 404


def test_delete_user_not_found(client: FlaskClient) -> None:
    """Test deleting a non-existent user."""
    response: Any = client.delete('/api/users/999')
    assert response.status_code == 404


def test_create_user_invalid_data(client: FlaskClient) -> None:
    """Test creating a user with invalid data."""
    data: Dict[str, str] = {
        "username": "ab",  # Too short
        "email": "invalid-email"
    }
    
    response: Any = client.post('/api/users', json=data)
    assert response.status_code == 400
    assert "Validation error" in response.get_json()["error"]
