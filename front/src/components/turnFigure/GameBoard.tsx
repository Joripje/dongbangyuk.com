import { ObjectFigure, FigureControl, TurnHistory } from "./";

import styled from "styled-components";
import { Grid } from "@mui/material";

const GameBoard = () => {
  return (
    <StyledGrid container>
      <ObjectFigure />
      <Grid item xs={1} />
      <Grid item xs={7} height={"100%"}>
        <FigureControl />
        <TurnHistory />
      </Grid>
    </StyledGrid>
  );
};

const StyledGrid = styled(Grid)({
  height: "100%",
  padding: "6%",
  alignItems: "center",
});

export default GameBoard;
