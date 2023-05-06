import { useState } from "react";

// import { Timer } from "components/common";
import { GameBoard } from "../components/catch_cat";
import { StatusBar, GameTemplate } from "components/game";

function FindRoadPage() {
  const [status] = useState("explain");
  const [problemNum, setProblemNum] = useState(0);
  // const [startTime, setStartTime] = useState(new Date().getTime());

  // useEffect(() => {
  //   setStartTime(new Date().getTime());
  // }, [problemNum]);

  return (
    <GameTemplate>
      <StatusBar status={status} gameType='road' problemNum={problemNum} />
      <GameBoard
        problemNum={problemNum}
        ascProblemNum={() => setProblemNum(problemNum + 1)}
      />
      {/* <Timer startTime={startTime} settingTime={3} /> */}
    </GameTemplate>
  );
}

export default FindRoadPage;
