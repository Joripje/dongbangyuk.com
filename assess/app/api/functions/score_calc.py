from datetime import datetime, timedelta


def find_road(is_correct, clicks_delta, timestamp) -> int:
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


def rps_3(is_correct, round) -> int:
    '''
    win: 2점(1,2 라운드), 3점(3라운드)
    tie/lose: 0
    '''
    if is_correct:
        return 3 if round == 3 else 2
    else:
        return 0


def cat(is_correct: bool, asure: int) -> int:
    '''
    is_correct: 정답여부
    asure: 확신의 정도. 3, 2, 1, 0, -1(미응답)
    1. 정답: 5점
    2. 정답 기준으로 멀어질수록 감점: 5, 3, 2, 1, (-2), -1, -2, -3, -5
    3. 미응답: -2점
    '''
    if asure == 3:
        return 5 if is_correct else -5
    elif asure == 2:
        return 3 if is_correct else -3
    elif asure == 1:
        return 2 if is_correct else -2
    elif asure == 0:
        return 1 if is_correct else -1
    elif asure == -1:
        return -2


def rotate(is_correct: bool, clicks_delta: int, rounds: int) -> int:
    '''
    1 라운드: 정답+최소횟수 4점, 그냥 정답 2점, 틀리면 0점
    2 라운드: 정답+최소횟수 6점, 그냥 정답 4점, 틀리면 0점
    '''
    if not is_correct:
        return 0
    
    if clicks_delta == 0:
        return 4 if rounds == 1 else 6
    else:
        return 2 if rounds == 1 else 4