from fastapi import FastAPI
from api.api import api_router
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from kafkaclient.consumer import consume1, consume2, consumer1, consumer2, loop
from kafkaclient.producer import aioproducer
from contextlib import asynccontextmanager


# Lifespan Events
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Executed before the application(FastAPI app) starts
    await aioproducer.start()
    loop.create_task(consume1())
    loop.create_task(consume2())
    
    # Executes FastAPI app
    yield
    
    # Executed after the application(FastAPI app) finishes
    await aioproducer.stop()
    await consumer1.stop()
    await consumer2.stop()


app = FastAPI(lifespan=lifespan)

# origins = [
#     "http://localhost:3000",
#     "http://localhost:80"
# ]

app.add_middleware(
    CORSMiddleware,
    # allow_origins=origins,
    allow_origins=["*"],
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
