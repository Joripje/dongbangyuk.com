const headers = {
  "Content-Type": "application/json",
};

// const baseUrl = "http://localhost:8000/";
// const baseUrl = "http://70.12.246.183:8000";
// const baseUrl = "https://k8a305.p.ssafy.io";
const baseUrl = "http://k8a305.p.ssafy.io:8020";

interface RequestProps {
  method: string;
  url: string;
  data?: {
    [key: string]: any;
  };
}

export default async function request(props: RequestProps) {
  const { method, data, url } = props;
  console.log(data);
  const options = {
    method,
    headers,
  };
  let requestUrl = baseUrl + url;

  // if (data && Object.keys(data).length > 0) {
  //   requestUrl += "?";
  //   let isFirstParam = true;
  //   for (const key in data) {
  //     if (data.hasOwnProperty(key)) {
  //       if (!isFirstParam) {
  //         requestUrl += "&";
  //       }
  //       requestUrl += key + "=";
  //       requestUrl += data[key];
  //       isFirstParam = false;
  //     }
  //   }
  // }

  if (data && Object.keys(data).length > 0) {
    const searchParams = new URLSearchParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        searchParams.set(key, data[key]);
      }
    }
    requestUrl += "?" + searchParams.toString();
    console.log(requestUrl);
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
