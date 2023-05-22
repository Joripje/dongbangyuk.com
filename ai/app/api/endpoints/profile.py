from fastapi import APIRouter
from api.functions.profile import saju
from pydantic import BaseModel


import openai
from dotenv import load_dotenv
import os

router = APIRouter()


@router.post("/")
def get_profile_image(birth: str):
    if not len(birth) == 8:
        return 'YYYYMMDD로 작성해주세요'
    year = birth[:4]
    month = birth[4:6]
    day = birth[6:]

    url = saju(year, month, day)

    return url



load_dotenv()


class PromptBase(BaseModel):
    prompt: str


openai_api = os.environ.get('OPENAI_API')
s3_bucket = os.environ.get('S3_BUCKET')
region_static = os.environ.get('REGION_STATIC')
aws_accesskey = os.environ.get('AWS_ACCESSKEY')
aws_secretkey = os.environ.get('AWS_SECRETKEY')


@router.post("/img/")
def create_image(prompt: PromptBase):
    openai.api_key = openai_api

    response = openai.Image.create(
        prompt=prompt.prompt,
        n=1,
        size="1024x1024"
    )

    image_url = response['data'][0]['url']


    return image_url
