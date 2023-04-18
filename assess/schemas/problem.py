from typing import Optional, List
from pydantic import BaseModel, validator


# 게임 문제의 공통 속성
class ProblemBase(BaseModel):
    game_type: str


# 게임 결과의 공통 속성
class AnswerBase(BaseModel):
    user_id: int
    date: int
    game_type: str


# 길만들기 게임 문제 입력답의 속성: 문제id, 7*7 형태의 리스트, 타임스탬프
class RoadProblemIncoming(ProblemBase):
    problem_id: int
    answer: List[List[int]] = []
    timestamp: int


# 길만들기 게임 입력결과의 속성
class RoadAnswerIncoming(AnswerBase):
    problems: List[RoadProblemIncoming] = []


# 가위바위보 게임 문제 입력답의 속성
class RpsProblem(ProblemBase):
    answer: List[bool]
    timestamp: int

    @validator('answer')
    def validate_answer_length(cls, v):
        if len(v) != 2:
            raise ValueError("Answer list must have exactly two elements")
        return v


# 가위바위보 게임 입력결과의 속성
class RpsAnswer(AnswerBase):
    problems: List[RpsProblem]