// import { useState, useEffect, useMemo, MouseEvent } from "react";
import choco from "assets/images/catch/choco.jpg";
import chocoFood from "assets/images/catch/choco_food.png";

import styled from "styled-components";

type SingleCatBoxProps = {
  boardState: number[][];
};

type StyledBoxProps = {
  rowValue: number;
  children: string | JSX.Element;
};

function SingleCatBox(props: SingleCatBoxProps) {
  const { boardState } = props;
  return (
    <ColFlexBox>
      {boardState.map((item, yIndex) => {
        return (
          <RowFlexBox key={yIndex}>
            {item.map((rowValue, xIndex) => {
              return (
                <StyledBox key={xIndex} rowValue={rowValue}>
                  {rowValue === 1 || rowValue === 3 || rowValue === 4 ? (
                    <ChocoImage src={choco} alt={"choco"} />
                  ) : rowValue === 2 ? (
                    <ChocoImage src={chocoFood} alt={"chocoFood"} />
                  ) : (
                    ""
                  )}
                </StyledBox>
              );
            })}
          </RowFlexBox>
        );
      })}
    </ColFlexBox>
  );
}

const RowFlexBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const ColFlexBox = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "3rem",
});

const StyledBox: React.ComponentType<StyledBoxProps> = styled.div<StyledBoxProps>`
  width: 4vw;
  height: 4vw;
  border: 0.5rem solid
    ${(props) =>
      props.rowValue === 3 ? "blue" : props.rowValue === 4 ? "red" : "gray"};
  border-radius: 10%;
  margin: 5px;
`;

const ChocoImage = styled.img({
  width: "100%",
  height: "100%",
});

export default SingleCatBox;
