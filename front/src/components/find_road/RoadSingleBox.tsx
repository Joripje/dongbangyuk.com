import React, { ReactNode } from "react";
import styled from "styled-components";

interface MainProps {
  rowValue: number;
  xIndex: number;
  yIndex: number;
  onClickHandler: (
    event: MouseEvent,
    xIndex: number,
    yIndex: number,
    attribute: number
  ) => void;
}

interface DestinationProps {
  attribute: number;
  xIndex: number;
  yIndex: number;
}

interface EmptyBoxProps {
  key: number;
  children: ReactNode;
  attribute: number;
}

interface DiagonalProps {
  attribute: number;
  xIndex: number;
  yIndex: number;
  onClick?: (event: MouseEvent) => void;
}

const RoadSingleBox: React.FC<MainProps> = (props: MainProps) => {
  const { rowValue, xIndex, yIndex, onClickHandler } = props;

  return (
    <EmptyBox attribute={rowValue} key={xIndex}>
      <LeftTopDiagonal
        attribute={rowValue}
        xIndex={xIndex}
        yIndex={yIndex}
        onClick={(event: MouseEvent) =>
          onClickHandler(event, xIndex, yIndex, 4)
        }
      />
      <RightTopDiagonal
        attribute={rowValue}
        xIndex={xIndex}
        yIndex={yIndex}
        onClick={(event: MouseEvent) =>
          onClickHandler(event, xIndex, yIndex, 5)
        }
      />
    </EmptyBox>
  );
};

const EmptyBox: React.ComponentType<EmptyBoxProps> = styled.div<EmptyBoxProps>`
  position: relative;
  width: 100px;
  height: 100px;

  background: ${(props: EmptyBoxProps) => {
    const { attribute } = props;
    if (attribute === 1) return "red";
    else if (attribute === 2) return "blue";
    else if (attribute === 3) return "gray";
  }};

  border: solid 1px
    ${(props: EmptyBoxProps) => {
      const { attribute } = props;
      if (attribute === 1) return "red";
      else if (attribute === 2) return "blue";
      else if (attribute === 3) return "gray";
      else if (attribute === -1) return "white";
      else return "black";
    }};
`;

const styleForDiagonal = `
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    bottom: 0;

    height: 10px;
    background: black;
    `;

const LeftTopDiagonal: React.ComponentType<DiagonalProps> = styled.div<DiagonalProps>`
  ${styleForDiagonal}
  transform: rotate(45deg);
  background: ${(props: DestinationProps) => {
    const { attribute } = props;
    if (attribute === 4) return "green";
    else if (attribute === 5) return "white";
    else if (
      attribute === -1 ||
      attribute === 1 ||
      attribute === 2 ||
      attribute === 3
    )
      return "transparent";
    else return "rgba(0, 0, 0, 0.1)";
  }};

  z-index: ${(props: DestinationProps) => {
    const { attribute } = props;
    if (attribute === 4) return 1;
    else return 0;
  }};
`;

const RightTopDiagonal: React.ComponentType<DiagonalProps> = styled.div<DiagonalProps>`
  ${styleForDiagonal}
  transform: rotate(-45deg);
  background: ${(props: DestinationProps) => {
    const { attribute } = props;
    if (attribute === 5) return "green";
    else if (attribute === 4) return "white";
    else if (
      attribute === -1 ||
      attribute === 1 ||
      attribute === 2 ||
      attribute === 3
    )
      return "transparent";
    else return "rgba(0, 0, 0, 0.1)";
  }};

  z-index: ${(props: DestinationProps) => {
    const { attribute } = props;
    if (attribute === 5) return 1;
    else return 0;
  }};
`;

export default RoadSingleBox;
