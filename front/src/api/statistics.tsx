import { requestGet } from "./api";

const getAbilityData = async (props: object) => {
  const requestProps = {
    method: "GET",
    url: "/ability/",
    data: props,
  };
  const res = await requestGet(requestProps);
  console.log(res);
  return res;
};

const getVideoData = async (props: object) => {
  const requestProps = {
    method: "GET",
    url: "/videos/data",
    data: props,
  };
  const res = await requestGet(requestProps);
  console.log(res);
  return res;
};

export { getAbilityData, getVideoData };
