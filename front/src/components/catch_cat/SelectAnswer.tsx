import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { TimeBar } from "components/common";
import { SelectCircle } from "./";
import { addAnswer, setTempAnswerProperty } from "store/catchCatSlice";

import styled from "styled-components";
import choco from "assets/images/catch/choco.jpg";

type StyledBoxProps = {
  rowValue: number;
  children: string | JSX.Element;
};

function SelectAnswer(props: { correct: boolean[] }) {
  const { correct } = props;
  const dispatch = useDispatch();
  const circles = [80, 50, 30, 10];
  const messages = ["매우 확실하다", "확실하다", "조금 확실하다", "불확실하다"];
  const [catColor, setCatColor] = useState<number>(0); // 0: red, 1: blue

  useEffect(() => {
    dispatch(setTempAnswerProperty({ property: "correct", value: correct[0] }));

    const intervalId = setInterval(() => {
      dispatch(addAnswer());
      setCatColor((prevCatColor) => prevCatColor + 1);
      dispatch(
        setTempAnswerProperty({ property: "correct", value: correct[1] })
      );
    }, 4000);

    return () => clearInterval(intervalId);
  }, [correct]);

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
      />
    ));
  }

  return (
    <ColFlexBox>
      <TimeBar totalTime={3000} renderer={catColor} />
      <div>
        {catColor === 0 ? "파란" : "빨강"}칸의 고양이는 생쥐를 찾았을까요?
      </div>
      <div>정답이라 생각하는 방향으로 확신하는 만큼 표시해주세요.</div>
      <StyledBox rowValue={catColor}>
        <ChocoImage src={choco} alt='choco' />
      </StyledBox>
      <RowFlexBox>
        <div>놓쳤다</div>
        <div>찾았다</div>
      </RowFlexBox>
      <RowFlexBox>
        <RowFlexBox>{renderSelectCircles(circles, messages, false)}</RowFlexBox>
        <RowFlexBox style={{ flexDirection: "row-reverse" }}>
          {renderSelectCircles(circles, messages, true)}
        </RowFlexBox>
      </RowFlexBox>
    </ColFlexBox>
  );
}

const ColFlexBox = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const RowFlexBox = styled.div({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const StyledBox: React.ComponentType<StyledBoxProps> = styled.div<StyledBoxProps>`
  width: 4vw;
  height: 4vw;
  border: 0.5rem solid ${(props) => (props.rowValue === 0 ? "blue" : "red")};
  border-radius: 10%;
  margin: 5px;
`;

const ChocoImage = styled.img({
  width: "100%",
  height: "100%",
});

export default SelectAnswer;
