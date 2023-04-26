from fastapi import APIRouter

from api.endpoints import games, problem_db

api_router = APIRouter()
api_router.include_router(games.router, tags=["games"])
api_router.include_router(problem_db.router, tags=["problem_db"])