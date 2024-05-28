import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CognitoService } from './cognito/cognito.service';
import IAuthService from './interfaces/auth.interface';

@Module({
  providers: [
    {
      provide: IAuthService,
      useClass: CognitoService
    }
  ],
  controllers: [AuthController]
})
export class AuthModule { }
