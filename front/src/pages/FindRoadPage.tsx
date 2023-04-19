import { GameBoard } from "../components/find_road";
import { Timer } from "components/common";
import styled from "styled-components";

function FindRoadPage() {
  const startTime = new Date().getTime();
  return (
    <GameBox>
      <GameBoard />
      <Timer startTime={startTime} settingTime={300} />
    </GameBox>
  );
}
const GameBox = styled.div`
  margin: 1rem;
`;

export default FindRoadPage;
