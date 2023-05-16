import styled from "styled-components";
import { paper, scissors, rock, raccoon, beaver } from "assets/images";

import { Button, Box } from "@mui/material";
import { ArrowBack, ArrowForward, ArrowDownward } from "@mui/icons-material";
import { GameTemplate } from "components/game";

type RpsType = { value: string; label: any; image: string; cmd: string };

function RpsBoard() {
  const choices: RpsType[] = [
    {
      value: "sci",
      label: <ArrowBack />,
      image: scissors,
      cmd: "가위",
    },
    { value: "roc", label: <ArrowDownward />, image: rock, cmd: "바위" },
    { value: "pap", label: <ArrowForward />, image: paper, cmd: "보" },
  ];

  const userChoice = choices[0];
  const computerChoice = choices[0];

  // 나중에 사용 클릭으로 하는거는 RPS-15에서 사용
  // const handleClick = (choice: RpsType) => {
  //   if (!isSubmit) {
  //     const computer = computerChoice;
  //     const endTime = new Date().toISOString();
  //     const newData = {
  //       gameType: "rps",
  //       answer: [choice.value, computer?.value],
  //       timestamp: [startTime, endTime],
  //     };
  //     setUserChoice(choice);
  //     setGameHistory([...gameHistory, newData]);
  //     setIsSubmit(true);
  //     setTimeout(handleReset, 1000);
  //     setTimer(4);
  //   }
  // };

  return (
    <GameTemplate>
      <WrapBox autoFocus tabIndex={0}>
        <Typo>가위 바위 보!</Typo>
        <RowFlexBox>
          <CharacterBox>
            <Racoon />
            <Typo>나</Typo>
          </CharacterBox>
          <img src={userChoice?.image} alt='' />
          <img src={computerChoice?.image} alt='' />
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
      </WrapBox>
    </GameTemplate>
  );
}

const WrapBox = styled(Box)({
  textAlign: "center",
  marginTop: "10vh",
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

export default RpsBoard;
