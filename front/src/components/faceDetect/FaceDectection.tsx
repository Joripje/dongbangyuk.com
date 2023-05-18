import { useState, useRef, useEffect } from "react";

import * as faceapi from "face-api.js";

import { useDispatch, useSelector } from "react-redux";
import { setFace } from "store/testControlSlice";
import { loading } from "assets/images";

import styled from "styled-components";
import { RootState } from "store";
import { closeWebSocket } from "components/common";

const MODEL_URL = "/models";

function FaceDectection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const opacityRef = useRef<number>(1);

  const dispatch = useDispatch();
  const faceState = useSelector((state: RootState) => state.testControl.face);

  const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);

  // 모델 호출 및 호출 완료 시 안면 인식 시작
  useEffect(() => {
    const videoWidth = 960;
    const videoHeight = 720;
    const constraints = {
      video: {
        width: videoWidth,
        height: videoHeight,
      },
      audio: false,
    };
    const startVideo = () => {
      if (!modelsLoaded) return;
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => ((videoRef.current as any).srcObject = stream))
        .catch((err) => console.error(err));
    };
    Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]).then(() => {
      setModelsLoaded(true);
    });
    startVideo();
    closeWebSocket();
  }, [modelsLoaded]);

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
        dispatch(setFace(1));
        if (faceState === 0) setTimeout(() => dispatch(setFace(3)), 4000);
      } else if (detections.length === 2) {
        alert("2명 이상의 얼굴이 인식됩니다. 시험은 혼자서 진행해 주세요.");
        dispatch(setFace(0));
      }
    };

    const interval = setInterval(detectFace, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [opacityRef, dispatch, faceState]);

  return (
    <FaceDectectionWrapper ref={wrapRef}>
      <Typo>
        {faceState
          ? "얼굴이 인식되었습니다. 잠시 후 시험 페이지로 이동합니다."
          : "응시자님의 얼굴이 네모칸안에 들어가게 세팅해주세요."}
      </Typo>
      <StyledVideo ref={videoRef} autoPlay muted />
      <FaceArea
        style={{
          backgroundImage: faceState ? `url(${loading})` : "",
          border: faceState ? "" : "1rem solid black",
        }}
      />
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

const Typo = styled.div({
  fontSize: "2rem",
  margin: "1rem 0",
});

const StyledVideo = styled.video({
  width: 960,
  borderRadius: "2rem",
  // transition: "opacity 1s ease 1s",
  transform: "rotateY(180deg)",
});

const FaceArea = styled.div({
  width: 720,
  height: 405,
  position: "absolute",
  top: 180,
  opacity: 0.8,

  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
});

export default FaceDectection;
