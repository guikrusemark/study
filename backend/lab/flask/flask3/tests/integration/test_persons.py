"""Tests for Person API endpoints."""

from typing import Any, Dict

from flask.testing import FlaskClient


def test_create_person(client: FlaskClient) -> None:
    """Test creating a person."""
    data: Dict[str, Any] = {
        "first_name": "John",
        "last_name": "Doe",
        "age": 30,
        "email": "john.doe@example.com",
        "phone": "1234567890",
    }

    response: Any = client.post("/api/persons", json=data)
    assert response.status_code == 201

    json_data: Dict[str, Any] = response.get_json()
    assert json_data["first_name"] == "John"
    assert json_data["last_name"] == "Doe"
    assert json_data["age"] == 30
    assert json_data["email"] == "john.doe@example.com"
    assert json_data["phone"] == "1234567890"
    assert "id" in json_data
    assert "created_at" in json_data
    assert "updated_at" in json_data


def test_create_person_minimal(client: FlaskClient) -> None:
    """Test creating a person with minimal data."""
    data: Dict[str, str] = {"first_name": "Jane", "last_name": "Smith"}

    response: Any = client.post("/api/persons", json=data)
    assert response.status_code == 201

    json_data: Dict[str, Any] = response.get_json()
    assert json_data["first_name"] == "Jane"
    assert json_data["last_name"] == "Smith"
    assert json_data["age"] is None
    assert json_data["email"] is None
    assert json_data["phone"] is None


def test_get_person(client: FlaskClient) -> None:
    """Test getting a person by ID."""
    data: Dict[str, str] = {"first_name": "John", "last_name": "Doe"}
    create_response: Any = client.post("/api/persons", json=data)
    person_id: int = create_response.get_json()["id"]

    response: Any = client.get(f"/api/persons/{person_id}")
    assert response.status_code == 200

    json_data: Dict[str, Any] = response.get_json()
    assert json_data["id"] == person_id
    assert json_data["first_name"] == "John"
    assert json_data["last_name"] == "Doe"


def test_get_person_not_found(client: FlaskClient) -> None:
    """Test getting a non-existent person."""
    response: Any = client.get("/api/persons/999")
    assert response.status_code == 404


def test_get_all_persons(client: FlaskClient) -> None:
    """Test getting all persons."""
    data1: Dict[str, str] = {"first_name": "John", "last_name": "Doe"}
    data2: Dict[str, str] = {"first_name": "Jane", "last_name": "Smith"}

    client.post("/api/persons", json=data1)
    client.post("/api/persons", json=data2)

    response: Any = client.get("/api/persons")
    assert response.status_code == 200

    persons: list[Dict[str, Any]] = response.get_json()
    assert len(persons) == 2


def test_search_persons_by_first_name(client: FlaskClient) -> None:
    """Test searching persons by first name."""
    data1: Dict[str, str] = {"first_name": "John", "last_name": "Doe"}
    data2: Dict[str, str] = {"first_name": "Jane", "last_name": "Smith"}
    data3: Dict[str, str] = {"first_name": "Johnny", "last_name": "Walker"}

    client.post("/api/persons", json=data1)
    client.post("/api/persons", json=data2)
    client.post("/api/persons", json=data3)

    response: Any = client.get("/api/persons?first_name=John")
    assert response.status_code == 200

    persons: list[Dict[str, Any]] = response.get_json()
    assert len(persons) == 2
    assert all("John" in p["first_name"] for p in persons)


def test_search_persons_by_last_name(client: FlaskClient) -> None:
    """Test searching persons by last name."""
    data1: Dict[str, str] = {"first_name": "John", "last_name": "Doe"}
    data2: Dict[str, str] = {"first_name": "Jane", "last_name": "Smith"}

    client.post("/api/persons", json=data1)
    client.post("/api/persons", json=data2)

    response: Any = client.get("/api/persons?last_name=Smith")
    assert response.status_code == 200

    persons: list[Dict[str, Any]] = response.get_json()
    assert len(persons) == 1
    assert persons[0]["last_name"] == "Smith"


def test_update_person(client: FlaskClient) -> None:
    """Test updating a person."""
    data: Dict[str, str] = {"first_name": "John", "last_name": "Doe"}
    create_response: Any = client.post("/api/persons", json=data)
    person_id: int = create_response.get_json()["id"]

    update_data: Dict[str, Any] = {"first_name": "Johnny", "age": 35}
    response: Any = client.put(f"/api/persons/{person_id}", json=update_data)
    assert response.status_code == 200

    json_data: Dict[str, Any] = response.get_json()
    assert json_data["first_name"] == "Johnny"
    assert json_data["last_name"] == "Doe"
    assert json_data["age"] == 35


def test_update_person_not_found(client: FlaskClient) -> None:
    """Test updating a non-existent person."""
    update_data: Dict[str, str] = {"first_name": "Updated"}
    response: Any = client.put("/api/persons/999", json=update_data)
    assert response.status_code == 404


def test_delete_person(client: FlaskClient) -> None:
    """Test deleting a person."""
    data: Dict[str, str] = {"first_name": "John", "last_name": "Doe"}
    create_response: Any = client.post("/api/persons", json=data)
    person_id: int = create_response.get_json()["id"]

    response: Any = client.delete(f"/api/persons/{person_id}")
    assert response.status_code == 200

    # Verify person is deleted
    get_response: Any = client.get(f"/api/persons/{person_id}")
    assert get_response.status_code == 404


def test_delete_person_not_found(client: FlaskClient) -> None:
    """Test deleting a non-existent person."""
    response: Any = client.delete("/api/persons/999")
    assert response.status_code == 404


def test_create_person_invalid_age(client: FlaskClient) -> None:
    """Test creating a person with invalid age."""
    data: Dict[str, Any] = {
        "first_name": "John",
        "last_name": "Doe",
        "age": 200,  # Too old
    }

    response: Any = client.post("/api/persons", json=data)
    assert response.status_code == 400
    assert "Validation error" in response.get_json()["error"]


def test_create_person_invalid_email(client: FlaskClient) -> None:
    """Test creating a person with invalid email."""
    data: Dict[str, Any] = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "invalid-email",
    }

    response: Any = client.post("/api/persons", json=data)
    assert response.status_code == 400
    assert "Validation error" in response.get_json()["error"]
