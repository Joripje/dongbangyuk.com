import React, {useState, useEffect} from 'react'

import { Timer } from 'components/common';

import styled from 'styled-components';
import { Button, Box } from '@mui/material';

type Choice = 'rock' | 'paper' | 'scissors';

type Props = {
  onGameStart: () => void;
}

const choices: Choice[] = ['rock', 'paper', 'scissors'];

function Rps({onGameStart}: Props) {
  const [userChoice, setUserChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [gameHistory, setGameHistory] = useState<Array<Array<string>>>([]);
// string[][]
  
  const handleClick = (choice: Choice) => {
    if (!isSubmit) {
      const computer = computerChoice
      const newHistory = [choice, computer]
      console.log('hsdlkfj', newHistory)
      setUserChoice(choice);
      setGameHistory([...gameHistory, newHistory])
      console.log(gameHistory)
      setIsSubmit(true);
      setTimeout(handleReset, 1000);
    }
  };

  const handleReset = () => {
    setUserChoice('');
    setComputerChoice('');
    setIsSubmit(false);
  }

  // 타이머 시작
  const handleStart = () => {
    // setIsStart(true);
    onGameStart();
  }

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
      <StartButton onClick={handleStart}>start</StartButton>
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

