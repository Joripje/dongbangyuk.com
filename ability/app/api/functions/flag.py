# from pymongo import MongoClient
#
# # 몽고디비에 저장하는 코드
#
# client = MongoClient('localhost', 27017)
# db = client['flag']
# collection = db['flag']
#
#
# def select_flag(gameid):
#     flag = collection.find_one({'_id': gameid})
#
#     if flag:
#         return (flag['assess'], flag['video'])
#
#     else:
#         return (False, False)
#
#
# def create_flag(gameid, video):
#     if video:
#         data = {'_id':gameid,
#                 'assess': False,
#                 'video': True,
#         }
#
#     else:
#         data = {'_id':gameid,
#                 'assess': True,
#                 'video': False,
#         }
#
#     collection.insert_one(data)
#
#     return 1
#
#
# def update_flag(gameid, video):
#     if video:
#         collection.update_one(
#             {'_id': gameid},
#             {'$set': {'video': True}}
#         )
#
#     else:
#         collection.update_one(
#             {'_id': gameid},
#             {'$set': {'assess': True}}
#         )
#
#     return 1

# MySQL에 저장하는 코드

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.model_flag import Flag
from api.functions.ability import ability
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

Session = sessionmaker(bind=engine)
session = Session()


def select_flag(gameid):
    # gameid로 조회
    flag = session.query(Flag).filter_by(game_id=gameid).first()


    if flag:
        if flag.is_deleted:
            return (True, True)
        else:
            return (flag.assess, flag.video)

    else:
        return (False, False)


def create_flag(gameid, video):
    if video:
        new_flag = Flag(game_id=gameid, assess=False, video=True, is_deleted=False)

    else:
        new_flag = Flag(game_id=gameid, assess=True, video=False, is_deleted=False)

    session.add(new_flag)
    session.commit()

    return 1


def update_flag(gameid, video):
    flag = session.query(Flag).filter_by(game_id=gameid, is_deleted=False).first()

    if video:
        flag.video = True
        # flag.is_deleted = True

    else:
        flag.assess = True
        # flag.is_deleted = True

    session.commit()

    return 1


def check_flags():
    flags = session.query(Flag).filter(Flag.is_deleted == False).all()
    for flag in flags:
        if flag.assess and flag.video:
            ability(flag.game_id, flag.type)
            # ability(1)
            flag.is_deleted = True
            session.add(flag)
    session.commit()