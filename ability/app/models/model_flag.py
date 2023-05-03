from sqlalchemy import Column, Integer, Boolean, String
from sqlalchemy.ext.declarative import declarative_base

# 모델 클래스 정의
Base = declarative_base()


class Flag(Base):
    __tablename__ = 'flag'
    game_id = Column(Integer, primary_key=True)
    assess = Column(Boolean, default=False)
    video = Column(Boolean, default=False)
    is_deleted = Column(Boolean, default=False)
    type = Column(String(10))
