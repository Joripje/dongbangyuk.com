import { useState, useEffect } from "react";

import { Timer } from "components/common";
import { Rps, Loading } from "components/rps";

import styled from "styled-components";
import { Box } from "@mui/material";

import { postAnswers } from "api/test";
import { StatusBar } from "components/game";
import { auth } from "service";

type Answer = {
  gameId: number;
  userId: string | undefined;
  date: string;
  gameType: string;
  rounds: {};
};

function RpsGamePage() {
  const [startTime, setStartTime] = useState<number>(new Date().getTime());
  const [settingTime, setSettingTime] = useState<number>(20);
  const [isGaming, setIsGaming] = useState<boolean>(true);
  const [round, setRound] = useState<number>(1);

  const [answer, setAnswer] = useState<Answer>({
    gameId: 1,
    userId: auth.currentUser?.uid,
    date: new Date().toISOString(),
    gameType: "rps",
    rounds: {
      1: [],
      2: [],
      3: [],
    },
  });

  // 게임 스타트를 누르면 타이머 세팅
  const handleStart = () => {
    setIsGaming(false);
    if (round === 0) {
      setTimeout(() => {
        setRound(round + 1);
        setStartTime(new Date().getTime());
        setIsGaming(true);
      }, 4000);
    }
  };

  // 라운드 종료
  const handleRoundEnd = () => {
    setIsGaming(false);
    setTimeout(() => {
      setRound(round + 1);
      setStartTime(new Date().getTime());
      if (round === 1) {
      } else if (round === 2) {
        setSettingTime(50);
      }
      setIsGaming(true);
    }, 4000);
  };

  const handleGameEnd = () => {
    setIsGaming(false);
    // console.log('하윙', answer)
    postAnswers(answer);
    alert("제출이 완료됐습니다.");
    // navigate("/");
  };

  const handleTimerExit = () => {
    if (round < 3) {
      handleRoundEnd();
      // newRound();
    } else {
      handleGameEnd();
    }
  };
  const handleAnswer = (gameHistory: object) => {
    const updatedRounds = {
      ...answer.rounds,
      [round]: gameHistory,
    };
    setAnswer({
      ...answer,
      rounds: updatedRounds,
    });
  };

  useEffect(() => {
    console.log(answer);
  }, [answer]);

  return (
    <>
      <StatusBar status='rps' gameType='rps' problemNum={round} />
      <Timer
        onExitHandler={handleTimerExit}
        startTime={startTime}
        settingTime={settingTime}
      />
      {isGaming ? (
        <>
          <GameBox>
            <Rps
              onRoundChange={handleAnswer}
              round={round}
              settingTime={settingTime}
              onGameStart={handleStart}
            />
          </GameBox>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

// css

const GameBox = styled(Box)({
  fontSize: "2rem",
  // display: 'flex',
  justifyContent: "center",
  textAlign: "center",
  margin: "2rem",
});

export default RpsGamePage;
