from fastapi import FastAPI
from api.api import api_router
from fastapi.middleware.cors import CORSMiddleware
from kafkaclient.consumer import loop, consume, consumer
from kafkaclient.producer import producer
from contextlib import asynccontextmanager

# Lifespan Events
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Executed before the application(FastAPI app) starts
    await producer.start()
    loop.create_task(consume())
    
    # Executes FastAPI app
    yield
    
    # Executed after the application(FastAPI app) finishes
    await producer.stop()
    await consumer.stop()


app = FastAPI(lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

app.include_router(api_router)