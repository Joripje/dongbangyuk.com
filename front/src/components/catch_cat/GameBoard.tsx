import { useState, MouseEvent } from "react";

import styled from "styled-components";

type GameBoardProps = {
  ascProblemNum: () => void; // ProblemNum을 어센드하여 StatusBar에서 올바른 값이 나오도록 수정
};

type Problem = {
  problem: number[][];
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
    problem: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  };
  const [problemNum, setProblemNum] = useState<number>(0);
  const [boardState, setBoardState] = useState(initialProblem); // 사용자가 보고 있는 문제지
  const [answerList, setAnswerList] = useState<Array<Answer>>([]); // 채점서버에 제출한 답변
  const [timestamp, setTimestamp] = useState<string>(new Date().toISOString());

  const cleanBoard = (): void => {
    var newProblem: Problem | undefined;

    if (newProblem !== undefined) {
      setBoardState(newProblem);
      console.log(newProblem);
    }
    ascProblemNum();
  };

  const onSubmitHandler = (event: MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    // 술래잡기와 관련된 API가 완성되면 http 통신
  };

  return (
    <RowFlexBox>
      <ColFlexBox>
        {boardState.problem.map((item, yIndex) => {
          return (
            <RowFlexBox key={yIndex}>
              {item.map((rowValue, xIndex) => {
                return <div key={xIndex} />;
              })}
            </RowFlexBox>
          );
        })}
      </ColFlexBox>

      <button style={{ height: "3rem" }} onClick={onSubmitHandler}>
        테스트용 최종 제출 버튼
      </button>
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

export default GameBoard;
