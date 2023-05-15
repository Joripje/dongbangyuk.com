from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import datetime
import os
import requests

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

db_notification = client['notification']
collection_notification = db_notification['notification']


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


def select_notification_from_mongo(user_id):
    query = {'user_id': user_id}
    update = {'$set': {'new_notification': []}}

    update_result = collection_notification.update_one(query, update)
    result = collection_notification.find_one(query)

    notification_list = result['notification']

    return notification_list


def select_new_notification_from_mongo(user_id):
    result = collection_notification.find_one({'user_id': user_id})

    if result:
        return len(result['new_notification'])

    else:
        new_user = {
            'user_id': user_id,
            'new_notification': [],
            'notification': [],
        }
        collection_notification.insert_one(new_user)

        return 0


def create_notification(game_id, game_type):
    url = 'http://k8a305.p.ssafy.io:8081/plays/userInfo'
    params = {
        'gameId': game_id,
    }
    response = requests.get(url, params=params)
    user_id = int(response.text)

    now = datetime.now()
    date = now.isoformat(timespec='milliseconds') + 'Z'

    notification = {
        'game_id': game_id,
        'user_id': user_id,
        'type': game_type,
        'date': date}

    query = {'user_id': user_id}

    result = collection_notification.find_one(query)

    if result:
        new_notification_list = result['new_notification']
        notification_list = result['notification']

        new_notification_list.append(notification)
        notification_list.append(notification)

        update_new_notification = {'$set': {'new_notification': new_notification_list}}
        update_notification = {'$set': {'notification': notification_list}}

        collection_notification.update_one(query, update_new_notification)
        collection_notification.update_one(query, update_notification)

    else:
        new_user = {
            'user_id': user_id,
            'new_notification': [notification],
            'notification': [notification],
        }
        collection_notification.insert_one(new_user)


def drop_notification_in_mongo(user_id, game_id):

    query = {'user_id': user_id}

    result = collection_notification.find_one(query)
    notification_list = result['notification']

    update_notification_list = []

    for notification in notification_list:
        if notification['game_id'] != game_id:
            update_notification_list.append(notification)

    update = {'$set': {'notification': update_notification_list}}

    result = collection_notification.update_one(query, update)

    return result


def drop_all_notification_in_mongo(user_id):

    query = {'user_id': user_id}
    update = {'$set': {'notification': []}}

    result = collection_notification.update_one(query, update)

    return result

