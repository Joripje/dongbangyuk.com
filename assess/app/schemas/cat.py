from typing import Optional, List, Dict
from pydantic import validator
from schemas.common import ProblemBase, AnswerBase
from datetime import datetime


# 고양이 술래잡기 게임 - 문제 입력답의 속성
class CatProblem(ProblemBase):
    correct: bool               # 정답여부
    answer: bool                # 사용자 선택 답변
    asure: int                  # 확신의 정도 (3 2 1 0) -1: 미응답 
    timestamp: List[datetime]


# 고양이 술래잡기 게임 입력응답의 속성
class CatAnswer(AnswerBase):
    problems: Optional[List[CatProblem]] = None