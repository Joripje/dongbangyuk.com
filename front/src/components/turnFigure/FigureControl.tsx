import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { pushChoice } from "store/turnFigureSlice";
import styled from "styled-components";

const FigureControl = () => {
  const dispatch = useDispatch();
  const images = useSelector((state: RootState) => state.turnFigure.images);
  const buttonName = [
    "왼쪽 45° 회전",
    "오른쪽 45° 회전",
    "좌우반전",
    "상하반전",
  ];

  const onClickHandler = (event: MouseEvent, index: number) => {
    event.preventDefault();
    console.log(index);
    dispatch(pushChoice(index));
  };

  return (
    <ButtonWrapper>
      {images.map((image, index) => {
        return (
          <ButtonBox
            key={index}
            onClick={(event) => onClickHandler(event, index)}
          >
            <ButtonImg src={image} alt={"버튼"} />;
            <ButtonTypo>{buttonName[index]}</ButtonTypo>
          </ButtonBox>
        );
      })}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div({
  width: "100%",
  height: "35%",
  marginBottom: "5%",

  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const ButtonBox = styled.button({
  width: "23%",
  height: "100%",
  padding: "0.5rem",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  background: "white",

  border: "0.2rem solid #52C564",
  borderRadius: "2rem",

  cursor: "pointer",

  "&: hover": {
    background: "rgb(238, 253, 243)",
  },
});

const ButtonImg = styled.img({
  width: "70%",
  marginBottom: "1rem",
});

const ButtonTypo = styled.div({
  color: "#52C564",
  fontSize: "1.5rem",
  fontWeight: "1000",
});

export default FigureControl;
