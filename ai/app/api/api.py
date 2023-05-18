from fastapi import APIRouter
from api.endpoints import videos, profile

api_router = APIRouter()
api_router.include_router(videos.router, prefix="/videos")
api_router.include_router(profile.router, prefix='/profile')