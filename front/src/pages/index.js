import { createBrowserRouter } from "react-router-dom";

import Error404Page from "./Error404Page";

const routes = [
  // error pages
  {
    path: "*",
    element: <Error404Page />,
  },
];

const router = createBrowserRouter(routes);

export default router;
