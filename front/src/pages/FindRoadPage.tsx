import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Timer } from "components/common";
import { GameBoard } from "../components/findRoad";
import { PrepareTemplate, PrepareExam, StatusBar } from "components/game";

import {
  rmt,
  findRoad,
  first,
  second,
  third,
  fourth,
  fifth,
  sixth,
  seventh,
  eighth,
  nineth,
  tenth,
} from "assets/images/findRoad";
import { RootState } from "store";
import { submitRoadAnswer } from "store/findRoadSlice";
import { resetGameState } from "store/testControlSlice";

function FindRoadPage() {
  const dispatch = useDispatch();
  const gameType = "road";
  const [problemNum, setProblemNum] = useState(1);
  const [startTime, setStartTime] = useState(new Date());
  const [thisComponent, setThisComponent] = useState<JSX.Element>();

  const { isPreparing, isGaming } = useSelector(
    (state: RootState) => state.testControl
  );

  useEffect(() => {
    const gameType = "road";
    const goal = [
      "매트릭스에 정답 수 만큼의 울타리를 설치하여 모든 교통수단을 정해진 손님에게 보내기",
    ];
    const descriptions = [
      "각 교통수단의 위치와 대응하는 손님의 위치를 확인하기",
      "각 교통수단이 정해진 손님에게 도착하도록 매트릭스에 울타리를 설치하기",
      "교통 수단은 울타리가 없으면 직진하고 울타리를 만나면 90도 회전",
      "잘못 설치된 울타리는 다시 클릭하여 제거하기",
      "울타리 설치를 마친 뒤 정답 수에 맞는 울타리가 사용되었는지 확인하기",
      "제출 버튼을 클릭하여 응답 제출하기",
      "라운드 제한 시간 5분 내에 최대한 많은 문제를 빠르고 정확하게 풀기",
      "교통수단들의 이동 거리와 경로의 중첩 여부는 정답에 영향을 주지 않음",
      "손님에게 도착하지 못한 교통수단이 하나라도 있으면 오답 처리",
      "설치 울타리 수가 정답 울타리 수와 같으면 최대 득점, 초과할수록 획득 점수 감소",
      "클릭 가능 횟수는 최대 20회"
    ];
    const imagesList: string[] = [
      findRoad,
      first,
      second,
      third,
      fourth,
      fifth,
      sixth,
      seventh,
      eighth,
      nineth,
      tenth,
    ];
    const overviewProps = {
      image: rmt,
      name: "길 만들기",
      descript:
        "매트릭스 위에 울타리를 설치하여 교통수단을 정해진 손님에게 보내주세요.",
      minutes: 3,
      rounds: 1,
      problems: 0,
      ability: "계획능력",
    };

    if (isGaming) {
      setStartTime(new Date());
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
  }, [isPreparing, isGaming]);

  const onExitHandler = () => {
    dispatch(submitRoadAnswer());
    alert("제출이 완료됐습니다.");
    dispatch(resetGameState());
  };

  return (
    <>
      <StatusBar
        status={isGaming}
        gameType={gameType}
        problemNum={problemNum}
        isPreparing={isPreparing}
      >
        {!isPreparing ? (
          <></>
        ) : (
          <Timer
            startTime={startTime.getTime()}
            settingTime={300}
            onExitHandler={onExitHandler}
          />
        )}
      </StatusBar>
      {thisComponent}
    </>
  );
}

export default FindRoadPage;
