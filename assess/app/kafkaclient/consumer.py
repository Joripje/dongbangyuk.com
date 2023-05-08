from aiokafka import AIOKafkaConsumer
from api.endpoints.games import grade_rps_3, grade_road_game
from schemas import findroad, rps
from models import ResultModels
from kafkaclient.client import KAFKA_INSTANCE
from kafkaclient.producer import aioproducer
from datetime import datetime
import asyncio, json

loop = asyncio.get_event_loop()

# 게임 답안지 토픽(kafka.assess.answer.json) 받아오는 컨슈머
consumer1 = AIOKafkaConsumer("kafka.assess.answer.json", bootstrap_servers=KAFKA_INSTANCE, loop=loop)

# 다른 토픽 받아오는 컨슈머 (test)
consumer2 = AIOKafkaConsumer("test", bootstrap_servers=KAFKA_INSTANCE, loop=loop)


class DateTimeEncoder(json.JSONEncoder):
    '''
    Encoder to encode timestamp object to json. \n
    채점결과 데이터에 포함된 timestamp 객체를 json으로 변환.
    '''
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return json.JSONEncoder.default(self, obj)


async def consume1():
    await consumer1.start()
    try:
        async for msg in consumer1:
            value = json.loads(msg.value.decode('utf-8'))
            game_type = value['gameType']
            print(
                "consumed: ",
                msg.topic,
                msg.partition,
                msg.offset,
                msg.key,
                # msg.value.decode('utf-8'),
                game_type,
                datetime.utcfromtimestamp(msg.timestamp / 1000).strftime("%Y-%m-%d %H:%M:%S"),
            )
            
            if game_type == 'rps':
                answer = rps.RpsAnswer(**value)
                res = await grade_rps_3(answer)
                result = ResultModels.RpsGameResult(**res)
                # print(result)

                # 채점결과 저장 토픽으로 채점결과 데이터 보내기
                await aioproducer.send('kafka.assess.result.json', json.dumps(result.dict(), cls=DateTimeEncoder).encode('utf-8'))
            
            elif game_type == 'road':
                answer = findroad.RoadAnswerIncoming(**value)
                res = await grade_road_game(answer)
            
    finally:
        await consumer1.stop()


async def consume2():
    await consumer2.start()
    try:
        async for msg in consumer2:
            print(
                "consumed: ",
                msg.topic,
                msg.partition,
                msg.offset,
                msg.key,
                msg.value.decode('utf-8'),
                datetime.utcfromtimestamp(msg.timestamp / 1000).strftime("%Y-%m-%d %H:%M:%S"),
            )
    finally:
        await consumer2.stop()