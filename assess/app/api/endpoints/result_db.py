from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from db.mongodb import result_db
import json

router = APIRouter()


@router.get("/results/{game_type}")
async def get_results(game_type: str):
    collection = result_db[game_type]
    result = []
    for document in collection.find():
        document.pop('_id', None)
        document['date'] = document['date'].isoformat()
        document.pop('timestamps', None)
        result.append(document)
    content = {
        "msg": f"{len(result)} {game_type} game result(s) found from DB.",
        "result": result
    }
    return JSONResponse(content=content, status_code=200)


@router.delete("/results/{game_type}/delete")
async def delete_all_results(game_type: str):
    collection = result_db[game_type]
    response = collection.delete_many({})
    content = {
        "msg": f"{response.deleted_count} game result(s) deleted from DB."
    }
    return JSONResponse(content=content, status_code=200)


