# import sys
# sys.path.append('..')

from fastapi import FastAPI
from api.api import api_router
# from app.api.api import api_router

app = FastAPI()


@app.get("/")
def read_root():
    return {"Main": "Page"}


app.include_router(api_router)
# app.include_router(api_router, prefix="/api/v1")
