from typing import List
from pydantic import BaseModel


def to_camel_case(string: str) -> str:
    string_split = string.split("_")
    return string_split[0] + "".join(word.capitalize() for word in string_split[1:])


class UserAuth(BaseModel):
    user_id: int
    auth_token: str

    class Config:
        alias_generator = to_camel_case

