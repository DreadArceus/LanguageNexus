"""Module for testing app/main."""


def test_ping_pong(test_app):
    """Function for testing GET /ping."""
    response = test_app.get("/ping")
    assert response.status_code == 200
    assert response.json() == {"result": "pong"}
