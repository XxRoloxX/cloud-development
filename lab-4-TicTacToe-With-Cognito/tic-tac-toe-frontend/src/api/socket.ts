import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL;

const socket = io({
  autoConnect: false,
  path: API_URL,
});

export default socket;
