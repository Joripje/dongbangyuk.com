import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Rps from 'components/rps/Rps';
import { Timer } from 'components/common';
import { Loading } from 'components/rps';

import styled from 'styled-components';
import { Button, Box } from '@mui/material';

import { postRpsResults } from 'api/rps';
import { GameTemplate, StatusBar } from 'components/game';
import { tiger } from 'assets/images';

type RpsGamePageProps = {};


function RpsGamePage(props: RpsGamePageProps) {

  const [startTime, setStartTime] = useState<number>(new Date().getTime());
  const [settingTime, setSettingTime] = useState<number>(180);
  const [isGaming, setIsGaming] = useState<boolean>(true);
  const [round, setRound] = useState<number>(0);

  const [answer, setAnswer] = useState<{
    gameId: number;
    userId: number;
    date: string;
    gameType: string;
    rounds: {
    [key: string]: object[]
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
    if (round === 0) {
      setTimeout(() => {
        setRound(round + 1);
        setStartTime(new Date().getTime());
        setSettingTime(20);
        setIsGaming(true);
      }, 4000);
    }
  }



  // 라운드 종료
  const handleRoundEnd = () => {
    setIsGaming(false);
    setTimeout(() => {
      setRound(round + 1)
      setStartTime(new Date().getTime());
      setSettingTime(20);
      setIsGaming(true);
    }, 4000)
    
  };



  const handleGameEnd = () => {
    setIsGaming(false);
    // console.log('하윙', answer)
    postRpsResults(answer)
    navigate('/')
  };

  const handleTimerExit = () => {
    if (round < 3) {
      handleRoundEnd();
      // newRound(); 
    } else {
      handleGameEnd();
    }
  }
  const handleAnswer = (gameHistory: object) => {
    const updatedRounds = {
      ...answer.rounds,
      [round]:  gameHistory
    };
    setAnswer({
      ...answer,
      rounds: updatedRounds
    });
  }

  useEffect(() => {
    console.log(answer)
  },[answer,])


  return (
    <GameTemplate>
      <StatusBar status='rps' gameType='rps' problemNum={round}/>
      <Timer onExitHandler={handleTimerExit} startTime={startTime} settingTime={settingTime} />
      {isGaming ? (
            <>
              <GameBox>
                <Rps onRoundChange={handleAnswer} round={round} settingTime={settingTime} onGameStart={handleStart} />
              </GameBox>
            </>
          ) : (
              <Loading />
          )}
    </GameTemplate>
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