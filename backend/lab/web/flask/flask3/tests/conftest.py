"""Pytest configuration and fixtures."""

from typing import Generator, Any

import pytest
from flask import Flask
from flask.testing import FlaskClient

from src.app import create_app
from src.models import db


@pytest.fixture
def app() -> Generator[Flask, None, None]:
    """Create application for testing.

    Yields:
        Flask application configured for testing.
    """
    app: Flask = create_app("testing")

    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()


@pytest.fixture
def client(app: Flask) -> FlaskClient:
    """Create test client.

    Args:
        app: Flask application.

    Returns:
        Flask test client.
    """
    return app.test_client()


@pytest.fixture
def runner(app: Flask) -> Any:
    """Create test CLI runner.

    Args:
        app: Flask application.

    Returns:
        Flask CLI test runner.
    """
    return app.test_cli_runner()
