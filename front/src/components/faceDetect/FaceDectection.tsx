import { useState, useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setFace } from "store/testControlSlice";

const MODEL_URL = "/models";

function FaceDectection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dispatch = useDispatch();

  const videoWidth = 960;
  const videoHeight = 720;
  const constraints = {
    video: {
      width: videoWidth,
      height: videoHeight,
    },
    audio: false,
  };

  const [videoOpacity, setVideoOpacity] = useState(1);

  const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);

  const startVideo = () => {
    if (!modelsLoaded) return;
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => ((videoRef.current as any).srcObject = stream))
      .catch((err) => console.error(err));
  };

  // 모델 호출
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
  }, [startVideo]);

  useEffect(() => {
    const detectFace = async (): Promise<void> => {
      const detections = await faceapi
        .detectAllFaces(
          videoRef.current ? videoRef.current : "",
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceExpressions();

      if (detections.length === 1) {
        clearInterval(interval!);
        setVideoOpacity(0);
        console.log("DETECTED");
      } else if (detections.length === 2) {
        alert("2명 이상의 얼굴이 인식됩니다. 시험은 혼자서 진행해 주세요.");
        dispatch(setFace(false));
      }
    };

    let interval: NodeJS.Timeout | null = null;
    interval = setInterval(detectFace, 1000);

    return () => {
      clearInterval(interval!);
    };
  }, []);

  return (
    <FaceDectectionWrapper ref={wrapRef}>
      <StyledVideo
        ref={videoRef}
        autoPlay
        muted
        style={{ opacity: videoOpacity }}
      />
      <canvas ref={canvasRef} style={{ position: "absolute" }} />
      <button onClick={() => setVideoOpacity(1)}>함 눌러?</button>
    </FaceDectectionWrapper>
  );
}

const FaceDectectionWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  width: "100%",
  height: "100vh",
  background: "rgba(237, 252, 242, 1)",
});

const StyledVideo = styled.video({
  width: 960,
  height: 720,
  borderRadius: "2rem",
  transition: "opacity 1s ease 1s",
});

const CustomAlert = styled.div({});

export default FaceDectection;
