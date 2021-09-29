import { IsDefined, IsString } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  @IsDefined()
  username: string;

  @IsDefined()
  @IsString()
  password: string;
}
