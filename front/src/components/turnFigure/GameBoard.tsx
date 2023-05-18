import { MouseEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addTurnAnswer,
  clearChoice,
  generateProblem,
} from "store/turnFigureSlice";

import { ObjectFigure, FigureControl, TurnHistory } from "./";

import styled from "styled-components";
import { Button, Grid } from "@mui/material";

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

  // 처음 렌더링 될 때 문제를 셋팅
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
          color={"primary"}
        >
          답안 제출
          {/* {problemNum === 20 ? "최종 제출" : "답안 제출"} */}
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
