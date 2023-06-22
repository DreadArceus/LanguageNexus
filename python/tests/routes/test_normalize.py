"""Test cases for the /normalize route."""


def test_normalize(test_app):
    """Tests the POST /normalize route."""

    # Test normalizing valid data
    for data in [[10, 20, 30, 40, 50], [10.5, 20.5, 30.5, 40.5, 50.5]]:
        response = test_app.post("/normalize", json={"data": data})
        assert response.status_code == 200
        assert response.json() == {"normalizedData": [0, 0.25, 0.5, 0.75, 1]}

    # Test with one unique element
    response = test_app.post("/normalize", json={"data": [7, 7, 7]})
    assert response.status_code == 200
    assert response.json() == {"normalizedData": [0, 0, 0]}

    # Test with an empty array
    response = test_app.post("/normalize", json={"data": []})
    assert response.status_code == 200
    assert response.json() == {"normalizedData": []}

    # Test with invalid data
    for data in [[10, 20, "30", 40, 50], "yeah"]:
        response = test_app.post("/normalize", json={"data": data})
        assert response.status_code == 422
