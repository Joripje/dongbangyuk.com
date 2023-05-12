import { ComponentType, ReactNode } from "react";
import { useNavigate } from "react-router";

import styled from "styled-components";
import { Card, Grid } from "@mui/material";

type StyledCardProps = {
  key: number;
  children: ReactNode;
  onClick: () => void;
};

function GameSelect() {
  const navigate = useNavigate();
  const gameOptions = [
    {
      name: "길 찾기",
      ability: "계획 능력",
      time: 3,
      url: "/test/find-road/prepare",
    },
    {
      name: "가위 바위 보",
      ability: "인지 능력",
      time: 3,
      url: "/test/rps/prepare",
    },
    {
      name: "도형 회전하기",
      ability: "인지 능력",
      time: 4,
      url: "/test/turn/prepare",
    },
    {
      name: "고양이 술래잡기",
      ability: "인지 능력",
      time: 4,
      url: "/test/cat/prepare",
    },
  ];

  return (
    <Grid container style={{ height: "100%" }}>
      <UserInfoGrid item xs={3}></UserInfoGrid>
      <GameSelectGrid item xs={9}>
        <h1>게임 목록</h1>
        <RowFlexBox>
          {gameOptions.map((item, index) => {
            const { name, ability, time, url } = item;
            return (
              <StyledCard key={index} onClick={() => navigate(url)}>
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

const TempForShowOff = styled.div({});

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
