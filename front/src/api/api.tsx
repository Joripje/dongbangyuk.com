const headers = {
  "Content-Type": "application/json",
};

// const baseUrl = "http://localhost:8000/";
const baseUrl = "http://192.168.0.13:8000";
// const baseUrl = "https://j8a802.p.ssafy.io/api/";

interface RequestProps {
  method: string;
  url: string;
  data: object;
}

export default async function request(props: RequestProps) {
  const { method, data, url } = props;
  const options = {
    method,
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(baseUrl + url, options);
    if (!response.ok) {
      throw new Error(`HTTP error!: ${response}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}
