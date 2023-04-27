from pymongo import MongoClient

client = MongoClient("mongodb://mongodb_server:27017/")
# client = MongoClient('localhost', 27017)
db = client['videos']
collection = db['videos']


def mongodb_create(data):
    collection.insert_one(data)

    return 1


def mongodb_read(videoid):
    video = collection.find_one({'_id': videoid})

    return video