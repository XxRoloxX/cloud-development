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
  const response = await ticTacToeAxios.get("/game");
  return response.data;
};
export const getGame = async (id: number): Promise<Game> => {
  const response = await ticTacToeAxios.get(`/game/${id}`);
  console.log("Getting game");
  if (!response.data.moves) {
    response.data.moves = [];
  }
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

export const uploadProfilePicture = async (
  id: string,
  file: File,
): Promise<void> => {
  const formData = new FormData();
  formData.append("profile-picture", file);
  const response = await ticTacToeAxios.post(
    `/users/${id}/profile-picture`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};

export interface UserProfile {
  userId: string;
  username: string;
  profilePictureUrl: string;
}
export interface PreviousResults {
  player1Wins: number;
  player2Wins: number;
}

export const getUserProfile = async (userId: string) => {
  const response = await ticTacToeAxios.get(`/users/${userId}`);
  return response.data as UserProfile;
};

export const getPreviousResults = async (
  player1Id: string,
  player2Id: string,
) => {
  const response = await ticTacToeAxios.get(
    `/game/results/${player1Id}/${player2Id}`,
  );
  return response.data as PreviousResults;
};
