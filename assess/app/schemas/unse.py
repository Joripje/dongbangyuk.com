from pydantic import BaseModel


def to_camel_case(string: str) -> str:
    string_split = string.split("_")
    return string_split[0] + "".join(word.capitalize() for word in string_split[1:])


# 게임 문제의 공통 속성
class UnseModel(BaseModel):
    birth: str
    target: str
    gender: str

    class Config:
        alias_generator = to_camel_case
