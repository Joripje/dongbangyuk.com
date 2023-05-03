import cv2
import dlib
import numpy as np
from tensorflow.keras.models import load_model
from datetime import datetime, timedelta


def video_detection(game_id, video_path, start_time, end_time):
    # 얼굴 검출기와 랜드마크 검출기 초기화
    detector = dlib.get_frontal_face_detector()
    # predictor = dlib.shape_predictor("C:/Users/SSAFY/Documents/GitHub/S08P31A305/ai/app/api/functions/data/shape_predictor_68_face_landmarks.dat")
    predictor = dlib.shape_predictor("api/functions/data/shape_predictor_68_face_landmarks.dat")

    # 감정 분석 모델 불러오기
    # model = load_model("C:/Users/SSAFY/Documents/GitHub/S08P31A305/ai/app/api/functions/data/emotion_classifiction_model.h5")
    model = load_model("api/functions/data/emotion_classifiction_model.h5")

    # 감정 레이블 정의하기
    # emotions = ["angry", "disgust", "scared", "happy", "sad", "surprised", "neutral"]

    # 비디오 파일 읽기
    cap = cv2.VideoCapture(video_path)

    # 저장할 감정 리스트 초기화
    emotion_list = [[] for _ in range(7)]
    none_face = 0
    all_frames = 0

    while True:
        # 비디오의 프레임 읽기
        ret, frame = cap.read()

        # 비디오가 끝나면 while 루프를 빠져나감
        if not ret:
            break

        # 얼굴 검출
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        rects = detector(gray, 0)

        # 검출된 얼굴마다 감정 분석 수행
        if len(rects) > 0:
            for rect in rects:
                landmarks = predictor(gray, rect)

                # 얼굴 이미지 추출
                x = rect.left()
                y = rect.top()
                w = rect.right() - x
                h = rect.bottom() - y
                face_img = gray[y:y + h, x:x + w]

                # 얼굴 이미지 전처리
                face_img = cv2.resize(face_img, (64, 64))
                face_img = np.expand_dims(face_img, axis=2)
                face_img = np.expand_dims(face_img, axis=0)
                face_img = face_img / 255.0

                # 감정 분석 예측
                prediction = model.predict(face_img)[0]

                # 감정 리스트에 현재 프레임에서 예측한 감정 추가
                for i in range(68):
                    x_lm = landmarks.part(i).x
                    y_lm = landmarks.part(i).y
                    cv2.circle(frame, (x_lm, y_lm), 1, (255, 0, 0), -1)

                # 각 감정별로 리스트에 분석결과 추가
                for i in range(7):
                    emotion_list[i].append(round(float(prediction[i]), 2))


        else:
            # 'x'를 각 리스트에 추가
            for i in range(7):
                emotion_list[i].append(-1)

            none_face += 1
            print('못했음')

        all_frames += 1

    # 비디오 파일 닫기
    cap.release()
    cv2.destroyAllWindows()

    #### 초당 프레임을 고려한 다운샘플링

    # start = datetime.fromisoformat(str(start_time))
    # end = datetime.fromisoformat(str(end_time))
    #
    # fps = all_frames // (end - start).total_seconds()
    #
    # angry = ltd_downsampling(emotion_list[0], 2 * fps)
    # disgust = ltd_downsampling(emotion_list[1], 2 * fps)
    # scared = ltd_downsampling(emotion_list[2], 2 * fps)
    # happy = ltd_downsampling(emotion_list[3], 2 * fps)
    # sad = ltd_downsampling(emotion_list[4], 2 * fps)
    # surprised = ltd_downsampling(emotion_list[5], 2 * fps)
    # neutral = ltd_downsampling(emotion_list[6], 2 * fps)

    angry = ltd_downsampling(emotion_list[0], 60)
    disgust = ltd_downsampling(emotion_list[1], 60)
    scared = ltd_downsampling(emotion_list[2], 60)
    happy = ltd_downsampling(emotion_list[3], 60)
    sad = ltd_downsampling(emotion_list[4], 60)
    surprised = ltd_downsampling(emotion_list[5], 60)
    neutral = ltd_downsampling(emotion_list[6], 60)

    data = {
        'game_id': game_id,
        'angry': angry,
        'disgust': disgust,
        'scared': scared,
        'happy': happy,
        'sad': sad,
        'surprised': surprised,
        'neutral': neutral,
        'video_path': video_path,
        'start_time': start_time,
        'end_time': end_time,
        'none_face': none_face / all_frames
    }

    return data


def ltd_downsampling(data, target_length):
    if data[0] == -1:
        data[0] = 0

    for i in range(len(data)):
        if data[i] == -1:
            data[i] = data[i - 1]

    # 입력 데이터의 길이
    length = len(data)

    # 구간별 LTD 다운샘플링
    downsampled_data = []
    for i in range(0, length, target_length):
        segment = data[i:i + target_length]
        downsampled_segment = apply_ltd(segment)
        downsampled_data.extend(downsampled_segment)

    return list(downsampled_data)


def apply_ltd(segment):
    n = len(segment)
    if n <= 2:
        return segment

    # 삼각형 면적 계산
    areas = []
    for i in range(1, n - 1):
        area = 0.5 * abs(
            (segment[i - 1] - segment[i + 1]) * (segment[i] - segment[i - 1]) - (segment[i - 1] - segment[i]) * (
                        segment[i + 1] - segment[i - 1]))
        areas.append(area)

    # 가장 큰 삼각형 선택
    max_area_index = np.argmax(areas)
    downsampled_segment = [segment[0], segment[max_area_index + 1]]

    return downsampled_segment