import React from "react";
import { GameBoard } from "../components/find_road";
import styled from "styled-components";

function FindRoadPage() {
  return (
    <GameBox>
      <GameBoard />
    </GameBox>
  );
}
const GameBox = styled.div`
  margin: 2rem;
`;

export default FindRoadPage;
