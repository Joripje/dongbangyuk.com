import { useState } from "react";
import { GameTemplate } from "components/game";

import FindRoadPage from "./FindRoadPage";
import RpsGamePage from "./RpsGamePage";
import CatchCatGamePage from "./CatchCatGamePage";
import TurnPicGamePage from "./TurnPicGamePage";
import FindRoadPreparePage from "./FindRoadPreparePage";
import StatisticsPage from "./StatisticsPage";

import styled from "styled-components";
import { Button } from "@mui/material";

function ShowOffPage() {
  const components = [
    <FindRoadPreparePage />,
    <FindRoadPage />,
    <RpsGamePage />,
    <CatchCatGamePage />,
    <TurnPicGamePage />,
    <StatisticsPage />,
  ];
  const [showOffComponent, setShowOffComponent] = useState(0);

  const onNextHandler = () => {
    setShowOffComponent((prev) => prev + 1);
  };

  return (
    <>
      {showOffComponent > 4 ? (
        components[showOffComponent]
      ) : (
        <GameTemplate>{components[showOffComponent]}</GameTemplate>
      )}
      <ShowOffButton variant='contained' onClick={onNextHandler}>
        시연용 버튼
      </ShowOffButton>
    </>
  );
}

const ShowOffButton = styled(Button)({
  position: "absolute",
  top: "2rem",
  right: "1rem",
});

export default ShowOffPage;
