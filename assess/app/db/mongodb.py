import pymongo
from dotenv import load_dotenv
import os

load_dotenv()

mongo_username = os.environ.get('MONGO_USERNAME')
mongo_password = os.environ.get('MONGO_PASSWORD')

# client = MongoClient(f"mongodb://{mongo_username}:{mongo_password}@k8a305.p.ssafy.io:27017/")
client = pymongo.MongoClient(f"mongodb://{mongo_username}:{mongo_password}@mongodb_server:27017/")
# client = pymongo.MongoClient("mongodb://localhost:27017/")
problem_db = client["game_problem"]
result_db = client["game_result"]