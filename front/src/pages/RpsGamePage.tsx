import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Rps from 'components/rps/Rps';
import { Timer } from 'components/common';
import { Loading } from 'components/rps';

import styled from 'styled-components';
import { Button, Box } from '@mui/material';

import { gawigawi } from 'api/rps';

type RpsGamePageProps = {};


function RpsGamePage(props: RpsGamePageProps) {

  const [startTime, setStartTime] = useState<number>(new Date().getTime());
  const [settingTime, setSettingTime] = useState<number>(180);
  const [isGaming, setIsGaming] = useState<boolean>(true);
  const [round, setRound] = useState<number>(0);
  // const [answer, setAnswer] = useState<Array<Array<Array<string>>>>([]);
  // const [answer, setAnswer] = useState<Array<Array<object>>>([]);

  const [answer, setAnswer] = useState<{
    gameId: number;
    userId: number;
    date: string;
    gameType: string;
    rounds: {
      [key: number]: object[];
    };
  }>({
  gameId: 1,
  userId: 1,
  date: new Date().toISOString(),
  gameType: 'rps',
  rounds: {
    1: [],
    2: [],
    3: []
  }
});


  const navigate = useNavigate();

  // 게임 스타트를 누르면 타이머 세팅
  const handleStart = () => {
    setIsGaming(false);
    if (round < 3) {
      setTimeout(() => {
        setRound(round + 1);
        setStartTime(new Date().getTime());
        setSettingTime(10);
        setIsGaming(true);
      }, 4000);
    } else {
      setIsGaming(false);
    }
  }

  // 라운드 종료
  const handleRoundEnd = () => {
    setIsGaming(false);
    if (round < 3) {
      setTimeout(() => {
        setRound(round + 1);
        setStartTime(new Date().getTime());
        setSettingTime(10);
        setIsGaming(true);
      }, 4000);
    } else {
      setIsGaming(false);
    }
  };

  const handleGameEnd = () => {
     // gawigawi api
    const Props = {
      method: 'POST',
      url: '/assessment-centre/rps',
      data: {
        answer
      }
    }
    setIsGaming(false);
    console.log('하윙', answer)
    gawigawi(Props)
    navigate('/')
  };

  const handleTimerExit = () => {
    if (round < 3) {
      handleRoundEnd();
    } else {
      handleGameEnd();
    }
  }
  const handleAnswer = (gameHistory: object[]) => {
    const updatedRounds = {
      ...answer.rounds,
      [round]: [...answer.rounds[round], gameHistory]
    };
    setAnswer({
      ...answer,
      rounds: updatedRounds
    });
  }


  // useEffect(()=>{
  //   console.log(answer)
  // },[answer])



  return (
    <>
  {isGaming ? (
        <>
          <TimerBox>
            <Timer onExitHandler={handleTimerExit} startTime={startTime} settingTime={settingTime} />
          </TimerBox>
          <GameBox>
            <>{round === 0? <h1>대기방입니다 시작버튼을 눌러주세요</h1> : <h1>{round}: 라운드</h1>}</>
            <Rps onRoundChange={handleAnswer} round={round} settingTime={settingTime} onGameStart={handleStart} />
          </GameBox>
        </>
      ) : (
          <Loading />
      )}
    </>
  )
}

// css

const TimerBox = styled(Box) ({
  fontSize: '2rem',
  display: 'flex',
  justifyContent: 'end',
  margin: '2rem'
})

const GameBox = styled(Box) ({
  fontSize: '2rem',
  // display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  margin: '2rem'
})



export default RpsGamePage;