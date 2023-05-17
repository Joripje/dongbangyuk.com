import React from "react";
import styled from "styled-components";

import { Navbar } from "components/common";
import { Chat } from "components/firebase_chat";
import { GG, janban } from "assets/images";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  const handlePage = (e: any) => {
    if (e.target.value === "test") {
      navigate("/test");
    } else if (e.target.value === "result") {
      navigate("/statistics");
    }
  };
  return (
    <>
      <Navbar />
      <Wrapper>
        <MainBox>
          <UserBox>
            <ImageBox>
              <img
                style={{ width: "20vw", height: "20vh" }}
                src={janban}
                alt=""
              />
            </ImageBox>
            <h1>잔반이</h1>
          </UserBox>
          <Button value="test" onClick={handlePage}>
            <h1>실전 응시</h1>
          </Button>
          <Button value="result" onClick={handlePage}>
            <h1>결과표 확인</h1>
          </Button>
        </MainBox>
      </Wrapper>
      <Wrap>
        <Chat />
      </Wrap>
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
  justifyContent: "center",
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
  height: "45vh",
  // backgroundColor: "grey",
  marginTop: "10vh",
});

export default MainPage;
