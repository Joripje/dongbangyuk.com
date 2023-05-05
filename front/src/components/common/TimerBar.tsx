import React, { useEffect, useState } from "react";
import styled from "styled-components";

type TimeLimitProgressBarProps = {
  totalTime: number; // in seconds
  warningTime?: number; // in seconds
  dangerTime?: number; // in seconds
  onComplete?: () => void;
};

type ProgressBarWrapperProps = {
  progress: number;
  color: string;
};

const TimeLimitProgressBar: React.FC<TimeLimitProgressBarProps> = ({
  totalTime,
  warningTime = 30,
  dangerTime = 10,
  onComplete,
}) => {
  const [remainingTime, setRemainingTime] = useState(totalTime);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => {
        const newRemainingTime = prevRemainingTime - 1;

        if (newRemainingTime <= 0) {
          clearInterval(interval);
          onComplete && onComplete();
        }

        return newRemainingTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const timeRatio = remainingTime / totalTime;
    const progressPercentage = Math.floor((1 - timeRatio) * 100);

    if (remainingTime <= dangerTime) {
      setProgress(progressPercentage);
    } else if (remainingTime <= warningTime) {
      setProgress(progressPercentage);
    } else {
      setProgress(progressPercentage);
    }
  }, [remainingTime, totalTime, dangerTime, warningTime]);

  return (
    <ProgressBarWrapper
      progress={progress}
      color={remainingTime <= dangerTime ? "#ff5c5c" : "#4a90e2"}
    />
  );
};

const ProgressBarWrapper = styled.div<ProgressBarWrapperProps>`
  height: 20px;
  width: 100%;
  background-color: #e0e0de;
  border-radius: 10px;
  position: relative;

  &:before {
    content: "";
    display: block;
    height: 100%;
    border-radius: 10px;
    background-color: ${(props) => props.color};
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props) => props.progress}%;
    transition: width 0.5s ease-in-out;
  }
`;

export default TimeLimitProgressBar;
