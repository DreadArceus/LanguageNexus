def test_ping_pong(test_app):
    response = test_app.get("/ping")
    assert response.status_code == 200
    assert response.json() == {"result": "pong"}
