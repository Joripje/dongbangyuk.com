import { createBrowserRouter } from "react-router-dom";

import Error404Page from "./Error404Page";
<<<<<<< HEAD:front/src/pages/index.tsx
import FindRoadPage from "./FindRoadPage";
import FindRoadPreparePage from "./FindRoadPreparePage";
=======
import RpsGamePage from "./RpsGamePage";
>>>>>>> 7eea9607fbf009cf2e3843d910877e6631688156:front/src/pages/index.js

const routes = [
  // error pages
  {
    path: "*",
    element: <Error404Page />,
  },
  {
<<<<<<< HEAD:front/src/pages/index.tsx
    path: "/test/find-road",
    element: <FindRoadPage />,
  },
  {
    path: "/test/prepare/find-road",
    element: <FindRoadPreparePage />,
=======
    path: "/rpsPage",
    element: <RpsGamePage />,
>>>>>>> 7eea9607fbf009cf2e3843d910877e6631688156:front/src/pages/index.js
  },
];

const router = createBrowserRouter(routes);

export default router;
