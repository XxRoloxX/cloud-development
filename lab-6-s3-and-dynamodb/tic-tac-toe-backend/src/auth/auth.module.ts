import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CognitoService } from './cognito/cognito.service';
import IAuthService from './interfaces/auth.interface';
import { HttpGuard } from './guards/http.guard';

@Module({
  providers: [
    {
      provide: IAuthService,
      useClass: CognitoService
    },
    HttpGuard
  ],
  controllers: [AuthController],
  exports: [
    {
      provide: IAuthService,
      useClass: CognitoService
    },
    HttpGuard
  ]
})
export class AuthModule { }
