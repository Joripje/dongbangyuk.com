from fastapi import APIRouter
from api.functions.ability import select_ability

router = APIRouter()


@router.get("/")
def get_ability(gameid: int):
    data = select_ability(gameid)

    return data