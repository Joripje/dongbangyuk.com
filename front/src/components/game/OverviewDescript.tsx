import styled from "@emotion/styled";
import { Grid, Box } from "@mui/material";

type OverviewDescriptProps = {
  overviewProps: {
    image: string;
    name: string;
    descript: string;
    minutes: number;
    rounds: number;
    problems: number;
    ability: string;
  };
};

function OverviewDescript(props: OverviewDescriptProps) {
  const { name, descript, minutes, rounds, problems, image, ability } =
    props.overviewProps;
  const overviewInfo = [
    { name: "응시 시간", value: `총 ${minutes}분` },
    { name: "라운드 수", value: `${rounds} 개` },
    { name: "문항 수", value: problems === 0 ? "제한 없음" : `${problems}개` },
  ];
  return (
    <OverviewDescriptBox>
      <OverviewImg image={image} />
      <RowFlexBox>
        <HighlightTypo>{name}</HighlightTypo>
        <MeasureBox>{ability}</MeasureBox>
      </RowFlexBox>
      <NormalTypo>{descript}</NormalTypo>
      <Grid container>
        {overviewInfo.map((item, index) => {
          const { name, value } = item;
          return (
            <Grid item xs={4} key={index}>
              <TestStatusTypo>{name}</TestStatusTypo>
              <HighlightTypo>{value}</HighlightTypo>
            </Grid>
          );
        })}
      </Grid>
      <RpsDescript>
        <TypoColor>
          {rounds === 3
            ? "이 과제는 키보드를 사용합니다."
            : "이 과제는 마우스를 사용합니다."}
        </TypoColor>
      </RpsDescript>
    </OverviewDescriptBox>
  );
}

const RpsDescript = styled(Box)({
  display: "flex",
  justifyContent: "center",
  padding: "1rem",
  backgroundColor: "#EEFDF3",
  border: "solid",
  borderColor: "#A6CFAE",
  borderRadius: "1rem",
});

const TypoColor = styled.div({
  color: "#50C564",
  fontSize: "1.2rem",
});

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
  color: "#777777",
  background: "#e5e5e5",
  justifyContent: "center",
  borderRadius: 10,
});

const TestStatusTypo = styled.div({
  ...StyleForTypo,
  color: "#bbbbbb",
});

const OverviewImg: React.ComponentType<{ image: string }> = styled.div<{
  image: string;
}>((props) => ({
  height: "10rem",
  borderRadius: 20,
  backgroundSize: "cover",
  backgroundImage: `url(${props.image})`,
}));

export default OverviewDescript;
