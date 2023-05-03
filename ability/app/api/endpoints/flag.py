from fastapi import APIRouter
import requests
from api.functions import flag
from schemas.schemas_flag import FlagBase

router = APIRouter()
api_url = 'http://127.0.0.1:8000/flag'
# api_url = 'http://k8a305.p.ssafy.io:8040/flag'

@router.get("/")
def get_flag(gameid: int, type: str, video: bool):  # flag 데이터를 확인하고 적절한 요청을 보냄
    data = flag.select_flag(gameid)  # flag 데이터를 확인함

    if data == (True, False):
        if video:
            url = api_url + '/update'
            payload = {'gameid': gameid, 'type': type, 'video': video}
            # response = requests.put(url, json=payload)
            requests.put(url, json=payload)

            # return response
            return '트폴1'
        else:
            # return '잘못된 요청'
            return '트폴2'

    elif data == (False, True):
        if video:
            # return '잘못된 요청'
            return 'FT인데 요청이 한 번 더 와서 안됨'
        else:
            url = api_url + '/update'
            payload = {'gameid': gameid, 'type': type, 'video': video}
            # response = requests.put(url, json=payload)
            requests.put(url, json=payload)

            # return response
            return '폴트'

    elif data == (True, True):  # 이미 flag가 두번 요청된거면 더 이상 기록하지 않아 되므로 pass
        # return '잘못된 요청'
        return '트트'

    else:  # data가 존재하지 않으면 flag 새로 기록
        url = api_url + '/create'
        payload = {'gameid':gameid, 'type':type, 'video':video}
        requests.post(url, json=payload)

        # return response.json()
        return '둘 다 없어서 새로 만듦'


@router.post("/create")
def post_flag(flag_data: FlagBase):
    flag.create_flag(flag_data.gameid, flag_data.video)

    return 1


@router.put("/update")
def put_flag(flag_data: FlagBase):
    flag.update_flag(flag_data.gameid, flag_data.video)

    return 1
