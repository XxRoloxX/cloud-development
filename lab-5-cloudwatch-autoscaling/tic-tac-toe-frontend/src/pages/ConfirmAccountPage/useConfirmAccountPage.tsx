import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmSignup, resendCode } from "../../api/authentication";
import { useState } from "react";

const useConfirmAccountPage = () => {
  const [searchParams] = useSearchParams();
  const [code, setCode] = useState("");
  const [email] = useState(searchParams.get("email") as string);
  const navigate = useNavigate();

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleConfirm = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      await confirmSignup({ code, email });
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleResendCode = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    try {
      await resendCode({ email });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleCodeChange,
    code,
    handleConfirm,
    email,
    handleResendCode,
  };
};

export default useConfirmAccountPage;
