from fastapi import APIRouter
from api.functions.video import video_detection
from api.functions.mongodb_cr import mongodb_create, mongodb_read, mongodb_list
from schemas.schemas_videos import VideoBase

router = APIRouter()


@router.post("/")
def video_analysis(video: VideoBase):

    data = video_detection(video.gameid, video.videopath)
    print('분석끝')
    mongodb_create(data)
    print('저장끝')

    return '완료됨'



@router.get("/data")
def get_video_data(videoid: int):

    data = mongodb_read(videoid)

    return data


@router.get("/list")
def get_db_list():
    id_list = mongodb_list()

    return id_list