import { ticTacToeAxios } from "./ticTacToeApi";
import { InternalAxiosRequestConfig } from "axios";

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};
export const getExpiresAt = () => {
  return localStorage.getItem("expiresAt");
};
export const setAccessTokenPersistently = (accessToken: string | null) => {
  localStorage.setItem("accessToken", accessToken || "");
};
export const setRefreshTokenPersistently = (refreshToken: string | null) => {
  localStorage.setItem("refreshToken", refreshToken || "");
};
export const setExpiresAtPersistently = (expiresAt: string | null) => {
  localStorage.setItem("expiresAt", expiresAt || "");
};

ticTacToeAxios.interceptors.request.use(async function (config) {
  handleAuthentication(config);
  handleTokenRefresh(config);
  return config;
});

const handleAuthentication = (config: InternalAxiosRequestConfig<unknown>) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
};

const handleTokenRefresh = async (
  config: InternalAxiosRequestConfig<unknown>,
) => {
  const expiresAt = getExpiresAt();
  if (
    config.url != "/auth/refresh-token" &&
    expiresAt &&
    Number(expiresAt) < Date.now()
  ) {
    const newToken = await refreshToken({ refreshToken: getRefreshToken()! });
    if (newToken) {
      setAccessTokenPersistently(newToken.accessToken);
      setExpiresAtPersistently(newToken.expiresAt.toString());
    }
  }
};

interface LoginRequestDto {
  email: string;
  password: string;
}

interface SignupRequestDto {
  email: string;
  password: string;
  name: string;
}

interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
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
interface RefreshTokenRequestDto {
  refreshToken: string;
}
interface RefreshTokenResponseDto {
  accessToken: string;
  expiresAt: number;
}

interface VerifyUserRequestDto {
  accessToken: string;
}

export const getProfileInfo = async (
  verifyUserRequestDto: VerifyUserRequestDto,
) => {
  try {
    return (await ticTacToeAxios.post("/auth/verify", verifyUserRequestDto))
      .data;
  } catch (error) {
    return Promise.reject(new Error((error as Error).message));
  }
};

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

export const signup = async (signupDto: SignupRequestDto) => {
  try {
    return (await ticTacToeAxios.post("/auth/signup", signupDto))
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

export const refreshToken = async (refreshToken: RefreshTokenRequestDto) => {
  try {
    return (await ticTacToeAxios.post("/auth/refresh-token", refreshToken))
      .data as RefreshTokenResponseDto;
  } catch (error) {
    return Promise.reject(new Error((error as Error).message));
  }
};
