import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtPayload } from './interfaces/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByNickName(username);
    if (user && user.validatePassword(password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User): Promise<LoginResponseDto> {
    if (!user) {
      throw new BadRequestException('Falha ao realizar login');
    }

    const payload = {
      sub: user.id,
    } as JwtPayload;

    const hash = this.jwtService.sign(payload);

    return {
      user: {
        nickname: user.nickname,
        id: user.id,
        createdAt: user.createdAt,
      },
      accessToken: hash,
    };
  }
}
