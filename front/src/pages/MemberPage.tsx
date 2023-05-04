import { useState, MouseEvent } from "react";
import { SignUp } from "components/member";

import styled from "styled-components";
import { Container, Button } from "@mui/material";

function MemberPage() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const onPageSelectHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLogin(!isLogin);
  };

  return (
    <StyledContainer fixed>
      <h1>동 방 역 검 {isLogin ? "로그인" : "회원 가입"}</h1>
      <SignUp isLogin={isLogin} />
      <Button onClick={onPageSelectHandler}>
        {isLogin ? "회원 가입" : "로그인"} 페이지루~
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
