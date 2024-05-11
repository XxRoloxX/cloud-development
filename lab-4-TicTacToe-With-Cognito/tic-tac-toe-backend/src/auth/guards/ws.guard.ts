import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Inject } from '@nestjs/common';
import IAuthService from '../interfaces/auth.interface';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(@Inject(IAuthService) private readonly authService: IAuthService) { }

  private getAccessTokenFromAuthorizationHeader(authorizationHeader: string): string {
    const [type, token] = authorizationHeader.split(' ');
    if (type !== 'Bearer') {
      throw new WsException('Invalid token type');
    }
    return token;
  }


  private getAuthorizationHeader(context: ExecutionContext): string {
    const client = context.switchToWs().getClient();
    const headers = client[Object.getOwnPropertySymbols(client).find((symbol) => symbol.toString() === "Symbol(kHeaders)")];
    return this.getAccessTokenFromAuthorizationHeader(headers.authorization);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const accessToken = this.getAuthorizationHeader(context);
    try {
      const profile = await this.authService.verify(accessToken);
      return true;
    } catch (e) {
      console.error(`Invalid token ${accessToken}`, e)
      return false;
    }
  }
}


