import { useState } from "react";

import { Timer } from "components/common";
import { GameBoard } from "../components/findRoad";
import { StatusBar, GameTemplate } from "components/game";

function FindRoadPage() {
  const [startTime] = useState(new Date());
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

export default FindRoadPage;
