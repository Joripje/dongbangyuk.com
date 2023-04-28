from fastapi import APIRouter
from api.functions.profile import saju

router = APIRouter()


@router.post("/")
def get_profile_image(birth: str):
    if not len(birth) == 8:
        return 'YYYYMMDD로 작성해주세요'
    year = birth[:4]
    month = birth[4:6]
    day = birth[6:]

    url = saju(year, month, day)

    return url
