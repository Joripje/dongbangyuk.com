import { useSelector } from "react-redux";
import { RootState } from "store";
import styled from "styled-components";

type StatusCircleProps = {
  isRecording: boolean;
};

function RecordingModal() {
  const isGaming = useSelector(
    (state: RootState) => state.testControl.isGaming
  );
  return (
    <ModalWrapper>
      <StatusCircle isRecording={isGaming} />
      {isGaming ? "지금은 촬영 중이랍니다." : "지금은 촬영 중이 아니에요."}
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div({
  position: "absolute",
  top: "5vh",
  right: "5vw",

  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",

  width: "15vw",
  height: "3rem",
  color: "white",
  background: "#444444",
  borderRadius: "20px",
});

const StatusCircle: React.ComponentType<StatusCircleProps> = styled.div<StatusCircleProps>`
  width: 0.5rem;
  height: 0.5rem;

  background: ${(props) => (props.isRecording ? "red" : "gray")};
  border-radius: 50%;
`;

export default RecordingModal;
