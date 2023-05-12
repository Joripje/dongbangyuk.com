from fastapi import APIRouter

from api.endpoints import games, problem_db, result_db, unse

api_router = APIRouter()
api_router.include_router(games.router, tags=["games"])
api_router.include_router(problem_db.router, tags=["problem_db"])
api_router.include_router(result_db.router, tags=["result_db"])
api_router.include_router(unse.router, tags=["unse"])