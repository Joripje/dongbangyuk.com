from aiokafka import AIOKafkaProducer
from kafkaclient.client import KAFKA_INSTANCE
import asyncio

loop = asyncio.get_event_loop()

aioproducer = AIOKafkaProducer(loop=loop, bootstrap_servers=KAFKA_INSTANCE)
