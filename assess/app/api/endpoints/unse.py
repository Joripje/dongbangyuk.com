from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from schemas.unse import UnseModel
from bs4 import BeautifulSoup
import requests, re

router = APIRouter()

url = 'https://shinhanlife.sinbiun.com/unse/good_luck.php'


@router.post("/unse/luckyday", description='길일 생성기. 생년월일과 타겟날짜를 8자리 숫자로 입력, 성별 입력(M/F)')
async def unse_luckyday(incoming: UnseModel):
    birth, target, gender = incoming.birth, incoming.target, incoming.gender
    birth_year, birth_month, birth_day = birth[:4], birth[4:6], birth[6:8]
    target_year, target_month, target_day = target[:4], target[4:6], target[6:8]
    params = {
        'unse_code':'A103',
        'name':'고객',
        'specific_year': target_year,
        'specific_month': target_month,
        'specific_day': target_day,
        'user_gender': gender,
        'user_birth_year': birth_year,
        'gender': gender,
        'sl_cal':'S',
        'birth_year': birth_year,
        'birth_month': birth_month,
        'birth_day': birth_day,
        'birth_hour':'02',
        'sp_num': f'{target_year}-{target_month}'
    }
    
    response = requests.post(url, params=params)
    if response.status_code == 200:
        response_content = response.content
    else:
        response.raise_for_status()
    
    soup = BeautifulSoup(response_content, 'html.parser')

    lucky_day_div = soup.find('div', {'data-acc-view': 'acc_con14'})
    content_div = lucky_day_div.find('div', class_='content')
    content_text = content_div.get_text(strip=True)

    sentences = list(content_text.split('일'))
    dates = []
    for s in sentences:
        numbers = re.findall('\d+', s)
        if numbers:
            numbers = [int(n) for n in numbers]
            dates.append(numbers)

    lucky_dates = { 'month': int(target_month) }
    lucky_dates['lucky_dates'] = [
        {'type': 'job', 'description': '취업이나 면접 등에 좋은 날', 'dates': dates[1]},
        {'type': 'money', 'description': '재물의 흐름이 좋은 날', 'dates': dates[2]},
        {'type': 'heart', 'description': '이성 만남에 좋은 날', 'dates': dates[4]},
        {'type': 'overall', 'description': '이번 달 운의 종합적인 흐름', 'dates': dates[5]},
        {'type': 'helper', 'description': '운의 흐름과 관계없이 귀인이 들어 도움을 주는 날', 'dates': dates[6]},
        {'type': 'avoid_most', 'description': '이번 달 중 반드시 피해야 하는 날', 'dates': dates[7]},
        {'type': 'avoid_second', 'description': '그 다음으로 피해야하는 날', 'dates': dates[8]},
    ]

    return JSONResponse(content=lucky_dates, status_code=200)


@router.post("/unse/today", description='오늘의 운세 보기. 생년월일과 오늘날짜를 8자리 숫자로 입력, 성별 입력(M/F)')
async def unse_today(incoming: UnseModel):
    birth, target, gender = incoming.birth, incoming.target, incoming.gender
    birth_year, birth_month, birth_day = birth[:4], birth[4:6], birth[6:8]
    target_year, target_month, target_day = target[:4], target[4:6], target[6:8]
    params = {
        'unse_code':'A027',
        'name':'고객',
        'specific_year': target_year,
        'specific_month': target_month,
        'specific_day': target_day,
        'user_gender': gender,
        'user_birth_year': birth_year,
        'gender': gender,
        'sl_cal':'S',
        'birth_year': birth_year,
        'birth_month': birth_month,
        'birth_day': birth_day,
        'birth_hour':'02',
        'sp_num': f'{target_year}-{target_month}={target_day}'
    }
    
    response = requests.post(url, params=params)
    if response.status_code == 200:
        response_content = response.content
    else:
        response.raise_for_status()
    
    soup = BeautifulSoup(response_content, 'html.parser')

    lucky_day_div = soup.find('div', {'data-acc-view': 'acc_con12'})
    content_div = lucky_day_div.find('div', class_='content')
    content_text = content_div.get_text(strip=True)

    content = { 'data': content_text }

    return JSONResponse(content=content, status_code=200)