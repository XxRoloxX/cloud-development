import { CanActivate, ExecutionContext, Injectable, Inject } from '@nestjs/common';
import IAuthService from '../interfaces/auth.interface';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class HttpGuard implements CanActivate {
  constructor(@Inject(IAuthService) private readonly authService: IAuthService) { }

  private getAccessTokenFromAuthorizationHeader(authorizationHeader: string): string {
    const [type, token] = authorizationHeader.split(' ');
    if (type !== 'Bearer') {
      throw new UnauthorizedException('Invalid token type');
    }
    return token;
  }


  private getAuthorizationHeader(context: ExecutionContext): string {
    const client = context.switchToHttp().getRequest();
    return this.getAccessTokenFromAuthorizationHeader(client.headers.authorization);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const accessToken = this.getAuthorizationHeader(context);
    try {
      const profile = await this.authService.verify(accessToken);
      return true;
    } catch (e) {
      console.error(`Invalid token ${accessToken}`, e.message)
      return false;
    }
  }
}


