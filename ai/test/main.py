import cv2
import dlib
import numpy as np
from tensorflow.keras.models import load_model

# 얼굴 검출기와 랜드마크 검출기 초기화
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")

# 감정 분석 모델 불러오기
model = load_model("./emotion_recognition_model/fer2013_mini_XCEPTION.102-0.66.h5")

# 감정 레이블 정의하기
emotions = ["angry", "disgust", "scared", "happy", "sad", "surprised", "neutral"]

# 비디오 캡처 초기화
cap = cv2.VideoCapture(0)

while True:
    # 프레임 읽기
    ret, frame = cap.read()

    # 얼굴 검출
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    rects = detector(gray, 0)

    # 검출된 얼굴마다 감정 분석 수행
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
        max_index = np.argmax(prediction)
        emotion_label = emotions[max_index]

        # 얼굴 주변에 사각형 그리기
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

        for i in range(68):
            x_lm = landmarks.part(i).x
            y_lm = landmarks.part(i).y
            cv2.circle(frame, (x_lm, y_lm), 1, (255, 0, 0), -1)

        # 예측 결과 출력
        # cv2.putText(frame, emotion_label, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

        # 각 감정의 백분율 계산하여 출력
        for i, emotion in enumerate(emotions):
            cv2.putText(frame, f"{emotion}: {prediction[i]*100:.2f}%", (10, 30+30*i), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)

    # 프레임 출력
    cv2.imshow("frame", frame)

    # 종료하기
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# 자원 해제하기
cap.release()
cv2.destroyAllWindows()