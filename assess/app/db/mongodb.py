from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

mongo_username = os.environ.get('MONGO_USERNAME')
mongo_password = os.environ.get('MONGO_PASSWORD')

# 원격 서버
client = MongoClient(f"mongodb://{mongo_username}:{mongo_password}@mongodb_server:27017/")
# 로컬 테스트
# client = MongoClient("mongodb://localhost:27017/")

problem_db = client["game_problem"]
result_db = client["game_result"]