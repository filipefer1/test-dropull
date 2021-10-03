import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { CreateNftDto } from '../dtos/create-nft.dto';
import { NftRepository } from '../repositories/nft.repository';
import { AssetService } from './asset.service';

@Injectable()
export class NftService {
  constructor(
    private readonly nftRepository: NftRepository,
    private readonly assetService: AssetService,
  ) {}

  async findAll() {
    return this.nftRepository.find({ relations: ['asset'] });
  }

  async create(dto: CreateNftDto) {
    const asset = await this.assetService.findById(dto.assetId);
    const nft = this.nftRepository.create({
      quantity: dto.quantity,
      asset,
      id: uuid(),
    });

    nft.hash = this.generateNftHash(asset.id, nft.id);

    return this.nftRepository.save(nft);
  }

  generateNftHash(assetId: string, nftId: string) {
    const stringToHash = `${nftId}-${assetId}`;
    return bcrypt.hashSync(stringToHash, 8);
  }
}
