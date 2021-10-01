import { HttpModule, Module } from '@nestjs/common';
import { NftService } from './services/nft.service';
import { NftController } from './controllers/nft.controller';
import { AssetController } from './controllers/asset.controller';
import { AssetService } from './services/asset.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetRepository } from './repositories/asset.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AssetRepository]), HttpModule],
  providers: [NftService, AssetService],
  controllers: [NftController, AssetController],
})
export class NftModule {}
