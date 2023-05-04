import request from "./api";

const getAbilityData = (props: object) => {
  const requestProps = {
    method: "GET",
    url: "/ability/",
    data: props,
  };
  const res = request(requestProps);
  return res;
};

const getVideoData = async (props: object) => {
  const requestProps = {
    method: "GET",
    url: "/videos/data",
    data: props,
  };
  const res = await request(requestProps);
  console.log(res);
  return res;
};

export { getAbilityData, getVideoData };
