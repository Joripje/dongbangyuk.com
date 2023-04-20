import request from "./api";

interface RequestProps {
  method: string;
  url: string;
  data: object;
}

const roadroadya = (props: RequestProps) => {
  //   const { method, url, data } = props;
  request(props);
};

export { roadroadya };
