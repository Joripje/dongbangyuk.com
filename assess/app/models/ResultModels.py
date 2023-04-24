from typing import List
from pydantic import BaseModel


# 역검 채점결과의 공통 속성
class GameResult(BaseModel):
    id: int
    user_id: int
    date: int
    game_type: str
    results: List[int]      # [1, 0, 1, 0, 0]
    timestamps: List[int]   # [2, 10, ... 59]
    score: List[int]        # [맞은수, 전체문제수]


# 길만들기 게임 - 채점결과의 속성
class RoadGameResult(GameResult):
    clicks: List[int]       # [3, 1, 0, ...], 문제별 클릭 횟수


# 가위바위보 게임 - 채점결과의 속성
class RpsGameResult(GameResult):
    round: List[int]        # [1, ..., 2, ... 3, ...], 문제별로 몇라운드인지 기록