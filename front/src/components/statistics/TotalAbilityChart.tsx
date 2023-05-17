import { getTotalAbilityData } from "api/statistics";
import { useState, useEffect } from "react";
import styled from "styled-components";

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
  const [isNoData, setIsNoData] = useState(true);

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
        setIsNoData(false);
      } catch (err) {
        setIsNoData(true);
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
      {isNoData === true && (
        <BoardBox>
          4가지 게임 응시 후<br />
          분석이 완료되어야 합니다.
        </BoardBox>
      )}
    </>
  );
};
const BoardBox = styled.div({
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  margin: "1rem auto",
  display: "flex",
  flexDirection: "row",
  padding: "1rem 0",

  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",

  fontSize: "1.1rem",
  fontWeight: "bold",

  width: "300px",
  height: "3rem",
  background: "white",
  borderRadius: 10,
  boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.2)",
});
export default TotalAbilityChart;
