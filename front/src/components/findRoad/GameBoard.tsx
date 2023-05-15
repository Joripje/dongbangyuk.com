import { useState, useMemo, MouseEvent, useEffect } from "react";

import RoadSingleBox from "./RoadSingleBox";
import ProblemInfo from "./ProblemInfo";
import { getFindRoadProblems, putFindRoadProblems } from "api/test";

import styled from "styled-components";
import { Button } from "@mui/material";
import { stop } from "components/common";
import { closeWebSocket } from "components/common/RecordVideo";

type GameBoardProps = {
  ascProblemNum: () => void; // ProblemNum을 어센드하여 StatusBar에서 올바른 값이 나오도록 수정
};

type Problem = {
  problem_id: number;
  problem: number[][];
  correct: number;
};

type TempProblem = {
  problemId: number;
  problem?: number[][];
  correct?: number;
  problem_id?: number;
};

type Answer = {
  gameType: string;
  problemId: number;
  answer: number[][];
  timestamp: string[];
  clicks: number;
};

const GameBoard = (props: GameBoardProps) => {
  const { ascProblemNum } = props;
  const initialProblem: Problem = {
    problem_id: 0,
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
  const [difficulty, setDiffuculty] = useState("easy");
  const [clickCount, setClickCount] = useState(20);
  const [easyProblems, setEasyProblems] = useState<Array<Problem>>([]);
  const [hardProblems, setHardProblems] = useState<Array<Problem>>([]);
  const [boardState, setBoardState] = useState(initialProblem); // 사용자가 보고 있는 문제지
  const [answerList, setAnswerList] = useState<Array<Answer>>([]); // 채점서버에 제출한 답변
  const [timestamp, setTimestamp] = useState<string>(new Date().toISOString());

  const cleanBoard = (): void => {
    var newProblem: Problem | undefined;
    if (difficulty === "easy") {
      newProblem = easyProblems.pop();
    } else {
      newProblem = hardProblems.pop();
    }
    if (newProblem !== undefined) {
      setBoardState(newProblem);
      console.log(newProblem);
    }
  };

  const saveAnswer = () => {
    const correct = boardState.correct;
    const newBoardState: TempProblem = {
      ...boardState,
      problemId: boardState.problem_id,
    };
    delete newBoardState.correct;
    delete newBoardState.problem;
    delete newBoardState.problem_id;

    const newAnswer: Answer = {
      ...newBoardState,
      gameType: "road",
      answer: boardState.problem,
      timestamp: [timestamp, new Date().toISOString()],
      clicks: clickCount,
    };

    const newAnswerList: Array<Answer> = [...answerList, newAnswer];
    ascProblemNum();

    // console.log(clickCount + correct);
    if (20 === clickCount + correct) {
      setDiffuculty("hard");
    }
    setTimestamp(new Date().toISOString());
    setAnswerList(newAnswerList);
  };

  const onBoxClickHandler = (
    event: MouseEvent,
    xIndex: number,
    yIndex: number,
    rotate: number
  ) => {
    event.preventDefault();
    if (clickCount < 1) {
      alert("더 이상 클릭할 수 없어요. 제출해주세요.");
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

  const onNextHandler = (event: MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    saveAnswer();
    cleanBoard();
    setClickCount(20);
  };

  const onSubmitHandler = (event: MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    const roadProps = {
      userId: 0,
      gameId: 0,
      date: new Date().toISOString(),
      gameType: "road",
      problems: answerList,
    };
    putFindRoadProblems(roadProps);
    stop();
  };

  useMemo(async () => {
    const fetchProblems = async () => {
      const newProblems: { easy: Problem[]; hard: Problem[] } =
        await getFindRoadProblems();
      const tempProblem = newProblems.easy.pop();
      if (tempProblem !== undefined) setBoardState(tempProblem);
      setEasyProblems(newProblems["easy"]);
      setHardProblems(newProblems["hard"]);
    };

    fetchProblems();
  }, []);

  useEffect(() => {
    closeWebSocket();
  }, []);

  return (
    <BoardWrapper>
      <ProblemInfo clickCount={clickCount} leastWall={boardState.correct} />
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
        {/* 빌드할 때 주석처리할 것 */}
        <button style={{ height: "3rem" }} onClick={onSubmitHandler}>
          테스트용 최종 제출 버튼
        </button>
      </ColFlexBox>
    </BoardWrapper>
  );
};

const BoardWrapper = styled.div({
  display: "flex",
  flexDirection: "row",
  marginTop: "3%",
});

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
