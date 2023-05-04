import { useState } from "react";

import { GameTemplate, PrepareTemplate, StatusBar } from "components/game";
import {
  whdrn,
  ekscp,
  wpgud,
  dudgjs,
  ehdns,
  tjdwls,
  dnjsvlf,
  mmy789,
  poonghyung,
} from "assets/images";
import PrepareExam from "components/game/PrepareExam";

function FindRoadPreparePage() {
  const [isPreparing, setIsPreparing] = useState(true);

  const imagesList: string[] = [
    whdrn,
    ekscp,
    wpgud,
    dudgjs,
    poonghyung,
    tjdwls,
    ehdns,
    dnjsvlf,
  ];

  const overviewProps = {
    image: mmy789,
    name: "가위바위보",
    descript: "'나' 혹은 '상대'의 입장에서 가위바위보를 해주세요.",
    minutes: 3,
    rounds: 3,
    problems: 0,
    ability: "인지능력",
  };

  const goal = ["가위바위보 잘해보라구~"];

  const descriptions = [
    "왼쪽에 있는 도형을 오른쪽에 있는 도형처럼 회전시키기",
    "사용가능한 버튼은 총 4개",
    "버튼을 눌러 회전 과정 만들기",
    "클릭 가능 횟수는 총 20회",
    "하나 지움과 전체 초기화 버튼으로 과정을 지울 수 있음",
    "답 완성 후, 답안 제출 버튼 클릭",
  ];

  const gameType = "road";

  return (
    <GameTemplate>
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
        <PrepareExam image={imagesList[0]} descriptions={descriptions} />
      )}
    </GameTemplate>
  );
}

export default FindRoadPreparePage;
