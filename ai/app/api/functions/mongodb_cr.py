from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

mongo_username = os.environ.get('MONGO_USERNAME')
mongo_password = os.environ.get('MONGO_PASSWORD')

# client = MongoClient(f"mongodb://{mongo_username}:{mongo_password}@k8a305.p.ssafy.io:27017/")
client = MongoClient(f"mongodb://{mongo_username}:{mongo_password}@mongodb_server:27017/")
# client = MongoClient('localhost', 27017)
db = client['videos']
collection = db['videos']

db_a = client['ability']
collection_a = db['ability']


def mongodb_create(data):
    result = collection.insert_one(data)
    if result.acknowledged:
        return True
    else:
        return False


def mongodb_read(videoid):
    video = collection.find_one({'game_id': videoid})

    video['_id'] = str(video['_id'])
    return video

def mongodb_list():
    data_list = list(collection.find())

    id_list = [str(data['_id']) for data in data_list]

    return id_list

def mongodba_list():
    data_list = list(collection_a.find())

    id_list = [data for data in data_list]

    return id_list