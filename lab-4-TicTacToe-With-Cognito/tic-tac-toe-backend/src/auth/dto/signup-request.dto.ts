import { IsEmail, IsNotEmpty } from "class-validator";
import { IsStrongPassword } from "class-validator";

export default class SignUpRequestDto {
  @IsEmail()
  email: string
  @IsStrongPassword()
  password: string
  @IsNotEmpty()
  name: string
}
