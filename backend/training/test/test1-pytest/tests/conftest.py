import pytest
from typing import Iterator, Dict, Any
from pathlib import Path


# Example of a fixture for setting up a database connection
@pytest.fixture(scope="session")
def db_connection() -> Iterator[str]:
    # Replace with actual database connection setup
    connection = "Database connection established"
    yield connection
    # Replace with actual teardown logic
    print("Closing database connection")


# Example of a fixture for providing test data
@pytest.fixture
def sample_data() -> Dict[str, Any]:
    return {"key": "value", "number": 42}


# Example of a fixture for temporary file handling
@pytest.fixture
def temp_file(tmp_path: Path) -> Path:
    file = tmp_path / "temp_file.txt"
    file.write_text("Temporary file content")
    return file


# Example of a fixture for mocking environment variables
@pytest.fixture
def mock_env(monkeypatch: pytest.MonkeyPatch) -> Iterator[None]:
    monkeypatch.setenv("TEST_ENV_VAR", "mock_value")
    yield
    monkeypatch.delenv("TEST_ENV_VAR", raising=False)


# Example of a fixture for capturing logs
@pytest.fixture
def capture_logs(caplog: pytest.LogCaptureFixture) -> pytest.LogCaptureFixture:
    caplog.set_level("INFO")
    return caplog
