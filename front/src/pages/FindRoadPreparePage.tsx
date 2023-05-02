import { GameTemplate, PrepareTemplate, StatusBar } from "components/game";

function FindRoadPreparePage() {
  const gameType = "road";

  return (
    <GameTemplate>
      <StatusBar gameType={gameType} status='explain' problemNum='길 찾기' />
      <PrepareTemplate />
    </GameTemplate>
  );
}

export default FindRoadPreparePage;
