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

# 비디오 파일 읽기
cap = cv2.VideoCapture('jjk.mp4')

# 저장할 감정 리스트 초기화
# emotion_list = []
emotion_list = [[] for _ in range(7)]
count = 1
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
    for rect in rects:
        landmarks = predictor(gray, rect)

        # 얼굴 이미지 추출
        x = rect.left()
        y = rect.top()
        w = rect.right() - x
        h = rect.bottom() - y
        face_img = gray[y:y + h, x:x + w]

        if w == 0 or h == 0:
            # 'x'를 각 리스트에 추가
            for i in range(7):
                emotion_list[i].append('x')
            continue

        # 얼굴 이미지 전처리
        face_img = cv2.resize(face_img, (64, 64))
        face_img = np.expand_dims(face_img, axis=2)
        face_img = np.expand_dims(face_img, axis=0)
        face_img = face_img / 255.0

        # 감정 분석 예측
        prediction = model.predict(face_img)[0]
        # max_index = np.argmax(prediction)
        # emotion_label = emotions[max_index]

        # 감정 리스트에 현재 프레임에서 예측한 감정 추가
        # emotion_list.append(emotion_label)

        # 각 감정별로 리스트에 분석결과 추가
        for i in range(7):
            emotion_list[i].append(round(prediction[i], 2))
        print(count)
        count += 1


    # 결과 이미지 출력
    # cv2.imshow("result", frame)

    # q 키를 누르면 while 루프를 빠져나감
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# 비디오 파일 닫기
cap.release()
cv2.destroyAllWindows()

# 분석한 감정 리스트 출력
print(emotion_list)

# 각 리스트를 구분하여 numpy array로 변환
angry_arr = np.array(emotion_list[0])
disgust_arr = np.array(emotion_list[1])
scared_arr = np.array(emotion_list[2])
happy_arr = np.array(emotion_list[3])
sad_arr = np.array(emotion_list[4])
surprised_arr = np.array(emotion_list[5])
neutral_arr = np.array(emotion_list[6])

# numpy array를 각각의 txt 파일로 저장
np.savetxt("angry.txt", angry_arr, fmt='%.2f')
np.savetxt("disgust.txt", disgust_arr, fmt='%.2f')
np.savetxt("scared.txt", scared_arr, fmt='%.2f')
np.savetxt("happy.txt", happy_arr, fmt='%.2f')
np.savetxt("sad.txt", sad_arr, fmt='%.2f')
np.savetxt("surprised.txt", surprised_arr, fmt='%.2f')
np.savetxt("neutral.txt", neutral_arr, fmt='%.2f')