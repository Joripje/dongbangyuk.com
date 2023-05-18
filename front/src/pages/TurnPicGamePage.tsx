import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Timer } from "components/common";
import { GameBoard } from "../components/turnFigure";
import { PrepareTemplate, PrepareExam, StatusBar } from "components/game";

import {
  mrt,
  TurnPic,
  first,
  second,
  third,
  fourth,
  fifth,
  sixth,
  seventh,
  eighth,
  ninth,
  tenth,
  eleventh,
  twelfth,
} from "assets/images/turnFigure";
import { RootState } from "store";
import { resetGameState, setBoolState } from "store/testControlSlice";
import { changeRound, submitAnswers } from "store/turnFigureSlice";

function TurnPicGamePage() {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState(new Date());
  const [thisComponent, setThisComponent] = useState<JSX.Element>();
  const [problemNum, setProblemNum] = useState(1);
  const { isPreparing, isGaming } = useSelector(
    (state: RootState) => state.testControl
  );
  const rounds = useSelector(
    (state: RootState) => state.turnFigure.tempAnswer.rounds
  );

  // gameStae의 변경에 따라 render할 component 지정
  useEffect(() => {
    const gameType = "rotate";
    const goal = [
      "주어진 글자나 도형을 보고 최소한의 클릭으로 회전 과정 만들기",
    ];
    const descriptions = [
      "왼쪽에 있는 도형을 오른쪽에 있는 도형처럼 회전시키기",
      "사용 가능한 버튼은 총 4개\n- 왼쪽 45도, 오른쪽 45도, 좌우반전, 상하반전",
      "버튼을 눌러 회전 과정 만들기",
      "클릭 가능 횟수는 총 20회",
      "하나 지움과 전체 초기화 버튼으로 과정을 지울 수 있음",
      "답 완성 후, 답안 제출 버튼 클릭",
      "라운드 1 알파벳, 라운드 2 도형 제시",
      "라운드 제한 시간(3분) 내 최대한 많은 문제를 빠르고 정확하게 풀기",
      "버튼 개수와 클릭 횟수를 최소한으로 사용하요 완성하기",
      "왼쪽, 오른쪽 회전 버튼은 45도 각도로 회전",
      "최대 8개 칸까지만 채울 수 있음",
      "클릭 가능 횟수는 최대 20회",
    ];
    const imagesList: string[] = [
      TurnPic,
      first,
      second,
      third,
      fourth,
      fifth,
      sixth,
      seventh,
      eighth,
      ninth,
      tenth,
      eleventh,
      twelfth,
    ];
    const overviewProps = {
      image: mrt,
      name: "도형 회전하기",
      descript:
        "주어지는 글자나 도형의 전과 후의 모양을 확인하고 후의 모양으로 회전시켜 주세요.",
      minutes: 6,
      rounds: 2,
      problems: 0,
      ability: "공간능력",
    };

    if (isGaming) {
      dispatch(changeRound(1));
      setThisComponent(
        <GameBoard
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
  }, [isPreparing, isGaming, dispatch]);

  const onTimeOver = async () => {
    // 라운드가 2라면 제출
    if (rounds === 2) {
      alert("제출이 완료됐습니다.");
      dispatch(submitAnswers());
      dispatch(resetGameState());
    }

    // 라운드를 2라운드로 변경하고 TimerReset
    dispatch(changeRound(2));
    setStartTime(new Date());
  };

  return (
    <>
      <StatusBar
        status={isGaming}
        gameType='rotate'
        problemNum={problemNum}
        isPreparing={isPreparing}
      >
        {!isPreparing ? (
          <></>
        ) : isGaming ? (
          <Timer
            startTime={startTime.getTime()}
            settingTime={90}
            onExitHandler={onTimeOver}
          />
        ) : (
          <Timer
            startTime={startTime.getTime()}
            settingTime={300}
            onExitHandler={() =>
              dispatch(setBoolState({ property: "isPreparing", value: false }))
            }
          />
        )}
      </StatusBar>
      {thisComponent}
    </>
  );
}

export default TurnPicGamePage;
