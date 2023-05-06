from fastapi import FastAPI
from .constants import PORT

app = FastAPI()


@app.get("/ping")
def ping_pong_task():
    return {"result": "pong"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, port=PORT)
