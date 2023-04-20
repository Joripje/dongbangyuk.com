from typing import Optional, List
from pydantic import validator
from schemas.common import ProblemBase, AnswerBase


# 가위바위보 게임 - 문제 입력답의 속성
class RpsProblem(ProblemBase):
    answer: List[int]
    timestamp: int

    @validator('answer')
    def validate_answer_length(cls, v):
        if len(v) != 2:
            raise ValueError("Answer list must have exactly two elements")
        return v


# 가위바위보 게임 입력응답의 속성
class RpsAnswer(AnswerBase):
    problems: List[RpsProblem]