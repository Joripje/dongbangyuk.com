import { createBrowserRouter } from "react-router-dom";

import Error404Page from "./Error404Page";
import FindRoadPage from "./FindRoadPage";

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
];

const router = createBrowserRouter(routes);

export default router;
