from typing import List, Optional
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from schemas import user, common, findroad, rps
from models import ProblemModels, ResultModels
from api.functions import assessment, score_calc, send_request
from db.mongodb import problem_db, result_db
from kafka import KafkaProducer
import random

router = APIRouter()

producer_config = {
    'bootstrap_servers': 'kafka:9092'
}

producer = KafkaProducer(**producer_config)


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

    # result_db["rps"].insert_one(document.dict())

    # 채점 완료, 저장 후 분석 서버로 채점완료 요청 보내기
    # send_request.flag(incoming.game_id, incoming.game_type, False)
    
    # Kafka topic에 메시지 저장
    message = f'{incoming.game_type} access completed. game_id: {incoming.game_id}'
    producer.send('test', message.encode('utf-8'))
    producer.flush()

    content = {
        "msg": "RPS game result saved to DB.",
        "game_id": document.game_id,
        "user_id": incoming.user_id,
        "score": score
    }
    return JSONResponse(content=content, status_code=200)
