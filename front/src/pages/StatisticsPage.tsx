import { VideoChart, AbilityChart } from "components/statistics";
import styled from "styled-components";

const StatisticsPage = () => {
  return (
    <TemplateBox>
      <TitleContainer>결과보기</TitleContainer>

      <TitleContainer>당신은 사랑받기 위해 태어난사람</TitleContainer>
      <BoardBox>
        <AbilityChart />
      </BoardBox>
      <TitleContainer>나의 영상 확인</TitleContainer>
      <VideoChart />
    </TemplateBox>
  );
};
const TemplateBox = styled.div({
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  // justifyContent: "center",
  // alignItems: "center",
  borderRadius: 10,
  width: "90%",
  // height: "100%",
  background: "#E0F6F4",
});

const BoardBox = styled.div({
  position: "relative",
  margin: "1rem auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  width: "90%",
  height: "70%",

  background: "white",
  borderRadius: 20,
  boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.2)",
});

const TitleContainer = styled.div({
  fontWeight: "bold",
  fontSize: "2rem",
  marginTop: "0.5rem",
  marginBottom: "0.5rem",
  marginLeft: "5%",
});

export default StatisticsPage;
