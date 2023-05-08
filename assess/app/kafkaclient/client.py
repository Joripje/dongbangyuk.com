from dotenv import load_dotenv
import os

load_dotenv()

# 원격 서버
KAFKA_INSTANCE = os.environ.get('KAFKA_INSTANCE')
# 로컬 테스트
# KAFKA_INSTANCE = "172.20.110.182:9092"
