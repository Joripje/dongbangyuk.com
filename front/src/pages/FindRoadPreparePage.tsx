import { useState } from "react";

import { PrepareTemplate, StatusBar } from "components/game";
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
import PrepareExam from "components/game/PrepareExam";

function FindRoadPreparePage() {
  const [isPreparing, setIsPreparing] = useState(true);

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
  ];

  const gameType = "road";

  return (
    <>
      <StatusBar
        gameType={gameType}
        status='explain'
        problemNum='길 찾기'
        setIsPreparing={setIsPreparing}
      />
      {isPreparing ? (
        <PrepareTemplate
          imagesList={imagesList}
          overviewProps={overviewProps}
          goal={goal}
          descriptions={descriptions}
          setIsPreparing={setIsPreparing}
        />
      ) : (
        <PrepareExam
          gameType={gameType}
          image={imagesList[0]}
          descriptions={descriptions}
        />
      )}
    </>
  );
}

export default FindRoadPreparePage;
