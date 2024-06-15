import { useEffect, useState } from "react";
import { GameSocket } from "../hooks/useWebsockets";
import socket from "../api/socket";
import { Outlet } from "react-router-dom";
import useAuth from "./useAuth";
import { usePlayer } from "../hooks/playerNameContext";

export const WebsocketProvider = () => {
  const [gameSocket] = useState<GameSocket>(new GameSocket(socket));
  const { accessToken } = useAuth();

  useEffect(() => {
    if (accessToken) {
      console.log("Connecting to socket");
      gameSocket.connect(accessToken!);
    }
  }, [accessToken, gameSocket]);

  return <Outlet context={{ ...useAuth(), ...usePlayer(), gameSocket }} />;
};

export interface WebsocketContext {
  gameSocket: GameSocket;
}
