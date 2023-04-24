import styled from "styled-components";

interface StatusBarProps {
  status: string;
  gameType: string;
}

function StatusBar(params: StatusBarProps) {
  console.log(params);
  return (
    <StatusBarBox>
      <div>Hello</div>
    </StatusBarBox>
  );
}

const StatusBarBox = styled.div({
  width: "100%",
  height: "4rem",
  background: "white",
  borderRadius: "20px 20px 0 0 ",
  borderBottom: "1px solid #e5e5e5",
});

export default StatusBar;
