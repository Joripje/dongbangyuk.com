import React, { useState } from "react";
import RoadSingleBox from "./RoadSingleBox";
import styled from "styled-components";
import { roadroadya } from "api/test";
import ProblemInfo from "./ProblemInfo";
import { Button } from "@mui/material";

type GameBoardProps = {
  ascProblemNum: () => void;
};

type Problem = {
  gameType: string;
  problemId: number;
  problem: number[][];
  correct: number;
};

// type Answer = {
//   gameType: string;
//   problemId: number;
//   answer: number[][];
//   timestamp: string[];
//   clicks: number;
// };

const GameBoard = (props: GameBoardProps) => {
  const { ascProblemNum } = props;
  const initialProblem: Problem = {
    gameType: "road",
    problemId: 0,
    problem: [
      [-1, 1, -1, 3, 2, -1, -1],
      [-1, 0, 0, 0, 0, 0, 1],
      [-1, 0, 0, 0, 0, 0, -1],
      [-1, 0, 0, 0, 0, 0, 2],
      [-1, 0, 0, 0, 0, 0, -1],
      [-1, 0, 0, 0, 0, 0, 3],
      [-1, -1, -1, -1, -1, -1, -1],
    ],
    correct: 0,
  };
  const [boardState, setBoardState] = useState(initialProblem);
  const [answerList, setAnswerList] = useState<Array<Object>>([]);
  const [clickCount, setClickCount] = useState(20);

  const cleanBoard = (): void => {
    // GET Method를 활용해 받아온 게임 리스트를 하나 씩 pop하면서 problem에 등록
    const newProblem: Problem = initialProblem;
    setBoardState(newProblem);
  };

  const saveAnswer = () => {
    let newAnswerList: Array<Object> = answerList;
    newAnswerList = [
      ...answerList,
      {
        ...boardState,
        timestamp: new Date().toISOString(),
        clicks: clickCount,
      },
    ];
    setAnswerList(newAnswerList);
    ascProblemNum();
  };

  const onBoxClickHandler = (
    event: MouseEvent,
    xIndex: number,
    yIndex: number,
    rotate: number
  ) => {
    event.preventDefault();
    if (clickCount < 1) {
      alert("더 이상 클릭할 수 없어요.");
      return;
    } else setClickCount((clickCount) => clickCount - 1);
    const itemValue = boardState.problem[yIndex][xIndex];
    if (
      itemValue === -1 ||
      itemValue === 1 ||
      itemValue === 2 ||
      itemValue === 3
    )
      return;
    const newBoardState = boardState.problem.map((row, rowIndex) =>
      rowIndex === yIndex
        ? row.map((value, columnIndex) =>
            columnIndex === xIndex ? (itemValue === 0 ? rotate : 0) : value
          )
        : row
    );
    setBoardState({ ...boardState, problem: newBoardState });
  };

  // const onBoxClickHandler = (
  //   event: MouseEvent,
  //   xIndex: number,
  //   yIndex: number,
  //   rotate: number
  // ) => {
  //   event.preventDefault();
  //   if (clickCount < 1) {
  //     alert("더 이상 클릭할 수 없어요.");
  //     return;
  //   } else setClickCount((clickCount) => clickCount - 1);
  //   const itemValue = boardState.answer[yIndex][xIndex];
  //   if (
  //     itemValue === -1 ||
  //     itemValue === 1 ||
  //     itemValue === 2 ||
  //     itemValue === 3
  //   )
  //     return;
  //   const newBoardState = boardState.answer.map((row, rowIndex) =>
  //     rowIndex === yIndex
  //       ? row.map((value, columnIndex) =>
  //           columnIndex === xIndex ? (itemValue === 0 ? rotate : 0) : value
  //         )
  //       : row
  //   );
  //   setBoardState({ ...boardState, answer: newBoardState });
  // };

  const onNextHandler = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    saveAnswer();
    cleanBoard();
    setClickCount(20);
  };

  const onSubmitHandler = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    // const date = new Date(); // YYMMDD
    const dummyProps = {
      method: "POST",
      url: "/problems",
      // url: "/assessment-centre/road",
      data: answerList,

      // data: {
      //   userId: "ssafy",
      //   date: 230419,
      //   gameType: "road",
      //   propblems: answerList,
      // },
    };
    console.log(dummyProps);
    roadroadya(dummyProps);
  };

  return (
    <RowFlexBox>
      <ProblemInfo clickCount={clickCount} leastWall={5} />
      <ColFlexBox>
        {boardState.problem.map((item, yIndex) => {
          return (
            <RowFlexBox key={yIndex}>
              {item.map((rowValue, xIndex) => {
                return (
                  <RoadSingleBox
                    key={xIndex}
                    rowValue={rowValue}
                    xIndex={xIndex}
                    yIndex={yIndex}
                    onClickHandler={onBoxClickHandler}
                  />
                );
              })}
            </RowFlexBox>
          );
        })}
        <SubmitButton variant='contained' onClick={onNextHandler}>
          제출
        </SubmitButton>
      </ColFlexBox>
      <ColFlexBox style={{ position: "absolute", right: 0, bottom: 0 }}>
        <button style={{ height: "3rem" }} onClick={onSubmitHandler}>
          테스트용 최종 제출 버튼
        </button>
      </ColFlexBox>
    </RowFlexBox>
  );
};

const RowFlexBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const ColFlexBox = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const SubmitButton = styled(Button)({
  width: "15rem",
  height: "3rem",

  color: "white",
  fontWeight: 1000,
  background: "blue",
  border: "none",
  borderRadius: "20px",

  margin: "3rem",
  cursor: "pointer",
});

export default GameBoard;
