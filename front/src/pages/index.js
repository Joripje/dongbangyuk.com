import { createBrowserRouter } from "react-router-dom";

import Error404Page from "./Error404Page";
import RpsGamePage from "./RpsGamePage";

const routes = [
  // error pages
  {
    path: "*",
    element: <Error404Page />,
  },
  {
    path: "/rpsPage",
    element: <RpsGamePage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
