import { IsEmail } from "class-validator";
import { IsStrongPassword } from "class-validator";

export default class SignUpRequestDto {
  @IsEmail()
  email: string
  @IsStrongPassword()
  password: string
}
