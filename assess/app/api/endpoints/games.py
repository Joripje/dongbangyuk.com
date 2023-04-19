from typing import List
from fastapi import APIRouter, Response, HTTPException
from schemas import problem
from api.functions import assessment
import pymongo

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
async def roadroad(incoming_answer: problem.RoadAnswerIncoming):
    problems = incoming_answer.problems
    results = []
    for problem in problems:
        arr = problem.answer
        result = await assessment.find_road(arr)
        # print(result)
        results.append(result['status'])

    # MongoDB에 채점 결과 저장
    storing_collection = db["test_road_results"]
    document = {
        "user_id": incoming_answer.user_id,
        "date": incoming_answer.date,
        "game_type": incoming_answer.game_type,
        "results": results,
    }
    storing_collection.insert_one(document)

    return Response(content=f"Result: {results}", status_code=200)
