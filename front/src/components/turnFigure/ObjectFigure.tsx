import { Grid } from "@mui/material";
import styled from "styled-components";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";

const ObjectFigure = () => {
  return (
    <ObjectWrapper item xs={6}>
      <CharBox>
        <div>R</div>
      </CharBox>
      <ArrowBox />
      <CharBox style={{ background: "rgb(238, 253, 243)" }}>
        <div style={{ transform: "rotate(90deg)" }}>R</div>
      </CharBox>
    </ObjectWrapper>
  );
};

const ObjectWrapper = styled(Grid)({
  width: "100%",
  height: "60%",

  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",

  border: "2px solid gray",
  borderRadius: "2rem",
});

const CharBox = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",

  width: "50%",
  height: "100%",
  fontSize: "10rem",
  textAlign: "center",
  borderRadius: "0 2rem 2rem 0",
});

const ArrowBox = styled(KeyboardDoubleArrowRight)({
  position: "absolute",
  width: "4rem",
  fontSize: "10rem",
  textAlign: "center",
});

export default ObjectFigure;
