from pydantic import BaseModel


class VideoBase(BaseModel):
    gameid: int
    videopath: str
    record_date: str


