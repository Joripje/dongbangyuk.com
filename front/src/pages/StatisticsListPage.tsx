import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { getStatisicsListData } from "api/statistics";
import { useState, useEffect } from "react";
import { StatisticsListCircles } from "components/statistics";
import styled from "styled-components";

const StatisticsListPage = () => {
  const location = useLocation();
  const [gameType, setGameType] = useState<String>("all");
  const [cardList, setCardList] = useState<Array<object>>([]);
  const [gameCounts, setGameCounts] = useState<object>({});
  const parsed = queryString.parse(location.search);
  // const response = {
  //   gameCounts: {
  //     cat: 1,
  //     road: 1,
  //     rotate: 1,
  //     rps: 1,
  //     total: 4,
  //   },
  //   gameScoreList: [
  //     {
  //       type: "cat",
  //       gameId: 1,
  //       score: 0,
  //       endurance: 1,
  //       resilience: 1,
  //     },
  //     {
  //       type: "road",
  //       gameId: 2,
  //       score: 0,
  //       endurance: 1,
  //       resilience: 1,
  //     },
  //     {
  //       type: "rotate",
  //       gameId: 3,
  //       score: 0,
  //       endurance: 1,
  //       resilience: 1,
  //     },
  //     {
  //       type: "rps",
  //       gameId: 4,
  //       score: 0,
  //       endurance: 1,
  //       resilience: 1,
  //     },
  //   ],
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatisicsListData({
          type: "all",
          userId: 1,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    // setCardList(response.gameScoreList);
  }, [gameType]);

  return (
    <>
      <TemplateBox>
        {/* <StatisticsListCircles gameCounts={response.gameCounts} /> */}
        <Divider />
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
const Divider = styled.hr`
  width: 90%;
  border: none;
  border-top: 1px solid black;
`;
export default StatisticsListPage;
