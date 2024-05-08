import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import IAuthService from './interfaces/auth.interface';
import LoginRequestDto from './dto/login-request.dto';
import SignUpRequestDto from './dto/signup-request.dto';
import ConfirmSignupRequestDto from './dto/confirm-singup-request.dto';
import ResendCodeRequestDto from './dto/resend-code-request.dto';
import { AuthDto } from './dto/auth-request.dto';
import { UnauthorizedException } from '@nestjs/common';

@Controller('auth')
export class AuthController {

  constructor(private authService: IAuthService) { }

  @Post('login')
  async login(@Body() loginDto: LoginRequestDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
  @Post('signup')
  async signup(@Body() loginDto: SignUpRequestDto) {
    try {
      return await this.authService.signup(loginDto);
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }

  @Post('verify')
  async verify(@Body() authDto: AuthDto) {
    return this.authService.verify(authDto.accessToken);
  }

  @Post('resend-code')
  async resendCode(@Body() loginDto: ResendCodeRequestDto) {
    return this.authService.resendCode(loginDto);
  }

  @Post('confirm-signup')
  async confirmSignup(@Body() confirmSignup: ConfirmSignupRequestDto) {
    try {
      return this.authService.confirmSignup(confirmSignup);
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }

  // @Post('confirm')
  // async confirm(@Body() loginDto: LoginDto) {
  //   return this.authService.confirm(loginDto);
  // }
}
