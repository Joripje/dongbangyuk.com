from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client['flag']
collection = db['flag']



flag = collection.find_one({'_id': 2})

if flag:
    print(type(flag['assess']), type(flag['video']))

else:
    print('없음')
