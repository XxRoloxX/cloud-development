import { IsStrongPassword, IsEmail } from "class-validator";

export default class LoginRequestDto {
  @IsEmail()
  email: string
  @IsStrongPassword()
  password: string
}

