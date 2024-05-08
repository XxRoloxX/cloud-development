import { ticTacToeAxios } from "./ticTacToeApi";

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

ticTacToeAxios.interceptors.request.use(function(config) {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface LoginRequestDto {
  email: string;
  password: string;
}

interface SignupRequestDto {
  email: string;
  password: string;
}

interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
}

interface SignupResponseDto {
  userId: string;
  email: string;
}

interface ConfirmSignupRequestDto {
  email: string;
  code: string;
}
interface ResendCodeRequestDto {
  email: string;
}

export const login = async (
  loginDto: LoginRequestDto,
): Promise<LoginResponseDto> => {
  try {
    return (await ticTacToeAxios.post("/auth/login", loginDto))
      .data as LoginResponseDto;
  } catch (error) {
    return Promise.reject(new Error((error as Error).message));
  }
};

export const signup = async (loginDto: SignupRequestDto) => {
  try {
    return (await ticTacToeAxios.post("/auth/signup", loginDto))
      .data as SignupResponseDto;
  } catch (error) {
    return Promise.reject(new Error((error as Error).message));
  }
};

export const confirmSignup = async (
  confirmSignupDto: ConfirmSignupRequestDto,
) => {
  try {
    return (await ticTacToeAxios.post("/auth/confirm-signup", confirmSignupDto))
      .data as SignupResponseDto;
  } catch (error) {
    return Promise.reject(new Error((error as Error).message));
  }
};

export const resendCode = async (resendCodeDto: ResendCodeRequestDto) => {
  try {
    return (await ticTacToeAxios.post("/auth/resend-code", resendCodeDto)).data;
  } catch (error) {
    return Promise.reject(new Error((error as Error).message));
  }
};
