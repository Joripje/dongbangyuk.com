from fastapi import APIRouter
from api.functions.notification import select_notification, select_new_notification, drop_notification, drop_all_notification
from schemas.schemas_notification import NotificationBase

router = APIRouter()


@router.get("/")
def get_notification(userid: int):

    notification_list = select_notification(userid)

    return notification_list


@router.get("/new")
def get_new_notification(userid: int):

    new_notification_count = select_new_notification(userid)

    return new_notification_count


@router.delete("/delete")
def delete_notification(notification_data: NotificationBase):

    userid = notification_data.userid
    gameid = notification_data.gameid
    drop_notification(userid, gameid)

    pass


@router.delete("/delete/all")
def delete_all_notification(notification_data: NotificationBase):

    userid = notification_data.userid
    result = drop_all_notification(userid)

    return result
