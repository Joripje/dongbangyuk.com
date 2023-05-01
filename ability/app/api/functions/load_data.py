from pymongo import MongoClient

# 몽고디비에 저장하는 코드

# client = MongoClient("mongodb://mongodb_server:27017/")
client = MongoClient('localhost', 27017)

db_result = client['result']
collection_result = db_result['result']

db_video = client['videos']
collection_video = db_video['videos']


def get_result(game_id):

    result = collection_result.find_one({'game_id': game_id})

    return result


def get_video(game_id):

    video = collection_video.find_one({'game_id': game_id})

    return video