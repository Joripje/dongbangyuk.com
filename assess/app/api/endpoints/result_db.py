from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from api.functions.timestamps import time_normalization
from db.mongodb import result_db

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


@router.get("/results/", description='game_id로 조회하여 results 및 초기값 0으로 맞춰진 timestamps 반환')
async def find_game_id(game_id: int):
    query = {"game_id": game_id}
    result = None
    for collection_name in result_db.list_collection_names():
        collection = result_db[collection_name]
        document = collection.find_one(query)
        if document:
            document.pop('_id', None)
            document['date'] = document['date'].isoformat()
            result = document
            break
    
    if result:
        timestamps = time_normalization(result['timestamps'])
        content = {
            "results": result['results'],
            "timestamps": timestamps,
        }
        return JSONResponse(content=content, status_code=200)
    else:
        raise HTTPException(status_code=404, detail=f"game_id {game_id} not found from DB.")


@router.delete("/results/{game_type}/delete")
async def delete_all_results(game_type: str):
    collection = result_db[game_type]
    response = collection.delete_many({})
    content = {
        "msg": f"{response.deleted_count} game result(s) deleted from DB."
    }
    return JSONResponse(content=content, status_code=200)


