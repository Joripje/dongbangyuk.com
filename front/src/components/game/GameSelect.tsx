import { ComponentType, ReactNode } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { Card, Grid } from "@mui/material";
import { setGame } from "store/testControlSlice";

type StyledCardProps = {
  key: number;
  children: ReactNode;
  onClick: () => void;
};
type GameValue = undefined | "rps" | "road" | "rotate" | "cat";

type GameOption = {
  name: string;
  ability: string;
  time: number;
  value: GameValue;
};

function GameSelect() {
  const dispatch = useDispatch();
  const gameOptions: GameOption[] = [
    {
      name: "길 찾기",
      ability: "계획 능력",
      time: 3,
      value: "road",
    },
    {
      name: "가위 바위 보",
      ability: "인지 능력",
      time: 3,
      value: "rps",
    },
    {
      name: "도형 회전하기",
      ability: "인지 능력",
      time: 4,
      value: "rotate",
    },
    {
      name: "고양이 술래잡기",
      ability: "인지 능력",
      time: 4,
      value: "cat",
    },
  ];

  const onClickHandler = (value: GameValue) => {
    dispatch(setGame(value));
  };

  return (
    <Grid container style={{ height: "100%" }}>
      <UserInfoGrid item xs={3}></UserInfoGrid>
      <GameSelectGrid item xs={9}>
        <h1>게임 목록</h1>
        <RowFlexBox>
          {gameOptions.map((item, index) => {
            const { name, ability, time, value } = item;
            return (
              <StyledCard key={index} onClick={() => onClickHandler(value)}>
                <TypoForGameName>{name}</TypoForGameName>
                <TypoForAbility>
                  {ability} | 약 {time}분
                </TypoForAbility>
              </StyledCard>
            );
          })}
        </RowFlexBox>
      </GameSelectGrid>
    </Grid>
  );
}

const UserInfoGrid = styled(Grid)({
  display: "flex",
  flexDirection: "column",

  height: "100%",

  background: "#e5e5e5",
  borderRadius: "20px 0px 0px 20px",
});

const GameSelectGrid = styled(Grid)({
  paddingLeft: "1%",
});

const StyledCard: ComponentType<StyledCardProps> = styled(
  Card
)<StyledCardProps>((props) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "24%",
  height: "10rem",
  margin: "1%",
  padding: "2rem",

  border: "2px solid gray",
  borderRadius: "20px",

  background: "white",
  cursor: "pointer",

  "&:hover": {
    background: "#97E3E1",
  },
}));

const RowFlexBox = styled.div({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  paddingLeft: "1%",
});

const TypoForGameName = styled.div({
  width: "auto",
  height: "3rem",

  fontSize: "2rem",
  fontWeight: "800",
});

const TypoForAbility = styled.div({
  width: "auto",

  borderRadius: "100%",

  color: "gray",
  fontSize: "1.5rem",
  fontWeight: "800",
});

export default GameSelect;
