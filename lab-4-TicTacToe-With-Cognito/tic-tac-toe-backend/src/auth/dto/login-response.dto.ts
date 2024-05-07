export default class LoginResponseDto {
  accessToken: string
  refreshToken: string

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken
    return this
  }
  setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken
    return this
  }
}
