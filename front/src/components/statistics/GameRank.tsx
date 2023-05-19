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
import styled from "styled-components";

interface GameRankProps {
  userId: string | undefined;
}

const GameRank = (props: GameRankProps) => {
  const [rpsScore, setRpsScore] = useState<number>(0);
  const [roadScore, setRoadScore] = useState<number>(0);
  const [rotateScore, setRotateScore] = useState<number>(0);
  const [catScore, setCatScore] = useState<number>(0);
  const [isNoData, setIsNoData] = useState(true);
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
          userId: 20,
          // userId: props.userId,
        });

        setRpsScore(response.rpsScore);
        setRoadScore(response.roadScore);
        setRotateScore(response.rotateScore);
        setCatScore(response.catScore);
        setIsNoData(false);
      } catch (err) {
        setIsNoData(true);
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
    <>
      <LineChart width={800} height={600}>
        <XAxis
          dataKey='level'
          allowDuplicatedCategory={false}
          tick={false}
          padding={{ left: 75, right: 75 }}
        />
        <YAxis dataKey='value' hide={true} />
        {/* <Tooltip /> */}
        <Legend
          verticalAlign='bottom'
          align='center'
          payload={[
            { value: "길 만들기", type: "circle", color: "#5FF365" },
            { value: "가위바위보", type: "circle", color: "#FFDF8C" },
            { value: "도형 회전하기", type: "circle", color: "#FAC4FF" },
            { value: "고양이 술래잡기", type: "circle", color: "#5C78C5" },
          ]}
        />
        {series.map((s) => (
          <Line
            dataKey='value'
            data={s.data}
            name={s.name}
            key={s.name}
            strokeWidth={4}
            dot={false}
            stroke={s.color}
          />
        ))}
        <ReferenceLine x={rpsScore} stroke='red' strokeWidth={3} />
        <ReferenceLine x={roadScore} stroke='red' strokeWidth={3} />
        <ReferenceLine x={rotateScore} stroke='red' strokeWidth={3} />
        <ReferenceLine x={catScore} stroke='red' strokeWidth={3} />
      </LineChart>
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
export default GameRank;
