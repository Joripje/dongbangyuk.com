import { MouseEvent, useEffect } from "react";
import {
  addTurnAnswer,
  clearChoice,
  generateProblem,
} from "store/turnFigureSlice";

import { ObjectFigure, FigureControl, TurnHistory } from "./";

import styled from "styled-components";
import { Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";

type GameBoardProps = {
  ascProblemNum: () => void;
};

const GameBoard = (props: GameBoardProps) => {
  const { ascProblemNum } = props;
  const dispatch = useDispatch();

  const onSubmitHandler = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(addTurnAnswer());
    dispatch(clearChoice());
    dispatch(generateProblem());

    ascProblemNum();
  };

  useEffect(() => {
    dispatch(generateProblem());
  }, [dispatch]);

  return (
    <GridContainer container>
      <ObjectFigure />
      <Grid item xs={1} />
      <Grid item xs={7} height={"100%"}>
        <FigureControl />
        <TurnHistory />
      </Grid>
      <StyledGrid item xs={12}>
        <SubmitButton onClick={onSubmitHandler} variant='contained'>
          답안 제출
        </SubmitButton>
      </StyledGrid>
    </GridContainer>
  );
};

const GridContainer = styled(Grid)({
  height: "80%",
  padding: "6%",
  alignItems: "center",
});

const StyledGrid = styled(Grid)({
  height: "20%",
  display: "flex",
  justifyContent: "center",
  alignItems: "end",
});

const SubmitButton = styled(Button)({
  width: "15rem",
  height: "4rem",
  borderRadius: "2rem",

  fontSize: "1.5rem",
  fontWeight: "800",
});
export default GameBoard;
