"""Contains shared logic for the tests package."""
import pytest
from fastapi.testclient import TestClient
from app.main import app


@pytest.fixture(scope='module')
def test_app():
    """Fixture to provide a FastAPI TestClient for testing routes."""
    client = TestClient(app)
    yield client
