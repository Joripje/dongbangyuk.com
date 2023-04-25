from pydantic import BaseModel


class FlagBase(BaseModel):
    gameid: int
    type: str
    video: bool