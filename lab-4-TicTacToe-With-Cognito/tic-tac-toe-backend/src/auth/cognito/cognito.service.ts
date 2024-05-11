import { CognitoIdentityProviderClient, InitiateAuthCommand, SignUpCommand, VerifySoftwareTokenCommandInput } from '@aws-sdk/client-cognito-identity-provider';
import { Injectable } from '@nestjs/common';
import { SignUpCommandInput } from '@aws-sdk/client-cognito-identity-provider';
import { InitiateAuthCommandInput, ConfirmSignUpCommandInput } from '@aws-sdk/client-cognito-identity-provider';
import { GetUserCommandInput, GetUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import { ResendConfirmationCodeCommand, ResendConfirmationCodeCommandInput } from '@aws-sdk/client-cognito-identity-provider';
import { ConfirmSignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
import LoginRequestDto from '../dto/login-request.dto';
import SignUpRequestDto from '../dto/signup-request.dto';
import ConfirmSignupRequestDto from '../dto/confirm-singup-request.dto';
import IAuthService from '../interfaces/auth.interface';
import LoginResponseDto from '../dto/login-response.dto';
import SignUpResponseDto from '../dto/signup-response.dto';
import ResendCodeRequestDto from '../dto/resend-code-request.dto';

class CognitoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CognitoError';
  }
}



@Injectable()
export class CognitoService extends IAuthService {
  private readonly client: CognitoIdentityProviderClient;

  constructor() {
    super();
    this.client = new CognitoIdentityProviderClient({ region: 'us-east-1' })
  }

  public async login(loginDto: LoginRequestDto) {
    const command = CognitoService.buildInitiateAuthCommand(loginDto);
    try {
      const loginResponse = await this.client.send(new InitiateAuthCommand(command));
      return new LoginResponseDto()
        .setAccessToken(loginResponse.AuthenticationResult.AccessToken)
        .setRefreshToken(loginResponse.AuthenticationResult.RefreshToken)
    } catch (error) {
      throw new CognitoError(error.message);
    }
  }

  public async confirmSignup(confirmSignupDto: ConfirmSignupRequestDto) {
    const command = CognitoService.buildConfirmSignupCommand(confirmSignupDto);

    try {
      await this.client.send(new ConfirmSignUpCommand(command));
      return true;
    } catch (error) {
      throw new CognitoError(error.message);
    }
  }

  public async resendCode(resendCodeDto: ResendCodeRequestDto) {
    const command: ResendConfirmationCodeCommandInput =
      CognitoService.buildResendCodeCommand(resendCodeDto);
    try {
      await this.client.send(new ResendConfirmationCodeCommand(command));
    } catch (error) {
      throw new CognitoError(error.message);
    }
  }
  async verify(accessToken: string) {
    const command: GetUserCommandInput = {
      AccessToken: accessToken
    }
    return this.client.send(new GetUserCommand(command));
  }
  public async signup(signUpDto: SignUpRequestDto) {
    const command = CognitoService.buildSignupCommand(signUpDto);
    try {
      const result = await this.client.send(new SignUpCommand(command));
      await this.resendCode(signUpDto);
      return new SignUpResponseDto()
        .setUserId(result.UserSub)
        .setEmail(signUpDto.email);
    } catch (error) {
      throw new CognitoError(error.message);
    }
  }

  private static buildConfirmSignupCommand(confirmSignupDto: ConfirmSignupRequestDto): ConfirmSignUpCommandInput {
    return {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: confirmSignupDto.email,
      ConfirmationCode: confirmSignupDto.code
    }
  }

  private static buildSignupCommand(signUpDto: SignUpRequestDto): SignUpCommandInput {
    return {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: signUpDto.email,
      Password: signUpDto.password,
      UserAttributes: [
        {
          Name: 'email',
          Value: signUpDto.email
        }
      ]
    }
  }

  private static buildResendCodeCommand(resendCodeDto: ResendCodeRequestDto): ResendConfirmationCodeCommandInput {
    return {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: resendCodeDto.email
    }
  }

  private static buildInitiateAuthCommand(loginDto: LoginRequestDto): InitiateAuthCommandInput {
    return {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthParameters: {
        'USERNAME': loginDto.email,
        'PASSWORD': loginDto.password
      }
    }
  }
}
