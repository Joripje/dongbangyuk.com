import cv2

# 비디오 파일 열기
cap = cv2.VideoCapture('jjk.mp4')

# 총 프레임 수 확인
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
print("총 프레임 수:", total_frames)
count = 1
# 비디오 파일에서 프레임 읽기
while True:
    ret, frame = cap.read()
    if not ret:
        break

    # 읽어들인 프레임을 화면에 표시
    cv2.imshow('frame', frame)
    print(count)
    count += 1
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# 비디오 파일 닫기
cap.release()
cv2.destroyAllWindows()