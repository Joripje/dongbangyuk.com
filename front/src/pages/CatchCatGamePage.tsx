import { useState, useEffect } from "react";

import { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";

import { GameBoard } from "../components/catchCat";
import { PrepareTemplate, PrepareExam, StatusBar } from "components/game";

import {
  has,
  catchCat,
  first,
  second,
  third,
  fourth,
  fifth,
  sixth,
  seventh,
} from "assets/images/catch";
import { Timer } from "components/common";
import { setBoolState } from "store/testControlSlice";

function CatchCatGamePage() {
  const gameType = "cat";
  const dispatch = useDispatch();
  // const [status] = useState("explain");
  const [thisComponent, setThisComponent] = useState<JSX.Element>();
  const [problemNum, setProblemNum] = useState(0);
  const { isPreparing, isGaming } = useSelector(
    (state: RootState) => state.testControl
  );

  useEffect(() => {
    const gameType = "cat";
    const goal = [
      "차례로 등장하는 생쥐 무리와 고양이 무리의 위치를 비교하여 특정 고양이가 생쥐를 찾았는지 판단하기"
    ];
    const descriptions = [
      "생쥐 무리가 등장하는 위치 기억하기",
      "고양이 무리가 등장하면 생쥐 무리가 등장했던 위치와 비교하기",
      "빨간 칸과 파란 칸으로 표시된 고양이들이 각각 생쥐를 찾았는지 판단하기",
      "빨간 칸의 고양이가 생쥐를 찾았는지 판단하고 확신하는 정도 응답하기",
      "파란 칸의 고양이가 생쥐를 찾았는지 판단하고 확인하는 정도 응답하기",
      "한 문항에서 생쥐 무리와 고양이 무리 수는 동일함",
      "제한 시간을 초과하지 않도록 하기"
    ];
    const imagesList: string[] = [
      catchCat,
      first,
      second,
      third,
      fourth,
      fifth,
      sixth,
      seventh,
    ];
    const overviewProps = {
      image: has,
      name: "고양이 술래잡기",
      descript:
        "생쥐 무리가 등장하는 위치를 기억하여 고양이가 생쥐를 찾았는지 판단해 주세요.",
      minutes: 4,
      rounds: 1,
      problems: 5,
      ability: "작업기억",
    };

    if (isGaming) {
      setThisComponent(
        <GameBoard
          problemNum={problemNum}
          ascProblemNum={() =>
            setProblemNum((prevProblemNum) => prevProblemNum + 1)
          }
        />
      );
    } else {
      if (isPreparing) {
        setThisComponent(
          <PrepareTemplate
            imagesList={imagesList}
            overviewProps={overviewProps}
            goal={goal}
            descriptions={descriptions}
          />
        );
      } else {
        setThisComponent(
          <PrepareExam
            gameType={gameType}
            image={imagesList[0]}
            descriptions={descriptions}
          />
        );
      }
    }
  }, [isPreparing, isGaming, problemNum]);

  const onExitHandler = () => {
    dispatch(setBoolState({ property: "isPreparing", value: false }));
  };

  return (
    <>
      <StatusBar status={isGaming} gameType={gameType} problemNum={problemNum}>
        {!isGaming && isPreparing ? (
          <Timer
            startTime={new Date().getTime()}
            settingTime={300}
            onExitHandler={onExitHandler}
          />
        ) : (
          <></>
        )}
      </StatusBar>
      {thisComponent}
    </>
  );
}

export default CatchCatGamePage;
