import React, { PropsWithChildren } from "react";

interface TimerProps {
  // props의 타입 정의
  // 기준 시간을 정해두고 해당 ㅣ간과의 차를 통해 현재 시간을 print
}

const Timer: React.FC<TimerProps> = (props: PropsWithChildren<TimerProps>) => {
  const date = new Date();
  // 컴포넌트 내용 작성
  return <div>Hello I'm Timer</div>;
};

export default Timer;
