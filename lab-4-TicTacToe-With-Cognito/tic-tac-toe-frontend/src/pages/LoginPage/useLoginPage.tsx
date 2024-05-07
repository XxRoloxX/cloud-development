const { VITE_COGNITO_CLIENT_ID, VITE_COGNITO_DOMAIN } = import.meta.env;

const constuctCognitoLoginUrl = () => {
  const loginUrl = `https://${VITE_COGNITO_DOMAIN}/login?response_type=code&client_id=${VITE_COGNITO_CLIENT_ID}&redirect_uri=${window.location.origin}/login`;
  return loginUrl;
};

const COGNITO_URL = constuctCognitoLoginUrl();

const useLoginPage = () => {
  return { cognitoUrl: COGNITO_URL };
};

export default useLoginPage;
