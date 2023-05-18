from typing import List
from pydantic import BaseModel

# from sqlalchemy import Column, ForeignKey, Integer, String
# from sqlalchemy.orm import relationship


# 길만들기 게임 - DB에 저장된 게임 문제의 속성
class RoadProblemInDB(BaseModel):
    game_type: str
    problem_id: int
    problem: List[List[int]]
    correct: int
    difficulty: str
