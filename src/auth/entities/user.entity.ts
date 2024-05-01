import { Column, Entity, PrimaryGeneratedColumn, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '../../common/entity';
// import { RefreshToken } from './refresh-token.entity';
import { AccessToken } from './access-token.entity';
import { AccessLog } from './access-log.entity';

export type UserRole = 'admin' | 'user';

@Entity("member")
export class User {
  @PrimaryGeneratedColumn() // 자동 증가 기본 키
  id: number; // 고유 식별자

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @Column({ type: 'varchar', length: 50 })
  role: UserRole;

  @Column({ nullable: true })
  regNo: string;

  @Column({ default: false })
  isPersonalInfoVerified: boolean;

  @OneToMany(() => AccessToken, (token) => token.user)
  accessToken: Relation<AccessToken[]>;

  // @OneToMany(() => RefreshToken, (token) => token.user)
  // refreshToken: Relation<RefreshToken[]>;

  @OneToMany(() => AccessLog, (log) => log.user)
  accessLogs: Relation<AccessLog[]>;
}
