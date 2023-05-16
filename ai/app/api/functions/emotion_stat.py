def get_emotion_stat(data):
    angry = sum(data['angry'])
    disgust = sum(data['disgust'])
    scared = sum(data['scared'])
    happy = sum(data['happy'])
    sad = sum(data['sad'])
    surprised = sum(data['surprised'])
    neutral = sum(data['neutral'])

    none_face = data['none_face']

    total = sum([angry, disgust, scared, happy, sad, surprised, neutral])

    # 각각의 감정이 차지하는 비율 계산하여 백분율로 저장
    result = {
        'angry': round(angry / total * 100, 1),
        'disgust': round(disgust / total * 100, 1),
        'scared': round(scared / total * 100, 1),
        'happy': round(happy / total * 100, 1),
        'sad': round(sad / total * 100, 1),
        'surprised': round(surprised / total * 100, 1),
        'neutral': round(neutral / total * 100, 1),
        'recognition': round((1 - none_face) * 100, 1),
    }

    return result
