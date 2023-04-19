# import sys
# sys.path.append('..')

from fastapi import FastAPI
from api.api import api_router
# from app.api.api import api_router

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Main": "Page"}


app.include_router(api_router)
# app.include_router(api_router, prefix="/api/v1")
