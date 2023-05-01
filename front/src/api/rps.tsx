import request from "./api";

const postRpsResults = (props: object) => {
  const requestProps = {
    method: 'POST',
    url: '/assessment-centre/rps',
    data: props,
  };
  const res = request(requestProps);
  return res
}

export {postRpsResults};