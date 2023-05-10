import { useState } from "react";
import styled from "styled-components";

type StatusCircleProps = {
  isRecording: boolean;
};

function RecordingModal() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  return (
    <div>
      <ModalWrapper>
        <StatusCircle isRecording={isRecording} />
        {isRecording ? "지금은 촬영 중이랍니다." : "지금은 촬영 중이 아니에요."}
      </ModalWrapper>
      <button
        onClick={() => {
          setIsRecording(!isRecording);
        }}
      >
        Hello Its tempButton
      </button>
    </div>
  );
}

const ModalWrapper = styled.div({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",

  width: "25vw",
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
