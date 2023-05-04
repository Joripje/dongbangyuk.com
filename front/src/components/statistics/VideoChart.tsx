import { getVideoData } from "api/statistics";
import { useState, useEffect } from "react";

const VideoChart = () => {
  const [angry, setAngry] = useState<Array<number>>([]);
  const [disgust, setDisgust] = useState<Array<number>>([]);
  const [fear, setFear] = useState<Array<number>>([]);
  const [happy, setHappy] = useState<Array<number>>([]);
  const [sad, setSad] = useState<Array<number>>([]);
  const [surprise, setSurprise] = useState<Array<number>>([]);
  const [neutral, setNeutral] = useState<Array<number>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getVideoData({ gameid: 1 });

        setAngry(response.angry);
        setDisgust(response.disgust);
        setFear(response.fear);
        setHappy(response.happy);
        setSad(response.sad);
        setSurprise(response.surprise);
        setNeutral(response.neutral);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    console.log(angry);
    console.log(disgust);
    console.log(fear);
    console.log(happy);
    console.log(sad);
    console.log(surprise);
    console.log(neutral);
  }, []);

  return <>1</>;
};

export default VideoChart;
