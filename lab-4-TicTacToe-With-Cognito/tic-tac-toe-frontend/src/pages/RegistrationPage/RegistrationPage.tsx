import "../../components/Forms/Forms.style.scss";
import useRegistrationPage from "./useRegistrationPage";

const RegistrationPage = () => {
  const { handleEmailChange, handlePasswordChange, handleRegistration } =
    useRegistrationPage();
  return (
    <div className={"form"}>
      <h2 className={"form__title"}>Create account</h2>
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
          type={"submit"}
          value={"Sign up"}
          className={"form__panel__button"}
          onClick={handleRegistration}
        />
      </form>
    </div>
  );
};
export default RegistrationPage;
