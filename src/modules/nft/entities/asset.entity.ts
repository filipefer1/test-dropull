import { Column, Entity } from 'typeorm';
import { EntityBase } from '../../../shared/entity-base';

@Entity()
export class Asset extends EntityBase {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  destination: string;

  @Column()
  ipfsHash: string;

  @Column()
  pinSize: number;

  @Column()
  ipfsTimestamp: Date;
}
