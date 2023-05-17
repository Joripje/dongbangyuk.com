import { useDispatch } from "react-redux";

import styled from "styled-components";
import { Card, Grid } from "@mui/material";
import { setGame } from "store/testControlSlice";
import { rmt } from "assets/images/findRoad";

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
    <>
      <RowFlexBox style={{ justifyContent: "center", height: "100%" }}>
        {gameOptions.map((item, index) => {
          const { name, ability, time, value } = item;
          return (
            <StyledCard key={index} onClick={() => onClickHandler(value)}>
              <GameImg src={rmt} alt='' />
              <RowFlexBox>
                <TypoForGameName>{name}</TypoForGameName>
                <TypoForAbility>
                  {ability} | 약 {time}분
                </TypoForAbility>
              </RowFlexBox>
            </StyledCard>
          );
        })}
      </RowFlexBox>
    </>
  );
}

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "40%",
  margin: "2%",
  padding: "2rem 2rem 0rem 2rem",

  border: "2px solid gray",
  borderRadius: "20px",

  background: "white",
  cursor: "pointer",

  "&:hover": {
    background: "#97E3E1",
  },
});

const GameImg = styled.img({
  borderRadius: "2rem",
});

const RowFlexBox = styled.div({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
});

const TypoForGameName = styled.div({
  width: "auto",
  height: "3rem",
  padding: "1rem 0",

  fontSize: "2rem",
  fontWeight: "800",
});

const TypoForAbility = styled.div({
  width: "auto",

  borderRadius: "100%",
  padding: "1rem 0 ",

  fontSize: "1.5rem",
  fontWeight: "800",
});

export default GameSelect;
