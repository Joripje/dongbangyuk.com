from pymongo import MongoClient
from datetime import datetime, timedelta
from api.functions.load_data import get_result, get_video


# 몽고디비에 저장하는 코드

client = MongoClient("mongodb://mongodb_server:27017/")
# client = MongoClient('localhost', 27017)

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

        judgment = ability_judgement(result)
        accuracy = ability_accuracy(result['score'])
        stability = ability_stability(video['neutral'])
        endurance = ability_endurance(result)
        resilience = ability_resilience()

        data = {
            'game_id':  game_id,
            'type': result['type'],
            'judgment': judgment,
            'accuracy': accuracy,
            'stability': stability,
            'endurance': endurance,
            'resilience': resilience,
            'game_ability': game_ability,
        }

        if not collection.find_one({'game_id': game_id}):
            collection.insert_one(data)


def ability_rps():
    return 1


def ability_road():
    return 1


def ability_rotate():
    return 1


def ability_cat():
    return 1


def ability_judgement(result):

    problem_times = timedelta(seconds=0)

    for timestamp in result['timestamps']:
        start_time = datetime.fromisoformat(timestamp[0])
        end_time = datetime.fromisoformat(timestamp[1])

        problem_times += end_time - start_time

    avg_time = problem_times.total_seconds() / result['score'][1]

    judgement = calc_judgement(avg_time, result['type'])

    return judgement


def ability_accuracy(score):
    score_rate = score[0] / score[1]

    accuracy = calc_accuracy(score_rate)

    return accuracy


def ability_stability(video):
    none_face = 0
    for frame in video:
        if frame == -1:
            none_face += 1

    video_rate = none_face / len(video)

    if 0.25 <= video_rate:
        stability = 0

    else:
        stability = 1

    return stability


def ability_endurance(result):
    game_type = result['type']

    timestamps_datetime = []

    for timestamp in result['timestamps']:
        start_time = datetime.fromisoformat(timestamp[0])
        end_time = datetime.fromisoformat(timestamp[1])

        timestamps_datetime.append([start_time, end_time])

    one_third = []
    two_third = []
    three_third = []

    one_third_times = timedelta(seconds=0)
    two_third_times = timedelta(seconds=0)
    three_third_times = timedelta(seconds=0)

    start = timestamps_datetime[0][0]

    for i in range(len(timestamps_datetime)):
        problem_start = timestamps_datetime[i][0]  # 문제 시작 시간
        problem_end = timestamps_datetime[i][1]  # 문제 제출 시간

        if problem_start > start + timedelta(seconds=200):
            three_third.append(result['results'][i])
            three_third_times += (problem_end - problem_start)

        elif problem_start > start + timedelta(seconds=100):
            two_third.append(result['results'][i])
            two_third_times += (problem_end - problem_start)

        else:
            one_third.append(result['results'][i])
            one_third_times += (problem_end - problem_start)

    one_third_rate = one_third.count(1) / len(one_third)
    two_third_rate = two_third.count(1) / len(two_third)
    three_third_rate = three_third.count(1) / len(three_third)

    one_third_accuracy = calc_accuracy(one_third_rate)
    two_third_accuracy = calc_accuracy(two_third_rate)
    three_third_accuracy = calc_accuracy(three_third_rate)

    one_third_avg_time = one_third_times.total_seconds() / len(one_third)
    two_third_avg_time = two_third_times.total_seconds() / len(two_third)
    three_third_avg_time = three_third_times.total_seconds() / len(three_third)

    one_third_judgement = calc_judgement(one_third_avg_time, game_type)
    two_third_judgement = calc_judgement(two_third_avg_time, game_type)
    three_third_judgement = calc_judgement(three_third_avg_time, game_type)

    endurance = 5

    # 초중반 변화
    if one_third_accuracy > two_third_accuracy:
        endurance -= 1

    elif one_third_accuracy < two_third_accuracy:
        endurance += 1

    else:
        pass

    if one_third_judgement > two_third_judgement:
        endurance -= 1

    elif one_third_judgement < two_third_judgement:
        endurance += 1

    else:
        pass

    # 중후반 변화
    if two_third_accuracy > three_third_accuracy:
        endurance -= 1

    elif two_third_accuracy < three_third_accuracy:
        endurance += 1

    else:
        pass

    if two_third_judgement > three_third_judgement:
        endurance -= 1

    elif two_third_judgement < three_third_judgement:
        endurance += 1

    else:
        pass

    if endurance >= 5:
        return 5
    elif endurance < 1:
        return 1
    else:
        return endurance


def ability_resilience():
    return 1


def calc_accuracy(rate):
    if rate < 0.2:
        accuracy = 1

    elif 0.2 <= rate < 0.4:
        accuracy = 2

    elif 0.4 <= rate < 0.6:
        accuracy = 3

    elif 0.6 <= rate < 0.8:
        accuracy = 4

    else:
        accuracy = 5

    return accuracy


def calc_judgement(avg_time, game_type):
    judgement = 1
    if game_type == 'rps':
        pass

    elif game_type == 'road':
        if avg_time > 44:
            judgement = 1

        elif 36 < avg_time <= 44:
            judgement = 2

        elif 28 < avg_time <= 36:
            judgement = 3

        elif 21 <= avg_time <= 28:
            judgement = 4

        else:
            judgement = 5

    elif game_type == 'rotate':
        pass

    # elif game_type == 'cat':
    else:
        pass

    return judgement
