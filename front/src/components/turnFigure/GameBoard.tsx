import { MouseEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addTurnAnswer,
  clearChoice,
  generateProblem,
  submitAnswers,
} from "store/turnFigureSlice";

import { ObjectFigure, FigureControl, TurnHistory } from "./";

import styled from "styled-components";
import { Button, Grid } from "@mui/material";
import { resetGameState } from "store/testControlSlice";

type GameBoardProps = {
  problemNum: number;
  setStartTime: () => void;
  ascProblemNum: () => void;
};

const GameBoard = (props: GameBoardProps) => {
  const { problemNum, ascProblemNum, setStartTime } = props;
  const dispatch = useDispatch();

  const onSubmitHandler = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(addTurnAnswer());
    if (problemNum >= 20) {
      alert("end");
      dispatch(submitAnswers());
      dispatch(resetGameState());
      return;
    }
    dispatch(clearChoice());
    dispatch(generateProblem());

    ascProblemNum();
    setStartTime();
  };

  useEffect(() => {
    dispatch(generateProblem());
  }, [dispatch]);

  return (
    <GridContainer container>
      <ObjectFigure />
      <Grid item xs={1} />
      <Grid item xs={6} height={"100%"}>
        <FigureControl />
        <TurnHistory />
      </Grid>
      <StyledGrid item xs={12}>
        <SubmitButton
          onClick={onSubmitHandler}
          variant='contained'
          color={problemNum === 20 ? "warning" : "primary"}
        >
          {problemNum === 20 ? "최종 제출" : "답안 제출"}
        </SubmitButton>
      </StyledGrid>
    </GridContainer>
  );
};

const GridContainer = styled(Grid)({
  height: "80%",
  padding: "3%",
  alignItems: "center",
});

const StyledGrid = styled(Grid)({
  height: "20%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const SubmitButton = styled(Button)({
  width: "15rem",
  height: "4rem",
  borderRadius: "2rem",

  fontSize: "1.5rem",
  fontWeight: "800",
});
export default GameBoard;
