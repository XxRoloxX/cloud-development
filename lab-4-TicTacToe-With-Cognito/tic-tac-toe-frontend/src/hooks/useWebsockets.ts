import { useEffect, useState } from "react";
import socket from "../api/socket";
import { Socket } from "socket.io-client";
import { MoveDto } from "../api/types";

export class GameSocket {
  constructor(private readonly socket: Socket) { }

  joinGame(gameId: number, playerTurn: string) {
    this.socket.emit(`join/${gameId}`, { gameId, playerTurn });
  }
  authenticate(accessToken: string) {
    this.socket.io.opts.extraHeaders = {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  listenForJoinGame(gameId: number, callback: (data: unknown) => void) {
    this.socket.on(`join/${gameId}`, callback);
  }

  listenForNewGame(callback: (data: unknown) => void) {
    this.socket.on("new-game", callback);
  }
  unListenForNewGame() {
    this.socket.off("new-game");
  }

  listenForMove(gameId: number, callback: (data: unknown) => void) {
    this.socket.on(`move/${gameId}`, callback);
  }
  unListenForMove(gameId: number) {
    this.socket.off(`move/${gameId}`);
  }
  unListenForJoinGame(gameId: number) {
    this.socket.off(`join/${gameId}`);
  }
  makeMove(move: MoveDto) {
    this.socket.emit(`move`, move);
  }
  connect(accessToken: string) {
    this.authenticate(accessToken);
    this.socket.connect();
  }
  disconnect() {
    this.socket.disconnect();
  }
}

interface WebsocketProps {
  accessToken: string | null;
}

const useWebsockets = ({ accessToken }: WebsocketProps) => {
  const [gameSocket] = useState<GameSocket>(new GameSocket(socket));

  useEffect(() => {
    if (accessToken) {
      console.log("connecting to websocket");
      console.log(accessToken);
      gameSocket.connect(accessToken);
    }

    return () => {
      gameSocket.disconnect();
    };
  }, [accessToken, gameSocket]);

  return gameSocket;
};
export default useWebsockets;
