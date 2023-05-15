import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface TimerProps {
  // props의 타입 정의
  // 기준 시간을 정해두고 해당 시간과의 차를 통해 현재 시간을 print

  startTime: number;
  settingTime: number;
  onExitHandler?: () => void;
}

const Timer = (props: TimerProps) => {
  const navigate = useNavigate();
  const { startTime, settingTime, onExitHandler } = props;
  const [spendTime, setSpendTime] = useState(0);
  const [remainTime, setRemainTime] = useState(settingTime);
  const [hurry, setHurry] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSpendTime(Math.floor((new Date().getTime() - startTime) / 1000));
      setRemainTime(settingTime - spendTime);
    }, 1000);
    if (remainTime === 0) {
      if (onExitHandler) onExitHandler();
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

  // 5초 남으면 남은시간 빨간색으로 바꿔주는 함수
  useEffect(() => {
    if (remainTime < settingTime / 4) {
      setHurry(true);
    } else if (remainTime === 0) {
      setHurry(false);
    }
  }, [remainTime]);

  return (
    <TimeBox style={hurry ? { color: "red" } : { color: "black" }}>
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
