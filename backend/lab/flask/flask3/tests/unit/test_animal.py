# tests/unit/test_animal.py

"""Integration tests for Animal routes."""

# ruff: noqa: D103

from datetime import UTC, datetime
from typing import Any

from flask.testing import FlaskClient


def test_create_animal_returns_201_and_location(
    client: FlaskClient,
    animal_dal_mock: Any,
):
    # Arrange: mock DAL return
    now = datetime.now(UTC)
    animal_dal_mock.create.return_value = {
        "id": 1,
        "name": "Bolt",
        "species": "dog",
        "owner_id": 10,
        "created_at": now.isoformat(),
        "updated_at": now.isoformat(),
    }

    # Act
    resp = client.post(
        "/api/animals",
        json={
            "name": "Bolt",
            "species": "dog",
            "owner_id": 10,
        },
    )

    # Assert
    assert resp.status_code == 201
    assert resp.headers.get("Location") == "/api/animals/1"

    body = resp.get_json()
    assert (
        body["id"] == 1 and body["name"] == "Bolt" and body["species"] == "dog"
    )


def test_get_animal_returns_404_when_missing(
    client: FlaskClient,
    animal_dal_mock: Any,
):
    # Arrange: mock DAL return
    animal_dal_mock.get_by_id.return_value = None

    # Act
    resp = client.get("/api/animals/999")

    # Assert
    assert resp.status_code == 404


def test_delete_animal_returns_200_when_exists(
    client: FlaskClient,
    animal_dal_mock: Any,
):
    # Arrange: mock DAL return
    animal_dal_mock.delete.return_value = True

    # Act
    resp = client.delete("/api/animals/1")

    # Assert
    assert resp.status_code == 200


def test_delete_animal_returns_404_when_not_found(
    client: FlaskClient,
    animal_dal_mock: Any,
):
    # Arrange: mock DAL return
    animal_dal_mock.delete.return_value = False

    # Act
    resp = client.delete("/api/animals/999")

    # Assert
    assert resp.status_code == 404


def test_update_animal_returns_200_with_body(
    client: FlaskClient,
    animal_dal_mock: Any,
):
    # Arrange: mock DAL return
    payload: dict[str, str | int] = {
        "name": "Max",
        "species": "dog",
        "owner_id": 10,
    }
    now = datetime.now(UTC)
    animal_dal_mock.update.return_value = {
        "id": 1,
        "name": "Max",
        "species": "dog",
        "owner_id": 10,
        "created_at": now.isoformat(),
        "updated_at": now.isoformat(),
    }

    # Act
    resp = client.put(
        "/api/animals/1",
        json=payload,
    )

    # Assert
    assert resp.status_code == 200

    body = resp.get_json()
    assert (
        body["id"] == 1 and body["name"] == "Max" and body["species"] == "dog"
    )
