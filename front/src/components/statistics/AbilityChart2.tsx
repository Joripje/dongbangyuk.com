import { getAbilityData, getEmotionData } from "api/statistics";
import { useState, useEffect } from "react";
import styled from "styled-components";
import AbilityBlock from "./AbilityBlock";
import StandardGameRank from "./StandardGameRank";
// import EmotionChart from "./EmotionChart";

interface AbilityChartProps {
  gameId: string | undefined;
}

const AbilityChart = (props: AbilityChartProps) => {
  const [judgment, setJudgment] = useState<number>(0);
  const [accuracy, setaccuracy] = useState<number>(0);
  // const [stability, setStability] = useState<number>(0);
  const [endurance, setEndurance] = useState<number>(0);
  const [resilience, setResilience] = useState<number>(0);
  // const [emotions, setEmotions] = useState<{ [key: string]: number }>({
  //   angry: 0,
  //   disgust: 0,
  //   scared: 0,
  //   happy: 0,
  //   sad: 0,
  //   surprised: 0,
  //   neutral: 0,
  // });
  const [gameAbility, setGameAbility] = useState<number>(0);

  useEffect(() => {
    const fetchAbilityData = async () => {
      try {
        const response = await getAbilityData({
          gameid: props.gameId,
        });

        setJudgment(response.judgment);
        setaccuracy(response.accuracy);
        // setStability(response.stability);
        setEndurance(response.endurance);
        setResilience(response.resilience);
        setGameAbility(response.game_ability);
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
    // fetchEmotionData();
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
    <BoardBox>
      <ContainerBox>
        {/* <EmotionChart emotions={emotions} /> */}
        <StandardGameRank GameAbility={gameAbility} />
      </ContainerBox>
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
    </BoardBox>
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
