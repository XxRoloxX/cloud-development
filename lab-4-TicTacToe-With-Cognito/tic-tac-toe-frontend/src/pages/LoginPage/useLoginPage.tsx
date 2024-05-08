import { useEffect, useState } from "react";
import { login } from "../../api/authentication";
import useAuth from "../../providers/useAuth.ts";
import { useNavigate } from "react-router-dom";

const useLoginPage = () => {
  const {
    setAccessToken,
    setRefreshToken,
    setEmail: setPersistentEmail,
    isAuthenticated,
  } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleLogin = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const result = await login({ email, password });
      setAccessToken(result.accessToken);
      setRefreshToken(result.refreshToken);
      setPersistentEmail(email);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    email,
    handlePasswordChange,
    password,
    handleEmailChange,
    handleLogin,
  };
};

export default useLoginPage;
