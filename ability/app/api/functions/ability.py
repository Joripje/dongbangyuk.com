from pymongo import MongoClient
from api.functions.load_data import get_result, get_video


# 몽고디비에 저장하는 코드

client = MongoClient('localhost', 27017)
db = client['ability']
collection = db['ability']


def ability(game_id):
    result = get_result(game_id)
    video = get_video(game_id)

    if result and video:

        if result['type'] == 'rps':
            game_ability = ability_rps()

        elif result['type'] == 'road':
            game_ability = ability_road()

        elif result['type'] == 'rotate':
            game_ability = ability_rotate()

        # elif result['type'] == 'cat':
        else:
            game_ability = ability_cat()

        judgment = ability_judgement()
        accuracy = ability_accuracy(result['score'])
        stability = ability_stability(video['neutral'])
        endurance = ability_endurance()
        resilience = ability_resilience()

        data = {
            '_id':  game_id,
            'type': result['type'],
            'judgment': judgment,
            'accuracy': accuracy,
            'stability': stability,
            'endurance': endurance,
            'resilience': resilience,
            'game_ability': game_ability,
        }

        if not collection.find_one({'_id': game_id}):
            collection.insert_one(data)


def ability_rps():
    return 1


def ability_road():
    return 1


def ability_rotate():
    return 1


def ability_cat():
    return 1


def ability_judgement():
    return 1


def ability_accuracy(score):
    score_rate = score[0] / score[1]

    if score_rate < 0.2:
        accuracy = 1

    elif 0.2 <= score_rate < 0.4:
        accuracy = 2

    elif 0.4 <= score_rate < 0.6:
        accuracy = 3

    elif 0.6 <= score_rate < 0.8:
        accuracy = 4

    # elif 0.2 <= score_rate < 0.4:
    else:
        accuracy = 5

    return accuracy


def ability_stability(video):
    none_face = 0
    for frame in video:
        if frame == -1:
            none_face += 1

    video_rate = none_face / len(video)

    if 0.5 <= video_rate:
        stability = 1

    elif 0.4 <= video_rate < 0.5:
        stability = 2

    elif 0.3 <= video_rate < 0.4:
        stability = 3

    elif 0.2 <= video_rate < 0.3:
        stability = 4

    # elif 0.2 <= score_rate < 0.4:
    else:
        stability = 5

    return stability


def ability_endurance():
    return 1


def ability_resilience():
    return 1

