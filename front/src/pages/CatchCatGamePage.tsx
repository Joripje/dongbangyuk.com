import { useState } from "react";

// import { Timer } from "components/common";
import { GameBoard } from "../components/catchCat";
import { StatusBar } from "components/game";

function CatchCatGamePage() {
  const [status] = useState("explain");
  const [problemNum, setProblemNum] = useState(0);
  // const [startTime, setStartTime] = useState(new Date().getTime());

  // useEffect(() => {
  //   setStartTime(new Date().getTime());
  // }, [problemNum]);

  return (
    <>
      <StatusBar status={status} gameType='road' problemNum={problemNum} />
      <GameBoard
        problemNum={problemNum}
        ascProblemNum={() => setProblemNum(problemNum + 1)}
      />
      {/* <Timer startTime={startTime} settingTime={3} /> */}
    </>
  );
}

export default CatchCatGamePage;
