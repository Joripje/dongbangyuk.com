import { requestGet } from "./api";

const getAbilityData = async (props: object) => {
  const requestProps = {
    method: "GET",
    url: "/ability/",
    data: props,
  };
  const res = await requestGet(requestProps);
  return res;
};

const getVideoData = async (props: object) => {
  const requestProps = {
    method: "GET",
    url: "/videos/data",
    data: props,
  };
  const res = await requestGet(requestProps);
  return res;
};

const getGamesData = async (props: object) => {
  const requestProps = {
    method: "GET",
    url: "/stat/games",
    data: props,
  };
  const res = await requestGet(requestProps);
  return res;
};

const getEmotionData = async (props: object) => {
  const requestProps = {
    method: "GET",
    url: "/videos/emotion",
    data: props,
  };
  const res = await requestGet(requestProps);
  return res;
};

const getStatisicsListData = async (props: object) => {
  const requestProps = {
    method: "GET",
    url: "/stat/history",
    data: props,
  };
  const res = await requestGet(requestProps);
  return res;
};

export {
  getAbilityData,
  getVideoData,
  getGamesData,
  getEmotionData,
  getStatisicsListData,
};
