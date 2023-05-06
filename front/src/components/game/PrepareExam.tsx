import { start } from "components/common";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import styled from "styled-components";

type PrepareExamProps = {
  image: string;
  descriptions: string[];
};

function PrepareExam(props: PrepareExamProps) {
  const navigate = useNavigate();
  const { image, descriptions } = props;
  const [countDown, setCountDown] = useState(10);

  useEffect(() => {
    if (countDown === 10) start();
    const intervalId = setInterval(() => {
      setCountDown(countDown - 1);
    }, 1000);

    if (countDown === 0) navigate("/test/find-road");

    return () => clearInterval(intervalId);
  }, [countDown]);

  return (
    <BOXBOX>
      <Wrapper>
        <OverviewImg src={image} />
        <DescriptionBox>
          {descriptions.map((item, index) => {
            return (
              <NormalTypo key={index}>
                {index + 1} {item}
              </NormalTypo>
            );
          })}
        </DescriptionBox>
      </Wrapper>
      <TimerType>{countDown}초 후 시험이 시작됩니다.</TimerType>
    </BOXBOX>
  );
}

const Wrapper = styled.div({
  display: "flex",

  height: "60%",
  padding: "0 5rem",

  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
});

const BOXBOX = styled.div({
  height: "100%",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const DescriptionBox = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  paddingLeft: "3rem",
});

const OverviewImg = styled.img({
  width: "40%",

  border: "solid 0.2rem gray",
  borderRadius: 20,
});

const NormalTypo = styled.div({
  color: "#555555",
  padding: "1rem 5px",
  borderRadius: 20,
  fontSize: "1.5rem",
});

const TimerType = styled.div({
  color: "blue",

  fontSize: "3rem",
});

export default PrepareExam;
