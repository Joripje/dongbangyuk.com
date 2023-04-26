import { useState } from "react";

// 나중에 game으로 옮기자
import { Timer } from "components/common";
import { GameBoard } from "../components/find_road";
import { StatusBar, GameTemplate } from "components/game";

import styled from "styled-components";

function FindRoadPage() {
  const startTime = new Date();
  const [status] = useState("explain");
  const [problemNum, setProblemNum] = useState(1);

  return (
    <GameTemplate>
      <StatusBar status={status} gameType='road' problemNum={problemNum} />
      <GameBoard ascProblemNum={() => setProblemNum(problemNum + 1)} />
      <Timer startTime={startTime.getTime()} settingTime={300} />
    </GameTemplate>
  );
}

const TemplateBox = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  width: "100%",
  height: "100vh",
  background: "rgba(237, 252, 242, 1)",
});

const BoardBox = styled.div({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  width: "70%",
  minHeight: `calc(100vh - 10rem)`,
  background: "white",
  borderRadius: 20,
  boxShadow: "10px 5px 5px rgba(0, 0, 0, 0.2)",
});

export default FindRoadPage;
