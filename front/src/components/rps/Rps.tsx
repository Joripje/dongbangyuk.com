import React, {useState, useEffect, useRef} from 'react'
import { Timer } from 'components/common';
import styled from 'styled-components';
import { Button, Box, Grid } from '@mui/material';

import { rock, paper, scissor, mudangbug, tiger } from 'assets/images';

// type Choice = string;
type RpsType = {value: string, label: string, image: string}

type Props = {
  round: number,
  settingTime: number;
  onGameStart: () => void;
  onRoundChange: (gameHistory: object[]) => void;
}


const choices: RpsType[] = [ {value : 'sci', label : '가위', image: scissor}, {value : 'roc', label : '바위',  image: rock}, {value : 'pap', label : '보',  image: paper}];

const Rps: React.FC<Props> = (props: Props) => {
  const {onGameStart, settingTime, round, onRoundChange} = props;
  // const [userChoice, setUserChoice] = useState<string>('');
  const [userChoice, setUserChoice] = useState<RpsType | null>(Object);

  // const [computerChoice, setComputerChoice] = useState<string>('');
  const [computerChoice, setComputerChoice] = useState<RpsType | null>(Object);

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [gameHistory, setGameHistory] = useState<Array<object>>([]);
  const [timer, setTimer] = useState<number>(-1);
  const [upperTimer, setUpperTimer] = useState<number>(settingTime);
  const [startTime, setStartTime] = useState('');
  // const [a, setA] = useState<RpsType>(Object)

  const wrapbox : any = useRef(null);
  
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


  // 나중에 사용 클릭으로 하는거는 RPS-15에서 사용
  const handleClick = (choice: RpsType) => {
    if (!isSubmit) {
      const computer = computerChoice
      
      const endTime = new Date().toISOString();
      const newData = {
        "gameType": 'rps',
        "answer": [choice.value, computer?.value],
        "timestamp": [startTime, endTime]
      }
      setUserChoice(choice);
      setGameHistory([...gameHistory, newData])
      setIsSubmit(true);
      setTimeout(handleReset, 1000);
      setTimer(3);

    }
  };

  useEffect(() => {
    if (timer === 0) {
      const endTime = new Date().toISOString();
      const newData = {
        "gameType": 'rps',
        "answer": [],
        "timestamp": [startTime, endTime]
      }
      setComputerChoice(getComputerChoice());
      setUserChoice(Object);
      setGameHistory([...gameHistory, newData])
      setIsSubmit(false);
      setTimer(3);
    }
    // console.log(round, gameHistory)
  }, [timer]);


  const handleReset = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setIsSubmit(false);
  }

  // 타이머 시작
  const handleStart = () => {
    // setIsStart(true);
    setUserChoice(Object);
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
        console.log(timer);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  },[timer])


  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
    
  };


  useEffect(() => {
    if (userChoice !== null && Object.keys(userChoice).length === 0) {
      const computerChoice = getComputerChoice();
      setComputerChoice(computerChoice);
      // setA(computerChoice)
      // console.log(computerChoice)
    }
    setStartTime(new Date().toISOString())
  }, [userChoice]);


  
const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
  switch (e.keyCode) {
    case 37:
      // console.log('왼쪽')
      if (!isSubmit) {
        const computer = computerChoice
        const endTime = new Date().toISOString();
        const newData = {
          "gameType": 'rps',
          "answer": [choices[0].value, computer?.value],
          "timestamp": [startTime, endTime]
        }
        setUserChoice(choices[0]);
        setGameHistory([...gameHistory, newData])
        setIsSubmit(true);
        setTimeout(handleReset, 1000);
        setTimer(3);
      }
      break;
      case 38:
      // console.log('위')
      if (!isSubmit) {
        const computer = computerChoice
        
        const endTime = new Date().toISOString();
        const newData = {
          "gameType": 'rps',
          "answer": [choices[1].value, computer?.value],
          "timestamp": [startTime, endTime]
        }
        setUserChoice(choices[1]);
        setGameHistory([...gameHistory, newData])
        setIsSubmit(true);
        setTimeout(handleReset, 1000);
        setTimer(3);
      }
      break;
      case 39:
      // console.log('오른쪽')
      if (!isSubmit) {
        const computer = computerChoice
        
        const endTime = new Date().toISOString();
        const newData = {
          "gameType": 'rps',
          "answer": [choices[2].value, computer?.value],
          "timestamp": [startTime, endTime]
        }
        setUserChoice(choices[2]);
        setGameHistory([...gameHistory, newData])
        setIsSubmit(true);
        setTimeout(handleReset, 1000);
        setTimer(3);
      }
      break;
  }
}

// 키보드로 가위바위보 할 수 잇게 렌더링 시에 포커스를 이동하는 역할
useEffect(() => {
  wrapbox.current?.focus()
},[])


  return (
    <WrapBox ref={wrapbox} autoFocus tabIndex={0} onKeyDown={handleKeyDown}>
      <h1>가위 바위 보!</h1>
      <Grid container spacing={1}>
        <LeftBox item xs={3}>
          <Profile>
            <img style={{width: '15vw'}} src={mudangbug} alt="" />
          </Profile>
          <p>나</p>
        </LeftBox>
        <LeftBox item xs={3}>
          <img src={userChoice?.image} alt="" />
          {/* <h1>{userChoice?.image}</h1> */}
        </LeftBox>
        <RightBox item xs={3}>
          <img src={computerChoice?.image} alt="" />
          {/* <h1>{computerChoice?.image}</h1> */}
        </RightBox>
        <RightBox item xs={3}>
          <Profile>
            <img style={{width: '15vw', }} src={tiger} alt="" />
          </Profile>
          <p>상대</p>
        </RightBox>
      </Grid>
      {choices.map((choice) => (
        <ChoiceButton key={choice.value} onClick={() => handleClick(choice)}>
          {choice.label}
        </ChoiceButton>
      ))}
      {round === 0 ? <StartButton onClick={handleStart}>start</StartButton> : ''}
    </WrapBox>
  )
}
// css

const WrapBox = styled(Box) ({
  textAlign: 'center',
  marginTop: '10vh',
  width: '65vw',
})

const LeftBox = styled(Grid) ({
  justifyContent: 'center',
  
})

const RightBox = styled(Grid) ({
  justifyContent: 'center',
  

})

const Profile = styled(Box) ({
  // width: '20vw',
  // height: '20vh',
  // borderRadius: '50%',
  // backgroundColor: 'grey',
  // display: 'flex',
  // justifyContent: 'center',
})


const ChoiceButton = styled(Button) ({
  fontSize: '2rem',
  padding: '0.5rem',
  color: 'grey',
  margin: '1rem',
  // backgroundColor: 'grey'
  border: "3px solid gray",
  width: '8rem'
})

const StartButton = styled(Button)`
  display: flex;
  justify-content: center;
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

