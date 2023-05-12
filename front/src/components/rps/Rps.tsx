import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Button, Box, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { myPaper, myScissors, myRock, raccoon, beaver } from "assets/images";

// type Choice = string;
type RpsType = { value: string; label: any; image: string; cmd: string };

type Props = {
  round: number;
  settingTime: number;
  onGameStart: () => void;
  onRoundChange: (gameHistory: object[]) => void;
};

const choices: RpsType[] = [
  {
    value: "sci",
    label: <ArrowBackIcon />,
    image: myScissors,
    cmd: "가위",
  },
  { value: "roc", label: <ArrowDownwardIcon />, image: myRock, cmd: "바위" },
  { value: "pap", label: <ArrowForwardIcon />, image: myPaper, cmd: "보" },
];

const Rps: React.FC<Props> = (props: Props) => {
  const { onGameStart, settingTime, round, onRoundChange } = props;
  // const [userChoice, setUserChoice] = useState<string>('');
  const [userChoice, setUserChoice] = useState<RpsType | null>(Object);

  // const [computerChoice, setComputerChoice] = useState<string>('');
  const [computerChoice, setComputerChoice] = useState<RpsType | null>(Object);

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [gameHistory, setGameHistory] = useState<Array<object>>([]);
  const [timer, setTimer] = useState<number>(4);
  const [upperTimer, setUpperTimer] = useState<number>(settingTime);
  const [startTime, setStartTime] = useState("");
  const [who, setWho] = useState<number>(1);

  const wrapbox: any = useRef(null);

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
  }, [round, upperTimer]);

  // 나중에 사용 클릭으로 하는거는 RPS-15에서 사용
  const handleClick = (choice: RpsType) => {
    if (!isSubmit) {
      const computer = computerChoice;
      const endTime = new Date().toISOString();
      const newData = {
        gameType: "rps",
        answer: [choice.value, computer?.value],
        timestamp: [startTime, endTime],
      };
      setUserChoice(choice);
      setGameHistory([...gameHistory, newData]);
      setIsSubmit(true);
      setTimeout(handleReset, 1000);
      setTimer(4);
    }
  };

  // 타이머가 끝나면 빈배열을 제출하고 게임세팅하는 코드
  useEffect(() => {
    if (round === 0 || round === 1) {
      if (timer === 0) {
        const endTime = new Date().toISOString();
        const newData = {
          gameType: "rps",
          answer: [],
          timestamp: [startTime, endTime],
        };
        handleReset();
        // setComputerChoice(getComputerChoice());
        setUserChoice(Object);
        setGameHistory([...gameHistory, newData]);
        setIsSubmit(false);
        setTimer(4);
      }
    } else if (round === 2) {
      if (timer === 0) {
        const endTime = new Date().toISOString();
        const newData = {
          gameType: "rps",
          answer: [],
          timestamp: [startTime, endTime],
        };
        handleReset();
        // setUserChoice(getComputerChoice());
        setComputerChoice(Object);
        setGameHistory([...gameHistory, newData]);
        setIsSubmit(false);
        setTimer(4);
      }
    } else if (round === 3) {
      if (timer === 0 && who % 2 === 0) {
        const endTime = new Date().toISOString();
        const newData = {
          gameType: "rps",
          answer: [],
          timestamp: [startTime, endTime],
        };
        handleReset();
        // setComputerChoice(getComputerChoice());
        setUserChoice(Object);
        setGameHistory([...gameHistory, newData]);
        setIsSubmit(false);
        setTimer(4);
      } else if (timer === 0 && who % 2 === 1) {
        const endTime = new Date().toISOString();
        const newData = {
          gameType: "rps",
          answer: [],
          timestamp: [startTime, endTime],
        };
        handleReset();
        // setUserChoice(getComputerChoice());
        setComputerChoice(Object);
        setGameHistory([...gameHistory, newData]);
        setIsSubmit(false);
        setTimer(4);
      }
    }
  }, [timer]);

  const handleReset = () => {
    // clearTimeout(timer)
    setUserChoice(null);
    setComputerChoice(null);
    setIsSubmit(false);
    setWho(who + 1);
  };

  // 타이머 시작
  const handleStart = () => {
    // setIsStart(true);
    setUserChoice(Object);
    setIsSubmit(false);
    setGameHistory([]);
    if (round === 1 || round === 0) {
      setComputerChoice(getComputerChoice());
    } else if (round === 2) {
      setUserChoice(getComputerChoice());
    } else if (round === 3) {
      if (who % 2 === 0) {
        setComputerChoice(getComputerChoice());
      } else if (who % 2 === 1) {
        setUserChoice(getComputerChoice());
      }
    }
    setTimer(4);
    onGameStart();
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    // settimeout으로 함수 한번만 발동하게
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((timer) => timer - 1);
        // console.log(timer);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timer]);

  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  // const userOrComputer = () => {
  //     const isSelected = Math.floor(Math.random() * 2)
  //     return isSelected
  // }

  // 게임이 리셋된뒤에 가위바위보 세팅인데 지금 빈배열 제출했을때 다시 발동되는거같음 조건을 추가해서 빈배열 제출과
  // 정상적으로 게임이 작동될때 세팅을 다르게 해야하나
  useEffect(() => {
    if (round === 1 || round === 0) {
      if (userChoice === null || Object.keys(userChoice).length === 0) {
        setTimeout(() => {
          const computerChoice = getComputerChoice();
          setComputerChoice(computerChoice);
        }, 1000);
      }
      setTimer(4);
      setStartTime(new Date().toISOString());
    }
  }, [userChoice]);

  useEffect(() => {
    if (round === 2) {
      if (computerChoice === null || Object.keys(computerChoice).length === 0) {
        setTimeout(() => {
          const computerChoice = getComputerChoice();
          setUserChoice(computerChoice);
        }, 1000);
      }
      setTimer(4);
      setStartTime(new Date().toISOString());
    }
  }, [computerChoice]);

  useEffect(() => {
    if (userChoice === null || Object.keys(userChoice).length === 0) {
      if (who % 2 === 0 && round === 3) {
        setTimeout(() => {
          const computerChoice = getComputerChoice();
          setComputerChoice(computerChoice);
        }, 1000);
      }
      setTimer(4);
      setStartTime(new Date().toISOString());
    }
  }, [userChoice]);

  useEffect(() => {
    if (computerChoice === null || Object.keys(computerChoice).length === 0) {
      if (who % 2 === 1 && round === 3) {
        setTimeout(() => {
          const computerChoice = getComputerChoice();
          setUserChoice(computerChoice);
        }, 1000);
      }
      setTimer(4);
      setStartTime(new Date().toISOString());
    }
  }, [computerChoice]);

  // 제출
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.keyCode) {
      case 37:
        // console.log('왼쪽')
        if (round === 1 || round === 0) {
          if (!isSubmit && computerChoice !== null) {
            const computer = computerChoice;
            const endTime = new Date().toISOString();
            const newData = {
              gameType: "rps",
              answer: [choices[0].value, computer?.value],
              timestamp: [startTime, endTime],
            };
            setUserChoice(choices[0]);
            setGameHistory([...gameHistory, newData]);
            setIsSubmit(true);
            setTimeout(handleReset, 1000);
            // setTimer(3);
          }
        } else if (round === 2) {
          if (!isSubmit && userChoice !== null) {
            const user = userChoice;
            const endTime = new Date().toISOString();
            const newData = {
              gameType: "rps",
              answer: [user?.value, choices[0].value],
              timestamp: [startTime, endTime],
            };
            setComputerChoice(choices[0]);
            setGameHistory([...gameHistory, newData]);
            setIsSubmit(true);
            setTimeout(handleReset, 1000);
            // setTimer(3);
          }
        } else if (round === 3) {
          if (who % 2 === 0 && !isSubmit && computerChoice !== null) {
            const computer = computerChoice;
            const endTime = new Date().toISOString();
            const newData = {
              gameType: "rps",
              answer: [choices[0].value, computer?.value],
              timestamp: [startTime, endTime],
            };
            setUserChoice(choices[0]);
            setGameHistory([...gameHistory, newData]);
            setIsSubmit(true);
            setTimeout(handleReset, 1000);
          } else if (who % 2 === 1 && !isSubmit && userChoice !== null) {
            const user = userChoice;
            const endTime = new Date().toISOString();
            const newData = {
              gameType: "rps",
              answer: [user?.value, choices[0].value],
              timestamp: [startTime, endTime],
            };
            setComputerChoice(choices[0]);
            setGameHistory([...gameHistory, newData]);
            setIsSubmit(true);
            setTimeout(handleReset, 1000);
          }
        }
        break;
      case 40:
        // console.log('위')
        if (round === 1 || round === 0) {
          if (!isSubmit && computerChoice !== null) {
            const computer = computerChoice;

            const endTime = new Date().toISOString();
            const newData = {
              gameType: "rps",
              answer: [choices[1].value, computer?.value],
              timestamp: [startTime, endTime],
            };
            setUserChoice(choices[1]);
            setGameHistory([...gameHistory, newData]);
            setIsSubmit(true);
            setTimeout(handleReset, 1000);
            // setTimer(3);
          }
        } else if (round === 2) {
          if (!isSubmit && userChoice !== null) {
            const user = userChoice;
            const endTime = new Date().toISOString();
            const newData = {
              gameType: "rps",
              answer: [user?.value, choices[1].value],
              timestamp: [startTime, endTime],
            };
            setComputerChoice(choices[1]);
            setGameHistory([...gameHistory, newData]);
            setIsSubmit(true);
            setTimeout(handleReset, 1000);
            // setTimer(3);
          }
        } else if (round === 3) {
          if (who % 2 === 0 && !isSubmit && computerChoice !== null) {
            const computer = computerChoice;
            const endTime = new Date().toISOString();
            const newData = {
              gameType: "rps",
              answer: [choices[1].value, computer?.value],
              timestamp: [startTime, endTime],
            };
            setUserChoice(choices[1]);
            setGameHistory([...gameHistory, newData]);
            setIsSubmit(true);
            setTimeout(handleReset, 1000);
          } else if (who % 2 === 1 && !isSubmit && userChoice !== null) {
            const user = userChoice;
            const endTime = new Date().toISOString();
            const newData = {
              gameType: "rps",
              answer: [user?.value, choices[1].value],
              timestamp: [startTime, endTime],
            };
            setComputerChoice(choices[1]);
            setGameHistory([...gameHistory, newData]);
            setIsSubmit(true);
            setTimeout(handleReset, 1000);
          }
        }
        break;
      case 39:
        if (round === 1 || round === 0) {
          if (!isSubmit && computerChoice !== null) {
            const computer = computerChoice;

            const endTime = new Date().toISOString();
            const newData = {
              gameType: "rps",
              answer: [choices[2].value, computer?.value],
              timestamp: [startTime, endTime],
            };
            setUserChoice(choices[2]);
            setGameHistory([...gameHistory, newData]);
            setIsSubmit(true);
            setTimeout(handleReset, 1000);
            // setTimer(3);
          }
        } else if (round === 2) {
          if (!isSubmit && userChoice !== null) {
            const user = userChoice;
            const endTime = new Date().toISOString();
            const newData = {
              gameType: "rps",
              answer: [user?.value, choices[2].value],
              timestamp: [startTime, endTime],
            };
            setComputerChoice(choices[2]);
            setGameHistory([...gameHistory, newData]);
            setIsSubmit(true);
            setTimeout(handleReset, 1000);
            // setTimer(3);
          }
        } else if (round === 3) {
          if (who % 2 === 0 && !isSubmit && computerChoice !== null) {
            const computer = computerChoice;
            const endTime = new Date().toISOString();
            const newData = {
              gameType: "rps",
              answer: [choices[2].value, computer?.value],
              timestamp: [startTime, endTime],
            };
            setUserChoice(choices[2]);
            setGameHistory([...gameHistory, newData]);
            setIsSubmit(true);
            setTimeout(handleReset, 1000);
          } else if (who % 2 === 1 && !isSubmit && userChoice !== null) {
            const user = userChoice;
            const endTime = new Date().toISOString();
            const newData = {
              gameType: "rps",
              answer: [user?.value, choices[2].value],
              timestamp: [startTime, endTime],
            };
            setComputerChoice(choices[2]);
            setGameHistory([...gameHistory, newData]);
            setIsSubmit(true);
            setTimeout(handleReset, 1000);
          }
        }
        break;
    }
  };

  // 키보드로 가위바위보 할 수 잇게 렌더링 시에 포커스를 이동하는 역할
  useEffect(() => {
    wrapbox.current?.focus();
  }, [round]);

  return (
    <WrapBox ref={wrapbox} autoFocus tabIndex={0} onKeyDown={handleKeyDown}>
      <h1>가위 바위 보!</h1>
      <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
        <LeftBox item xs={3}>
          <Character style={{ backgroundImage: `url(${raccoon})` }}></Character>
          <div>나</div>
        </LeftBox>
        <LeftBox item xs={3}>
          <img src={userChoice?.image} alt="" />
        </LeftBox>
        <RightBox item xs={3}>
          <img src={computerChoice?.image} alt="" />
        </RightBox>
        <RightBox item xs={3}>
          <Character style={{ backgroundImage: `url(${beaver})` }}></Character>
          <div>상대</div>
        </RightBox>
      </Grid>
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        {choices.map((choice) => (
          <Grid key={choice.value} item xs={2}>
            <ChoiceButton disabled onClick={() => handleClick(choice)}>
              {choice.label}
            </ChoiceButton>
            <p>{choice.cmd}</p>
          </Grid>
        ))}
      </Grid>
      {round === 0 ? (
        <StartButton onClick={handleStart}>start</StartButton>
      ) : (
        ""
      )}
    </WrapBox>
  );
};
// css

const WrapBox = styled(Box)({
  textAlign: "center",
  marginTop: "10vh",
  width: "65vw",
});

const Character = styled(Box)({
  width: "10vw",
  height: "10vw",
  backgroundColor: "#CFD0D4",
  borderRadius: "50%",
  backgroundSize: "cover",
  display: "flex",
  justifyContent: "center",
});

const LeftBox = styled(Grid)({
  display: "flex",
  justifyContent: "center",
  padding: "0, 0, 0, 0",
});

const RightBox = styled(Grid)({
  display: "flex",
  justifyContent: "center",
});

const ChoiceButton = styled(Button)({
  fontSize: "2rem",
  padding: "0.5rem",
  color: "grey",
  margin: "1rem",
  // backgroundColor: 'grey'
  border: "3px solid gray",
  width: "8rem",
});

const StartButton = styled(Button)`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: white;
  background-color: white;
  cursor: pointer;
  margin: 1rem;
  bottom: 1rem;
  &:hover {
    background-color: skyblue;
    color: white;
  }
`;

export default Rps;
