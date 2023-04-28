import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import reportWebVitals from "./reportWebVitals";
// import firebaseApp from "service/firebase.tsx";

const rootElement = document.getElementById("root");
if (rootElement !== null) {
  // console.log(firebaseApp);
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}

reportWebVitals();
