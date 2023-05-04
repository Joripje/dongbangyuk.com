import request from "./api";

const getStatisticsData = (props: object) => {
  const requestProps = {
    method: "GET",
    url: "/ability/",
    data: props,
  };
  const res = request(requestProps);
  return res;
};

export { getStatisticsData };
