import { request, requestGet } from "./api";

type DataType = {
  [key: string]: undefined | string | number;
};

const getUserInfo = (props: object) => {
  const requestProps = {
    method: "GET",
    url: "/users/myInfo",
    data: props,
  };
  const res = request(requestProps);
  return res;
};

const makeUser = (props: object) => {
  const requestProps = {
    method: "POST",
    url: "/users",
    data: props,
  };
  const res = request(requestProps);
  return res;
};

const getGameData = async (props: DataType) => {
  const requestProps = {
    method: "GET",
    url: `/plays/${props.param}`,
  };
  requestGet(requestProps);
};

const getUserId = async (props: DataType) => {
  const requestProps = {
    method: "GET",
    url: `/plays/userInfo`,
    data: { gameId: props.param },
  };
  requestGet(requestProps);
};

const getGameIds = async (props: DataType) => {
  const requestProps = {
    method: "GET",
    url: `/plays/users/${props.param}`,
  };
  requestGet(requestProps);
};

export { getUserInfo, makeUser, getGameData, getUserId, getGameIds };
