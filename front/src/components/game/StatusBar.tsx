import styled from "styled-components";

interface StatusBarProps {
  status: string;
  gameType: string;
  problemNum: number;
}

function StatusBar(props: StatusBarProps) {
  const { status, gameType, problemNum } = props;
  const explanationText: { [key: string]: string } = {
    road: "정답의 울타리 수에 맞게 울타리를 설치하여 교통수단을 정해진 손님에게 보내주세요.",
  };
  return (
    <StatusBarBox>
      <TypoForProblemNum>{problemNum}</TypoForProblemNum>
      <Vr />
      <TypoForText>{explanationText[gameType]}</TypoForText>
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

  marginBottom: "5rem",
});

const Vr = styled.div`
  width: 1px;
  height: 80%;

  background: #e5e5e5;
`;

const TypoForProblemNum = styled.div({
  width: "6rem",
  height: "3rem",
  textAlign: "center",

  borderRadius: "100%",

  fontSize: "30",
  fontWeight: "800",
});

const TypoForText = styled.div({
  display: "flex",
  alignItems: "center",

  width: "100%",
  height: "4rem",

  fontSize: "18",
  fontWeight: "800",
  marginLeft: "1rem",
});

export default StatusBar;
