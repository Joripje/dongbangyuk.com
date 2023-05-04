import * as tf from "@tensorflow/tfjs";
// import * as faceDetection from "@tensorflow-models/face-detection";
import { useState, useEffect, useRef } from "react";

async function loadModel() {
  const model = await tf.loadGraphModel(
    "https://tfhub.dev/google/mediapipe/ssd/face_detection/1/model.json"
  );
  return model;
}

function VideoInput() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [model, setModel] = useState<tf.GraphModel | null>(null);

  useEffect(() => {
    loadModel().then((res) => setModel(res));
  }, []);

  useEffect(() => {
    // console.log(videoRef.current);
    if (videoRef.current && canvasRef.current && model) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      let rafId: number = -1;

      async function render() {
        if (context === null || model === null) {
          return;
        }
        const pixels = tf.browser.fromPixels(video);
        const result = await model.executeAsync(pixels, "faces");
        pixels.dispose();
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (Array.isArray(result) && result.length > 0) {
          // const face = result[0];
          // const boundingBox = face.arraySync();
          // if (boundingBox) {
          //   const { topLeft, bottomRight } = boundingBox;
          //   const [x, y] = topLeft;
          //   const [width, height] = [bottomRight[0] - topLeft[0], bottomRight[1] - topLeft[1]];
          //   context.beginPath();
          //   context.rect(x, y, width, height);
          //   context.lineWidth = 2;
          //   context.strokeStyle = "red";
          //   context.stroke();
          // }
        }

        rafId = requestAnimationFrame(render);
      }

      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObject = stream;
        video.play();
      });

      video.addEventListener("loadedmetadata", () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      });

      video.addEventListener("play", () => {
        rafId = requestAnimationFrame(render);
      });

      video.addEventListener("pause", () => {
        cancelAnimationFrame(rafId);
      });
    }
  }, [model]);

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width={640}
        height={480}
      />
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
}

export default VideoInput;
