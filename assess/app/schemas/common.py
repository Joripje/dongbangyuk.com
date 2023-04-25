from typing import List
from pydantic import BaseModel
from datetime import datetime


def to_snake_case(string: str) -> str:
    return ''.join(['_' + i.lower() if i.isupper() else i for i in string]).lstrip('_')

# Front로부터 입력되는 객체는 camelCase 필드 값을 가짐
# 입력 요청의 schema는 alias_generator를 설정해줘야 camelCase 입력을 받을 수 있음
def to_camel_case(string: str) -> str:
    string_split = string.split("_")
    return string_split[0] + "".join(word.capitalize() for word in string_split[1:])


# 게임 문제의 공통 속성
class ProblemBase(BaseModel):
    game_type: str

    class Config:
        alias_generator = to_camel_case


# 게임 입력응답의 공통 속성
class AnswerBase(BaseModel):
    game_id: int
    user_id: int
    date: datetime
    game_type: str

    class Config:
        alias_generator = to_camel_case


# 역검 결과의 공통 속성
class GameResult(BaseModel):
    id: int
    date: int
    game_type: str
    results: List[int]      # [1, 0, 1, 0, 0]
    timestamps: List[datetime]
    score: List[int]
