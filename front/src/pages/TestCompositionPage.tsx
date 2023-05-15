import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { GameTemplate } from "components/game";
import { GameSelect } from "components/game";
import { RootState } from "store";
import FindRoadPage from "./FindRoadPage";
import FindRoadPreparePage from "./FindRoadPreparePage";

function TestCompositionPage() {
  // const dispatch = useDispatch();
  const gameState = useSelector((state: RootState) => state.testControl);
  const [thisComponent, setThisComponent] = useState(<GameSelect />);

  useEffect(() => {
    console.log(gameState);
    const { game, isEnough, isGaming, isPreparing } = gameState;

    if (!isEnough) {
      setThisComponent(<div>1920 1080 ^^7</div>);
    } else {
      console.log("wow");
      switch (game) {
        case undefined:
          setThisComponent(<GameSelect />);
          break;
        case "road":
          if (isGaming) setThisComponent(<FindRoadPage />);
          else
            setThisComponent(<FindRoadPreparePage isPreparing={isPreparing} />);
      }
    }
  }, [gameState]);

  return <GameTemplate>{thisComponent}</GameTemplate>;
}

export default TestCompositionPage;
