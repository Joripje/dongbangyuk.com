from aiokafka import AIOKafkaConsumer
from kafkaclient.client import KAFKA_INSTANCE
from kafkaclient.producer import producer
from api.endpoints.videos import video_analysis
from schemas.schemas_videos import VideoBase
from datetime import datetime
import asyncio, json

loop = asyncio.get_event_loop()

# 영상 정보 토픽(kafka.ai.video.json) 받아오는 컨슈머
consumer = AIOKafkaConsumer("kafka.ai.video.json", bootstrap_servers=KAFKA_INSTANCE, loop=loop)


def kafka_timestamp_to_str(timestamp: int):
    obj = datetime.utcfromtimestamp(timestamp / 1000)
    return obj.strftime("%Y-%m-%d %H:%M:%S")


async def consume():
    await consumer.start()
    try:
        async for msg in consumer:
            print(
                "consumed: ",
                msg.topic,
                msg.partition,
                msg.offset,
                msg.key,
                msg.value.decode('utf-8'),
                kafka_timestamp_to_str(msg.timestamp)
            )

            value = json.loads(msg.value.decode('utf-8'))
            video = VideoBase(**value)
            response = await video_analysis(video=video)

    finally:
        await consumer.stop()
