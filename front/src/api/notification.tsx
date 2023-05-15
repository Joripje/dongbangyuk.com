import { request, requestGet } from "./api";

const getNotificationData = async (props: object) => {
  const requestProps = {
    method: "GET",
    url: "/notification/",
    data: props,
  };
  const res = await requestGet(requestProps);
  console.log(res);
  return res;
};

const getNewNotificationCount = async (props: object) => {
  const requestProps = {
    method: "GET",
    url: "/notification/new",
    data: props,
  };
  const res = await requestGet(requestProps);
  console.log(res);
  return res;
};

const deleteNotification = (props: object) => {
  const requestProps = {
    method: "DELETE",
    url: "/notification/delete",
    data: props,
  };
  const res = request(requestProps);
  return res;
};

const deleteAllNotification = (props: object) => {
  const requestProps = {
    method: "DELETE",
    url: "/notification/delete/all",
    data: props,
  };
  const res = request(requestProps);
  return res;
};

export {
  getNotificationData,
  getNewNotificationCount,
  deleteNotification,
  deleteAllNotification,
};
