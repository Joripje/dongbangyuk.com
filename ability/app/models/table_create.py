# from sqlalchemy import create_engine
# from dotenv import load_dotenv
# import os
#
# # .env 불러오기
# load_dotenv()
#
# db_id = os.environ.get('DB_ID')
# db_password = os.environ.get('DB_PASSWORD')
# db_ip = os.environ.get('DB_IP')
# db_port = os.environ.get('DB_PORT')
# db_name = os.environ.get('DB_NAME')
#
# engine = create_engine(f'mysql+pymysql://{db_id}:{db_password}@{db_ip}:{db_port}/{db_name}', encoding='utf-8')
#


from sqlalchemy import create_engine, Column, Integer, Boolean
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv
import os

# .env 불러오기
load_dotenv()

db_id = os.environ.get('DB_ID')
db_password = os.environ.get('DB_PASSWORD')
db_ip = os.environ.get('DB_IP')
db_port = os.environ.get('DB_PORT')
db_name = os.environ.get('DB_NAME')

engine = create_engine(f'mysql+pymysql://{db_id}:{db_password}@{db_ip}:{db_port}/{db_name}')

# 모델 클래스 정의
Base = declarative_base()


class Flag(Base):
    __tablename__ = 'flag'
    game_id = Column(Integer, primary_key=True)
    assess = Column(Boolean, default=False)
    video = Column(Boolean, default=False)
    is_deleted = Column(Boolean, default=False)

# 테이블 생성
Base.metadata.create_all(engine)