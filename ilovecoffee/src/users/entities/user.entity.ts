import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../enums/role.enum';
import {
  Permission,
  PermissionType,
} from '../../iam/authorization/permission.type';
import { ApiKey } from '../api-keys/entities/api-key.entity/api-key.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ enum: Role, default: Role.Regular })
  role: Role;

  @JoinTable()
  @OneToMany((type) => ApiKey, (apiKey) => apiKey.user)
  apiKeys: ApiKey[];

  @Column({ enum: Permission, default: [], type: 'json' })
  permissions: PermissionType[];

  @Column({ default: false })
  isTfaEnabled: boolean; // 👈 NEW

  @Column({ nullable: true })
  tfaSecret: string; // 👈 NEW

  @Column({ nullable: true })
  googleId: string;
}
