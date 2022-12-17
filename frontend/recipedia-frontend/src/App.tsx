import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import StartPage from "./pages/StartPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <StartPage />
    </BrowserRouter>
  );
};

export default App;
