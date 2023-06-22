"""Initializes the FastAPI app."""
from fastapi import FastAPI
from .constants import PORT
from .routes import normalize

app = FastAPI()

app.include_router(normalize.router)


@app.get("/ping")
def ping_pong_task():
    """A ping route that serves as a health check."""
    return {"result": "pong"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, port=PORT)
