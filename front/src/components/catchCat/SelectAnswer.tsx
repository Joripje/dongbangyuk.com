import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { TimeBar } from "components/common";
import { SelectCircle } from ".";
import { addCatAnswer, setTempAnswerProperty } from "store/catchCatSlice";

import styled from "styled-components";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

import choco from "assets/images/catch/choco.jpg";

type StyledBoxProps = {
  rowValue: number;
  children: string | JSX.Element;
};

function SelectAnswer(props: { correct: boolean[] }) {
  const { correct } = props;
  const dispatch = useDispatch();
  const circles = [20, 30, 50, 80];
  const messages = [
    "불확실하다",
    "조금\n 확실하다",
    "확실하다",
    "매우\n 확실하다",
  ];

  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [catColor, setCatColor] = useState<number>(0); // 0: red, 1: blue
  // const [startTime, setStartTime] = useState<string>("");

  useEffect(() => {
    dispatch(setTempAnswerProperty({ property: "correct", value: correct[0] }));
    const startTimes = new Date().toISOString();
    // setStartTime(new Date().toISOString());

    const intervalId = setInterval(() => {
      const thisTime = new Date().toISOString();
      dispatch(addCatAnswer());
      setCatColor((prevCatColor) => prevCatColor + 1);
      dispatch(
        setTempAnswerProperty({ property: "correct", value: correct[1] })
      );
      dispatch(
        setTempAnswerProperty({
          property: "timestamp",
          value: [startTimes, thisTime],
        })
      );
      console.log("SAVED");
      // setStartTime(thisTime);
      setIsSelected(false);
    }, 3950);

    return () => clearInterval(intervalId);
  }, [correct, dispatch]);

  function renderSelectCircles(
    circles: number[],
    messages: string[],
    answer: boolean
  ) {
    return circles.map((radius, index) => (
      <SelectCircle
        key={index}
        index={index}
        radius={radius}
        message={messages[index]}
        answer={answer}
        setIsSelected={setIsSelected}
      />
    ));
  }

  return (
    <AnswerWrapper>
      <TimeBar totalTime={3000} renderer={catColor} />
      <QuestionTypo>
        {catColor === 0 ? "파란" : "빨강"} 칸의 고양이는 생쥐를 찾았을까요?
      </QuestionTypo>
      <QuestionTypo
        style={{
          color: "rgba(0, 0, 0, 0.4)",
          fontSize: "2rem",
          margin: "1rem 0",
        }}
      >
        정답이라 생각하는 방향으로 확신하는 만큼 표시해주세요.
      </QuestionTypo>
      <StyledBox rowValue={catColor}>
        {isSelected ? (
          <FinishBox catColor={catColor}>응답완료</FinishBox>
        ) : (
          <ChocoImage src={choco} alt='choco' />
        )}
      </StyledBox>
      <RowFlexBox style={{ width: "100%" }}>
        <CircleDes>
          <ArrowBack style={{ fontSize: "inherit" }} />
          놓쳤다
        </CircleDes>
        <CircleDes>
          찾았다
          <ArrowForward style={{ fontSize: "inherit" }} />
        </CircleDes>
      </RowFlexBox>
      <RowFlexBox style={{ width: "100%" }}>
        <RowFlexBox style={{ flexDirection: "row-reverse", height: "10rem" }}>
          {renderSelectCircles(circles, messages, false)}
        </RowFlexBox>
        <RowFlexBox>{renderSelectCircles(circles, messages, true)}</RowFlexBox>
      </RowFlexBox>
    </AnswerWrapper>
  );
}
const QuestionTypo = styled.div({
  fontSize: "3rem",
  fontWeight: 1000,
});

const CircleDes = styled.div({
  width: "7vw",
  fontSize: "2rem",
  fontWeight: 1000,
  textAlign: "center",
  color: "rgba(0, 0, 0, 0.8)",
});

const FinishBox: React.ComponentType<{
  catColor: number;
  children: string;
}> = styled.div<{
  catColor: number;
  children: string;
}>`
display: flex;
align-items: center;
justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  align-items: center;
  font-size: 3rem;
  font-weight: 1000;
  color: white;
  background ${(props) => (props.catColor === 0 ? "blue" : "red")};
`;

const AnswerWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  marginTop: "3rem",
});

const RowFlexBox = styled.div({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const StyledBox: React.ComponentType<StyledBoxProps> = styled.div<StyledBoxProps>`
  width: 10vw;
  height: 10vw;
  border: 0.5rem solid ${(props) => (props.rowValue === 0 ? "blue" : "red")};
  border-radius: 10%;
  margin: 1rem;
`;

const ChocoImage = styled.img({
  width: "100%",
  height: "100%",
});

export default SelectAnswer;
