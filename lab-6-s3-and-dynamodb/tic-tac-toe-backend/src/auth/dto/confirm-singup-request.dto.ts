import { IsEmail, IsNotEmpty, IsNumberString } from "class-validator";

class ConfirmSignupRequestDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsNumberString()
  code: string;
}

export default ConfirmSignupRequestDto;
