import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import { useState, useEffect, useRef } from "react";
import { Coord2D } from "@tensorflow-models/facemesh/dist/util";

async function loadModel() {
  const model = await facemesh.load({
    maxFaces: 1,
  });
  return model;
}

function VideoInput() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [model, setModel] = useState<facemesh.FaceMesh | null>(null);

  useEffect(() => {
    loadModel().then((res) => setModel(res));
  }, []);

  useEffect(() => {
    if (videoRef.current && canvasRef.current && model) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      let rafId: number = -1;

      async function render() {
        if (context === null || model === null) {
          return;
        }
        const result = await model.estimateFaces(video, false);
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (result && result.length > 0) {
          result.forEach((face) => {
            const { topLeft, bottomRight } = face.boundingBox;
            const [x, y] =
              topLeft instanceof tf.Tensor ? topLeft.arraySync() : topLeft;
            const [w, h] =
              bottomRight instanceof tf.Tensor
                ? (bottomRight.sub(topLeft).arraySync() as [number, number])
                : [
                    bottomRight[0] - (topLeft as Coord2D)[0],
                    bottomRight[1] - (topLeft as Coord2D)[1],
                  ];
            context.beginPath();
            context.rect(x, y, w, h);
            // console.log(x, y, w, h);
            context.lineWidth = 2;
            context.strokeStyle = "red";
            context.stroke();
          });
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
  }, [videoRef.current, canvasRef.current, model]);

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
