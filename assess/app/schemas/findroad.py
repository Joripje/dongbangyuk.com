from typing import Optional, List
from pydantic import validator, BaseModel
from schemas.common import ProblemBase, AnswerBase, GameResult
from datetime import datetime


def to_camel_case(string: str) -> str:
    string_split = string.split("_")
    return string_split[0] + "".join(word.capitalize() for word in string_split[1:])


# 길만들기 게임 - 문제 입력답의 속성: 문제id, 7*7 형태의 리스트, 타임스탬프, 클릭 횟수
class RoadProblemIncoming(ProblemBase):
    problem_id: int
    answer: List[List[int]] = []
    timestamp: List[datetime]       # [시작시간, 제출시간]
    clicks: int


# 길만들기 게임 - 입력응답의 속성
class RoadAnswerIncoming(AnswerBase):
    problems: Optional[List[RoadProblemIncoming]] = None


# 길만들기 게임 문제 DB 저장용 스키마
class RoadProblemStoringDB(BaseModel):
    game_type: str
    problem_id: int
    problem: List[List[int]]
    correct: int
    difficulty: str

    class Config:
        alias_generator = to_camel_case