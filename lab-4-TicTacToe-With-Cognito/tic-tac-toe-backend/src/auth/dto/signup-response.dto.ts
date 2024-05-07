export default class SignUpResponseDto {
  userId: string;
  email: string;

  setUserId(userId: string) {
    this.userId = userId;
    return this;
  }

  setEmail(email: string) {
    this.email = email;
    return this;
  }
}
