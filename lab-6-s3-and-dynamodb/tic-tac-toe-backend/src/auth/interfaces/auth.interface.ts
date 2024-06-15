import LoginRequestDto from "../dto/login-request.dto";
import LoginResponseDto from "../dto/login-response.dto";
import SignUpRequestDto from "../dto/signup-request.dto";
import ConfirmSignupRequestDto from "../dto/confirm-singup-request.dto";
import SignUpResponseDto from "../dto/signup-response.dto";
import ResendCodeRequestDto from "../dto/resend-code-request.dto";
import { Injectable } from "@nestjs/common";
import { RefreshTokenResponseDto } from "../dto/refresh-token-response.dto";
import { RefreshTokenRequestDto } from "../dto/refresh-token-requset.dto";
import { VerifyUserResponseDto } from "../dto/verify-user-response.dto";
import { ProfileInfoResponseDto } from "../dto/verify-user-response.dto";

@Injectable()
abstract class IAuthService {
  abstract signup(loginDto: SignUpRequestDto): Promise<SignUpResponseDto>;

  abstract login(loginDto: LoginRequestDto): Promise<LoginResponseDto>;

  abstract verify(accessToken: string): Promise<VerifyUserResponseDto>;

  abstract confirmSignup(confirmSignup: ConfirmSignupRequestDto): Promise<boolean>;

  abstract resendCode(resendCodeDto: ResendCodeRequestDto): Promise<void>;

  abstract refreshToken(refreshToken: RefreshTokenRequestDto): Promise<RefreshTokenResponseDto>;

  abstract profile(userId: string): Promise<ProfileInfoResponseDto>;
}
export default IAuthService;
