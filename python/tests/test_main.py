"""Test cases for app/main."""


def test_ping_pong(test_app):
    """Test the GET /ping route."""
    response = test_app.get("/ping")
    assert response.status_code == 200
    assert response.json() == {"result": "pong"}
