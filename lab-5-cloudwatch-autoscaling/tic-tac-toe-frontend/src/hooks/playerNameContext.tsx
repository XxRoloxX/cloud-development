import React, { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

interface PlayerContext {
  playerName: string | null;
  setPlayerName: (name: string) => void;
}

export const PlayerNameProvider: React.FC = () => {
  const [playerName, setPlayerName] = useState<string | null>(null);

  return <Outlet context={{ playerName, setPlayerName }} />;
};

export const usePlayer = () => {
  return useOutletContext<PlayerContext>();
};
