import React, { useEffect } from "react";
import styled from "styled-components";

import { Navbar, FooterBar } from "components/common";
import { Unse } from "components/unse";

import { Chat } from "components/firebase_chat";
import { useNavigate } from "react-router-dom";
import { auth } from "service";

function MainPage() {
  const navigate = useNavigate();
  const handlePage = (e: any) => {
    if (e.target.value === "test") {
      navigate("/test");
    } else if (e.target.value === "result-total") {
      navigate("/statistics/total");
    } else if (e.target.value === "result-detail") {
      navigate("/statistics/list");
    }
  };

  return (
    <>
      <Navbar />
      <Wrapper>
        <MainBox>
          <Button value="test" onClick={handlePage}>
            실전 응시
          </Button>
          <Button value="result-total" onClick={handlePage}>
            전체 통계
          </Button>
          <Button value="result-detail" onClick={handlePage}>
            결과 보기
          </Button>
        </MainBox>
      </Wrapper>
      <Wrap>
        <Chat />
        <Unse />
      </Wrap>
      {/* <FooterBar/> */}
    </>
  );
}
const ImageBox = styled.div({
  display: "flex",
  justifyContent: "center",
  marginTop: "1rem",
});

const Wrap = styled.div({
  display: "flex",
  marginTop: "3rem",
});
const UserBox = styled.div({
  backgroundColor: "#F4F4F5",
  width: "30%",
  height: "90%",
  borderRadius: "1rem",
  marginTop: "2rem",
  textAlign: "center",
});
const Button = styled.button({
  fontSize: "2rem",
  backgroundColor: "#F4F4F5",
  width: "30%",
  height: "90%",
  borderRadius: "1rem",
  marginTop: "2rem",
  cursor: "pointer",
  transition: "all 0.8s, color 0.3",
  "&:hover": {
    color: "#fff",
    boxShadow:
      "inset 50vw 0 0 0 rgba(0,0,0,0.25), inset -50vw 0 0 0 rgba(0,0,0,0.25)",
  },
});

const Wrapper = styled.div({
  display: "flex",
  justifyContent: "center",
});

const MainBox = styled.div({
  display: "flex",
  justifyContent: "space-around",
  width: "90vw",
  height: "20vh",
  // backgroundColor: "grey",
  marginTop: "10vh",
});

export default MainPage;
