// import { useState } from "react";
import { rps, rpsDescript } from "assets/images";
import { PrepareTemplate, StatusBar, PrepareExam } from "components/game";
import { useSelector } from "react-redux";
import { RootState } from "store";

function RpsPreparePage() {
  const isPreparing = useSelector(
    (state: RootState) => state.testControl.isPreparing
  );
  // const [isPreparing, setIsPreparing] = useState(true);

  const imagesList: string[] = [rpsDescript, rps];

  const overviewProps = {
    image: rps,
    name: "가위바위보",
    descript: "'나' 혹은 '상대'의 입장에서 가위바위보를 해주세요.",
    minutes: 3,
    rounds: 3,
    problems: 0,
    ability: "인지능력",
  };

  const goal = [
    "'나'혹은'상대'로 입장을 바꿔가며 항상 '나'가 이길 수 있도록 가위바위보 하기",
  ];

  const descriptions = [
    "라운드1은 항상'나'의 입장에서 가위바위보 이기기",
    "'상대'가 낸 손을 확인하기'",
    "'나'가 이기기 위해 '나'가 어떤 손을 내야 하는지 결정하기",
    "가위,바위,보 중 하나를 키보드로 선택하기",
    "라운드2는 항상'상대'의 입장에서 가위바위보 지기",
    "'나'가 낸 손을 확인하기'",
    "'나'가 이기기 위해 '상대'가 어떤 손을 내야 하는지 결정하기",
    "가위,바위,보 중 하나를 키보드로 선택하기",
    "라운드3은 '나' 혹은 '상대'로 입장이 계속 전환되므로, 어느 입장인지 확인하여 항상 '나'가 이기도록 응답하기",
  ];
  const gameType = "rps";

  return (
    <>
      <StatusBar gameType={gameType} status='rps' problemNum={3} />
      {isPreparing ? (
        <PrepareTemplate
          imagesList={imagesList}
          overviewProps={overviewProps}
          goal={goal}
          descriptions={descriptions}
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

export default RpsPreparePage;
