import styled from "styled-components";
// import { useState, useEffect } from "react";

// import OverviewDescript from "components/game/OverviewDescript";
// import mmy789 from "assets/images/findRoad/mmy789.png";

// type NormalTypoProps = {
//   id: number;
//   key: number;
//   selectedTypo: number;
//   children: (string | number)[];
//   onClick: (event: MouseEvent) => void;
// };

function ComponentTest() {
  // const [selectedTypo, setSelectedTypo] = useState<number>(-1);
  // const overviewProps = {
  //   image: mmy789,
  //   name: "가위바위보",
  //   descript: "'나' 혹은 '상대'의 입장에서 가위바위보를 해주세요.",
  //   minutes: 3,
  //   rounds: 3,
  //   problems: 0,
  //   ability: "인지능력",
  // };

  // const descriptions = [
  //   "왼쪽에 있는 도형을 오른쪽에 있는 도형처럼 회전시키기",
  //   "사용가능한 버튼은 총 4개",
  //   "버튼을 눌러 회전 과정 만들기",
  //   "클릭 가능 횟수는 총 20회",
  //   "하나 지움과 전체 초기화 버튼으로 과정을 지울 수 있음",
  //   "답 완성 후, 답안 제출 버튼 클릭",
  // ];

  // const onTypoClickHandler = (event: MouseEvent) => {
  //   // event.preventDefault();
  //   const tempValue: number = parseInt((event.target as HTMLElement)?.id);
  //   if (tempValue !== undefined) setSelectedTypo(tempValue);
  // };

  // useEffect(() => {}, [selectedTypo]);

  return (
    <TempBox>
      {/* <OverviewDescript overviewProps={overviewProps} />
      <MethodDescription>
        <HighlightTypo>과제 목표</HighlightTypo>
        {descriptions.map((item, index) => {
          return (
            <NormalTypo
              id={index}
              key={index}
              selectedTypo={selectedTypo}
              onClick={onTypoClickHandler}
            >
              {index}. {item}
            </NormalTypo>
          );
        })}
      </MethodDescription>
      <MethodDescription>
        <HighlightTypo>응시방법</HighlightTypo>
        {descriptions.map((item, index) => {
          return (
            <NormalTypo
              id={index}
              key={index}
              selectedTypo={selectedTypo}
              onClick={onTypoClickHandler}
            >
              {index}. {item}
            </NormalTypo>
          );
        })}
      </MethodDescription> */}
    </TempBox>
  );
}

const TempBox = styled.div({
  width: "27rem",
  height: "80vh",
  background: "gray",

  padding: "1rem",
  border: "solid 1px black",

  overflowY: "scroll",
});

// const MethodDescription = styled.div({
//   background: "white",
//   margin: "1rem 0",
//   borderRadius: 20,
//   padding: "1rem",
// });

// const StyleForTypo = {
//   display: "flex",
//   alignItems: "center",

//   width: "100%",

//   fontSize: "1.2rem",
//   fontWeight: "800",
// };

// const HighlightTypo = styled.div({
//   ...StyleForTypo,
//   height: "3rem",
// });

// const NormalTypo: React.ComponentType<NormalTypoProps> =
//   styled.div<NormalTypoProps>((props: NormalTypoProps) => ({
//     ...StyleForTypo,
//     color: props.id === props.selectedTypo ? "#97E3E1" : "#aaaaaa",
//     margin: "2rem 0",

//     cursor: "pointer",
//   }));

export default ComponentTest;
