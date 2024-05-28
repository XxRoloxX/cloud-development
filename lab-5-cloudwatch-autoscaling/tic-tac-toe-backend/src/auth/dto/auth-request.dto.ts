import { IsNotEmpty } from "class-validator";

export class AuthRequestDto {
  @IsNotEmpty()
  accessToken: string
}

export class AuthResponseDto {
  @IsNotEmpty()
  username: string
  @IsNotEmpty()
  email: string
}
