import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import StartPage from "./pages/StartPage";
import "./App.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <StartPage />
    </BrowserRouter>
  );
};

export default App;
