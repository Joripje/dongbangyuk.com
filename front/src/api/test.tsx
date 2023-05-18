import { stop } from "components/common";
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

const postAnswers = (props: object) => {
  const requestProps = JSON.stringify({
    ...props,
    gameId: localStorage.getItem("gameId"),
  });

  // const res = request(requestProps);
  localStorage.setItem("gameResult", requestProps);
  stop();
};

export { getFindRoadProblems, postAnswers };
