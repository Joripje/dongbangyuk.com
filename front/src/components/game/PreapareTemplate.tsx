import DescriptionCarousel from "./DescriptionCarousel";

import styled from "styled-components";
import { Grid } from "@mui/material";

import { ekscp, wpgud, dudgjs, ehdns, tjdwls, dnjsvlf } from "assets/images";
import OverviewDescript from "./OverviewDescript";

const PreapareTemplate = () => {
  // ExampleBox, PageButtonBox은 상위 컴포넌트에서 주어진 정보를 사용하면 됨
  // 두 번째 Grid Item은 게임에 대한 간단한 설명, 목표, 응시 방법이 있어야하며 overflow: scroll
  const imagesList: string[] = [ekscp, wpgud, dudgjs, tjdwls, ehdns, dnjsvlf];
  const overviewProps = {
    name: "가위바위보",
    descript: "'나' 혹은 '상대'의 입장에서 가위바위보를 해주세요.",
    minutes: 3,
    rounds: 3,
    problems: 0,
  };

  return (
    <Grid container sx={{ height: `calc(100vh - 13rem)` }}>
      <Grid item xs={8}>
        <ColFlexBox>
          <DescriptionCarousel images={imagesList} />
        </ColFlexBox>
      </Grid>
      <ControllerGrid item xs={4}>
        <OverviewDescript overviewProps={overviewProps} />
      </ControllerGrid>
    </Grid>
  );
};

const ColFlexBox = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  height: "100%",
});

const ControllerGrid = styled(Grid)({
  background: "#e5e5e5",
  borderRadius: "0 0 20px 0",
  padding: "1rem",
});

export default PreapareTemplate;
