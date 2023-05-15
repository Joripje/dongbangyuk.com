import { useState } from "react";

import DescriptionCarousel from "./DescriptionCarousel";

import styled from "styled-components";
import { Grid } from "@mui/material";

import OverviewDescript from "./OverviewDescript";
import DetailDescript from "./DetailDescript";

type PreapareTemplateProps = {
  imagesList: string[];
  overviewProps: {
    image: string;
    name: string;
    descript: string;
    minutes: number;
    rounds: number;
    problems: number;
    ability: string;
  };
  goal: string[];
  descriptions: string[];
  // setIsPreparing: (isPreparing: boolean) => void;
};

const PreapareTemplate = (props: PreapareTemplateProps) => {
  const [selectedTypo, setSelectedTypo] = useState<number>(0);
  const { imagesList, overviewProps, goal, descriptions } = props;

  return (
    <Grid container sx={{ height: `calc(100vh - 13rem)` }}>
      <Grid item xs={8}>
        <ColFlexBox>
          <DescriptionCarousel
            images={imagesList}
            selectedTypo={selectedTypo}
            setSelectedTypo={setSelectedTypo}
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
