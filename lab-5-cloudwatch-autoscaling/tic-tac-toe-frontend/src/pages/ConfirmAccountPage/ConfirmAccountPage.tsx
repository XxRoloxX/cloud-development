import "../../components/Forms/Forms.style.scss";
import useConfirmAccountPage from "./useConfirmAccountPage";

const ConfirmAccountPage = () => {
  const { email, handleCodeChange, handleConfirm, handleResendCode } =
    useConfirmAccountPage();

  return (
    <div className={"form"}>
      <h2 className={"form__title"}>Confirm Account</h2>
      <form className={"form__panel"}>
        <label htmlFor={"codeInput"} className={"form__panel__label"}>
          Enter the code sent to {email}
        </label>
        <input
          id={"codeInput"}
          className={"form__panel__text-input"}
          onChange={handleCodeChange}
        />
        <input
          type={"submit"}
          value={"Confirm"}
          className={"form__panel__button"}
          onClick={handleConfirm}
        />
        <a
          className={"form__subtext"}
          href={"/register"}
          onClick={handleResendCode}
        >
          Resend code
        </a>
      </form>
    </div>
  );
};
export default ConfirmAccountPage;
