import styled from "styled-components";
import love from "assets/images/love.png";

function VoiceImage() {
  return <VoiceCheckImg />;
}

const VoiceCheckImg = styled.div({
  width: "5rem",
  height: "5rem",
  margin: "1rem",
  backgroundImage: `url(${love})`,
  backgroundSize: "cover",
});

export default VoiceImage;
