from fastapi import APIRouter

from api.endpoints import games

api_router = APIRouter()
api_router.include_router(games.router, tags=["games"])