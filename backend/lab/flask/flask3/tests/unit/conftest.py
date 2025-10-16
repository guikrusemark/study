# tests/integration/conftest.py

"""Pytest conftest for integration tests."""

# ruff: noqa: D103

from typing import Any

import pytest
from flask import Flask


@pytest.fixture
def animal_dal_mock(mocker: Any) -> Any:
    # Shape we’ll use in assertions; adjust to your AnimalResponse later
    class A:
        def __init__(self, **kw: Any):
            self.__dict__.update(kw)

        def model_dump(self, *_, **__: Any):
            return self.__dict__  # mimic Pydantic

    dal = mocker.Mock()
    dal.response_cls = A  # optional, if you need it later
    return dal


@pytest.fixture
def app_routes_only(mocker: Any, animal_dal_mock: Any) -> Flask:
    # Import your real init_routes and mount only routes
    from src.routes import init_routes

    app = Flask("test-routes")
    # Pass stubs for user/person DALs you already use
    user_dal = mocker.Mock()
    person_dal = mocker.Mock()
    # IMPORTANT: make init_routes accept animal_dal as a 4th arg
    init_routes(
        app,
        user_dal,
        person_dal,
        animal_dal_mock,  # NOTE: 4th arg
    )
    app.testing = True
    return app


@pytest.fixture
def client(app_routes_only: Any) -> Any:
    return app_routes_only.test_client()
