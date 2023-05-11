import { VideoChart, AbilityChart, ResultsTable } from "components/statistics";
import styled from "styled-components";

const StatisticsPage = () => {
  return (
    <TemplateBox>
      <TitleContainer>결과보기</TitleContainer>
      <BoardBox>
        <ResultsTable />
      </BoardBox>

      <TitleContainer>
        &nbsp;당신은 사랑받기 위<br />해 태어난사람
      </TitleContainer>
      <AbilityChart />
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
  flexDirection: "row",
  padding: "1rem 0",

  justifyContent: "center",
  alignItems: "flex-start",

  width: "90%",
  height: "70%",
  background: "white",
  borderRadius: 10,
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
