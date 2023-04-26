import { akalths } from "assets/images";

import styled from "@emotion/styled";
import { Grid } from "@mui/material";

type OverviewDescriptProps = {
  overviewProps: {
    name: string;
    descript: string;
    minutes: number;
    rounds: number;
    problems: number;
  };
};

function OverviewDescript(props: OverviewDescriptProps) {
  const { name, descript, minutes, rounds, problems } = props.overviewProps;
  return (
    <OverviewDescriptBox>
      <OverviewImg />
      <RowFlexBox>
        <HighlightTypo>{name}</HighlightTypo>
        <MeasureBox>인지능력</MeasureBox>
      </RowFlexBox>
      <NormalTypo>{descript}</NormalTypo>
      <Grid container>
        <Grid item xs={4}>
          <TestStatusTypo>응시 시간</TestStatusTypo>
          <HighlightTypo>총 {minutes}분</HighlightTypo>
        </Grid>
        <Grid item xs={4}>
          <TestStatusTypo>라운드 수</TestStatusTypo>
          <HighlightTypo>{rounds}개</HighlightTypo>
        </Grid>
        <Grid item xs={4}>
          <TestStatusTypo>문항 수</TestStatusTypo>
          <HighlightTypo>
            {problems === 0 ? "제한 없음" : `${problems}개`}
          </HighlightTypo>
        </Grid>
      </Grid>
    </OverviewDescriptBox>
  );
}
const RowFlexBox = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  margin: "1rem 0",
});

const OverviewDescriptBox = styled.div({
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
  height: "10rem",
  borderRadius: 20,
  backgroundSize: "cover",
  backgroundImage: `url(${akalths})`,
});

export default OverviewDescript;
