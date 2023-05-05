import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setTempAnswerProperty } from "store/catchCatSlice";

type SelectCircleProps = {
  index: number;
  radius: number;
  message: string;
  answer: boolean;
};

type SelectionCircleProps = {
  radius: number;
};

function SelectCircle(props: SelectCircleProps) {
  const { index, radius, message, answer } = props;
  const dispatch = useDispatch();

  const onSelectHandler = () => {
    dispatch(setTempAnswerProperty({ property: "answer", value: answer }));
    dispatch(setTempAnswerProperty({ property: "asure", value: index }));
  };

  return (
    <ColFlexBox onClick={onSelectHandler}>
      <div>{message}</div>
      <CircleWrapper>
        <SelectionCircle radius={radius} />
      </CircleWrapper>
    </ColFlexBox>
  );
}

const ColFlexBox = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const CircleWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "5vw",
  height: "5vw",
  borderRadius: "50%",

  background: "#e5e5e5",
});

const SelectionCircle = styled.div<SelectionCircleProps>`
  width: ${(props) => props.radius}%;
  height: ${(props) => props.radius}%;
  border-radius: 50%;
  background-color: #fff;
`;
export default SelectCircle;
