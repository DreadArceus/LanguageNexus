"""Manages and converts environment variables to constants."""
import os

PROD = os.getenv('PYTHON_ENV') == 'production'

if PROD:
    PORT = os.getenv('PORT')
    if PORT is None:
        raise ValueError(
            "The PORT environment variable is not set in production mode!")
    PORT = int(PORT)
else:
    PORT = 4002
