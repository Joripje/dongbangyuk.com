from fastapi import FastAPI
from api.api import api_router
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:80"
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
    url = "/docs"
    response = RedirectResponse(url=url)
    return response


app.include_router(api_router)
# app.include_router(api_router, prefix="/api/v1")
