from typing import List, Optional
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from schemas import user, common, findroad, rps, cat, rotate
from models import ProblemModels, ResultModels
from api.functions import assessment, score_calc, send_request
from db.mongodb import problem_db, result_db
from kafkaclient.client import KAFKA_INSTANCE
from kafka import KafkaProducer
import random, inspect

router = APIRouter()

producer_config = {
    'bootstrap_servers': KAFKA_INSTANCE
}


@router.post("/send")
async def send_message_to_topic(topic: str, message: str):
    producer = KafkaProducer(**producer_config)
    # print("BOOTSTRAP_CONNECTED", producer.bootstrap_connected())
    response = producer.send(topic, message.encode('utf-8'))
    # print("BROKER_RESPONSE", response.__dict__)
    producer.flush()
    content = "Sending completed."
    return JSONResponse(content=content, status_code=200)
        

@router.get("/assessment-centre/road")
async def get_road_problems():
    collection = problem_db['road']
    problems = {"easy": [], "hard": []}
    for document in collection.find({"difficulty": {"$in": ["easy", "hard"]}}):
        item = {
            "problem_id": document["problem_id"],
            "problem": document["problem"],
            "correct": document["correct"]
        }
        problems[document["difficulty"]].append(item)
    
    random.shuffle(problems["easy"])
    random.shuffle(problems["hard"])

    return JSONResponse(content=problems, status_code=200)


@router.post("/assessment-centre/road")
async def grade_road_game(incoming: findroad.RoadAnswerIncoming):
    problems = incoming.problems
    results = []
    timestamps = []
    clicks = []
    corrects = []
    score = 0
    for problem in problems:
        # 채점 함수
        result = await assessment.find_road(problem.answer)
        is_correct = result['status']
        results.append(is_correct)

        # timestamp, clicks
        timestamps.append(problem.timestamp)
        clicks.append(problem.clicks)

        # problem.problem_id의 정답 값을 DB에서 검색해서 corrects 리스트에 추가
        document = problem_db['road'].find_one({'problem_id': problem.problem_id})
        correct_clicks = document["correct"]
        corrects.append(correct_clicks)

        # 채점 점수 산정
        clicks_delta = problem.clicks - correct_clicks
        score += score_calc.find_road(is_correct, clicks_delta, problem.timestamp)
    
    # MongoDB에 채점 결과 저장
    document = ResultModels.RoadGameResult(
        game_id=incoming.game_id, 
        date=incoming.date, 
        type="road", 
        results=results, 
        timestamps=timestamps,
        score=score,
        clicks=clicks,
        corrects=corrects
        )
    result_db["road"].insert_one(document.dict())

    # 채점 완료, 저장 후 분석 서버로 채점완료 요청 보내기
    # send_request.flag(incoming.game_id, incoming.game_type, False)

    content = {
        "msg": "Road game result saved to DB.",
        "game_id": document.game_id,
        "user_id": incoming.user_id,
        "score": score
    }
    return JSONResponse(content=content, status_code=200)


@router.post("/assessment-centre/rps")
async def grade_rps_3(incoming: rps.RpsAnswer):
    items = incoming.rounds
    results = []
    timestamps = []
    rounds = []
    score = 0
    for round, problems in items.items():
        for problem in problems:
            answer = problem.answer
            if answer:
                me, you = answer
                is_win = await assessment.rps_3(me, you)
            else:  # 입력시간 초과시 빈 리스트 []
                is_win = False
            results.append(is_win)
            
            # 채점 점수 산정
            score += score_calc.rps_3(is_win, round)
            
            timestamps.append(problem.timestamp)
            rounds.append(round)

    # MongoDB에 채점 결과 저장
    document = ResultModels.RpsGameResult(
        game_id=incoming.game_id, 
        date=incoming.date, 
        type="rps", 
        results=results, 
        timestamps=timestamps,
        score=score,
        rounds=rounds
        )

    result_db["rps"].insert_one(document.dict())

    # 채점 완료, 저장 후 분석 서버로 채점완료 요청 보내기
    # send_request.flag(incoming.game_id, incoming.game_type, False)

    content = {
        "msg": "RPS game result saved to DB.",
        "game_id": document.game_id,
        "user_id": incoming.user_id,
        "score": score
    }

    stack = inspect.stack()
    caller_filename = stack[1].filename
    print(f'CALLER: {caller_filename}')
    # 라우팅으로 호출된 경우 JSONResponse 반환
    if 'routing' in caller_filename:
        return JSONResponse(content=content, status_code=200)
    # 라우팅 이외의 방법으로 호출된 경우 채점결과 데이터 반환
    return document.dict()


@router.post("/assessment-centre/cat")
async def grade_cat(incoming: cat.CatAnswer):
    problems = incoming.problems
    results = []
    timestamps = []
    score = 0
    for problem in problems:
        results.append(problem.correct)
        timestamps.append(problem.timestamp)

        # 채점 점수 산정
        score += score_calc.cat(problem.correct, problem.asure)
    
    # MongoDB에 채점 결과 저장
    document = ResultModels.CatGameResult(
        game_id=incoming.game_id, 
        date=incoming.date, 
        type="cat",
        results=results, 
        timestamps=timestamps,
        score=score,
        )
    result_db["cat"].insert_one(document.dict())

    # 채점 완료, 저장 후 분석 서버로 채점완료 요청 보내기
    # send_request.flag(incoming.game_id, incoming.game_type, False)

    content = {
        "msg": "Cat game result saved to DB.",
        "game_id": document.game_id,
        "user_id": incoming.user_id,
        "score": score
    }

    stack = inspect.stack()
    caller_filename = stack[1].filename
    
    if 'routing' in caller_filename:
        return JSONResponse(content=content, status_code=200)
    
    return document.dict()


@router.post("/assessment-centre/rotate")
async def grade_rotate(incoming: rotate.RotateAnswer):
    problems = incoming.problems
    results = []
    timestamps = []
    clicks = []
    score = 0

    for problem in problems:
        before = problem.problem
        correct = problem.correct
        choices = problem.choices
        rounds = problem.rounds

        is_correct, correct_clicks = await assessment.rotate(before, correct, choices)

        results.append(is_correct)
        
        # 채점 점수 산정
        clicks_delta = problem.clicks - correct_clicks
        score += score_calc.rotate(is_correct, clicks_delta, rounds)
        
        timestamps.append(problem.timestamp)
        clicks.append(problem.clicks)

    # MongoDB에 채점 결과 저장
    document = ResultModels.RpsGameResult(
        game_id=incoming.game_id, 
        date=incoming.date, 
        type="rotate", 
        results=results, 
        timestamps=timestamps,
        score=score,
        clicks=clicks
        )

    result_db["rotate"].insert_one(document.dict())

    # 채점 완료, 저장 후 분석 서버로 채점완료 요청 보내기
    # send_request.flag(incoming.game_id, incoming.game_type, False)

    content = {
        "msg": "Rotation game result saved to DB.",
        "game_id": document.game_id,
        "user_id": incoming.user_id,
        "score": score
    }

    stack = inspect.stack()
    caller_filename = stack[1].filename

    if 'routing' in caller_filename:
        return JSONResponse(content=content, status_code=200)
    
    return document.dict()