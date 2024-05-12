import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Inject } from '@nestjs/common';
import IAuthService from '../interfaces/auth.interface';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(@Inject(IAuthService) private readonly authService: IAuthService) { }

  public static getAccessTokenFromAuthorizationHeader(authorizationHeader: string): string {
    const [type, token] = authorizationHeader.split(' ');
    if (type !== 'Bearer') {
      throw new WsException('Invalid token type');
    }
    return token;
  }


  private static getAuthorizationHeader(context: ExecutionContext): string {
    const client = context.switchToWs().getClient();
    console.log(client.handshake.headers.authorization)
    return this.getAccessTokenFromAuthorizationHeader(client.handshake.headers.authorization);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const accessToken = WsGuard.getAuthorizationHeader(context);
    try {
      console.log("Verifying token");
      const profile = await this.authService.verify(accessToken);
      return true;
    } catch (e) {
      console.error(`Invalid token ${accessToken}`, e.message)
      return false;
    }
  }
}


