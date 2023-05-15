from api.functions.load_data import select_notification_from_mongo, select_new_notification_from_mongo, drop_notification_in_mongo, drop_all_notification_in_mongo

def select_notification(user_id):
    notification_list = select_notification_from_mongo(user_id)

    return notification_list


def select_new_notification(user_id):
    new_notification_count = select_new_notification_from_mongo(user_id)

    return new_notification_count


def drop_notification(user_id, game_id):
    result = drop_notification_in_mongo(user_id, game_id)

    return result


def drop_all_notification(user_id):
    result = drop_all_notification_in_mongo(user_id)

    return result
