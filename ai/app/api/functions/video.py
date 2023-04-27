import cv2
import dlib
import numpy as np
from tensorflow.keras.models import load_model


def video_detection(game_id, video_path):
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

            print('못했음')


    # 비디오 파일 닫기
    cap.release()
    cv2.destroyAllWindows()

    # 분석한 감정 리스트 출력
    # print(emotion_list[0])
    # print(len(emotion_list[0]))


    # 각 리스트를 구분하여 numpy array로 변환
    # angry_arr = np.array(emotion_list[0])
    # disgust_arr = np.array(emotion_list[1])
    # scared_arr = np.array(emotion_list[2])
    # happy_arr = np.array(emotion_list[3])
    # sad_arr = np.array(emotion_list[4])
    # surprised_arr = np.array(emotion_list[5])
    # neutral_arr = np.array(emotion_list[6])

    # data = {
    #     '_id': game_id,
    #     'angry': angry_arr,
    #     'disgust': disgust_arr,
    #     'scared': scared_arr,
    #     'happy': happy_arr,
    #     'sad': sad_arr,
    #     'surprised': surprised_arr,
    #     'neutral': neutral_arr,
    #     'video_path': video_path,
    # }

    data = {
        '_id': game_id,
        'angry': emotion_list[0],
        'disgust': emotion_list[1],
        'scared': emotion_list[2],
        'happy': emotion_list[3],
        'sad': emotion_list[4],
        'surprised': emotion_list[5],
        'neutral': emotion_list[6],
        'video_path': video_path,
    }

    return data