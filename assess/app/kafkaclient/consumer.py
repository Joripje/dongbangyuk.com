from aiokafka import AIOKafkaConsumer
from kafkaclient.client import KAFKA_INSTANCE
from kafkaclient.producer import aioproducer
from api.endpoints.games import grade_rps_3, grade_road_game
from schemas import findroad, rps
from models import ResultModels
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


def kafka_timestamp_to_str(timestamp: int):
    obj = datetime.utcfromtimestamp(timestamp / 1000)
    return obj.strftime("%Y-%m-%d %H:%M:%S")


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
                game_type,
                kafka_timestamp_to_str(msg.timestamp)
            )
            
            if game_type == 'rps':
                answer = rps.RpsAnswer(**value)
                response = await grade_rps_3(answer)
                result = ResultModels.RpsGameResult(**response)
                # print(result)

                # 채점결과 저장 토픽으로 채점결과 데이터 보내기
                data = json.dumps(result.dict(), cls=DateTimeEncoder).encode('utf-8')
                await aioproducer.send('kafka.assess.result.json', data)
            
            elif game_type == 'road':
                answer = findroad.RoadAnswerIncoming(**value)
                response = await grade_road_game(answer)
            
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
                kafka_timestamp_to_str(msg.timestamp),
            )
    finally:
        await consumer2.stop()