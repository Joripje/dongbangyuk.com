import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import { submitCatAnswer } from "store/catchCatSlice";

import { SingleCatBox, SelectAnswer } from ".";

import styled from "styled-components";
import { resetGameState } from "store/testControlSlice";
type GameBoardProps = {
  problemNum: number;
  ascProblemNum: () => void; // ProblemNum을 어센드하여 StatusBar에서 올바른 값이 나오도록 수정
};

const GameBoard = (props: GameBoardProps) => {
  const { ascProblemNum } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialProblem = useMemo(
    () => [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    []
  );

  const [problemNum, setProblemNum] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<number>(4);
  const [gameState, setGameState] = useState<number>(0); // 1Cat > 2mouse > 3SelectCat > 4choice > 1cat
  const [catPosition, setCatPosition] = useState<number[]>([]);
  const [foodPosition, setFoodPosition] = useState<number[]>([]);
  const [selectedCat, setSelectedCat] = useState<number[]>([]);
  const [boardState, setBoardState] = useState<number[][]>([]); // 사용자가 보고 있는 문제지
  const [correct, setCorrect] = useState<boolean[]>([false, false]);

  useEffect(() => {
    const onSubmitHandler = () => {
      alert("제출이 완료됐습니다.");
      dispatch(submitCatAnswer());
      dispatch(resetGameState());
    };
    // 결과 페이지로 안내해야함
    if (problemNum === 11 && gameState % 4 === 1) onSubmitHandler();

    const randomNumbers = (n: number, numbers: number[]) => {
      // const numbers = Array.from(arr, (_, index) => index); // 0부터 35까지의 숫자를 가진 배열 생성
      for (let i = 0; i < numbers.length; i++) {
        const randomIndex = Math.floor(Math.random() * (i + 1)); // 0부터 i까지의 인덱스 중에서 임의의 인덱스 선택
        [numbers[i], numbers[randomIndex]] = [numbers[randomIndex], numbers[i]]; // 현재 인덱스와 선택된 인덱스의 값을 교환
      }
      return numbers.slice(0, n); // 처음 n개의 값을 선택하여 반환
    };

    const cleanBoard = (): void => {
      const number36 = Array.from({ length: 36 }, (_, index) => index);

      let targets: number[] = [0];
      switch (gameState % 4) {
        case 0:
          ascProblemNum();
          setProblemNum((prevProblemNum) => prevProblemNum + 1);

          if (problemNum % 4 === 3) {
            setDifficulty((prevDifficulty) => prevDifficulty + 1);
          }

          targets = randomNumbers(difficulty, number36);
          setCatPosition(targets);
          break;
        case 1:
          targets = randomNumbers(difficulty, number36);
          setFoodPosition(targets);
          break;
        case 2:
          targets = randomNumbers(2, catPosition);
          setSelectedCat(targets);
          break;
        case 3:
          const result: boolean[] = [];
          selectedCat.map((cat) => result.push(foodPosition.includes(cat)));
          setCorrect(result);
          break;
        default:
          console.log("어떻게 오셨어요?");
      }

      let newBoardState = JSON.parse(JSON.stringify(initialProblem));
      targets.forEach((target, index) => {
        const yIndex = Math.floor(target / 6);
        const xIndex = target % 6;
        if (gameState % 4 === 2)
          newBoardState[yIndex][xIndex] = ((gameState + 1) % 4) + index;
        else newBoardState[yIndex][xIndex] = (gameState + 1) % 4;
      });

      setBoardState(newBoardState);
    };

    const intervalId = setInterval(
      () => {
        cleanBoard();
        setGameState(gameState + 1);
      },
      !gameState ? 0 : gameState % 4 === 0 ? 8000 : 2000
    );

    return () => clearInterval(intervalId);
  }, [
    gameState,
    catPosition,
    foodPosition,
    selectedCat,
    difficulty,
    initialProblem,
    problemNum,
    navigate,
    dispatch,
    ascProblemNum,
  ]);

  return (
    <RowFlexBox>
      {gameState && gameState % 4 === 0 ? (
        <SelectAnswer correct={correct} />
      ) : (
        <SingleCatBox boardState={boardState} />
      )}
    </RowFlexBox>
  );
};

const RowFlexBox = styled.div`
  display: flex;
  flex-direction: row;
`;

export default GameBoard;
