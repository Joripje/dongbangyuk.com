import React from "react";
import styled from "styled-components";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { auth } from "service";
import { signOut, deleteUser } from "firebase/auth";

import hackjoo from "../../assets/images/profile/hackjoo.png";

function UserInfo() {
  const navigate = useNavigate();

  const buttons = ["로그아웃", "회원탈퇴", "회원정보수정"];

  const handleUserInfo = (cmd: string, e: any) => {
    // console.log(cmd);
    if (cmd === "로그아웃") {
      if (auth.currentUser !== null) {
        auth.signOut().then(() => console.log("로그아웃!!"));
        navigate("/member");
      } else console.log("로그인되어있지않습니다.");
      return;
    } else if (cmd === "회원탈퇴") {
      if (
        window.confirm("정말 회원탈퇴를 하시겠습니까?") &&
        auth.currentUser !== null
      ) {
        deleteUser(auth.currentUser)
          .then(() => {
            console.log("회원탈퇴완료");
            navigate("/member");
          })
          .catch((e) => console.log(e));
      }
    } else if (cmd === "회원정보수정") {
    }
  };
  console.log(auth.currentUser);
  return (
    <Box1>
      <UserBox>
        <ImgBox src={hackjoo} alt="계묘계묘노" />
        <h1>username</h1>
      </UserBox>
      <AuthBox>
        {buttons.map((cmd, idx) => (
          <Button key={idx} onClick={(e) => handleUserInfo(cmd, e)}>
            {cmd}
          </Button>
        ))}
        {/* <Button onClick={handleLogout}>logout</Button> */}
      </AuthBox>
    </Box1>
  );
}
const ImgBox = styled.img({
  width: "20vw",
  height: "20vh",
  borderRadius: "1rem",
  margin: "4rem",
});

const UserBox = styled.div({
  // backgroundColor: "grey",
  height: "30vh",
  width: "60vw",
  display: "flex",
});

const AuthBox = styled.div({
  display: "flex",
  width: "20vw",
  height: "7vh",
  gap: "1rem",
});

const Button = styled.button({
  width: "7vw",
  backgroundColor: "#D1E6FF",
  borderRadius: "1rem",
  fontSize: "1rem",
  marginTop: "1rem",
  cursor: "pointer",
});

const Box1 = styled(Box)({
  display: "flex",
  marginTop: "15vh",
  marginLeft: "10vw",
  backgroundColor: "#DEF5E5",
  width: "80vw",
  height: "30vh",
  borderRadius: "1rem",
});

export default UserInfo;
