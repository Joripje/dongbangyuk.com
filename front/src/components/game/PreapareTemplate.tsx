import { Grid } from "@mui/material";
import styled from "styled-components";
import DescriptionCarousel from "./DescriptionCarousel";

const PreapareTemplate = () => {
  const imagesList: string[] = ["sta"];
  // ExampleBox, PageButtonBox은 상위 컴포넌트에서 주어진 정보를 사용하면 됨
  // 두 번째 Grid Item은 게임에 대한 간단한 설명, 목표, 응시 방법이 있어야하며 overflow: scroll

  return (
    <TestBoardBox>
      <StatusBarBox />
      <Grid container sx={{ height: `calc(100vh - 13rem)` }}>
        <Grid item xs={8}>
          {/* <ColFlexBox style={{ justifyContent: "space-evenly" }}> */}
          <DescriptionCarousel images={imagesList} />
          {/* </ColFlexBox> */}
        </Grid>
        <Grid
          item
          xs={4}
          sx={{ background: "#e5e5e5", borderRadius: "0 0 20px 0" }}
        ></Grid>
      </Grid>
    </TestBoardBox>
  );
};

const TestBoardBox = styled.div({
  width: "80%",
  minHeight: `calc(100vh - 10rem)`,
  background: "white",
  borderRadius: 20,
  boxShadow: "10px 5px 5px rgba(0, 0, 0, 0.2)",
});

const StatusBarBox = styled.div({
  width: "100%",
  height: "4rem",
  background: "white",
  borderRadius: "20px 20px 0 0 ",
  borderBottom: "1px solid #e5e5e5",
});

export default PreapareTemplate;
