import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import { Button } from '@mui/material';

type Choice = 'rock' | 'paper' | 'scissors';

const choices: Choice[] = ['rock', 'paper', 'scissors'];

function Rps() {
  const [userChoice, setUserChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);


  const handleClick = (choice: Choice) => {
    if (!isSubmit) {
      setUserChoice(choice);
      setIsSubmit(true);
      setTimeout(handleReset, 3000);
    }
  };

  const handleReset = () => {
    setUserChoice('');
    setComputerChoice('');
    setIsSubmit(false);
  }

  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };


  useEffect(() => {
    if (isSubmit) {
      const computerChoice = getComputerChoice();
      setComputerChoice(computerChoice);
    }
  }, [isSubmit]);

  return (
    <div>
      <h1>가위 바위 보</h1>
      {choices.map((choice) => (
        <button key={choice} onClick={() => handleClick(choice)}>
          {choice}
        </button>
      ))}
      <h2>나: {userChoice}</h2>
      <h2>상대: {computerChoice}</h2>
      <StartButton>start</StartButton>
    </div>
  )
}


// css
const StartButton = styled(Button)`
  font-size: 2rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color : white;
  cursor: pointer;
  &:hover{  
    background-color : skyblue;
    color : blue
  }
`

export default Rps;

