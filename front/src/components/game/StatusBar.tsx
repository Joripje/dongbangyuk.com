import { useState, useEffect } from "react";

import styled from "styled-components";

interface StatusBarProps {
  status: string;
  gameType: string;
  problemNum: number;
}

function StatusBar(props: StatusBarProps) {
  // gameType과 status에 따라 다른 text를 통해 안내해야한다.
  const { status, gameType, problemNum } = props;
  const [shownText, setShownText] = useState("방법 설명");

  useEffect(() => {
    const explanationText: { [key: string]: string } = {
      road: "정답의 울타리 수에 맞게 울타리를 설치하여 교통수단을 정해진 손님에게 보내주세요.",
    };
    if (status === "explain") setShownText("방법 설명");
    else if (status === "practice") setShownText("연습");
    else setShownText(explanationText[gameType]);
  }, [status, gameType]);

  return (
    <StatusBarBox>
      <TypoForProblemNum>{problemNum}</TypoForProblemNum>
      <Vr />
      <TypoForText>{shownText}</TypoForText>
    </StatusBarBox>
  );
}

const StatusBarBox = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",

  width: "100%",
  height: "4rem",
  background: "white",
  borderRadius: "20px 20px 0 0 ",
  borderBottom: "1px solid #e5e5e5",

  marginBottom: "3rem",
});

const Vr = styled.div`
  width: 1px;
  height: 80%;

  background: #e5e5e5;
`;

const TypoForProblemNum = styled.div({
  display: "flex",
  width: "6rem",
  height: "4rem",
  alignItems: "center",
  justifyContent: "center",

  borderRadius: "100%",

  fontSize: "2rem",
  fontWeight: "800",
});

const TypoForText = styled.div({
  display: "flex",
  alignItems: "center",

  width: "100%",
  height: "4rem",

  fontSize: "1.2rem",
  fontWeight: "800",
  marginLeft: "1rem",
});

export default StatusBar;
