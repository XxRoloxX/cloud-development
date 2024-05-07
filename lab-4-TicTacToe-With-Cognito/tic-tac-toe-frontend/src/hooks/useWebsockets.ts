import { useEffect } from "react";
import socket from "../api/socket";
import { Socket } from "socket.io-client";
import { MoveDto } from "../api/types";

export class GameSocket {
  constructor(private readonly socket: Socket) { }

  joinGame(gameId: number, playerTurn: string) {
    this.socket.emit(`join/${gameId}`, { gameId, playerTurn });
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

  connect() {
    this.socket.connect();
  }
  disconnect() {
    this.socket.disconnect();
  }
}

const useWebsockets = () => {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);
  return new GameSocket(socket);
};
export default useWebsockets;
