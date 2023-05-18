import requests

def flag(game_id, game_type, is_video):
    url = 'http://k8a305.p.ssafy.io:8040/flag'
    params = {
        'gameid': game_id,
        'type': game_type,
        'video': is_video,
    }
    response = requests.get(url, params=params)
    return response.status_code