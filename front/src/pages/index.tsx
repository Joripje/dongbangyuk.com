import { createBrowserRouter } from "react-router-dom";

import Error404Page from "./Error404Page";
import FindRoadPage from "./FindRoadPage";
import FindRoadPreparePage from "./FindRoadPreparePage";
import RpsGamePage from "./RpsGamePage";
import RpsPreparePage from "./RpsPreparePage";
import CatchCatGamePage from "./CatchCatGamePage";

import FirebaseTestPage from "./FirebaseTestPage";
import MemberPage from "./MemberPage";
import GameSelectPage from "./GameSelectPage";
import RecordTestPage from "./RecordTestPage";

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
    path: "/test/prepare",
    element: <GameSelectPage />,
  },
  {
    path: "/test/find-road",
    element: <FindRoadPage />,
  },
  {
    path: "/test/prepare/find-road",
    element: <FindRoadPreparePage />,
  },
  {
    path: "/rpsPage",
    element: <RpsGamePage />,
  },
  {
    path: "/prepare/rpsPage",
    element: <RpsPreparePage />,
  },

  {
    path: "/catPage",
    element: <CatchCatGamePage />,
  },
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
