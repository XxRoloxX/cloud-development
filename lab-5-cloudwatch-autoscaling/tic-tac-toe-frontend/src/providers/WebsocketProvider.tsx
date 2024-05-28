import { useEffect, useState } from "react";
import { GameSocket } from "../hooks/useWebsockets";
import socket from "../api/socket";
import { Outlet } from "react-router-dom";
import useAuth from "./useAuth";

export const WebsocketProvider = () => {
  const [gameSocket] = useState<GameSocket>(new GameSocket(socket));
  const { accessToken } = useAuth();

  useEffect(() => {
    if (accessToken) {
      gameSocket.connect(accessToken!);
    }
  }, [accessToken, gameSocket]);

  return <Outlet context={{ ...useAuth(), gameSocket }} />;
};

export interface WebsocketContext {
  gameSocket: GameSocket;
}
