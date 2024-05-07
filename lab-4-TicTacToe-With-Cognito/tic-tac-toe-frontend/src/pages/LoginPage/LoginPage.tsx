import useLoginPage from "./useLoginPage";

const LoginPage = () => {
  const { cognitoUrl } = useLoginPage();

  return (
    <div>
      <a href={cognitoUrl}>Login with Cognito</a>
    </div>
  );
};
export default LoginPage;
