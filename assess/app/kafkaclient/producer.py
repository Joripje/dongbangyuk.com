from aiokafka import AIOKafkaProducer
from kafkaclient.client import KAFKA_INSTANCE
from datetime import datetime
import asyncio, json

loop = asyncio.get_event_loop()


class DateTimeEncoder(json.JSONEncoder):
    '''
    Encoder to encode timestamp object to json. \n
    채점결과 데이터에 포함된 timestamp 객체를 json으로 변환.
    '''
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return json.JSONEncoder.default(self, obj)
    

def serializer(value):
    return json.dumps(value, cls=DateTimeEncoder).encode('utf-8')


aioproducer = AIOKafkaProducer(loop=loop, bootstrap_servers=KAFKA_INSTANCE, value_serializer=serializer)
