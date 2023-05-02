import { useState, ReactElement } from "react";

import VoiceImage from "./VoiceImage";

import styled from "styled-components";

type GameTemplateProps = {
  children: ReactElement[] | ReactElement;
};

const GameTemplate = (props: GameTemplateProps) => {
  const { children } = props;
  const [isEnough, setIsEnough] = useState(true);

  return (
    <TemplateBox>
      <VoiceImage setIsEnough={setIsEnough} />
      {isEnough ? (
        <BoardBox>{children}</BoardBox>
      ) : (
        <div>화면이 1920 X 1080 이상이어야지 정상적인 시험을 칠 수 있어요</div>
      )}
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
