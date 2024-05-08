import { useState } from "react";
import { signup } from "../../api/authentication";
import { useNavigate } from "react-router-dom";

const useRegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleRegistration = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const result = await signup({ email, password });
      console.log(result);
      navigate(`/confirm?email=${email}`);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    email,
    handlePasswordChange,
    password,
    handleEmailChange,
    handleRegistration,
  };
};

export default useRegistrationPage;
