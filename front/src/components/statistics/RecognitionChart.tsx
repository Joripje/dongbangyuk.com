import styled from "styled-components";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface RecognitionProps {
  recognitionRate: number;
}

const RecognitionChart = (props: RecognitionProps) => {
  const recognitionMessage =
    props.recognitionRate >= 75
      ? "게임 진행 시 영상 촬영이 안정적입니다. 분석결과를 확인해보세요."
      : "영상의 얼굴 인식률이 낮아 분석이 부정확할 수 있습니다.";

  const recognitionStatus =
    props.recognitionRate >= 75 ? (
      <>
        <CheckCircleIcon color="success" />
        안정적으로 응시했어요!
      </>
    ) : (
      <>
        <CancelIcon color="error" />
        얼굴 인식률이 낮습니다.
      </>
    );

  return (
    <>
      <Container>
        <StatusContainer>{recognitionStatus}</StatusContainer>
        <Divider />
        <div style={{ fontSize: "1.2rem" }}>{recognitionMessage}</div>
      </Container>
    </>
  );
};
const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid lightgray;
`;
const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
`;

const Container = styled.div`
  width: 90%;
  margin: auto;
  height: 100px;
  border-radius: 10px;
  // border: solid 1.5px gray;
  // background-color: #f0f0f0;
  padding: 20px;
`;
export default RecognitionChart;
