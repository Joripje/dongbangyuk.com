import { Grid } from "@mui/material";
import ObjectFigure from "./ObjectFigure";
import styled from "styled-components";

const GameBoard = () => {
  return (
    <StyledGrid container>
      <ObjectFigure />
    </StyledGrid>
  );
};

const StyledGrid = styled(Grid)({
  height: "80%",
  padding: "0 10%",
  alignItems: "center",
});

export default GameBoard;
