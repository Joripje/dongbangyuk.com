from fastapi import APIRouter
from api.functions import video_detection, mongodb_jujang
from pydantic import BaseModel


class Video(BaseModel):
    gameid: int
    videopath: str


router = APIRouter()


@router.post("/")
def video_analysis(video: Video):

    data = video_detection.video_detection(video.gameid, video.videopath)
    print('분석끝')
    mongodb_jujang.mongodb_jujang(data)
    print('저장끝')

    return '완료됨'



@router.get("/data")
def get_video_data(videoid: int):
    return {f'{videoid}의 영상정보'}