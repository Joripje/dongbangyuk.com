from typing import List
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from schemas import common, findroad, rps
from api.functions import assessment
import pymongo
import json

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["test_database"]
collection = db["test_collection"]

router = APIRouter()


@router.get("/problems")
async def get_problems():
    result = []
    for document in collection.find():
        document.pop('_id', None)
        result.append(document)
    return result


@router.get("/problems/{problem_id}")
async def get_problem(problem_id: int):
    document = collection.find_one({'problem_id': problem_id})
    if document:
        document.pop('_id', None)
        return document
    else:
        raise HTTPException(
            status_code=404, detail="Problem not found in database. No such problem_id.")


@router.post("/assessment-centre/road")
async def grade_road_game(incoming: findroad.RoadAnswerIncoming):
    problems = incoming.problems
    results = []
    timestamps = []
    for problem in problems:
        arr = problem.answer
        timestamp = problem.timestamp
        result = await assessment.find_road(arr)
        # print(result)
        results.append(result['status'])
        timestamps.append(timestamp)

    score = [sum(results), len(results)]  # [맞은 문제수, 푼 문제수]
    
    # MongoDB에 채점 결과 저장
    storing_collection = db["test_road_results"]
    document = findroad.RoadGameResult(
        id=incoming.game_id, 
        user_id=incoming.user_id, 
        date=incoming.date, 
        game_type=incoming.game_type, 
        results=results, 
        timestamps=timestamps,
        score=score
        )

    # storing_collection.insert_one(document.dict())

    content = {
        "msg": "Road game result saved to DB.",
        "result": document.dict(),
    }
    return JSONResponse(content=content, status_code=200)


@router.post("/assessment-centre/rps")
async def grade_rps_game(incoming: rps.RpsAnswer):
    problems = incoming.problems

    # 가위 0, 바위 1, 보 2
    results = []
    timestamps = []
    for problem in problems:
        answer = problem.answer
        timestamp = problem.timestamp
        
        # True: 이김, False: 지거나 비김
        me, you = answer
        if (me == 0 and you == 2) or (me == 1 and you == 0) or (me == 2 and you == 1):
            results.append(True)
        else:
            results.append(False)
        timestamps.append(timestamp)

    score = [sum(results), len(results)]

    # MongoDB에 채점 결과 저장
    storing_collection = db["test_road_results"]
    document = common.GameResult(
        id=incoming.game_id, 
        user_id=incoming.user_id, 
        date=incoming.date, 
        game_type=incoming.game_type, 
        results=results, 
        timestamps=timestamps,
        score=score
        )

    # storing_collection.insert_one(document.dict())

    content = {
        "msg": "RPS game result saved to DB.",
        "result": document.dict(),
    }
    return JSONResponse(content=content, status_code=200)