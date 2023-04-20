import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./pages";
import { StyledEngineProvider } from '@mui/styled-engine';

function App() {
  return (
    <>
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
    </>
  );
}

export default App;
