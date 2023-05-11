import { useState, useRef, useEffect } from "react";
import * as faceapi from "face-api.js";

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
    <div>
      <h2>Face-Api Video Test</h2>
      <ul>
        <li>model loaded: {modelsLoaded.toString()}</li>
      </ul>

      <div ref={wrapRef}>
        <video
          ref={videoRef}
          autoPlay
          muted
          // onPlay={onPlay}
          width={640}
          height={480}
        />
        <canvas ref={canvasRef} style={{ position: "absolute" }} />
      </div>

      <button onClick={startVideo}>영상 권한 호출</button>
    </div>
  );
}

export default App;
