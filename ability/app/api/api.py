from fastapi import APIRouter
from api.endpoints import flag, ability

api_router = APIRouter()
api_router.include_router(flag.router, prefix="/flag")
# api_router.include_router(ability.router, prefix="/ability")