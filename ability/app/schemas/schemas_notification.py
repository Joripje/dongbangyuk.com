from pydantic import BaseModel


class NotificationBase(BaseModel):
    gameid: int
    userid: int