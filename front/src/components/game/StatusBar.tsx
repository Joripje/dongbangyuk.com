import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setBoolState } from "store/testControlSlice";

import styled from "styled-components";

interface StatusBarProps {
  status: boolean | string; // 차차 다 boolean으로 바꿀 것
  gameType: string;
  problemNum: number | string;
  children?: JSX.Element;
  isPreparing?: boolean;
}

function StatusBar(props: StatusBarProps) {
  const { status, gameType, problemNum, children } = props;
  const [shownText, setShownText] = useState<string>("");
  const dispatch = useDispatch();
  const { isGaming, isPreparing } = useSelector(
    (state: RootState) => state.testControl
  );

  useEffect(() => {
    const explanationText: { [key: string]: string } = {
      road: "정답의 울타리 수에 맞게 울타리를 설치하여 교통수단을 정해진 손님에게 보내주세요.",
      rps: "나 혹은 상대의 입장에서 가위바위보를 해주세요",
      cat: "잡아잡아 초코~",
      rotate: "돌려돌려 도형~",
    };
    if (!status) setShownText("방법 설명");
    else setShownText(explanationText[gameType]);
  }, [status, gameType]);

  const onJumpHandler = () => {
    dispatch(setBoolState({ property: "isPreparing", value: false }));
  };

  return (
    <StatusBarBox>
      <RowFlex>
        <TypoForProblemNum>
          {isGaming ? problemNum : gameType}
        </TypoForProblemNum>
        <Vr />
        <TypoForText>{shownText}</TypoForText>
      </RowFlex>
      <RowFlex style={{ padding: "0 2rem" }}>
        <JumpButton onClick={onJumpHandler} disabled={!isPreparing || isGaming}>
          {isPreparing && !isGaming ? "설명 건너뛰기" : ""}
        </JumpButton>
        {children}
      </RowFlex>
    </StatusBarBox>
  );
}

const StatusBarBox = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",

  width: "100%",
  height: "6rem",
  background: "white",
  borderRadius: "20px 20px 0 0 ",
  borderBottom: "0.2rem solid #e5e5e5",
});

const RowFlex = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const Vr = styled.div`
  width: 1px;
  height: 4rem;

  background: rgba(0, 0, 0, 0.8);
`;

const TypoForProblemNum = styled.div({
  display: "flex",
  width: "auto",
  minWidth: "6rem",
  height: "4rem",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 1rem",

  borderRadius: "100%",

  fontSize: "2rem",
  fontWeight: "800",
});

const TypoForText = styled.div({
  display: "flex",
  alignItems: "center",

  // width: "75%",
  height: "4rem",

  fontSize: "1.2rem",
  fontWeight: "800",
  marginLeft: "1rem",
});

const JumpButton = styled(Button)({
  width: "10rem",
  height: "80%",
});

export default StatusBar;
