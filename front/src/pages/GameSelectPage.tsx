import { GameTemplate } from "components/game";
import GameSelect from "components/game/GameSelect";
import { useEffect, useState } from "react";

function GameSelectPage() {
  const [isEnough, setIsEnough] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1920) setIsEnough(false);
      else setIsEnough(true);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <GameTemplate>
      {isEnough ? (
        <GameSelect />
      ) : (
        <div>Width가 1920px 이상이어야지 시작할 수 있어요</div>
      )}
    </GameTemplate>
  );
}

export default GameSelectPage;
