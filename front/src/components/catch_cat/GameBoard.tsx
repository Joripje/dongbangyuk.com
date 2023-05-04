import { useState, MouseEvent } from "react";
import choco from "assets/images/catch/choco.jpg";
import chocoFood from "assets/images/catch/choco_food.jpg";

import styled from "styled-components";
import { height } from "@mui/system";

type GameBoardProps = {
  problemNum: number;
  ascProblemNum: () => void; // ProblemNum을 어센드하여 StatusBar에서 올바른 값이 나오도록 수정
};

type Problem = {
  problem: number[][];
};

type Answer = {
  gameType: string;
  correct: boolean;
  answer: boolean;
  asure: number;
  //   answer: number[][];
};

const GameBoard = (props: GameBoardProps) => {
  const { ascProblemNum } = props;
  const initialProblem: Problem = {
    problem: [
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  };
  //   const [problemNum, setProblemNum] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<number>(4);
  const [gameState, setGameState] = useState<string>("cat"); // cat > mouse > tomCat > choice > cat
  const [boardState, setBoardState] = useState(initialProblem); // 사용자가 보고 있는 문제지
  const [answerList, setAnswerList] = useState<Array<Answer>>([]); // 채점서버에 제출한 답변
  //   const [timestamp, setTimestamp] = useState<string>(new Date().toISOString());

  const randomNumbers = (n: number) => {
    const numbers = Array.from(Array(36), (_, index) => index); // 0부터 35까지의 숫자를 가진 배열 생성
    for (let i = 0; i < numbers.length; i++) {
      const randomIndex = Math.floor(Math.random() * (i + 1)); // 0부터 i까지의 인덱스 중에서 임의의 인덱스 선택
      [numbers[i], numbers[randomIndex]] = [numbers[randomIndex], numbers[i]]; // 현재 인덱스와 선택된 인덱스의 값을 교환
    }
    return numbers.slice(0, n); // 처음 n개의 값을 선택하여 반환
  };

  const cleanBoard = (): void => {
    var target;
    if (gameState === "tomCat") target = randomNumbers(2);
    else target = randomNumbers(difficulty);

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
                return (
                  <StyledBox key={xIndex}>
                    {rowValue ? <ChocoImage src={choco} alt={"choco"} /> : ""}
                  </StyledBox>
                );
              })}
            </RowFlexBox>
          );
        })}
      </ColFlexBox>

      <button
        style={{ height: "3rem", position: "absolute", right: 0, bottom: 0 }}
        onClick={onSubmitHandler}
      >
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
  marginTop: "5rem",
});

const StyledBox = styled.div({
  width: "8rem",
  height: "8rem",

  border: "0.5rem solid gray",
  borderRadius: "10%",
  margin: 5,
});

const ChocoImage = styled.img({
  width: "100%",
  height: "100%",
});

export default GameBoard;
