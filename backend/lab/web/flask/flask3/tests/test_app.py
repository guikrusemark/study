"""Tests for Flask application."""
from typing import Any, Dict

from flask import Flask
from flask.testing import FlaskClient


def test_app_exists(app: Flask) -> None:
    """Test that app exists."""
    assert app is not None


def test_app_is_testing(app: Flask) -> None:
    """Test that app is in testing mode."""
    assert app.config["TESTING"]


def test_index_route(client: FlaskClient) -> None:
    """Test index route."""
    response: Any = client.get('/')
    assert response.status_code == 200
    
    json_data: Dict[str, str] = response.get_json()
    assert "message" in json_data


def test_health_route(client: FlaskClient) -> None:
    """Test health check route."""
    response: Any = client.get('/health')
    assert response.status_code == 200
    
    json_data: Dict[str, str] = response.get_json()
    assert json_data["status"] == "healthy"
