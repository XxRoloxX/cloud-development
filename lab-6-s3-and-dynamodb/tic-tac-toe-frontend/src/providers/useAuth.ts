import { useOutletContext } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const useAuth = () => {
  return useOutletContext<AuthContext>();
};
export default useAuth;
