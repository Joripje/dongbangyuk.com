from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client['flag']
collection = db['flag']


def select_flag(gameid):
    flag = collection.find_one({'_id': gameid})

    if flag:
        return (flag['assess'], flag['video'])

    else:
        return (False, False)


def create_flag(gameid, video):
    if video:
        data = {'_id':gameid,
                'assess': False,
                'video': True,
        }

    else:
        data = {'_id':gameid,
                'assess': True,
                'video': False,
        }

    collection.insert_one(data)

    return 1


def update_flag(gameid, video):
    if video:
        collection.update_one(
            {'_id': gameid},
            {'$set': {'video': True}}
        )

    else:
        collection.update_one(
            {'_id': gameid},
            {'$set': {'assess': True}}
        )

    return 1