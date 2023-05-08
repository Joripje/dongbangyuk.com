import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { popChoice, clearChoice } from "store/turnFigureSlice";

import styled from "styled-components";
import { Button, Grid } from "@mui/material";
import { MouseEvent } from "react";

const TurnStatus = () => {
  const dispatch = useDispatch();
  const clicks = useSelector((state: RootState) => state.turnFigure.clicks);

  const onClickHandler = (event: MouseEvent, target: number) => {
    event.preventDefault();
    switch (target) {
      case 0:
        dispatch(popChoice());
        break;
      case 1:
        dispatch(clearChoice());
        break;
    }
  };

  const buttonGenerator = (name: string, target: number) => {
    return (
      <SytledButton
        variant='contained'
        onClick={(event) => onClickHandler(event, target)}
      >
        {name}
      </SytledButton>
    );
  };

  return (
    <StatusWrapper item xs={4}>
      <StatusBox>
        <ClickTypo>남은 클릭 횟수</ClickTypo>
        <ClickNumTypo>{clicks}</ClickNumTypo>
        {buttonGenerator("하나 지움", 0)}
        {buttonGenerator("전체 초기화", 1)}
      </StatusBox>
    </StatusWrapper>
  );
};

const StatusWrapper = styled(Grid)({
  padding: "2rem 2rem 2rem 0",
});

const StatusBox = styled.div({
  display: "flex",
  flexDirection: "column",

  alignItems: "center",
  justifyContent: "center",

  width: "100%",
  height: "100%",

  background: "white",
  border: "0.2rem solid #e5e5e5",
  borderRadius: "2rem",
});

const ClickTypo = styled.div({
  fontSize: "1.5rem",
  fontWeight: "800",
});

const ClickNumTypo = styled.div({
  fontSize: "4rem",
  fontWeight: "800",
});

const SytledButton = styled(Button)({
  width: "8rem",
  height: "3rem",
  margin: "0.5rem",

  fontSize: "1rem",
  fontWeight: "800",

  color: "black",
  background: "#e5e5e5",
});

export default TurnStatus;
