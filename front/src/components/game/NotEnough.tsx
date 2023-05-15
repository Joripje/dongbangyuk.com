import { Button } from "@mui/material";
import { auth } from "service";
import { getUserInfo } from "api/member";

function NotEnough() {
  const tokenHandler = async () => {
    const userToken = await auth.currentUser?.getIdToken();
    console.log(userToken);
    if (auth.currentUser) getUserInfo({ Authorization: userToken });
  };
  return (
    <>
      <div>화면이 1920 X 1080 이상이어야지 정상적인 시험을 칠 수 있어요</div>
      <Button onClick={tokenHandler}>시험해보세용</Button>
    </>
  );
}

export default NotEnough;
