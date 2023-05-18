import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { voiceImg } from "assets/images";
import styled from "styled-components";
import { setBoolState } from "store/testControlSlice";

function VoiceImage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1920 || window.innerHeight < 1080) {
        dispatch(setBoolState({ property: "isEnough", value: false }));
      } else {
        dispatch(setBoolState({ property: "isEnough", value: true }));
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const onClickHandler = () => {
    navigate("/main");
  };

  return <VoiceCheckImg onClick={onClickHandler} />;
}

const VoiceCheckImg = styled.div({
  width: "5rem",
  height: "5rem",
  margin: "1rem",
  backgroundImage: `url(${voiceImg})`,
  backgroundSize: "cover",
  cursor: "pointer",
});

export default VoiceImage;
