from pymongo import MongoClient

client = MongoClient("mongodb://mongodb_server:27017/")
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