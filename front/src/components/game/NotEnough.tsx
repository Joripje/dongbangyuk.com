import { Button } from "@mui/material";
import { auth } from "service";
import { getUserInfo } from "api/member";
import { requestGet } from "api/api";

function NotEnough() {
  // const tokenHandler = async () => {
  //   const userToken = await auth.currentUser?.getIdToken();
  //   console.log(userToken);
  //   if (auth.currentUser) getUserInfo({ Authorization: userToken });
  // };

  const apiHandler = async () => {
    const props = {
      method: "GET",
      url: `/plays/userInfo`,
      data: { gameId: "20" },
    };
    requestGet(props);
  };

  return (
    <>
      <div>화면이 1920 X 1080 이상이어야지 정상적인 시험을 칠 수 있어요</div>
      <Button onClick={apiHandler}>시험해보세용</Button>
    </>
  );
}

export default NotEnough;
