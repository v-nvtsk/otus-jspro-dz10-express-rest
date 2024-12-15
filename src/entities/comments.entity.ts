import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comments')
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  task_id: number;

  @Column()
  user_id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'timestamp' })
  created_at: Date;
}
