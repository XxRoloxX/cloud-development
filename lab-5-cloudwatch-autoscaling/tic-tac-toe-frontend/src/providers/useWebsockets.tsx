import { useOutletContext } from "react-router-dom";
import { WebsocketContext } from "./WebsocketProvider";

const useWebsockets = () => {
  return useOutletContext<WebsocketContext>();
};
export default useWebsockets;
