import { GameTemplate } from "components/game";
import GameSelect from "components/game/GameSelect";
// import { useState } from "react";

function GameSelectPage() {
  // const [isEnough, setIsEnough] = useState(true);

  return (
    <GameTemplate>
      <GameSelect />
    </GameTemplate>
  );
}

export default GameSelectPage;
