import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Roles } from './roles.entity';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @ManyToOne(() => Roles, (role) => role.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'role_id' })
  role: Roles;

  @Column({ type: 'varchar', length: 50, default: 'registered' })
  state: string;
}
