import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { generateProblem } from "store/turnFigureSlice";

import styled from "styled-components";
import { Grid } from "@mui/material";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";

// type Problem = {
//   flip: number;
//   degree: number;
// };

type RotateProps = {
  rotate: {
    flip: number;
    degree: number;
  };
};

const ObjectFigure = () => {
  const dispatch = useDispatch();
  const [object, setObject] = useState<string>("");
  // const [problem, setProblem] = useState<Problem>({ flip: 0, degree: 0 });
  // const [correct, setCorrect] = useState<Problem>({ flip: 0, degree: 0 });
  const problem = useSelector(
    (state: RootState) => state.turnFigure.tempAnswer.problem
  );

  const correct = useSelector(
    (state: RootState) => state.turnFigure.tempAnswer.correct
  );

  useEffect(() => {
    const availableAlph = ["R", "K", "Q", "P", "F", "L"];
    const randNum = Math.floor(Math.random() * 5);
    setObject(availableAlph[randNum]);
    dispatch(generateProblem());
    // setProblem(tempAnswer.problem);
    // setCorrect(tempAnswer.correct);
  }, [dispatch]);

  return (
    <ObjectWrapper item xs={4}>
      <CharBox>
        <RoatateBox rotate={problem}>{object}</RoatateBox>
      </CharBox>
      <ArrowBox />
      <CharBox style={{ background: "rgb(238, 253, 243)" }}>
        <RoatateBox rotate={correct}>{object}</RoatateBox>
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
