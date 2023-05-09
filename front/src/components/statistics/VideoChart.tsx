import { getVideoData } from "api/statistics";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ReactPlayer from "react-player";
import VideoPlayer from "./VideoPlayer";
import annotationPlugin from "chartjs-plugin-annotation";

const VideoChart = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    LineController,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    Filler,
    annotationPlugin
  );
  const [angry, setAngry] = useState<Array<number>>([]);
  const [disgust, setDisgust] = useState<Array<number>>([]);
  const [scared, setScared] = useState<Array<number>>([]);
  const [happy, setHappy] = useState<Array<number>>([]);
  const [sad, setSad] = useState<Array<number>>([]);
  const [surprised, setSurprised] = useState<Array<number>>([]);
  const [neutral, setNeutral] = useState<Array<number>>([]);
  const [videoPath, setVideoPath] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getVideoData({
          gameid: 1,
        });

        setAngry(response.angry);
        setDisgust(response.disgust);
        setScared(response.scared);
        setHappy(response.happy);
        setSad(response.sad);
        setSurprised(response.surprised);
        setNeutral(response.neutral);
        setVideoPath(response.video_path);
        setIsLoading(false);
        console.log(videoPath);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: sad.map((_, index) => index),
    datasets: [
      {
        label: "분노",
        data: angry,
        // fill: true,
        borderColor: "#FF0000",
        // backgroundColor: "#FF000080",
        tension: 0.4,
      },
      {
        label: "역겨움",
        data: disgust,
        // fill: true,
        borderColor: "#800080",
        // backgroundColor: "#80008080",
        tension: 0.4,
      },
      {
        label: "두려움",
        data: scared,
        // fill: true,
        borderColor: "#000000",
        // backgroundColor: "#00000080",
        tension: 0.4,
      },
      {
        label: "기쁨",
        data: happy,
        // fill: true,
        borderColor: "#4BC0C0",
        // backgroundColor: "#4BC0C080",
        tension: 0.4,
      },
      {
        label: "슬픔",
        data: sad,
        // fill: true,
        borderColor: "#0000FF",
        // backgroundColor: "#0000FF80",
        tension: 0.4,
      },
      {
        label: "긴장감",
        data: surprised,
        // fill: true,
        borderColor: "#FFFF00",
        // backgroundColor: "#FFFF0080",
        tension: 0.4,
      },
      // {
      //   label: "중립",
      //   data: neutral,
      //   // fill: true,
      //   borderColor: "#C0C0C0",
      //   // backgroundColor: "#C0C0C080",
      //   tension: 0.4,
      // },
    ],
  };

  const annotation1 = {
    type: "box",
    backgroundColor: "rgba(255, 245, 157, 0.2)",
    borderWidth: 0,
    xMax: 2.5,
    xMin: -0.5,
    label: {
      drawTime: "afterDraw",
      display: true,
      content: "First quarter",
      position: {
        x: "center",
        y: "start",
      },
    },
  };

  const options = {
    // animation: false,
    // parsing: false,
    interaction: {
      mode: "index" as const,
      axis: "x" as const,
      intersect: false,
    },
    scales: {
      x: {
        ticks: {
          source: "data",
          maxRotation: 0,
          autoSkip: true,
          display: false,
        },
      },
      y: {
        // min: 0,
        // max: 1,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      annotation: {},
      // legend: {
      //   display: false,
      // },
    },
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div style={{ width: "800px" }}>
        <Line options={options} data={data} />
      </div>

      {/* <ReactPlayer
        className="react-player"
        url={videoPath + "#t=2,50"} // 플레이어 url
        width="800px" // 플레이어 크기 (가로)
        height="500px" // 플레이어 크기 (세로)
        playing={false} // 자동 재생 on
        muted={false} // 자동 재생 on
        controls={true} // 플레이어 컨트롤 노출 여부
        light={false} // 플레이어 모드
        pip={true} // pip 모드 설정 여부
        // onEnded={() => handleVideo()} // 플레이어 끝났을 때 이벤트
      /> */}
      {/* <VideoPlayer /> */}
    </div>
  );
};

export default VideoChart;
