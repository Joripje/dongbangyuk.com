import { createBrowserRouter } from "react-router-dom";

import Error404Page from "./Error404Page";
import FindRoadPage from "./FindRoadPage";
import TestPage from "./TestPage";
import RpsGamePage from "./RpsGamePage";

const routes = [
  // error pages
  {
    path: "*",
    element: <Error404Page />,
  },
  {
    path: "/test/find-road",
    element: <FindRoadPage />,
  },
  {
    path: "/test/prepare/find-road",
    element: <TestPage />,
  },
  {
    path: "/rpsPage",
    element: <RpsGamePage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
