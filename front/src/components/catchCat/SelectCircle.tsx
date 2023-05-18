import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setTempAnswerProperty } from "store/catchCatSlice";
import { RootState } from "store";

type SelectCircleProps = {
  index: number;
  radius: number;
  message: string;
  answer: boolean;
  setIsSelected: (isIt: boolean) => void;
};

type CircleWrapperProps = {
  tempAnswer: { answer: boolean; asure: number };
  index: number;
  answer: boolean;
};

type SelectionCircleProps = {
  radius: number;
};

function SelectCircle(props: SelectCircleProps) {
  const { index, radius, message, answer, setIsSelected } = props;
  const dispatch = useDispatch();
  const tempAnswer = useSelector(
    (state: RootState) => state.catchCat.tempAnswer
  );

  const onSelectHandler = () => {
    dispatch(setTempAnswerProperty({ property: "answer", value: answer }));
    dispatch(setTempAnswerProperty({ property: "asure", value: index }));
    setIsSelected(true);
  };

  return (
    <ColFlexBox onClick={onSelectHandler}>
      <CircleWrapper tempAnswer={tempAnswer} index={index} answer={answer}>
        <SelectionCircle
          radius={radius}
          style={{
            background:
              tempAnswer.answer === answer && tempAnswer.asure === index
                ? "rgb(238, 253, 243)"
                : "white",
          }}
        />
      </CircleWrapper>
      <CircleDes>
        {message.split("\n").map((word, index) => {
          return <div key={index}>{word}</div>;
        })}
      </CircleDes>
    </ColFlexBox>
  );
}

const ColFlexBox = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const CircleWrapper = styled.div<CircleWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 5vw;
  height: 5vw;
  border-radius: 50%;
  margin: 1rem 0;
  background: ${({ tempAnswer, answer, index }) =>
    tempAnswer.answer === answer && tempAnswer.asure === index
      ? "rgb(91, 236, 138)"
      : "#e5e5e5"};

  &:hover {
    background: ${({ tempAnswer, answer, index }) =>
      tempAnswer.answer === answer && tempAnswer.asure === index
        ? "rgb(91, 236, 138)"
        : "rgb(238, 253, 243)"};
  }
`;

const SelectionCircle = styled.div<SelectionCircleProps>`
  width: ${(props) => props.radius}%;
  height: ${(props) => props.radius}%;
  border-radius: 50%;
  background-color: #fff;
`;

const CircleDes = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  width: "7vw",
  height: "4rem",
  fontSize: "1.5rem",
  fontWeight: 1000,
  color: "rgba(0, 0, 0, 0.4)",
});

export default SelectCircle;
