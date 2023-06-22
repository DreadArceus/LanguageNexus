"""Test cases for app/constants."""
import os
import importlib
import pytest
import app.constants


@pytest.fixture(scope="function", name='_reset_env_vars')
def reset_env_vars():
    """Fixture for resetting the environment variables to their original state after each test"""
    original_python_env = os.getenv('PYTHON_ENV')
    original_port = os.getenv('PORT')

    yield

    if original_python_env is None:
        os.environ.pop('PYTHON_ENV', None)
    else:
        os.environ['PYTHON_ENV'] = original_python_env

    if original_port is None:
        os.environ.pop('PORT', None)
    else:
        os.environ['PORT'] = original_port


def test_production_port(_reset_env_vars):
    """Tests the value of PROD and PORT in production"""
    os.environ['PYTHON_ENV'] = 'production'
    os.environ['PORT'] = '4090'
    importlib.reload(app.constants)

    # pylint: disable=import-outside-toplevel
    from app.constants import PORT as prod_port, PROD as prod
    assert prod_port == int(os.environ['PORT'])
    assert prod is True


def test_development_port(_reset_env_vars):
    """Tests the value of PROD and PORT when not in production"""
    os.environ['PYTHON_ENV'] = 'development'
    os.environ['PORT'] = '4090'
    importlib.reload(app.constants)

    # pylint: disable=import-outside-toplevel
    from app.constants import PORT as dev_port, PROD as prod
    assert dev_port == 4002
    assert prod is False
