from typing import List
from pydantic import BaseModel
from datetime import datetime


# 역검 채점결과의 공통 속성
class GameResult(BaseModel):
    game_id: int
    date: datetime
    type: str               # 게임 종류 (road, rps, rotate, cat)
    results: List[int]      # [1, 0, 1, 0, 0], 시간제한 있는 게임(rps, cat) 미응답의 경우 2
    timestamps: List[List[datetime]]   # [[시작시간, 제출시간], ...]
    score: int        # 채점한 점수


# 길만들기 게임 - 채점결과의 속성
class RoadGameResult(GameResult):
    clicks: List[int]       # [3, 1, 0, ...], 문제별 클릭 횟수
    corrects: List[int]     # [3, 2, 1, ... ], 문제별 울타리 최소개수 정보


# 가위바위보 게임 - 채점결과의 속성
class RpsGameResult(GameResult):
    rounds: List[int]        # [1, ..., 2, ... 3, ...], 문제별로 몇라운드인지 기록