from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
import time
from api.functions.flag import check_flags

scheduler = BackgroundScheduler()

scheduler.add_job(check_flags, 'interval', minutes=1)

# 스케줄러 시작
scheduler.start()

while True:
    print(datetime.now())
    time.sleep(60)