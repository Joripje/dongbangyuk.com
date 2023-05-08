import { useState } from "react";

import { GameBoard } from "../components/turnFigure";
import { StatusBar, GameTemplate } from "components/game";

function TurnPicGamePage() {
  const [status] = useState("explain");
  const [problemNum] = useState(0);

  return (
    <GameTemplate>
      <StatusBar status={status} gameType='road' problemNum={problemNum} />
      <GameBoard />
      {/* <Timer startTime={startTime} settingTime={3} /> */}
    </GameTemplate>
  );
}

export default TurnPicGamePage;
