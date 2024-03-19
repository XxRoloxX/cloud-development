import axios from "axios";
import { Game } from "./types";
import { Socket, io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL;

export const ticTacToeAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const createGame = async (): Promise<Game> => {
  const response = await ticTacToeAxios.post("/game");
  return response.data;
};
export const getAllGames = async (): Promise<Game[]> => {
  console.log("API_URL", API_URL);
  const response = await ticTacToeAxios.get("/game");
  return response.data;
};
export const getGame = async (id: number): Promise<Game> => {
  const response = await ticTacToeAxios.get(`/game/${id}`);
  if (!response.data.moves) {
    response.data.moves = [];
  }
  return response.data;
};

export const joinGame = async (gameId: number, playerTurn: string) => {
  const response = await ticTacToeAxios.patch(`/game/${gameId}/join`, {
    id: gameId,
    playerTurn,
  });
  return response.data;
};

export const connectToWebsocket = () => {
  const socket = io(API_URL);
  return socket;
};

export const handleWebsocketMessage = (
  socket: Socket,
  event: string,
  callback: (data: unknown) => void,
) => {
  socket.on(event, callback);
};
