import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Navbar } from "components/common";
import { UserInfo } from "components/profile";
import { TotalAbilityChart } from "components/statistics";
import { useNavigate } from "react-router-dom";
import { auth } from "service";

function MyProfile() {
  const navigate = useNavigate();

  const handlePage = () => {
    navigate("/statistics/total");
  };
  return (
    <div>
      <Navbar />
      <UserInfo />
      <AbilityBox onClick={handlePage}>
        <h1>click click</h1>
        <TotalAbilityChart userId={"19"} />
      </AbilityBox>
      <InfoBox>
        <h1>알림 사항</h1>
      </InfoBox>
    </div>
  );
}
const AbilityBox = styled.button({
  backgroundColor: "#D9F7F3",
  width: "37vw",
  height: "40%",
  display: "flex",
  marginTop: "4rem",
  marginLeft: "11vw",
  borderRadius: "1rem",
  justifyContent: "center",
  position: "fixed",
  cursor: "pointer",
  transition: "all 0.8s, color 0.3",
  "&:hover": {
    color: "#fff",
    boxShadow:
      "inset 50vw 0 0 0 rgba(0,0,0,0.25), inset -50vw 0 0 0 rgba(0,0,0,0.25)",
  },
});
const InfoBox = styled.div({
  backgroundColor: "#D9F7F3",
  width: "37vw",
  height: "40%",
  display: "flex",
  marginTop: "4rem",
  marginLeft: "52vw",
  borderRadius: "1rem",
  justifyContent: "center",
  position: "fixed",
});

const Info = styled.div({
  borderRadius: "1rem",
  backgroundColor: "#FFB4B4",
  color: "black",
  width: "20rem",
  height: "5rem",
});
export default MyProfile;
