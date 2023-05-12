import { useState, useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import styled from "styled-components";
import VoiceImage from "components/game/VoiceImage";

const MODEL_URL = "/models";

function App() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const videoWidth = 640;
  const videoHeight = 480;
  const constraints = {
    video: {
      width: videoWidth,
      height: videoHeight,
    },
    audio: false,
  };

  const [isStartDetect, setIsStartDetect] = useState<boolean>(false);
  const [isDetected, setIsDetected] = useState<boolean>(false);
  const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);

  useEffect(() => {
    Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]).then(() => {
      setModelsLoaded(true);
    });
    startVideo();
  }, []);

  // 영상 권한 요청
  const startVideo = () => {
    setIsStartDetect(true);

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => ((videoRef.current as any).srcObject = stream))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    const detectFace = async (): Promise<void> => {
      const detections = await faceapi
        .detectAllFaces(
          videoRef.current ? videoRef.current : "",
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceExpressions();

      if (detections.length === 1) {
        setIsDetected(true);
        console.log("dhkdkddkk");
        clearInterval(interval!);
      }
    };

    if (isStartDetect && !isDetected) {
      interval = setInterval(detectFace, 100);
    }

    return () => {
      clearInterval(interval!);
    };
  }, [isStartDetect, isDetected, videoRef]);

  return (
    <FaceDectectionWrapper ref={wrapRef}>
      <VoiceImage setIsEnough={() => {}} />
      <video
        ref={videoRef}
        autoPlay
        muted
        // onPlay={onPlay}
        width={640}
        height={480}
      />
      <canvas ref={canvasRef} style={{ position: "absolute" }} />
    </FaceDectectionWrapper>
  );
}

const FaceDectectionWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  width: "100%",
  height: "100vh",
  background: "rgba(237, 252, 242, 1)",
});

export default App;
