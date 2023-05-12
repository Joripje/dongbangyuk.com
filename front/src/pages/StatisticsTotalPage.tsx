import { TotalAbilityChart } from "components/statistics";
import styled from "styled-components";

const StatisticsTotalPage = () => {
  return (
    <TemplateBox>
      <MainTitleContainer>나의 통계</MainTitleContainer>
      <Divider />
      <TitleContainer>나의 역량</TitleContainer>
      <BoardBox>
        <TotalAbilityChart />
      </BoardBox>
      <Divider />
      <TitleContainer>
        &nbsp;당신은 사랑받기 위<br />해 태어난사람
      </TitleContainer>
      <BoardBox>
        <TotalAbilityChart />
      </BoardBox>
    </TemplateBox>
  );
};
const TemplateBox = styled.div({
  margin: "2% auto",
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
});

const TitleContainer = styled.div({
  fontWeight: "bold",
  fontSize: "2rem",
  marginTop: "0.5rem",
  marginBottom: "0.5rem",
  marginLeft: "5%",
});

const MainTitleContainer = styled.div({
  fontWeight: "bold",
  fontSize: "4rem",
  margin: "2rem",
  marginLeft: "5%",
});

const Divider = styled.hr`
  width: 90%;
  border: none;
  border-top: 1.5px solid black;
`;

export default StatisticsTotalPage;
