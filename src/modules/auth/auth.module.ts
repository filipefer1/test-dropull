import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../../config/configuration';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.stategy';
import { LocalStrategy } from './strategies/local.stategy';

@Module({
  imports: [
    JwtModule.register({
      secret: config.JWT_CONSTANTS.secret,
      signOptions: { expiresIn: config.JWT_CONSTANTS.expireIn },
    }),
    UserModule,
  ],
  providers: [LocalStrategy, AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
