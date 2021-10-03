import { EntityRepository, Repository } from 'typeorm';
import { Nft } from '../entities/nft.entity';

@EntityRepository(Nft)
export class NftRepository extends Repository<Nft> {}
