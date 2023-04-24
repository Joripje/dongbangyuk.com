from typing import Optional, List
from pydantic import validator
from schemas.common import ProblemBase, AnswerBase, GameResult


# 길만들기 게임 - 문제 입력답의 속성: 문제id, 7*7 형태의 리스트, 타임스탬프, 클릭 횟수
class RoadProblemIncoming(ProblemBase):
    problem_id: int
    answer: List[List[int]] = []
    timestamp: int
    clicks: int


# 길만들기 게임 - 입력응답의 속성
class RoadAnswerIncoming(AnswerBase):
    is_initial: bool
    problems: Optional[List[RoadProblemIncoming]] = None
