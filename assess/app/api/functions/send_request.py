import requests, json


def flag(game_id, game_type, is_video):
    url = f'/flag?gameid={game_id}&type={game_type}&video={is_video}'
    res = requests.get(url).json()
    return res