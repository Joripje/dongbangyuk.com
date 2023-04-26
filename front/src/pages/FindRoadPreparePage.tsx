import styled from "styled-components";
import love from "assets/images/love.png";
import { GameTemplate } from "components/game";

function FindRoadPreparePage() {
  // const gameType = "road";

  return (
    <GameTemplate>
      <ColFlexBox>
        <VoiceCheckImg />
      </ColFlexBox>
    </GameTemplate>
  );
}

const ColFlexBox = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  height: "100%",
});

const VoiceCheckImg = styled.div({
  width: "5rem",
  height: "5rem",
  margin: "1rem",
  backgroundImage: `url(${love})`,
  backgroundSize: "cover",
});

export default FindRoadPreparePage;
