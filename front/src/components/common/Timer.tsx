import React, { useEffect, useState } from "react";

interface TimerProps {
  // props의 타입 정의
  // 기준 시간을 정해두고 해당 ㅣ간과의 차를 통해 현재 시간을 print
  startTime: number;
  settingTime: number;
}

const Timer: React.FC<TimerProps> = (props: TimerProps) => {
  const { startTime, settingTime } = props;
  const [realTime, setRealTime] = useState(startTime);
  const [spendTime, setSpendTime] = useState(0);
  const [remainTime, setRemainTime] = useState(settingTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRealTime(new Date().getTime());
      setSpendTime(Math.floor(new Date(realTime - startTime).getTime() / 1000));
      setRemainTime(settingTime - spendTime);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [realTime, spendTime, startTime, settingTime]);

  return (
    <>
      {remainTime < 0 ? (
        "완료!!!"
      ) : (
        <div>
          남은 시간 : {Math.floor(remainTime / 60)} :{" "}
          {remainTime % 60 < 10
            ? "0" + (remainTime % 60).toString()
            : remainTime % 60}
        </div>
      )}
    </>
  );
};

export default Timer;
