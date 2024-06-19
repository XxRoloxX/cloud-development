// import useLoginPage from "./useLoginPage";
import { Link } from "react-router-dom";
import "../../components/Forms/Forms.style.scss";
import useLoginPage from "./useLoginPage";

const LoginPage = () => {
  const { handleEmailChange, handlePasswordChange, handleLogin } =
    useLoginPage();

  return (
    <div className={"form"}>
      <h2 className={"form__title"}>Login</h2>
      <form className={"form__panel"}>
        <label htmlFor={"emailInput"} className={"form__panel__label"}>
          Email
        </label>
        <input
          id={"emailInput"}
          type={"email"}
          className={"form__panel__text-input"}
          onChange={handleEmailChange}
        />

        <label htmlFor={"passwordInput"} className={"form__panel__label"}>
          Password
        </label>
        <input
          id={"passwordInput"}
          type={"password"}
          className={"form__panel__text-input"}
          onChange={handlePasswordChange}
        />
        <input
          type={"button"}
          value={"Login"}
          className={"form__panel__button"}
          onClick={handleLogin}
        />

        <Link className={"form__subtext"} to="/register">
          Sign up
        </Link>
      </form>
    </div>
  );
};
export default LoginPage;
