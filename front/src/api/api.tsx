const headers = {
  "Content-Type": "application/json",
};

// const baseUrl = "http://localhost:8000/";
// const baseUrl = "http://70.12.246.183:8000";
// const baseUrl = "http://k8a305.p.ssafy.io:8010";
const baseUrl = "http://k8a305.p.ssafy.io:8020";
// const baseUrl = "https://k8a305.p.ssafy.io";

interface RequestProps {
  method: string;
  url: string;
  data?: object;
}

export default async function request(props: RequestProps) {
  const { method, data, url } = props;
  const options = {
    method,
    headers,
    [method === "GET" ? "param" : "body"]: JSON.stringify(data),
  };

  let requestUrl = baseUrl + url;

  if (method === "GET") {
    const queryString: string = new URLSearchParams("gameid=1").toString();
    requestUrl += `?${queryString}`;
  }

  try {
    const response = await fetch(requestUrl, options);
    if (!response.ok) {
      throw new Error(`HTTP error!: ${response}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}
