const headers = {
  "Content-Type": "application/json",
};

// const baseUrl = "http://localhost:8000/";
// const baseUrl = "http://70.12.246.183:8000";
const baseUrl = "https://k8a305.p.ssafy.io";
// const baseUrl = "http://k8a305.p.ssafy.io:8040";

interface RequestProps {
  method: string;
  url: string;
  data?: {
    [key: string]: any;
  };
}

const request = async (props: RequestProps) => {
  const { method, data, url } = props;
  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjFiYjI2MzY4YTNkMWExNDg1YmNhNTJiNGY4M2JkYjQ5YjY0ZWM2MmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaC0zMzdiNSIsImF1ZCI6ImgtMzM3YjUiLCJhdXRoX3RpbWUiOjE2ODM4NzQ4MDcsInVzZXJfaWQiOiIzbFd0a1E2VHZOYmRqNGd4SElCa2V5cEE2YjQyIiwic3ViIjoiM2xXdGtRNlR2TmJkajRneEhJQmtleXBBNmI0MiIsImlhdCI6MTY4Mzg3NDgwNywiZXhwIjoxNjgzODc4NDA3LCJlbWFpbCI6ImJ5ajk5MDYwM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYnlqOTkwNjAzQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.gmkyko0Y9DRW_iTVhqxF0I1G9IGbYSUIVguKCNlsMyf_oADWb8pJ4BRUjdlB9o80iL4aV3lLN3-QsryrztlRsRgOlxnqGqU5RZblCI9TeLYUSMlFf0Ya1BiduNveqAMLbfq4CKYN577x5ZyAeo4IeZe40k6V5rmokYJAexZSrr1YKWEk5NJbyG2atuvohqUteDbzIvH0Re14e2EWKurVyrBXij66wVaYkX_tIrTyBGUT--R4-RyurvOF1Wik4a2SIzGJmbzZF95Nu_AhneozMaBNXyk1pd7Ib2albViMTtJS6WNOIzlSTtaE_9G9XgXwhRl_sWKoKUZORjRjCl3VYg",
  };
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
    if (json.msg) {
      console.log(json.msg);
      console.log("제 점수는요? " + json.score + "점 입니다~");
    }
    return json;
  } catch (error) {
    console.error(error);
  }
};

const requestGet = async (props: RequestProps) => {
  const { method, data, url } = props;
  const options = {
    method,
    headers,
  };
  let requestUrl = baseUrl + url;

  if (data && Object.keys(data).length > 0) {
    const searchParams = new URLSearchParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        searchParams.set(key, data[key]);
      }
    }
    requestUrl += "?" + searchParams.toString();
  }

  try {
    const response = await fetch(requestUrl, options);
    if (!response.ok) {
      throw new Error(`HTTP error!: ${response}`);
    }
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error);
  }
};

export { request, requestGet };
