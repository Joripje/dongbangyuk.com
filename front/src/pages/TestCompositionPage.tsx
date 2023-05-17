import { useState, useEffect } from "react";
import { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { resetGameState } from "store/testControlSlice";

import FindRoadPage from "./FindRoadPage";
import { GameSelect, GameTemplate, NotEnough } from "components/game";

import styled from "styled-components";
import { Button } from "@mui/material";
import CatchCatGamePage from "./CatchCatGamePage";
import TurnPicGamePage from "./TurnPicGamePage";
import RpsGamePage from "./RpsGamePage";
import RpsPreparePage from "./RpsPreparePage";
import { FaceDectection } from "components/faceDetect";

function TestCompositionPage() {
  const dispatch = useDispatch();
  const { face, game, isEnough, isGaming } = useSelector(
    (state: RootState) => state.testControl
  );
  const [thisComponent, setThisComponent] = useState(<FaceDectection />);

  useEffect(() => {
    if (!isEnough) {
      console.log(face);
      setThisComponent(<NotEnough />);
    } else if (face < 2) {
      setThisComponent(<FaceDectection />);
    } else {
      // console.log("Game State is just changed");
      switch (game) {
        case undefined:
          setThisComponent(<GameSelect />);
          break;
        case "road":
          setThisComponent(<FindRoadPage />);
          break;
        case "rps":
          if (isGaming) {
            setThisComponent(<RpsGamePage />);
          } else {
            setThisComponent(<RpsPreparePage />);
          }
          break;
        case "rotate":
          setThisComponent(<TurnPicGamePage />);
          break;
        case "cat":
          setThisComponent(<CatchCatGamePage />);
          break;
      }
    }
  }, [game, isEnough, isGaming, face]);

  const onResetForDev = () => {
    dispatch(resetGameState());
  };

  return (
    <>
      <TempControlButton variant='contained' onClick={onResetForDev}>
        선택페이지로 돌아가기
      </TempControlButton>
      <GameTemplate>{thisComponent}</GameTemplate>
    </>
  );
}

const TempControlButton = styled(Button)({
  position: "absolute",
  top: "2rem",
  left: "5%",
});

export default TestCompositionPage;
