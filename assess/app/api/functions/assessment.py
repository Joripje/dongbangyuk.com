from fastapi import HTTPException, status

async def find_road(arr: list):
    points = {1: [], 2: [], 3: []}
    answer = 3  # 문제 DB에서 가져오는 정답 값
    cnt = 0     # 입력된 배열에서 울타리 개수 count

    if len(arr) != 7:
        raise HTTPException(status_code=400, detail="배열의 row 개수 오류")
    for r in range(7):
        if len(arr[r]) != 7:
            raise HTTPException(status_code=400, detail="배열의 column 개수 오류")
        for c in range(7):
            if (r in [0, 6] or c in [0, 6]) and arr[r][c] in [1, 2, 3]:
                points[arr[r][c]].append((r,c))
            elif arr[r][c] in [4, 5]:
                cnt += 1

    drc = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    for key, value in points.items():
        if len(value) == 0:
            continue
        elif len(value) != 2:
            raise HTTPException(status_code=400, detail="시작점과 끝점 짝이 맞지 않음.")
        r, c = value[0]
        
        if r == 0:
            dr, dc = drc[1]
        elif r == 6:
            dr, dc = drc[0]
        elif c == 0:
            dr, dc = drc[3]
        elif c == 6:
            dr, dc = drc[2]
        r, c = r + dr, c + dc
        
        while 1 <= r <= 5 and 1 <= c <= 5:
            if arr[r][c] == 0:
                r, c = r + dr, c + dc
            elif arr[r][c] == 4:    # 좌상 대각선
                dr, dc = dc, dr
                r, c = r + dr, c + dc
            elif arr[r][c] == 5:    # 우상 대각선
                dr, dc = -dc, -dr
                r, c = r + dr, c + dc
            else:
                raise HTTPException(status_code=400, detail="배열 값이 잘못되었음.")
        if arr[r][c] == key:
            continue
        else:
            return { "status": False, "err": "오답입니다."}
    else:
        if cnt == answer:
            return { "status": True, "msg": "정답입니다."}
        elif cnt > answer:
            return { "status": True, "msg": "더 잘할 수 있었습니다."}
        else:
            return { "status": True, "msg": "최소 울타리 개수 갱신해야함."}
