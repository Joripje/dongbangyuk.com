import { getScoreDistribution, getTotalAbilityData } from "api/statistics";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
const GameRank = () => {
  const [rpsScore, setRpsScore] = useState<number>(0);
  const [roadScore, setRoadScore] = useState<number>(0);
  const [rotateScore, setRotateScore] = useState<number>(0);
  const [catScore, setCatScore] = useState<number>(0);

  const series = [
    {
      name: "road",
      data: [
        { level: 1, value: 1 },
        { level: 2, value: 13 },
        { level: 3, value: 9 },
        { level: 4, value: 20 },
        { level: 5, value: 9 },
      ],
      color: "#5FF365",
    },
    {
      name: "rps",
      data: [
        { level: 1, value: 10 },
        { level: 2, value: 1 },
        { level: 3, value: 11 },
        { level: 4, value: 8 },
        { level: 5, value: 11 },
      ],
      color: "#FFDF8C",
    },
    {
      name: "rotate",
      data: [
        { level: 1, value: 4 },
        { level: 2, value: 13 },
        { level: 3, value: 23 },
        { level: 4, value: 10 },
        { level: 5, value: 1 },
      ],
      color: "#FAC4FF",
    },
    {
      name: "cat",
      data: [
        { level: 1, value: 6 },
        { level: 2, value: 12 },
        { level: 3, value: 10 },
        { level: 4, value: 13 },
        { level: 5, value: 5 },
      ],
      color: "#5C78C5",
    },
  ];
  useEffect(() => {
    const fetchAbilityData = async () => {
      try {
        const response = await getTotalAbilityData({
          userId: 1,
        });

        setRpsScore(response.rpsScore);
        setRoadScore(response.roadScore);
        setRotateScore(response.rotateScore);
        setCatScore(response.catScore);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchScoreData = async () => {
      try {
        const response = await getScoreDistribution();

        console.log(response);
      } catch (err) {
        console.error(err);
      }
    };

    // const fetchEmotionData = async () => {
    //   try {
    //     const response = await getEmotionData({
    //       gameid: 1,
    //     });

    //     setEmotions(response);
    //     console.log(response);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };

    fetchAbilityData();
    fetchScoreData();
  }, []);

  return (
    <LineChart width={700} height={600}>
      <XAxis dataKey="level" allowDuplicatedCategory={false} tick={false} />
      <YAxis dataKey="value" hide={true} />
      {/* <Tooltip /> */}
      <Legend />
      {series.map((s) => (
        <Line
          dataKey="value"
          data={s.data}
          name={s.name}
          key={s.name}
          strokeWidth={4}
          dot={false}
          stroke={s.color}
        />
      ))}
      <ReferenceLine x={rpsScore} stroke="red" strokeWidth={3} />
      <ReferenceLine x={roadScore} stroke="red" strokeWidth={3} />
      <ReferenceLine x={rotateScore} stroke="red" strokeWidth={3} />
      <ReferenceLine x={catScore} stroke="red" strokeWidth={3} />
    </LineChart>
  );
};
export default GameRank;
