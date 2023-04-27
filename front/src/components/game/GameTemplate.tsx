import { ReactElement } from "react";
import love from "assets/images/love.png";

import styled from "styled-components";

type GameTemplateProps = {
  children: ReactElement[] | ReactElement;
};

const GameTemplate = (props: GameTemplateProps) => {
  const { children } = props;
  return (
    <TemplateBox>
      <VoiceCheckImg />
      <BoardBox>{children}</BoardBox>
    </TemplateBox>
  );
};

export default GameTemplate;

const TemplateBox = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  width: "100%",
  height: "100vh",
  background: "rgba(237, 252, 242, 1)",
});

const BoardBox = styled.div({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  width: "70%",
  height: "70%",
  minHeight: `calc(100vh - 10rem)`,
  maxHeight: `calc(100vh - 10rem)`,
  background: "white",
  borderRadius: 20,
  boxShadow: "10px 5px 5px rgba(0, 0, 0, 0.2)",
});

const VoiceCheckImg = styled.div({
  width: "5rem",
  height: "5rem",
  margin: "1rem",
  backgroundImage: `url(${love})`,
  backgroundSize: "cover",
});
