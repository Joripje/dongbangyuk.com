import { useEffect, ReactElement } from "react";
import { useDispatch } from "react-redux";

import { resetGameState } from "store/testControlSlice";

import VoiceImage from "./VoiceImage";
import styled from "styled-components";
import RecordingModal from "./RecordingModal";

type GameTemplateProps = {
  children: ReactElement[] | ReactElement;
};

const GameTemplate = (props: GameTemplateProps) => {
  const { children } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetGameState());
    };
  }, []);

  return (
    <TemplateBox>
      <VoiceImage />
      <BoardBox>{children}</BoardBox>
      <RecordingModal />
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

  width: "90%",
  height: "70%",
  minHeight: `calc(100vh - 10rem)`,
  maxHeight: `calc(100vh - 10rem)`,
  background: "white",
  borderRadius: 20,
  boxShadow: "10px 5px 5px rgba(0, 0, 0, 0.2)",
});
