import * as React from "react";
import {
  Routes,
  Route,
  Link,
  BrowserRouter,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import StartPage from "./pages/StartPage";
import IngredientsPage from "./pages/IngredientsPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { User } from "./DTOs";

const noop = () => {};

const AuthContext = React.createContext<{
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  refreshUser: () => void;
  user: User | null;
}>({ token: null, login: noop, logout: noop, refreshUser: noop, user: null });

const UnProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const context = useAuth();
  if (context.token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(
    JSON.parse(localStorage.getItem("userToken") || "null")
  );

  const login = (newToken: string | null) => {
    const origin = location.state?.next || "/";
    navigate(origin);
    setToken(newToken);
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    axios
      .get("http://localhost:8000/user/profile/", {
        headers: {
          Authorization: token,
        },
      })
      .then((resp) => JSON.parse(resp.data.user)[0].fields)
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  useEffect(() => {
    localStorage.setItem("userToken", JSON.stringify(token));
  }, [token]);

  const logout = () => {
    setToken(null);
  };
  const refreshUser = () => {
    if (!token) {
      return;
    }
    axios
      .get("http://localhost:8000/user/profile/", {
        headers: {
          Authorization: token,
        },
      })
      .then((resp) => JSON.parse(resp.data.user)[0].fields)
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const value = useMemo(
    () => ({
      token,
      login,
      logout,
      refreshUser,
      user,
    }),
    [token, user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const context = useAuth();
  if (!context.token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<StartPage />} />
          <Route
            path="login"
            element={
              <UnProtectedRoute>
                <LoginPage />
              </UnProtectedRoute>
            }
          />
          <Route
            path="register"
            element={
              <UnProtectedRoute>
                <RegisterPage />
              </UnProtectedRoute>
            }
          />
          <Route path="ingredients" element={<IngredientsPage />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<p>404</p>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
