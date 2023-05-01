from typing import List, Optional
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from schemas import user, common, findroad
from models import ProblemModels, ResultModels
from db.mongodb import problem_db

router = APIRouter()


@router.get("/problems/{game_type}")
async def get_problems(game_type: str):
    collection = problem_db[game_type]
    result = []
    for document in collection.find():
        document.pop('_id', None)
        result.append(document)
    return result


@router.get("/problems/{game_type}/{problem_id}")
async def get_one_problem(game_type: str, problem_id: int):
    collection = problem_db[game_type]
    document = collection.find_one({'problem_id': problem_id})
    if document:
        document.pop('_id', None)
        return document
    else:
        raise HTTPException(
            status_code=404, detail="Problem not found in database. No such problem_id.")


@router.post("/problems/{game_type}/single")
async def store_single_problem(game_type: str, data: findroad.RoadProblemStoringDB):
    collection = problem_db[game_type]
    collection.insert_one(data.dict())

    content = {
        "msg": "1 Road game problem saved to DB.",
        "problem id": data.problem_id
    }
    return JSONResponse(content=content, status_code=200)


@router.post("/problems/{game_type}/multi")
async def store_multiple_problems(game_type: str, data_list: List[findroad.RoadProblemStoringDB]):
    collection = problem_db[game_type]
    data_dicts = [data.dict() for data in data_list]
    collection.insert_many(data_dicts)

    content = {
        "msg": f"{len(data_dicts)} Road game problem(s) saved to DB."
    }
    return JSONResponse(content=content, status_code=200)


# @router.delete("/problems/{game_type}/delete")
# async def delete_all_problems(game_type: str):
#     collection = problem_db[game_type]
#     response = collection.delete_many({})
#     content = {
#         "msg": f"{response.deleted_count} Road game problem(s) deleted from DB."
#     }
#     return JSONResponse(content=content, status_code=200)


