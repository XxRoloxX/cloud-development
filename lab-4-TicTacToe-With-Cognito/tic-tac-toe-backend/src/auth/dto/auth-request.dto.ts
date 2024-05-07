import { IsNotEmpty } from "class-validator";

export class AuthDto {
  // @IsNotEmpty()
  accessToken: string
}
