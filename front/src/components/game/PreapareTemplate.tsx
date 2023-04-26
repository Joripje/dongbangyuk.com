import { useState } from "react";

import DescriptionCarousel from "./DescriptionCarousel";

import styled from "styled-components";
import { Grid } from "@mui/material";
import {
  whdrn,
  ekscp,
  wpgud,
  dudgjs,
  ehdns,
  tjdwls,
  dnjsvlf,
  mmy789,
} from "assets/images";

import OverviewDescript from "./OverviewDescript";
import DetailDescript from "./DetailDescript";

const PreapareTemplate = () => {
  const imagesList: string[] = [
    whdrn,
    ekscp,
    wpgud,
    dudgjs,
    tjdwls,
    ehdns,
    dnjsvlf,
  ];
  const [selectedTypo, setSelectedTypo] = useState<number>(-1);

  const overviewProps = {
    image: mmy789,
    name: "가위바위보",
    descript: "'나' 혹은 '상대'의 입장에서 가위바위보를 해주세요.",
    minutes: 3,
    rounds: 3,
    problems: 0,
    ability: "인지능력",
  };

  const goal = ["가위바위보 잘해보라구~"];

  const descriptions = [
    "왼쪽에 있는 도형을 오른쪽에 있는 도형처럼 회전시키기",
    "사용가능한 버튼은 총 4개",
    "버튼을 눌러 회전 과정 만들기",
    "클릭 가능 횟수는 총 20회",
    "하나 지움과 전체 초기화 버튼으로 과정을 지울 수 있음",
    "답 완성 후, 답안 제출 버튼 클릭",
  ];

  return (
    <Grid container sx={{ height: `calc(100vh - 13rem)` }}>
      <Grid item xs={8}>
        <ColFlexBox>
          <DescriptionCarousel
            images={imagesList}
            selectedTypo={selectedTypo}
          />
        </ColFlexBox>
      </Grid>
      <ControllerGrid item xs={4}>
        <OverviewDescript overviewProps={overviewProps} />
        <MenuTypo>목표</MenuTypo>
        <DetailDescript
          title={"과제 목표"}
          descriptions={goal}
          weight={0}
          selectedTypo={selectedTypo}
          setSelectedTypo={setSelectedTypo}
        />

        <MenuTypo>방법</MenuTypo>
        <DetailDescript
          title={"응시 방법"}
          descriptions={descriptions}
          weight={1}
          selectedTypo={selectedTypo}
          setSelectedTypo={setSelectedTypo}
        />
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

const MenuTypo = styled.div({
  display: "flex",
  alignItems: "end",
  height: "8rem",
  fontSize: 32,
  fontWeight: 800,
});

const ControllerGrid = styled(Grid)({
  background: "#e5e5e5",
  borderRadius: "0 0 20px 0",
  padding: "1rem",

  height: "calc(100% - 1rem)",

  overflowY: "scroll",
});

export default PreapareTemplate;
