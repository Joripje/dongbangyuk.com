import ReactPlayer from "react-player";
import { useState } from "react";

interface VideoProps {
  // path: string;
  start: number;
  end: number;
  autoPlay: boolean;
}

const VideoPlayer = (props: VideoProps) => {
  // const VideoPlayer = () => {

  const [videoPath, setVideoPath] = useState<string>(
    "https://bossponge.s3.ap-northeast-2.amazonaws.com/videos/bandicam+2023-05-09+14-55-02-174.mp4"
  );

  return (
    <div>
      <ReactPlayer
        className="react-player"
        url={videoPath + `#t=${props.start},${props.end}`} // 플레이어 url
        width={window.innerWidth * 0.28} // 플레이어 크기 (가로)
        // height={window.innerHeight / 2} // 플레이어 크기 (세로)
        playing={props.autoPlay} // 자동 재생 on
        muted={false} // 자동 재생 on
        controls={true} // 플레이어 컨트롤 노출 여부
        light={false} // 플레이어 모드
        pip={true} // pip 모드 설정 여부
        // onEnded={() => handleVideo()} // 플레이어 끝났을 때 이벤트
      />
    </div>
  );
};
export default VideoPlayer;
