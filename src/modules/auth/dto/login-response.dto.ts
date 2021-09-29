import { User } from '../../user/user.entity';

export class LoginResponseDto {
  user: Partial<User>;

  accessToken: string;
}
