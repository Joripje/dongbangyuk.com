from fastapi import APIRouter  #, HTTPException
from api.functions.video import video_detection
from api.functions.mongodb_cr import mongodb_create, mongodb_read
from api.functions.mongodb_cr import mongodb_list
from api.functions.mongodb_cr import mongodba_list
from schemas.schemas_videos import VideoBase

router = APIRouter()


@router.post("/")
def video_analysis(video: VideoBase):

    data = video_detection(video.gameid, video.videopath, video.start_time, video.end_time)
    mongodb_create(data)

    return '완료됨'


@router.get("/data")
def get_video_data(videoid: int):

    data = mongodb_read(videoid)

    return data


@router.get("/list")
def get_db_list():
    id_list = mongodb_list()

    return id_list


@router.get("/asdf")
def get_dba_list():
    id_list = mongodba_list()

    return id_list
