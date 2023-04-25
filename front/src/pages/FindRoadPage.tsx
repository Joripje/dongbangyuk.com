import { useState } from "react";

import { Timer } from "components/common";
import { GameBoard } from "../components/find_road";
import StatusBar from "components/game/StatusBar";

import styled from "styled-components";

function FindRoadPage() {
  const startTime = new Date();
  const [status] = useState("explain");
  const [problemNum, setProblemNum] = useState(1);

  return (
    <TemplateBox>
      <BoardBox>
        <StatusBar status={status} gameType='road' problemNum={problemNum} />
        <GameBoard ascProblemNum={() => setProblemNum(problemNum + 1)} />
        <Timer startTime={startTime.getTime()} settingTime={300} />
      </BoardBox>
    </TemplateBox>
  );
}

const TemplateBox = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  width: "100%",
  height: "100%",
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
