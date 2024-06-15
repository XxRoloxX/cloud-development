import { UnauthorizedException, BadRequestException, Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import IAuthService from "../../auth/interfaces/auth.interface"
import { HttpGuard } from "../../auth/guards/http.guard"

@Injectable()
export class UserGuard implements CanActivate {
  constructor(@Inject(IAuthService) private readonly authService: IAuthService, @Inject(HttpGuard) private readonly httpGuard: HttpGuard) { }

  private getUserFromUrl(
    url: string
  ): string {
    const parts = url.split("/");
    const userIndex = parts.indexOf("users");
    if (userIndex === -1 || userIndex === parts.length - 1) {
      throw new BadRequestException("User id not found in url");
    }
    return parts[userIndex + 1];
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const userId = this.getUserFromUrl(request.url);
    const accessToken = this.httpGuard.getAuthorizationHeader(context);

    try {
      const profile = await this.authService.verify(accessToken);
      if (profile.userId !== userId) {
        throw new UnauthorizedException("User id in token does not match user id in url");
      }
      return true
    } catch (e) {
      console.error(`Invalid token ${accessToken}`, e.message)
      return false;
    }
  }
}


