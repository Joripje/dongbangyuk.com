import styled from "styled-components";
import { getEmotionData } from "api/statistics";
import { useState, useEffect } from "react";
import EmotionChart from "./EmotionChart";
const VideoResult = () => {
  const [emotions, setEmotions] = useState<{ [key: string]: number }>({
    angry: 0,
    disgust: 0,
    scared: 0,
    happy: 0,
    sad: 0,
    surprised: 0,
    neutral: 0,
  });

  useEffect(() => {
    const fetchEmotionData = async () => {
      try {
        const response = await getEmotionData({
          gameid: 1,
        });

        setEmotions(response);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEmotionData();
  }, []);
  return (
    <>
      <ContainerBox>
        <EmotionChart emotions={emotions} />
      </ContainerBox>
    </>
  );
};

const BoardBox = styled.div({
  position: "relative",
  margin: "1rem auto",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",

  width: "90%",
  height: "70%",

  background: "white",
  borderRadius: 10,
  boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.2)",
});

const ContainerBox = styled.div({
  position: "relative",
  margin: "1rem",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",

  width: "50%",
  height: "100%",
});
export default VideoResult;
