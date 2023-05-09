from typing import Optional, List, Dict
from pydantic import validator
from schemas.common import ProblemBase, AnswerBase
from datetime import datetime


# 도형 회전하기 게임 - 문제 입력답의 속성
class RotateProblem(ProblemBase):
    problem: Dict[str, int]     # { flip: 0 | 1, degree: 0 ~ 7 }, 돌리기 전의 도형
    correct: Dict[str, int]     # { flip: 0 | 1, degree: 0 ~ 7 }, 돌려야할 도형
    choices: List[int] = []     # 사용자 입력 리스트. 0: 좌로 45, 1: 우로 45, 2: 좌우반전, 3: 상하반전, -1: 빈칸
    clicks: int
    rounds: int
    timestamp: List[datetime]


# 도형 회전하기 게임 입력응답의 속성
class RotateAnswer(AnswerBase):
    problems: Optional[List[RotateProblem]] = None