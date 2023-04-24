import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface TimerProps {
  // props의 타입 정의
  // 기준 시간을 정해두고 해당 시간과의 차를 통해 현재 시간을 print
  startTime: number;
  settingTime: number;
  onExitHandler?: () => void;
}

const Timer: React.FC<TimerProps> = (props: TimerProps) => {
  const navigate = useNavigate();
  const { startTime, settingTime, onExitHandler } = props;
  const [realTime, setRealTime] = useState(startTime);
  const [spendTime, setSpendTime] = useState(0);
  const [remainTime, setRemainTime] = useState(settingTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRealTime(new Date().getTime());
      setSpendTime(Math.floor(new Date(realTime - startTime).getTime() / 1000));
      setRemainTime(settingTime - spendTime);
    }, 1000);
    // console.log(new Date().toISOString());

    // if (remainTime < 0) {
    //   alert("소코마데다");
    //   if (onExitHandler) onExitHandler();
    //   navigate("/", { replace: true });
    // }
    return () => clearInterval(intervalId);
  }, [
    realTime,
    spendTime,
    remainTime,
    startTime,
    settingTime,
    navigate,
    onExitHandler,
  ]);

  return (
    <TimeBox>
      {remainTime < 0
        ? "종료"
        : `${Math.floor(remainTime / 60)} : 
          ${
            remainTime % 60 < 10
              ? "0" + (remainTime % 60).toString()
              : remainTime % 60
          }`}
    </TimeBox>
  );
};

const TimeBox = styled.div({
  position: "absolute",
  right: 15,
  top: "1.2rem",

  width: "4rem",
  height: "1.5rem",
  textAlign: "center",

  border: "1px solid gray",
  borderRadius: "10%",

  color: "blue",
  fontWeight: "800",
  fontSize: "16",
});

export default Timer;
