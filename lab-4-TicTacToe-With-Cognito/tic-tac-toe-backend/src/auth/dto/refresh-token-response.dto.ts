export class RefreshTokenResponseDto {
  constructor(public accessToken?: string, public expiresAt?: number) { }
  public setAccessToken(accessToken: string): RefreshTokenResponseDto {
    this.accessToken = accessToken;
    return this;
  }
  public setExpiresAt(expiresAt: number): RefreshTokenResponseDto {
    this.expiresAt = expiresAt;
    return this;
  }
}
