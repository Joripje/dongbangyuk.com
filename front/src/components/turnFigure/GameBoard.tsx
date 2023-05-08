import { Grid } from "@mui/material";
import ObjectFigure from "./ObjectFigure";
import styled from "styled-components";
import TrunFigure from "./TrunFigure";
import FigureControl from "./FigureControl";

const GameBoard = () => {
  return (
    <StyledGrid container>
      <ObjectFigure />
      <Grid item xs={1} />
      <Grid item xs={7} height={"100%"}>
        <FigureControl />
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
