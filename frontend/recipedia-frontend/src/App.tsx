import * as React from "react";
<<<<<<< HEAD
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
=======
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StartPage from "./pages/StartPage";
import IngredientsPage from "./pages/IngredientsPage";
>>>>>>> 97634f8 (Added ingredients page)
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const App: React.FC = () => {
  return (
<<<<<<< HEAD
    <RouterProvider router={router} />
=======
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<StartPage/>} />
      <Route path="/ingredients" element={<IngredientsPage/>} />
      </Routes>
    </BrowserRouter>
>>>>>>> 97634f8 (Added ingredients page)
  );
};

export default App;
