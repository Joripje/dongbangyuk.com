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

// const ColFlexBox = styled.div({
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",

//   height: "100%",
// });

export default FindRoadPreparePage;
