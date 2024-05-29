import { io } from "socket.io-client";

// const API_URL = import.meta.env.VITE_API_URL;

const socket = io(`${window.location.origin}:8080`, {
  autoConnect: false,
});

export default socket;
