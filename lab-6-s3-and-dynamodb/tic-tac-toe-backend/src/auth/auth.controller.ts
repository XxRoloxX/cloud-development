import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import IAuthService from './interfaces/auth.interface';
import LoginRequestDto from './dto/login-request.dto';
import SignUpRequestDto from './dto/signup-request.dto';
import ConfirmSignupRequestDto from './dto/confirm-singup-request.dto';
import ResendCodeRequestDto from './dto/resend-code-request.dto';
import { AuthRequestDto } from './dto/auth-request.dto';
import { UnauthorizedException } from '@nestjs/common';
import { RefreshTokenRequestDto } from './dto/refresh-token-requset.dto';

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
  async verify(@Body() authDto: AuthRequestDto) {
    try {
      return this.authService.verify(authDto.accessToken);
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }

  @Post('resend-code')
  async resendCode(@Body() loginDto: ResendCodeRequestDto) {
    try {
      return this.authService.resendCode(loginDto);
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }

  @Post('refresh-token')
  async refreshToken(@Body() refreshToken: RefreshTokenRequestDto) {
    try {
      return await this.authService.refreshToken(refreshToken);
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }


  @Post('confirm-signup')
  async confirmSignup(@Body() confirmSignup: ConfirmSignupRequestDto) {
    try {
      return await this.authService.confirmSignup(confirmSignup);
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }
}
