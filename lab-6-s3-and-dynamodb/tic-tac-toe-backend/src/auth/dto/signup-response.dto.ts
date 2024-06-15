export default class SignUpResponseDto {
  userId: string;
  email: string;
  name: string;

  setUserId(userId: string) {
    this.userId = userId;
    return this;
  }

  setEmail(email: string) {
    this.email = email;
    return this;
  }
  setName(name: string) {
    this.name = name;
    return this;
  }
}
