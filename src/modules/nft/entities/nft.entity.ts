import { AfterInsert, BeforeInsert, Column, Entity, ManyToOne } from 'typeorm';
import { EntityBase } from '../../../shared/entity-base';
import { Asset } from './asset.entity';

@Entity()
export class Nft extends EntityBase {
  @Column()
  quantity: number;

  @ManyToOne(() => Asset)
  asset: Asset;

  @Column({ nullable: true })
  hash?: string;
}
