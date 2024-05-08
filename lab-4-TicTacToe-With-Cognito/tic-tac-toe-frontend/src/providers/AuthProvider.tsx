import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { usePlayer } from "../hooks/playerNameContext";

const loginPaths = ["/login", "/register", "/confirm"];
const isLoginPath = (path: string) => loginPaths.includes(path);

const isCurrentPathALoginPage = () => {
  console.log(window.location.pathname);
  return isLoginPath(window.location.pathname);
};
export interface AuthContext {
  accessToken: string | null;
  refreshToken: string | null;
  email: string | null;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setEmail: (email: string) => void;
  isAuthenticated: () => boolean;
  logout: () => void;
}

export const AuthProvider = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated() && isCurrentPathALoginPage()) {
      updateTokens();
      navigate("/");
    } else if (!isCurrentPathALoginPage()) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    setAccessTokenPersistently(accessToken);
    setRefreshTokenPersistently(refreshToken);
    setEmailPersistently(email);
  }, [accessToken, refreshToken, email]);

  const isAuthenticated = () => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    const email = getEmail();
    return accessToken && refreshToken && email;
  };

  const updateTokens = () => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    const email = getEmail();
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setEmail(email);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setEmail(null);
    setAccessTokenPersistently(null);
    setRefreshTokenPersistently(null);
    setEmailPersistently(null);
    navigate("/login");
  };

  return (
    <Outlet
      context={{
        setAccessToken,
        setRefreshToken,
        setEmail,
        isAuthenticated,
        accessToken,
        refreshToken,
        email,
        ...usePlayer(),
        logout,
      }}
    />
  );
};

const setAccessTokenPersistently = (accessToken: string | null) => {
  localStorage.setItem("accessToken", accessToken || "");
};

const setRefreshTokenPersistently = (refreshToken: string | null) => {
  localStorage.setItem("refreshToken", refreshToken || "");
};
const setEmailPersistently = (email: string | null) => {
  localStorage.setItem("email", email || "");
};
const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};
const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};
const getEmail = () => {
  return localStorage.getItem("email");
};
