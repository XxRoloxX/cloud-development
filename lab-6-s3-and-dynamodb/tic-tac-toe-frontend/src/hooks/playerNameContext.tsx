import React, { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { getProfileInfo } from "../api/authentication";
import useWebsockets from "../providers/useWebsockets";
import useAuth from "../providers/useAuth";

interface PlayerContext {
  playerName: string;
  playerId: string;
  playerEmail: string;
}

export const PlayerProvider: React.FC = () => {
  const [playerInfo, setPlayerInfo] = useState<PlayerContext | null>(null);
  const { userId } = useAuth();

  const fetchProfileInfo = async () => {
    const info = await getProfileInfo();
    setPlayerInfo({
      playerName: info.name,
      playerId: info.userId,
      playerEmail: info.email,
    });
  };

  useEffect(() => {
    fetchProfileInfo();
  }, [userId]);

  return (
    <Outlet
      context={{
        ...useWebsockets(),
        ...useAuth(),
        ...playerInfo,
      }}
    />
  );
};

export const usePlayer = () => {
  return useOutletContext<PlayerContext>();
};
