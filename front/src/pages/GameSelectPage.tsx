import { GameTemplate } from "components/game";
import GameSelect from "components/game/GameSelect";
import { useEffect, useState } from "react";

function GameSelectPage() {
  const [isEnough, setIsEnough] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1920 || window.innerHeight < 1080)
        setIsEnough(false);
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
        <div>화면이 1920 X 1080 이상이어야지 정상적인 시험을 칠 수 있어요</div>
      )}
    </GameTemplate>
  );
}

export default GameSelectPage;
