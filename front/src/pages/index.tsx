import { createBrowserRouter } from "react-router-dom";

import Error404Page from "./Error404Page";
import FindRoadPage from "./FindRoadPage";
import FindRoadPreparePage from "./FindRoadPreparePage";
import RpsGamePage from "./RpsGamePage";
import RpsPreparePage from "./RpsPreparePage";
import CatchCatGamePage from "./CatchCatGamePage";
import MyProfile from "./MyProfile";

import FirebaseTestPage from "./FirebaseTestPage";
import MemberPage from "./MemberPage";
import GameSelectPage from "./GameSelectPage";
import RecordTestPage from "./RecordTestPage";
import StatisticsPage from "./StatisticsPage";
import StatisticsListPage from "./StatisticsListPage";
import StatisticsTotalPage from "./StatisticsTotalPage";
import TurnPicGamePage from "./TurnPicGamePage";

import TestCompositionPage from "./TestCompositionPage";

// firebase chat
import { Chat } from "components/firebase_chat";
import { SelectAnswer } from "components/catchCat";
import ShowOffPage from "./ShowOffPage";

const routes = [
  {
    path: "*",
    element: <Error404Page />,
  },
  {
    path: "/member/*",
    element: <MemberPage />,
  },
  {
    path: "/test",
    element: <GameSelectPage />,
  },
  {
    path: "/test/find-road",
    element: <FindRoadPage />,
  },
  // {
  //   path: "/test/find-road/prepare",
  //   element: <FindRoadPreparePage />,
  // },
  {
    path: "/test/rps",
    element: <RpsGamePage />,
  },
  {
    path: "/test/rps/prepare",
    element: <RpsPreparePage />,
  },

  {
    path: "/test/cat",
    element: <CatchCatGamePage />,
  },
  {
    path: "/test/cat/prepare",
    element: <CatchCatGamePage />,
  },
  {
    path: "/test/turn",
    element: <TurnPicGamePage />,
  },
  {
    path: "/test/turn/prepare",
    element: <TurnPicGamePage />,
  },

  {
    path: "/statistics/*",
    element: <StatisticsPage />,
  },
  {
    path: "/statistics/list/*",
    element: <StatisticsListPage />,
  },
  {
    path: "/statistics/total/*",
    element: <StatisticsTotalPage />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/profile",
    element: <MyProfile />,
  },
  //TEST PAGES
  {
    path: "/firebaseTest",
    element: <FirebaseTestPage />,
  },
  {
    path: "/componentTest",
    element: <SelectAnswer correct={[true]} />,
  },
  {
    path: "/recordtest",
    element: <RecordTestPage />,
  },
  {
    path: "/test/showOff",
    element: <ShowOffPage />,
  },
  {
    path: "/test/HOC",
    element: <TestCompositionPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
