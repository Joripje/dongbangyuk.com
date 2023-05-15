import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { getStatisicsListData } from "api/statistics";
import { useState, useEffect } from "react";
import {
  StatisticsListCircles,
  StatisticListCards,
} from "components/statistics";
import styled from "styled-components";

type GameCounts = {
  [key: string]: number;
};

const StatisticsListPage = () => {
  const location = useLocation();
  const [gameType, setGameType] = useState<String>("all");
  const [cardList, setCardList] = useState([]);
  const [gameCounts, setGameCounts] = useState<GameCounts>({
    cat: 0,
    road: 0,
    rotate: 0,
    rps: 0,
    total: 0,
  });
  const parsed = queryString.parse(location.search);

  const TypeChangeHandler = (gameType: string) => {
    setGameType(gameType);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatisicsListData({
          type: gameType,
          userId: parsed.userid,
        });
        setCardList(response.gameScoreList);
        setGameCounts(response.gameCounts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [gameType]);

  return (
    <>
      <TemplateBox>
        <MainTitleContainer>나의 통계</MainTitleContainer>
        <Divider />
        <StatisticsListCircles
          gameCounts={gameCounts}
          TypeChangeHandler={TypeChangeHandler}
        />
        <Divider />
        <StatisticListCards cardList={cardList} />
      </TemplateBox>
    </>
  );
};

const TemplateBox = styled.div({
  margin: "2% auto",
  display: "flex",
  flexDirection: "column",
  // justifyContent: "center",
  // alignItems: "center",
  borderRadius: 10,
  width: "90%",
  // height: "100%",
  background: "#E0F6F4",
});

// const MenuContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   align-items: center;
//   margin: 2rem;
// `;

// const TextContainer = styled.div`
//   margin: 1rem;
//   font-size: 1.2rem;
//   font-weight: bold;
// `;

// const Circle = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 10rem;
//   height: 10rem;
//   border-radius: 50%;
//   background-color: ${(props) => props.color || "gray"};
//   font-weight: bold;
// `;
// const ContainerBox = styled.div`
//   display: flex;
//   align-items: flex-end;
// `;

// const NumberContainer = styled.div`
//   font-size: 4rem;
//   font-weight: bold;
// `;

// const CountContainer = styled.div`
//   font-size: 2rem;
//   font-weight: bold;
//   margin-bottom: 0.5rem;
// `;

const MainTitleContainer = styled.div({
  fontWeight: "bold",
  fontSize: "4rem",
  margin: "2rem",
  marginLeft: "5%",
});

const Divider = styled.hr`
  width: 90%;
  border: none;
  border-top: 1px solid black;
`;
export default StatisticsListPage;
