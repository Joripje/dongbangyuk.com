import { createBrowserRouter } from "react-router-dom";

import Error404Page from "./Error404Page";
import FindRoadPage from "./FindRoadPage";
import FindRoadPreparePage from "./FindRoadPreparePage";
import RpsGamePage from "./RpsGamePage";
// import ComponentTest from "./ComponentTest";
import FirebaseTestPage from "./FirebaseTestPage";
import MemberPage from "./MemberPage";

const routes = [
  // error pages
  {
    path: "*",
    element: <Error404Page />,
  },
  {
    path: "/member/*",
    element: <MemberPage />,
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
    path: "/componentTest",
    element: <FirebaseTestPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
