import { request } from "./api";

const getFindRoadProblems = () => {
  const requestProps = {
    method: "GET",
    url: "/assessment-centre/road",
    // data: props,
  };
  const res = request(requestProps);
  return res;
};

const putFindRoadProblems = (props: object) => {
  const requestProps = {
    method: "POST",
    url: "/assessment-centre/road",
    data: props,
  };
  const res = request(requestProps);
  return res;
};

export { getFindRoadProblems, putFindRoadProblems };
