import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import StartPage from "./pages/StartPage";
import IngredientsPage from "./pages/IngredientsPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";
import E404Page from "./pages/404Page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/ingredients",
    element: <IngredientsPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "*",
    element: <E404Page />,
  }
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
