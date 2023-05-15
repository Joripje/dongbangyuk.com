import { useState, useEffect } from "react";
import { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { resetGameState } from "store/testControlSlice";

import FindRoadPage from "./FindRoadPage";
import { GameSelect, GameTemplate, NotEnough } from "components/game";

import styled from "styled-components";
import { Button } from "@mui/material";

function TestCompositionPage() {
  const dispatch = useDispatch();
  const { game, isEnough } = useSelector(
    (state: RootState) => state.testControl
  );
  const [thisComponent, setThisComponent] = useState(<GameSelect />);

  useEffect(() => {
    if (!isEnough) {
      setThisComponent(<NotEnough />);
    } else {
      console.log("Game State is just changed");
      switch (game) {
        case undefined:
          setThisComponent(<GameSelect />);
          break;
        case "road":
          setThisComponent(<FindRoadPage />);
          break;
      }
    }
  }, [game, isEnough]);

  const onResetForDev = () => {
    dispatch(resetGameState());
  };

  return (
    <>
      <TempControlButton variant='contained' onClick={onResetForDev}>
        선택 페이지로 가쉴?
      </TempControlButton>
      <GameTemplate>{thisComponent}</GameTemplate>;
    </>
  );
}

const TempControlButton = styled(Button)({
  position: "absolute",
});

export default TestCompositionPage;
