import styled from "styled-components";
import { getEmotionData } from "api/statistics";
import { useState, useEffect } from "react";
import EmotionChart from "./EmotionChart";
import RecognitionChart from "./RecognitionChart";
const VideoResult = () => {
  const [emotions, setEmotions] = useState<{ [key: string]: number }>({
    angry: 0,
    disgust: 0,
    scared: 0,
    happy: 0,
    sad: 0,
    surprised: 0,
    neutral: 0,
    recognition: 0,
  });

  useEffect(() => {
    const fetchEmotionData = async () => {
      try {
        const response = await getEmotionData({
          gameid: 11111,
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
      <Container>
        <TitleContainer>얼굴 인식률: {emotions.recognition}%</TitleContainer>
        <Divider />
        <BoardBox>
          <ContainerBox>
            <EmotionChart emotions={emotions} />
          </ContainerBox>
          <ContainerBox>
            <RecognitionChart recognitionRate={emotions.recognition} />
          </ContainerBox>
        </BoardBox>
      </Container>
    </>
  );
};

const BoardBox = styled.div({
  position: "relative",
  margin: "1rem auto",
  display: "flex",
  flexDirection: "row",
  alignItems: "start",

  width: "90%",
  height: "70%",

  // background: "white",
  // borderRadius: 10,
  // boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.2)",
});

const TitleContainer = styled.div({
  fontWeight: "bold",
  fontSize: "1.3rem",
  marginTop: "0.5rem",
  marginBottom: "0.5rem",
  marginLeft: "5%",
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

const Divider = styled.hr`
  width: 95%;
  border: none;
  border-top: 1px solid lightgray;
`;

const Container = styled.div`
  width: 90%;
  margin: auto;
  border-radius: 10px;
  // border: solid 2px gray;
  background-color: white;
`;
export default VideoResult;
