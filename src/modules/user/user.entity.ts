import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { EntityBase } from '../../shared/entity-base';

@Entity()
export class User extends EntityBase {
  @Column({ type: 'varchar', length: 255, unique: true })
  nickname: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  validatePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

  @BeforeInsert()
  private hashPassword() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 8);
    }
  }
}
