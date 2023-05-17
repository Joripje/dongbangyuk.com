import { request } from "./api";

const postLuckyday = (props: object) => {
  const requestProps = {
    method: "POST",
    url: "/unse/luckyday",
    data: props,
  };
  const res = request(requestProps);
  return res;
};

const postToday = (props: object) => {
  const requestProps = {
    method: "POST",
    url: "/unse/today",
    data: props,
  };
  const res = request(requestProps);
  return res;
};

export { postLuckyday, postToday };
