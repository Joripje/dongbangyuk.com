import styled from "styled-components";
import love from "assets/images/love.png";
import { useEffect, useMemo } from "react";

type VoiceImageProps = {
  setIsEnough: (enough: boolean) => void;
};

function VoiceImage(props: VoiceImageProps) {
  const { setIsEnough } = props;

  const handleResize = () => {
    if (window.innerWidth < 1920 || window.innerHeight < 1080) {
      setIsEnough(false);
    } else {
      setIsEnough(true);
    }
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <VoiceCheckImg />;
}

const VoiceCheckImg = styled.div({
  width: "5rem",
  height: "5rem",
  margin: "1rem",
  backgroundImage: `url(${love})`,
  backgroundSize: "cover",
});

export default VoiceImage;
