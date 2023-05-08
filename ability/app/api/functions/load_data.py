from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

mongo_username = os.environ.get('MONGO_USERNAME')
mongo_password = os.environ.get('MONGO_PASSWORD')

# 몽고디비에 저장하는 코드
# client = MongoClient(f"mongodb://{mongo_username}:{mongo_password}@k8a305.p.ssafy.io:27017/")
client = MongoClient(f"mongodb://{mongo_username}:{mongo_password}@mongodb_server:27017/")
# client = MongoClient('localhost', 27017)

db_result = client['game_result']
collection_rps = db_result['rps']
collection_road = db_result['road']
collection_rotate = db_result['rotate']
collection_cat = db_result['cat']

db_video = client['videos']
collection_video = db_video['videos']


def get_result(game_id, game_type):

    if game_type == 'rps':
        result = collection_rps.find_one({'game_id': game_id})
    elif game_type == 'road':
        result = collection_road.find_one({'game_id': game_id})
    elif game_type == 'rotate':
        result = collection_rotate.find_one({'game_id': game_id})
    else:
        result = collection_cat.find_one({'game_id': game_id})

    return result


def get_video(game_id):

    video = collection_video.find_one({'game_id': game_id})

    return video