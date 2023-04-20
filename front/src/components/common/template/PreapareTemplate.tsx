import { Grid } from "@mui/material";
import love from "assets/images/love.png";
import styled from "styled-components";

function PreapareTemplate() {
  return (
    <TemplateBox>
      <ColFlexBox>
        <VoiceCheckImg />
        <TestBoardBox>
          <StatusBarBox />
          <Grid container sx={{ height: `calc(100vh - 13rem)` }}>
            <Grid item xs={8}>
              <ColFlexBox
                style={{ justifyContent: "space-evenly", alignItems: "" }}
              >
                <ExampleBox />
                <PageButtonBox />
              </ColFlexBox>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ background: "#e5e5e5", borderRadius: "0 0 20px 0" }}
            ></Grid>
          </Grid>
        </TestBoardBox>
      </ColFlexBox>
    </TemplateBox>
  );
}

const TemplateBox = styled.div({
  width: "100%",
  height: "100%",
  background: "rgba(237, 252, 242, 1)",
});

const ColFlexBox = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  height: "100%",
});

const VoiceCheckImg = styled.div({
  width: "5rem",
  height: "5rem",
  margin: "1rem",
  backgroundImage: `url(${love})`,
  backgroundSize: "cover",
});

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
  borderRadius: "20px",
  borderBottom: "1px solid #e5e5e5",
});

const ExampleBox = styled.div({
  width: "80%",
  height: "40vh",
  background: "white",

  border: "0.5rem solid #e5e5e5",
  borderRadius: "20px",
});

const PageButtonBox = styled.div({
  width: "80%",
  height: "3rem",
  background: "#e5e5e5",
});

export default PreapareTemplate;
