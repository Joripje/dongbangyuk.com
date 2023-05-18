import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import styled from "styled-components";
import { Button } from "@mui/material";
import {
  KeyboardDoubleArrowRight,
  KeyboardDoubleArrowLeft,
} from "@mui/icons-material";

type StatusCircleProps = {
  isRecording: boolean;
};

function RecordingModal() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const isGaming = useSelector(
    (state: RootState) => state.testControl.isGaming
  );

  return (
    <ModalWrapper>
      <StatusCircle isRecording={isGaming} />
      {isOpen
        ? isGaming
          ? "지금은 촬영 중이랍니다."
          : "지금은 촬영 중이 아니에요."
        : ""}
      <Button
        style={{ padding: 0 }}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? <KeyboardDoubleArrowRight /> : <KeyboardDoubleArrowLeft />}
      </Button>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div({
  position: "absolute",
  top: "5vh",
  right: "5vw",
  height: "5vh",
  padding: "0 1.5vw",

  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",

  fontSize: "1.2vw",
  color: "white",
  background: "#444444",
  borderRadius: "20px",
});

const StatusCircle: React.ComponentType<StatusCircleProps> = styled.div<StatusCircleProps>`
  width: 0.5rem;
  height: 0.5rem;
  margin-right: 2vh;

  background: ${(props) => (props.isRecording ? "red" : "gray")};
  border-radius: 50%;
`;

export default RecordingModal;
