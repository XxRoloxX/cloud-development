import { useEffect } from "react";
import socket from "../api/socket";
const useWebsockets = () => {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);
  return socket;
};
export default useWebsockets;
