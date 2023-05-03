from pymongo import MongoClient
from datetime import datetime, timedelta
from api.functions.load_data import get_result, get_video


# 몽고디비에 저장하는 코드

client = MongoClient("mongodb://mongodb_server:27017/")
# client = MongoClient('localhost', 27017)

db = client['ability']
collection = db['ability']


def ability(game_id, game_type):
    result = get_result(game_id, game_type)
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
        accuracy = ability_accuracy(result['results'])
        stability = ability_stability(video['none_face'])
        endurance = ability_endurance(result)
        resilience = ability_resilience(result, video)

        data = {
            'game_id':  game_id,
            'type': result['type'],
            'judgment': judgment,
            'accuracy': accuracy,
            'stability': stability,
            # 'stability': 1,
            'endurance': endurance,
            'resilience': resilience,
            'game_ability': game_ability,
        }

        if not collection.find_one({'game_id': game_id}):
            collection.insert_one(data)
            print('저장완료')


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
        start_time = datetime.fromisoformat(str(timestamp[0]))
        end_time = datetime.fromisoformat(str(timestamp[1]))

        problem_times += end_time - start_time

    avg_time = problem_times.total_seconds() / len(result['results'])

    judgement = calc_judgement(avg_time, result['type'])

    return judgement


def ability_accuracy(results):
    score_rate = results.count(1) / len(results)

    accuracy = calc_accuracy(score_rate)

    return accuracy


def ability_stability(none_face):

    if 0.25 <= none_face:
        stability = 0

    else:
        stability = 1

    return stability


def ability_endurance(result):
    game_type = result['type']

    timestamps_datetime = []

    for timestamp in result['timestamps']:
        start_time = datetime.fromisoformat(str(timestamp[0]))
        end_time = datetime.fromisoformat(str(timestamp[1]))

        timestamps_datetime.append([start_time, end_time])

    one_third = []
    two_third = []
    three_third = []

    one_third_times = timedelta(seconds=0)
    two_third_times = timedelta(seconds=0)
    three_third_times = timedelta(seconds=0)

    start = timestamps_datetime[0][0]
    end = timestamps_datetime[-1][1]

    part_time = (end - start) // 3

    for i in range(len(timestamps_datetime)):
        problem_start = timestamps_datetime[i][0]  # 문제 시작 시간
        problem_end = timestamps_datetime[i][1]  # 문제 제출 시간

        # if problem_start > start + timedelta(seconds=200):
        if problem_start > start + (2 * part_time):
            three_third.append(result['results'][i])
            three_third_times += (problem_end - problem_start)

        # elif problem_start > start + timedelta(seconds=100):
        elif problem_start > start + part_time:
            two_third.append(result['results'][i])
            two_third_times += (problem_end - problem_start)

        else:
            one_third.append(result['results'][i])
            one_third_times += (problem_end - problem_start)

    if len(one_third):
        one_third_rate = one_third.count(1) / len(one_third)
        one_third_accuracy = calc_accuracy(one_third_rate)
        one_third_avg_time = one_third_times.total_seconds() / len(one_third)
        one_third_judgement = calc_judgement(one_third_avg_time, game_type)

    else:
        one_third_accuracy = 0
        one_third_judgement = 0

    if len(two_third):
        two_third_rate = two_third.count(1) / len(two_third)
        two_third_accuracy = calc_accuracy(two_third_rate)
        two_third_avg_time = two_third_times.total_seconds() / len(two_third)
        two_third_judgement = calc_judgement(two_third_avg_time, game_type)

    else:
        two_third_accuracy = 0
        two_third_judgement = 0

    if len(three_third):

        three_third_rate = three_third.count(1) / len(three_third)
        three_third_accuracy = calc_accuracy(three_third_rate)
        three_third_avg_time = three_third_times.total_seconds() / len(three_third)
        three_third_judgement = calc_judgement(three_third_avg_time, game_type)

    else:
        three_third_accuracy = 0
        three_third_judgement = 0

    endurance = 5

    if one_third_accuracy == 0:
        endurance -= 3

    # 초중반 변화
    if two_third_accuracy == 0:
        endurance -= 2

    elif one_third_accuracy > two_third_accuracy:
        endurance -= 1

    elif one_third_accuracy < two_third_accuracy:
        endurance += 1

    else:
        pass

    if two_third_judgement == 0:
        endurance -= 2

    elif one_third_judgement > two_third_judgement:
        endurance -= 1

    elif one_third_judgement < two_third_judgement:
        endurance += 1

    else:
        pass

    # 중후반 변화
    if three_third_accuracy == 0:
        endurance -= 2

    elif two_third_accuracy > three_third_accuracy:
        endurance -= 1

    elif two_third_accuracy < three_third_accuracy:
        endurance += 1

    else:
        pass

    if three_third_judgement == 0:
        endurance -= 2

    elif two_third_judgement > three_third_judgement:
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


def ability_resilience(result, video):
    resilience = 5

    # 영상 저장시 주석 해제 후 영상 데이터 계산
    # angry = video['angry']
    # disgust = video['disgust']
    # scared = video['scared']
    # happy = video['happy']
    # sad = video['sad']
    # surprised = video['surprised']
    # neutral = video['neutral']
    # emotion_state = video['emotion_state']

    # start = datetime.fromisoformat(str(video['start_time']))

    # emotions = [angry, disgust, scared, happy, sad, surprised, neutral]

    tf = result['results']

    # timestamps = result['timestamps']

    false_problem = []

    for i in range(len(tf)):
        if not tf[i]:
            false_problem.append(i)

    if false_problem:
        resilience = 3

    # print(false_problem)

    for i in range(len(false_problem)):
        false_problem_number = false_problem[i]

        if false_problem_number != 0 and false_problem_number != len(tf) - 1:
            # problem_finish = datetime.fromisoformat(str(timestamps[false_problem_number][1]))
            # false_state = emotion_state[int((problem_finish - start).total_seconds()):]
            # # 틀린 뒤 감정의 동요 확인
            # if len(set(false_state)) >= 3:
            #     resilience -= 1
            #
            # elif len(set(false_state)) == 1:
            #     resilience += 1

            # 틀린 뒤 정답률 확인
            before_problem = tf[:false_problem_number]
            after_problem = tf[false_problem_number:]
            before_accuracy = before_problem.count(1) / len(before_problem)
            after_accuracy = after_problem.count(1) / len(after_problem)

            if before_accuracy > after_accuracy:
                resilience -= 1
                # print(resilience,'감소')
            else:
                resilience += 1
                # print(resilience,'증가')

    # print(resilience)
    if resilience > 5:
        resilience = 5

    elif resilience < 1:
        resilience = 1

    return resilience


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


def select_ability(game_id):
    data = collection.find_one({'game_id': game_id})

    data['_id'] = str(data['_id'])

    return data
