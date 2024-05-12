// import { useEffect, useState } from "react";
// import socket from "../api/socket";
import { Socket } from "socket.io-client";
import { MoveDto, PlayerTurn } from "../api/types";

interface JoinGameDto {
  gameId: string;
  playerId: string;
  playerTurn: PlayerTurn;
}

export class GameSocket {
  constructor(private readonly socket: Socket) { }

  joinGame(joinGameDto: JoinGameDto) {
    console.log("Calling join");
    this.socket.emit(`join`, joinGameDto);
  }
  authenticate(accessToken: string) {
    this.socket.io.opts.extraHeaders = {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  listenForJoinGame(callback: (data: JoinGameDto) => void) {
    this.socket.on(`announce-join`, callback);
  }

  listenForNewGame(callback: (data: unknown) => void) {
    this.socket.on("announce-new-game", callback);
  }
  unListenForNewGame() {
    this.socket.off("announce-new-game");
  }

  listenForMove(callback: (data: MoveDto) => void) {
    this.socket.on(`move`, callback);
  }
  unListenForMove() {
    this.socket.off(`move`);
  }
  unListenForJoinGame() {
    this.socket.off(`join`);
  }
  makeMove(move: MoveDto) {
    this.socket.emit(`move`, move);
  }
  connect(accessToken: string) {
    this.authenticate(accessToken);
    // this.socket.open();
    this.socket.connect();
  }
  disconnect() {
    this.socket.disconnect();
  }
}

// interface WebsocketProps {
//   accessToken: string | null;
// }

// const useWebsockets = ({ accessToken }: WebsocketProps) => {
//   const [gameSocket] = useState<GameSocket>(new GameSocket(socket));
//
//   useEffect(() => {
//     console.log("Connecting to socket");
//     console.log(accessToken);
//     gameSocket.connect(accessToken!);
//
//     // return () => {
//     //   console.log("Disconnecting from socket");
//     //   gameSocket.disconnect();
//     // };
//   }, [accessToken, gameSocket]);
//
//   return gameSocket;
// };
// export default useWebsockets;
