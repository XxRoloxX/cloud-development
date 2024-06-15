import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { usePlayer } from "../hooks/playerNameContext";
import useWebsockets from "./useWebsockets";
import { getProfileInfo } from "../api/authentication";

const loginPaths = ["/login", "/register", "/confirm"];
const isLoginPath = (path: string) => loginPaths.includes(path);

const isCurrentPathALoginPage = () => {
  return isLoginPath(window.location.pathname);
};

export interface AuthContext {
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
  expiresAt: number | null;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setUserId: (userId: string) => void;
  setExpiresAt: (expiresAt: number) => void;
  isAuthenticated: () => boolean;
  logout: () => void;
}

export const AuthProvider = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated() && isCurrentPathALoginPage()) {
      updateTokens();
      navigate("/");
    } else if (!isCurrentPathALoginPage() && !isAuthenticated()) {
      navigate("/login");
    } else if (isAuthenticated()) {
      updateTokens();
    }
  }, [navigate, userId]);

  const updateUserId = async () => {
    const profile = await getProfileInfo();
    setUserIdPersistently(profile.userId);
  };

  useEffect(() => {
    if (accessToken && refreshToken) {
      setAccessTokenPersistently(accessToken);
      setRefreshTokenPersistently(refreshToken);
      setExpiresAtPersistently(expiresAt);
      updateUserId();
    }
  }, [accessToken, refreshToken, userId, expiresAt]);

  const isAuthenticated = () => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    const email = getUserId();
    return accessToken && refreshToken && email;
  };

  const updateTokens = () => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    const userId = getUserId();
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUserId(userId);
    setExpiresAt(Number(getExpiresAt()));
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUserId(null);
    setAccessTokenPersistently(null);
    setRefreshTokenPersistently(null);
    setUserIdPersistently(null);
    setExpiresAtPersistently(null);
    navigate("/login");
  };

  return (
    <Outlet
      context={{
        setAccessToken,
        setRefreshToken,
        setUserId,
        isAuthenticated,
        accessToken,
        refreshToken,
        expiresAt,
        setExpiresAt,
        userId,
        ...usePlayer(),
        ...useWebsockets(),
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
const setUserIdPersistently = (email: string | null) => {
  localStorage.setItem("userId", email || "");
};
const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};
const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};
const getUserId = () => {
  return localStorage.getItem("userId");
};

const setExpiresAtPersistently = (expiresAt: number | null) => {
  localStorage.setItem("expiresAt", expiresAt?.toString() || "");
};

const getExpiresAt = () => {
  return localStorage.getItem("expiresAt");
};
