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

# 사진 파일 읽기
img = cv2.imread("sung.PNG")

# 얼굴 검출
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
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

    for i in range(68):
        x_lm = landmarks.part(i).x
        y_lm = landmarks.part(i).y
        cv2.circle(img, (x_lm, y_lm), 1, (255, 0, 0), -1)

    # 얼굴 주변에 사각형 그리기
    # cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)

    # 예측 결과 출력
    # cv2.putText(img, emotion_label, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

    # 각 감정의 백분율 계산하여 출력


    # for i, emotion in enumerate(emotions):
    #     cv2.putText(img, f"{emotion}: {prediction[i]*100:.2f}%", (10, 30+30*i), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)


# 검은 박스 크기 계산
height, width = img.shape[:2]
black_width = 200
black_height = height

# 검은 박스 생성
black_img = np.zeros((black_height, black_width, 3), dtype=np.uint8)

# 검은 박스에 감정 분석 결과 출력
for i, emotion in enumerate(emotions):
    cv2.putText(black_img, f"{emotion}: {prediction[i]*100:.2f}%", (10, 30+30*i), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)

# 원본 이미지와 검은 박스 결합하여 출력
result_img = np.concatenate((img, black_img), axis=1)
cv2.imshow("result", result_img)
cv2.waitKey(0)
cv2.destroyAllWindows()

# # 결과 이미지 출력
# cv2.imshow("result", img)
# cv2.waitKey(0)
# cv2.destroyAllWindows()

