export default class LoginResponseDto {
  accessToken: string
  refreshToken: string
  expiresAt: number

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken
    return this
  }
  setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken
    return this
  }
  setExpiresAt(expiresAt: number) {
    this.expiresAt = expiresAt
    return this
  }
}
