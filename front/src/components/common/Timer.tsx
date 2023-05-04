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
  const [spendTime, setSpendTime] = useState(0);
  const [remainTime, setRemainTime] = useState(settingTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // setRealTime(new Date().getTime());
      setSpendTime(Math.floor((new Date().getTime() - startTime) / 1000));
      setRemainTime(settingTime - spendTime);
    }, 1000);

    if (remainTime === 0) {
      if (onExitHandler) onExitHandler();
      // navigate("/", { replace: true });
      return () => clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [
    // realTime,
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
        ? "0"
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

  width: "6rem",
  height: "1.5rem",
  textAlign: "center",
  padding: "0.3rem",
  border: "3px solid gray",
  borderRadius: "10%",

  color: "#5C78C5",
  fontWeight: "800",
  fontSize: "20px",
});

export default Timer;
