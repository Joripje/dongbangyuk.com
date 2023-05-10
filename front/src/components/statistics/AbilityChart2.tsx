import { getAbilityData } from "api/statistics";
import { useState, useEffect } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import styled from "styled-components";

const AbilityChart = () => {
  const [judgment, setJudgment] = useState<number>(0);
  const [accuracy, setaccuracy] = useState<number>(0);
  const [stability, setStability] = useState<number>(0);
  const [endurance, setEndurance] = useState<number>(0);
  const [resilience, setResilience] = useState<number>(0);
  const [gameAbility, setGameAbility] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAbilityData({
          gameid: 1,
        });

        setJudgment(response.judgment);
        setaccuracy(response.accuracy);
        setStability(response.stability);
        setEndurance(response.endurance);
        setResilience(response.resilience);
        setGameAbility(response.gameAbility);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const abilityData = [
    {
      ability: "판단력",
      level: judgment,
    },
    {
      ability: "정확도",
      level: accuracy,
    },
    {
      ability: "지구력",
      level: endurance,
    },
    {
      ability: "회복탄력성",
      level: resilience,
    },
  ];

  return (
    <>
      <RadarChart width={500} height={500} data={abilityData}>
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

const BoardBox = styled.div({
  position: "relative",
  margin: "1rem 0",
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
  justifyContent: "center",

  width: "50%",
  height: "100%",
});
export default AbilityChart;
