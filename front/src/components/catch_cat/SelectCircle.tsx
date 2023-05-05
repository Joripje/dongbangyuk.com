import styled from "styled-components";

type SelectCircleProps = {
  radius: number;
  message: string;
};

type SelectionCircleProps = {
  radius: number;
};

function SelectCircle(props: SelectCircleProps) {
  const { radius, message } = props;
  return (
    <ColFlexBox>
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
