import styled from "styled-components";
import love from "assets/images/love.png";
import { useEffect, useMemo } from "react";

type VoiceImageProps = {
  setIsEnough: (enough: boolean) => void;
};

function VoiceImage(props: VoiceImageProps) {
  useMemo(() => {
    const { setIsEnough } = props;

    const handleResize = () => {
      if (window.innerWidth < 1920 || window.innerWidth < 1080)
        setIsEnough(false);
      else setIsEnough(true);
    };
    handleResize();
  }, [props]);

  useEffect(() => {
    const { setIsEnough } = props;

    const handleResize = () => {
      if (window.innerWidth < 1920 || window.innerWidth < 1080)
        setIsEnough(false);
      else setIsEnough(true);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [props]);

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
