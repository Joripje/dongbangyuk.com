import React from "react";
import styled from "styled-components";
import { Navbar } from "components/common";
import { UserInfo } from "components/profile";
import { AbilityChart } from "components/statistics";

import { auth } from "service";

function MyProfile() {
  return (
    <div>
      <Navbar />
      <UserInfo />
      <AbilityBox>
        <AbilityChart />
      </AbilityBox>
      <InfoBox>
        <h1>user info</h1>
        {/* <Info>이메일</Info> */}
      </InfoBox>
    </div>
  );
}
const AbilityBox = styled.div({
  backgroundColor: "#D9F7F3",
  width: "37vw",
  height: "40%",
  display: "flex",
  marginTop: "4rem",
  marginLeft: "13rem",
  borderRadius: "1rem",
  justifyContent: "center",
  position: "fixed",
});
const InfoBox = styled.div({
  backgroundColor: "#D9F7F3",
  width: "37vw",
  height: "40%",
  display: "flex",
  marginTop: "4rem",
  marginLeft: "67rem",
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
