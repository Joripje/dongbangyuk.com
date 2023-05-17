import { getTotalAbilityData } from "api/statistics";
import { useState, useEffect } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

interface TotalAbilityChartProps {
  userId: string | undefined;
}

const TotalAbilityChart = (props: TotalAbilityChartProps) => {
  const [rpsScore, setRpsScore] = useState<number>(0);
  const [roadScore, setRoadScore] = useState<number>(0);
  const [rotateScore, setRotateScore] = useState<number>(0);
  const [catScore, setCatScore] = useState<number>(0);
  const [resilienceAvg, setResilienceAvg] = useState<number>(0);
  const [enduranceAvg, setEnduranceAvg] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTotalAbilityData({
          userId: props.userId,
        });

        setRpsScore(response.rpsScore);
        setRoadScore(response.roadScore);
        setRotateScore(response.rotateScore);
        setCatScore(response.catScore);
        setResilienceAvg(response.resilienceAvg);
        setEnduranceAvg(response.enduranceAvg);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const abilityData = [
    {
      ability: "인지능력",
      level: rpsScore,
    },
    {
      ability: "계획능력",
      level: roadScore,
    },
    {
      ability: "공간능력",
      level: rotateScore,
    },
    {
      ability: "작업기억",
      level: catScore,
    },
    {
      ability: "회복탄력성",
      level: resilienceAvg,
    },
    {
      ability: "지구력",
      level: enduranceAvg,
    },
  ];

  return (
    <>
      <RadarChart width={400} height={400} data={abilityData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="ability" />
        <PolarRadiusAxis domain={[0, 5]} tickCount={6} />
        <Radar
          dataKey="level"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    </>
  );
};

export default TotalAbilityChart;
