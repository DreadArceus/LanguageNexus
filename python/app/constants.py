import os

__PROD__ = os.getenv('PYTHON_ENV') == 'production'

if __PROD__:
    PORT = os.getenv('PORT')
    if PORT is None:
        raise ValueError(
            "The PORT environment variable is not set in production mode!")
    PORT = int(PORT)
else:
    PORT = 4002
