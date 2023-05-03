from pymongo import MongoClient

# 몽고디비에 저장하는 코드

client = MongoClient("mongodb://mongodb_server:27017/")
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