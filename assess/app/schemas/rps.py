from typing import Optional, List, Dict
from pydantic import validator
from schemas.common import ProblemBase, AnswerBase
from datetime import datetime


# 가위바위보 게임 - 문제 입력답의 속성
class RpsProblem(ProblemBase):
    answer: List[str] = []
    timestamp: List[datetime]

    @validator('answer')
    def validate_answer_length(cls, v):
        if len(v) and len(v) != 2:
            raise ValueError("Answer list must have exactly two elements or no elements")
        return v


# 가위바위보 게임 입력응답의 속성
class RpsAnswer(AnswerBase):
    rounds: Dict[int, List[RpsProblem]]