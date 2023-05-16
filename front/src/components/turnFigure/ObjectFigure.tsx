import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "store";

import styled from "styled-components";
import { Grid } from "@mui/material";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";

type RotateProps = {
  rotate: {
    flip: number;
    degree: number;
  };
};

const ObjectFigure = () => {
  const [object, setObject] = useState<string>("");

  const answer = useSelector((state: RootState) => state.turnFigure.tempAnswer);
  const answerList = useSelector(
    (state: RootState) => state.turnFigure.answerList
  );

  useEffect(() => {
    const availableAlph = ["R", "G", "Q", "P", "F", "L"];
    const randNum = Math.floor(Math.random() * 5);
    setObject(availableAlph[randNum]);
  }, [answerList]);

  return (
    <ObjectWrapper item xs={4}>
      <CharBox>
        <RoatateBox rotate={answer.problem}>{object}</RoatateBox>
      </CharBox>
      <ArrowBox />
      <CharBox style={{ background: "rgb(238, 253, 243)" }}>
        <RoatateBox rotate={answer.correct}>{object}</RoatateBox>
      </CharBox>
    </ObjectWrapper>
  );
};

const ObjectWrapper = styled(Grid)({
  width: "100%",
  height: "100%",

  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",

  border: "2px solid gray",
  borderRadius: "2rem",
});

const CharBox = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",

  width: "50%",
  height: "100%",
  fontSize: "10rem",
  fontWeight: "700",
  textAlign: "center",
  borderRadius: "0 2rem 2rem 0",
});

const RoatateBox = styled.div<RotateProps>`
  transform: rotate(${(props) => props.rotate.degree * 45}deg)
    scaleX(${(props) => (props.rotate.flip ? -1 : 1)});
`;

const ArrowBox = styled(KeyboardDoubleArrowRight)({
  position: "absolute",
  width: "4rem",
  fontSize: "10rem",
  textAlign: "center",
});

export default ObjectFigure;
