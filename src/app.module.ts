import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { NftModule } from './modules/nft/nft.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, AuthModule, NftModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
