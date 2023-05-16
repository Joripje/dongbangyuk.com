import React, { useState, useEffect, useRef } from "react";

import styled from "styled-components";
import { Button, Box } from "@mui/material";
import { ArrowBack, ArrowForward, ArrowDownward } from "@mui/icons-material";
import { paper, scissors, rock, raccoon, beaver } from "assets/images";
import { TimeBar } from "components/common";

type RpsType = { value: string; label: any; image: string; cmd: string };

type Props = {
  round: number;
  settingTime: number;
  onGameStart: () => void;
  onRoundChange: (gameHistory: object[]) => void;
};

const choices: RpsType[] = [
  { value: "sci", label: <ArrowBack />, image: scissors, cmd: "가위" },
  { value: "roc", label: <ArrowDownward />, image: rock, cmd: "바위" },
  { value: "pap", label: <ArrowForward />, image: paper, cmd: "보" },
];

const Rps: React.FC<Props> = (props: Props) => {
  const { settingTime, round, onRoundChange } = props;
  const [userChoice, setUserChoice] = useState<RpsType | null>(Object);
  const [computerChoice, setComputerChoice] = useState<RpsType | null>(Object);

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [gameHistory, setGameHistory] = useState<Array<object>>([]);
  const [timer, setTimer] = useState<number>(4);
  const [upperTimer, setUpperTimer] = useState<number>(settingTime);
  const [startTime, setStartTime] = useState("");
  const [who, setWho] = useState<number>(1);

  const wrapbox: any = useRef(null);

  const handleReset = () => {
    // clearTimeout(timer)
    setUserChoice(null);
    setComputerChoice(null);
    setIsSubmit(false);
    setWho(who + 1);
  };

  // 기본 타이머
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timer]);

  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

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
      <Typo>가위 바위 보!</Typo>
      <RowFlexBox>
        <CharacterBox>
          <Racoon />
          <Typo>나</Typo>
        </CharacterBox>
        <RpsImg src={userChoice?.image} alt='' />
        <RpsImg src={computerChoice?.image} alt='' />
        <CharacterBox>
          <Beaver />
          <Typo>상대</Typo>
        </CharacterBox>
      </RowFlexBox>
      <RowFlexBox style={{ display: "flex", justifyContent: "center" }}>
        {choices.map((choice) => (
          <div key={choice.value}>
            <ChoiceButton disabled>{choice.label}</ChoiceButton>
            <Typo>{choice.cmd}</Typo>
          </div>
        ))}
      </RowFlexBox>
      <TimeBar totalTime={4000} />
    </WrapBox>
  );
};
// css

const WrapBox = styled(Box)({
  textAlign: "center",
  width: "65vw",
});

const RowFlexBox = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
});

const styleForCharacter = {
  width: "10vw",
  height: "10vw",
  backgroundColor: "#CFD0D4",
  borderRadius: "50%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "170% -100%",
  display: "flex",
  justifyContent: "center",
};

const Racoon = styled(Box)({
  ...styleForCharacter,
  backgroundImage: `url(${raccoon})`,
  backgroundPosition: "20% 90%",
});

const Beaver = styled(Box)({
  ...styleForCharacter,
  backgroundImage: `url(${beaver})`,
  backgroundPosition: "90% 90%",
});

const CharacterBox = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "0, 0, 0, 0",
});

const ChoiceButton = styled(Button)({
  fontSize: "2rem",
  padding: "0.5rem",
  color: "grey",
  margin: "0 1rem",
  // backgroundColor: 'grey'
  border: "3px solid gray",
  width: "8rem",
});

const Typo = styled.div({
  fontSize: "2rem",
  fontWeight: 1000,
  margin: "1rem 0",
});

const RpsImg = styled.img({
  width: "8rem",
});

export default Rps;
