import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as Express from 'express';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { LoginRequestDto } from '../dto/login-request.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ passReqToCallback: true });
  }

  async validate(request: Express.Request): Promise<any> {
    const { username, password }: LoginRequestDto = request.body;
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('User unauthorized');
    }

    return user;
  }
}
