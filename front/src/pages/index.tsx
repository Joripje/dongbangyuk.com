import { createBrowserRouter } from "react-router-dom";

import Error404Page from "./Error404Page";
import MyProfile from "./MyProfile";
import MainPage from "./MainPage";

import FirebaseTestPage from "./FirebaseTestPage";
import MemberPage from "./MemberPage";
import RecordTestPage from "./RecordTestPage";
import StatisticsPage from "./StatisticsPage";
import StatisticsListPage from "./StatisticsListPage";
import StatisticsTotalPage from "./StatisticsTotalPage";

import TestCompositionPage from "./TestCompositionPage";

// firebase chat
import ShowOffPage from "./ShowOffPage";

// testpage
import TestPage from "./TestPage";
import { ObjectFigure } from "components/turnFigure";

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
    path: "/profile",
    element: <MyProfile />,
  },
  {
    path: "/main",
    element: <MainPage />,
  },
  //TEST PAGES
  {
    path: "/firebaseTest",
    element: <FirebaseTestPage />,
  },
  {
    path: "/componentTest",
    element: <ObjectFigure />,
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
    path: "/testpage",
    element: <TestPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
