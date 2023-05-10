import { getAbilityData } from "api/statistics";
import { useState, useEffect } from "react";
import styled from "styled-components";
import AbilityBlock from "./AbilityBlock";

const AbilityChart = () => {
  const [judgment, setJudgment] = useState<number>(0);
  const [accuracy, setaccuracy] = useState<number>(0);
  const [stability, setStability] = useState<number>(0);
  const [endurance, setEndurance] = useState<number>(0);
  const [resilience, setResilience] = useState<number>(0);
  // const [gameAbility, setGameAbility] = useState<number>(0);

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
        // setGameAbility(response.gameAbility);
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
      color: "#5978E8",
    },
    {
      ability: "정확도",
      level: accuracy,
      color: "#7FE47E",
    },
    {
      ability: "지구력",
      level: endurance,
      color: "#FFEB3A",
    },
    {
      ability: "회복탄력성",
      level: resilience,
      color: "#FF718B",
    },
  ];

  return (
    <ContainerBox>
      {abilityData.map((data) => (
        <AbilityBlock
          key={data.ability}
          abilityName={data.ability}
          level={data.level}
          color={data.color}
        />
      ))}
    </ContainerBox>
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
  flexDirection: "column",
  justifyContent: "center",

  width: "50%",
  height: "100%",
});

// const AbilityContainer = styled.div`
//   position: relative;
//   margin: 1rem auto;
//   display: flex;
//   flexdirection: row;
//   alignitems: center;
// `;

// type RectangleProps = {
//   color?: string;
// };

// const Rectangle = styled.div<RectangleProps>`
//   width: 3.5rem;
//   height: 2rem;
//   margin: 0 0.1rem;
//   border-radius: 10px;
//   background-color: ${(props) => (props.color ? props.color : "gray")};
// `;

export default AbilityChart;
