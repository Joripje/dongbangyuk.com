import request from "./api";

interface RequestProps {
  method: string;
  url: string;
  data: object;
}

const gawigawi = (props: RequestProps) => {
  request(props);
};

export { gawigawi };
