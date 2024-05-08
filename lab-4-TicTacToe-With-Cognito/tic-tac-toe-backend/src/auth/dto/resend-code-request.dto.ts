import { IsEmail } from "class-validator";

export default class ResendCodeRequestDto {
  @IsEmail()
  email: string
}

