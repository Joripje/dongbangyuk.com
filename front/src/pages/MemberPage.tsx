import { useState, MouseEvent } from "react";
import SignUp from "service/Singup";

import styled from "styled-components";
import { Container, Button } from "@mui/material";

function MemberPage() {
  // true일 경우 로그인
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const onPageSelectHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(event.target);
    setIsLogin(!isLogin);
  };

  return (
    <StyledContainer fixed>
      <h1>동 방 역 검 {isLogin ? "로그인" : "회원 가입"}</h1>
      <SignUp isLogin={isLogin} />
      <Button onClick={onPageSelectHandler}>
        {isLogin ? "로그인" : "회원 가입"}
      </Button>
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: " center",
  padding: "0 20%",
});

export default MemberPage;
