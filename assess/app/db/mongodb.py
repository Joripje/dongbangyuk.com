import pymongo

client = pymongo.MongoClient("mongodb://mongodb_server:27017/")
# client = pymongo.MongoClient("mongodb://localhost:27017/")
problem_db = client["game_problem"]
result_db = client["game_result"]