import { akalths } from "assets/images";

import styled from "@emotion/styled";
import { Grid } from "@mui/material";

function ComponentTest() {
  return (
    <TempBox>
      <OverviewDescript>
        <OverviewImg />
        <RowFlexBox>
          <HighlightTypo>가위바위보</HighlightTypo>
          <MeasureBox>인지능력</MeasureBox>
        </RowFlexBox>
        <NormalTypo>
          '나' 혹은 '상대'의 입장에서 가위바위보를 해주세요.
        </NormalTypo>
        <Grid container>
          <Grid xs={4}>
            <TestStatusTypo>응시 시간</TestStatusTypo>
            <HighlightTypo>총 3분</HighlightTypo>
          </Grid>
          <Grid xs={4}>
            <TestStatusTypo>라운드 수</TestStatusTypo>
            <HighlightTypo>3개</HighlightTypo>
          </Grid>
          <Grid xs={4}>
            <TestStatusTypo>문항 수</TestStatusTypo>
            <HighlightTypo>제한 없음</HighlightTypo>
          </Grid>
        </Grid>
      </OverviewDescript>
    </TempBox>
  );
}

const TempBox = styled.div({
  width: "20rem",
  height: "80vh",
  background: "gray",

  padding: "1rem",
  border: "solid 1px black",
});

const RowFlexBox = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  margin: "1rem 0",
});

const OverviewDescript = styled.div({
  width: "90%",
  padding: "1rem",
  background: "white",
  borderRadius: 20,
});

const StyleForTypo = {
  display: "flex",
  alignItems: "center",

  width: "100%",

  fontSize: "1.2rem",
  fontWeight: "800",
};

const HighlightTypo = styled.div({
  ...StyleForTypo,
  height: "3rem",
});

const NormalTypo = styled.div({
  ...StyleForTypo,
  color: "#aaaaaa",
  margin: "2rem 0",
});

const MeasureBox = styled.div({
  ...StyleForTypo,
  width: "10rem",
  height: "2rem",
  color: "#bbbbbb",
  background: "#e5e5e5",
  justifyContent: "center",
  borderRadius: 10,
});

const TestStatusTypo = styled.div({
  ...StyleForTypo,
  color: "#bbbbbb",
});

const OverviewImg = styled.div({
  height: "7rem",
  borderRadius: 20,
  backgroundSize: "cover",
  backgroundImage: `url(${akalths})`,
});

export default ComponentTest;
