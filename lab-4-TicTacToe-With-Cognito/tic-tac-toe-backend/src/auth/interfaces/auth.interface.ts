import LoginRequestDto from "../dto/login-request.dto";
import LoginResponseDto from "../dto/login-response.dto";
import SignUpRequestDto from "../dto/signup-request.dto";
import ConfirmSignupRequestDto from "../dto/confirm-singup-request.dto";
import SignUpResponseDto from "../dto/signup-response.dto";
import ResendCodeRequestDto from "../dto/resend-code-request.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
abstract class IAuthService {
  abstract signup(loginDto: SignUpRequestDto): Promise<SignUpResponseDto>;

  abstract login(loginDto: LoginRequestDto): Promise<LoginResponseDto>;

  abstract verify(accessToken: string): Promise<any>;

  abstract confirmSignup(confirmSignup: ConfirmSignupRequestDto): Promise<boolean>;

  abstract resendCode(resendCodeDto: ResendCodeRequestDto): Promise<void>;
}
export default IAuthService;
