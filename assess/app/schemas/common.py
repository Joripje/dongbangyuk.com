from typing import List
from pydantic import BaseModel


# 게임 문제의 공통 속성
class ProblemBase(BaseModel):
    game_type: str


# 게임 입력응답의 공통 속성
class AnswerBase(BaseModel):
    game_id: int
    user_id: int
    date: int
    game_type: str


# 역검 결과의 공통 속성
class GameResult(BaseModel):
    id: int
    date: int
    game_type: str
    results: List[int]
    score: List[int]