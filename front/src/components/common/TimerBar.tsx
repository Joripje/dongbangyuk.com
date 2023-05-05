import { useEffect, useState } from "react";
import styled from "styled-components";

type TimeBarProps = {
  totalTime: number; // in seconds
  renderer?: number;
  onComplete?: () => void;
};

type FillerProps = {
  percentage: number;
  renderer: number;
};

function TimeBar({ totalTime, renderer }: TimeBarProps) {
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 100);
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setTimeLeft(totalTime);
  }, [totalTime, renderer]);

  return (
    <ProgressBar>
      <Filler
        percentage={(timeLeft / totalTime) * 100}
        renderer={renderer ? renderer : 0}
      />
    </ProgressBar>
  );
}

const ProgressBar = styled.div({
  width: "100%",
  height: "1rem",
  backgroundColor: "#ddd",
  borderRadius: "1rem",
});

const Filler = styled.div<FillerProps>`
  height: 100%;
  border-radius: inherit;
  transition: width 0.1s ease-in-out;
  background-color: ${(props) => (props.renderer === 0 ? "blue" : "red")};
  width: ${(props) => (props.percentage > 0 ? props.percentage : 0)}%;
`;

export default TimeBar;
