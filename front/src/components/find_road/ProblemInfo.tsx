import styled from "styled-components";
import { Grid } from "@mui/material";

interface ProblemInfoProps {
  leastWall: number;
  clickCount: number;
}

const ProblemInfo = (props: ProblemInfoProps) => {
  const { leastWall, clickCount } = props;
  return (
    <StyledGridContainer container>
      <Grid item xs={5}>
        <TypoForInfo>클릭 가능{`\n`} 횟수</TypoForInfo>
        <TypoForInfoNumber>{clickCount}</TypoForInfoNumber>
      </Grid>
      <Vr />
      <Grid item xs={6}>
        <TypoForInfo>정답의 {`\n`}울타리 갯수</TypoForInfo>
        <TypoForInfoNumber>{leastWall}</TypoForInfoNumber>
      </Grid>
    </StyledGridContainer>
  );
};

const StyledGridContainer = styled(Grid)({
  position: "absolute",
  left: 0,

  width: "17rem",
  height: "8rem",
  alignItems: "center",
  justifyContent: "space-around",

  border: "2px solid #e5e5e5",
  borderRadius: "20px",

  margin: "0 4rem",
});

const TypoForInfo = styled.div({
  width: "8rem",
  height: "4rem",
  textAlign: "center",

  borderRadius: "100%",

  color: "gray",
  fontSize: "20",
  fontWeight: "800",
  whiteSpace: "pre-line",
});

const TypoForInfoNumber = styled.div({
  width: "8rem",
  height: "3rem",
  textAlign: "center",

  borderRadius: "100%",

  fontSize: "30",
  fontWeight: "800",
});

const Vr = styled.div`
  width: 1px;
  height: 80%;

  background: #e5e5e5;
`;

export default ProblemInfo;
