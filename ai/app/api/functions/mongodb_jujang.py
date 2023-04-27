from pymongo import MongoClient

client = MongoClient('mongodb_server', 27017)
db = client['videos']
collection = db['videos']


def mongodb_jujang(data):
    collection.insert_one(data)

    return 1
