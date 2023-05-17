from pydantic import BaseModel, validator
from datetime import datetime
from schemas.common import to_camel_case


class UnseModel(BaseModel):
    birth: str
    target: str
    gender: str

    class Config:
        alias_generator = to_camel_case

    @validator('birth', 'target')
    def validate_date(cls, value):
        try:
            datetime.strptime(value, '%Y%m%d')
        except ValueError:
            raise ValueError("Invalid date format. Expected format: YYYYMMDD")
        return value

    @validator('gender')
    def validate_gender(cls, value):
        if value not in ['M', 'F']:
            raise ValueError("Invalid gender format. Expected format: 'M' or 'F'")
        return value