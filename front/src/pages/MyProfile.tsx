import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Navbar } from "components/common";
import { UserInfo } from "components/profile";
import { TotalAbilityChart } from "components/statistics";
import { useNavigate } from "react-router-dom";
import { auth } from "service";

function MyProfile() {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const navigate = useNavigate();
  // 현재로그인중인지 아닌지 확인하는 함수
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setCurrentUser(user);
  //   });

  //   return unsubscribe;
  // }, []);

  return (
    <div>
      <Navbar />
      <UserInfo />
      <AbilityBox>
        <TotalAbilityChart />
      </AbilityBox>
      <InfoBox>
        <h1>user info</h1>
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
  marginLeft: "11vw",
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
