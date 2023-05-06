import os
import pytest
import importlib
import app.constants


@pytest.fixture(scope="function")
def reset_env_vars():
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


def test_production_port(reset_env_vars):
    os.environ['PYTHON_ENV'] = 'production'
    os.environ['PORT'] = '4090'
    importlib.reload(app.constants)

    from app.constants import PORT as prod_port, __PROD__ as prod
    assert prod_port == int(os.environ['PORT'])
    assert prod == True


def test_development_port(reset_env_vars):
    os.environ['PYTHON_ENV'] = 'development'
    os.environ['PORT'] = '4090'
    importlib.reload(app.constants)

    from app.constants import PORT as dev_port, __PROD__ as prod
    assert dev_port == 4002
    assert prod == False
