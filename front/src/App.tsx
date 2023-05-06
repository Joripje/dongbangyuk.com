import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux"; // Provider 추가
import { store } from "store";
import router from "./pages";
import { StyledEngineProvider } from "@mui/styled-engine";

function App() {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <RouterProvider router={router} />
      </StyledEngineProvider>
    </>
  );
}

// Provider 컴포넌트로 App 컴포넌트를 감싸기
const WrappedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default WrappedApp;
