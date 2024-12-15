import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  input_examples: string;

  @Column({ type: 'text' })
  output_examples: string;

  @Column({ type: 'varchar', length: 50 })
  difficulty;

  @Column('text', { array: true })
  tags: string[];

  @Column('text', { array: true })
  additional_materials: string[];
}
