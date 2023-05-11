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
import TurnPicGamePage from "./TurnPicGamePage";

// firebase chat
import { Chat } from "components/firebase_chat";

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
  {
    path: "/test/find-road/prepare",
    element: <FindRoadPreparePage />,
  },
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
    path: "/statistics",
    element: <StatisticsPage />,
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
    path: "/componentTest",
    element: <FirebaseTestPage />,
  },
  {
    path: "/recordtest",
    element: <RecordTestPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
