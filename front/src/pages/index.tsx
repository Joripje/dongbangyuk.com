import { createBrowserRouter } from "react-router-dom";

import Error404Page from "./Error404Page";
import MyProfile from "./MyProfile";

import FirebaseTestPage from "./FirebaseTestPage";
import MemberPage from "./MemberPage";
import RecordTestPage from "./RecordTestPage";
import StatisticsPage from "./StatisticsPage";
import StatisticsListPage from "./StatisticsListPage";
import StatisticsTotalPage from "./StatisticsTotalPage";

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
    element: <TestCompositionPage />,
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
];

const router = createBrowserRouter(routes);

export default router;
