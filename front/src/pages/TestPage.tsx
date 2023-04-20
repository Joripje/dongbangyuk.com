import styled from "styled-components";
import love from "assets/images/love.png";
import { FindRoad } from "components/game";

function TestPage() {
  // const gameType = "road";

  return (
    <TemplateBox>
      <ColFlexBox>
        <VoiceCheckImg />
        <FindRoad />
      </ColFlexBox>
    </TemplateBox>
  );
}

const TemplateBox = styled.div({
  width: "100%",
  height: "100%",
  background: "rgba(237, 252, 242, 1)",
});

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

export default TestPage;
