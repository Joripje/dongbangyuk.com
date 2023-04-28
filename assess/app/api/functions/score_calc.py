from fastapi import HTTPException, status
from datetime import datetime, timedelta


def find_road(is_correct, clicks_delta, timestamp):
    '''
    길 만들기 점수 산정 기준
    1. 정답여부: 틀리면 0점, 맞으면 5점 (일치하게 가고 횟수도 맞게)
    2. 클릭수 : 클릭수가 최소횟수  + 3 될 때마다 -1
    3. 20초 안에 풀면 +1
    '''
    score = 0
    if is_correct and clicks_delta == 0:
        score += 5
    elif not is_correct:
        return 0
    
    if clicks_delta > 0:
        score -= clicks_delta // 3
    
    start_time = datetime.fromisoformat(timestamp[0])
    end_time = datetime.fromisoformat(timestamp[1])
    problem_time = (end_time - start_time).total_seconds()
    
    if problem_time < 20:
        score += 1

    return score


def rps_3(is_correct, round):
    '''
    win: 2점(1,2 라운드), 3점(3라운드)
    tie/lose: 0
    '''
    if is_correct:
        return 3 if round == 3 else 2
    else:
        return 0