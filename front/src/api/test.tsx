import request from "./api";

interface RequestProps {
  method: string;
  url: string;
  data: object;
}

const roadroadya = (props: RequestProps) => {
  request(props);
};

export { roadroadya };
