import { IsDefined, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsDefined()
  nickname: string;

  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  password: string;
}
