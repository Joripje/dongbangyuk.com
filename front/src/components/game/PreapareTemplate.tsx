import DescriptionCarousel from "./DescriptionCarousel";

import styled from "styled-components";
import { Grid } from "@mui/material";

import { rabbit_1, rabbit_2, rabbit_3, rabbit_4 } from "assets/images";

const PreapareTemplate = () => {
  const imagesList: string[] = [rabbit_1, rabbit_2, rabbit_3, rabbit_4];
  // ExampleBox, PageButtonBox은 상위 컴포넌트에서 주어진 정보를 사용하면 됨
  // 두 번째 Grid Item은 게임에 대한 간단한 설명, 목표, 응시 방법이 있어야하며 overflow: scroll

  return (
    <Grid container sx={{ height: `calc(100vh - 13rem)` }}>
      <Grid item xs={8}>
        <DescriptionCarousel images={imagesList} />
      </Grid>
      <Grid
        item
        xs={4}
        sx={{ background: "#e5e5e5", borderRadius: "0 0 20px 0" }}
      ></Grid>
    </Grid>
  );
};

// const ColFlexBox = styled.div({
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",

//   height: "100%",
// });

export default PreapareTemplate;
