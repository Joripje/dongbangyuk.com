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

const postAnswers = (props: object) => {
  const requestProps = {
    method: "POST",
    url: "/images/recordPlay",
    data: props,
  };
  const res = request(requestProps);
  return res;
};

const postRoateAnswers = (props: object) => {
  const requestProps = {
    method: "POST",
    url: "/assessment-centre/rotate",
    data: props,
  };
  const res = request(requestProps);
  return res;
};

const postCatAnswers = (props: object) => {
  const requestProps = {
    method: "POST",
    url: "/assessment-centre/cat",
    data: props,
  };
  const res = request(requestProps);
  return res;
};

export {
  getFindRoadProblems,
  postAnswers,
  putFindRoadProblems,
  postRoateAnswers,
  postCatAnswers,
};
