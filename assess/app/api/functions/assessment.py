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
            return { "status": False, "msg": "더 잘할 수 있었습니다."}
        else:
            return { "status": True, "msg": "최소 울타리 개수 갱신해야함."}


async def rps_3(me: str, you: str):
    rps = RPS_3
    n = len(rps)
    half = n // 2
    me_idx = rps[me]['idx']
    you_idx = rps[you]['idx']
    
    diff = abs(me_idx - you_idx)
    if diff == 0:
        return False
    elif diff <= half:
        return True if me_idx > you_idx else False
    else:
        return True if me_idx < you_idx else False


async def rps_15(me: str, you: str):
    rps = RPS_15
    n = len(rps)
    half = n // 2
    me_idx = rps[me]['idx']
    you_idx = rps[you]['idx']
    
    diff = abs(me_idx - you_idx)
    if diff == 0:
        return False
    elif diff <= half:
        return True if me_idx > you_idx else False
    else:
        return True if me_idx < you_idx else False


async def rps_5(me: str, you: str):
    rps = RPS_5
    n = len(rps)
    half = n // 2
    me_idx = rps[me]['idx']
    you_idx = rps[you]['idx']
    
    diff = abs(me_idx - you_idx)
    if diff == 0:
        return False
    elif diff <= half:
        return True if me_idx > you_idx else False
    else:
        return True if me_idx < you_idx else False
    

RPS_3 = {
    "sci": {
        "idx": 0,
        "ko": "가위",
        "en": "scissors"
    },
    "roc": {
        "idx": 1,
        "ko": "바위",
        "en": "rock"
    },
    "pap": {
        "idx": 2,
        "ko": "보",
        "en": "paper"
    }
}

RPS_15 = {
    "sci": {
        "idx": 0,
        "ko": "가위",
        "en": "scissors"
    },
    "fir": {
        "idx": 1,
        "ko": "불",
        "en": "fire"
    },
    "roc": {
        "idx": 2,
        "ko": "바위",
        "en": "rock"
    },
    "gun": {
        "idx": 3,
        "ko": "총",
        "en": "gun"
    },
    "lig": {
        "idx": 4,
        "ko": "번개",
        "en": "lightening"
    },
    "dev": {
        "idx": 5,
        "ko": "악마",
        "en": "devil"
    },
    "dra": {
        "idx": 6,
        "ko": "용",
        "en": "dragon"
    },
    "wat": {
        "idx": 7,
        "ko": "물",
        "en": "water"
    },
    "air": {
        "idx": 8,
        "ko": "공기",
        "en": "air"
    },
    "pap": {
        "idx": 9,
        "ko": "보",
        "en": "paper"
    },
    "spo": {
        "idx": 10,
        "ko": "스펀지",
        "en": "sponge"
    },
    "wol": {
        "idx": 11,
        "ko": "늑대",
        "en": "wolf"
    },
    "tre": {
        "idx": 12,
        "ko": "나무",
        "en": "tree"
    },
    "hum": {
        "idx": 13,
        "ko": "사람",
        "en": "human"
    },
    "sna": {
        "idx": 14,
        "ko": "뱀",
        "en": "snake"
    }
}

# 물 스펀지 나무 가위 불 (수토목금화)
RPS_5 = {
    "sci": {
        "idx": 0,
        "ko": "가위",
        "en": "scissors"
    },
    "fir": {
        "idx": 1,
        "ko": "불",
        "en": "fire"
    },
    "wat": {
        "idx": 2,
        "ko": "물",
        "en": "water"
    },
    "spo": {
        "idx": 3,
        "ko": "스펀지",
        "en": "sponge"
    },
    "tre": {
        "idx": 4,
        "ko": "나무",
        "en": "tree"
    }
}
