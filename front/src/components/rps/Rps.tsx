import React, {useState, useEffect} from 'react'

import { Timer } from 'components/common';

import styled from 'styled-components';
import { Button, Box } from '@mui/material';

type Choice = 'roc' | 'pap' | 'sci';

type Props = {
  round: number,
  settingTime: number;
  onGameStart: () => void;
  onRoundChange: (gameHistory: object[]) => void;
}

type RpsGameData = {
  gameType: string;
  answer: [Choice, Choice];
  timestamp: [string, string];
}

const choices: Choice[] = ['roc', 'pap', 'sci'];

const Rps: React.FC<Props> = (props: Props) => {
  const {onGameStart, settingTime, round, onRoundChange} = props;
  const [userChoice, setUserChoice] = useState<string>('');
  const [computerChoice, setComputerChoice] = useState<string>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [gameHistory, setGameHistory] = useState<Array<object>>([]);
  // const [gameHistory, setGameHistory] = useState<Array<RpsGameData>>([]);

  const [timer, setTimer] = useState<number>(-1);
  const [upperTimer, setUpperTimer] = useState<number>(settingTime);
  const [startTime, setStartTime] = useState('');
  
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (upperTimer > 0) {
      intervalId = setInterval(() => {
        setUpperTimer((upperTimer) => upperTimer - 1);
      }, 1000);
    }
    if (upperTimer < 1) {
      // console.log(round, gameHistory);
      onRoundChange(gameHistory);
    }

    return () => clearInterval(intervalId);
  },[round, upperTimer])



  const handleClick = (choice: Choice) => {
    if (!isSubmit) {
      const computer = computerChoice
      // const newHistory = [choice, computer]
      
      const endTime = new Date().toISOString();
      const newData = {
        "gameType": 'rps',
        "answer": [choice, computer],
        "timestamp": [startTime, endTime]
      }
      setUserChoice(choice);
      setGameHistory([...gameHistory, newData])
      setIsSubmit(true);
      setTimeout(handleReset, 1000);
      setTimer(3);

    }
  };

  useEffect(()=> {
    console.log(gameHistory)
  },[gameHistory])
  useEffect(() => {
    if (timer === 0) {
      const endTime = new Date().toISOString();
      const newData = {
        "gameType": 'rps',
        "answer": [],
        "timestamp": [startTime, endTime]
      }
      setComputerChoice(getComputerChoice());
      setUserChoice('');
      setGameHistory([...gameHistory, newData])
      setIsSubmit(false);
      setTimer(3);
    }
    // console.log(round, gameHistory)
  }, [timer]);

  const handleReset = () => {
    setUserChoice('');
    setComputerChoice('');
    setIsSubmit(false);
  }

  // 타이머 시작
  const handleStart = () => {
    // setIsStart(true);
    setUserChoice("");
    setIsSubmit(false);
    setGameHistory([]);
    setComputerChoice(getComputerChoice());


    setTimer(3);
    onGameStart();
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    // settimeout으로 함수 한번만 발동하게
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  },[timer])




  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
    
  };


  useEffect(() => {
    if (userChoice === '') {
      const computerChoice = getComputerChoice();
      setComputerChoice(computerChoice);
      // console.log(computerChoice)
    }
    setStartTime(new Date().toISOString())
  }, [userChoice]);


  return (
    <WrapBox>
      <h1>가위 바위 보</h1>
      {choices.map((choice) => (
        <ChoiceButton key={choice} onClick={() => handleClick(choice)}>
          {choice}
        </ChoiceButton>
      ))}
      <h2>나: {userChoice}</h2>
      <h2>상대: {computerChoice}</h2>
      {round === 0 ? <StartButton onClick={handleStart}>start</StartButton> : ''}
    </WrapBox>
  )
}


// css

const WrapBox = styled(Box) ({
  textAlign: 'center',
  marginTop: '20vh',
  
})

const ChoiceButton = styled(Button) ({
  fontSize: '2rem',
  padding: '0.5rem',
  color: 'purple',
  margin: '1rem'
})

const StartButton = styled(Button)`
  font-size: 2rem;
  padding: 0.5rem;
  border-radius: 1rem;
  background-color : white;
  cursor: pointer;
  &:hover{  
    background-color : skyblue;
    color : white
  }
`

export default Rps;

